import rideModel from "../models/ride.model.js";
import { getDistanceTime } from "./maps.service.js";



async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };



    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;


}
export const createNewRide = async (
    user, pickup, destination, vehicleType
) => {
    if(!user || !pickup || !destination || !vehicleType)
    {
        throw new Error("All fields are required");
    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
    });

    return ride
}