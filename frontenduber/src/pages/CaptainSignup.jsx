import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import {CaptainDataContext} from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainSignup = () => {

  const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [userData, setUserData] = useState({});
    const [vehiclePlate, setVehiclePlate] = useState("");
    const [vehicleColor, setVehicleColor] = useState("");
    const [vehicleCapacity, setVehicleCapacity] = useState("");
    const [vehicleType, setVehicleType] = useState("");

    const {captain, updateCaptain} = React.useContext(CaptainDataContext);

    const submitHandler = async(e) => {
        e.preventDefault();

        const captainData = {
            fullname:{
                firstname: firstname,
                lastname: lastname
            },
            email: email,
            password: password,
            vehicle: {
              color: vehicleColor,
              plate: vehiclePlate,
              capacity: vehicleCapacity,
              vehicleType: vehicleType
            }
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

        if(response.status === 201){
            const data = response.data;
            updateCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }

        setEmail("");
        setPassword("");    
        setFirstname("");
        setLastname("");
        setVehiclePlate("");
        setVehicleColor("");
        setVehicleCapacity("");
        setVehicleType("");
      
    }

    return (
        <div className="p-7 h-screen flex flex-col justify-between">
          <div>
            <img
              className="w-16 mb-10"
              src="https://pngimg.com/d/uber_PNG24.png"
              alt=""
            />
            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
              action=""
            >
                <h3 className="text-lg font-medium mb-2">What is your name</h3>
              <div className='flex gap-4 mb-5'>
                <input
                  className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-gray-500"
                  required
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  type="text"
                  placeholder="First Name"
                  />
                <input
                  className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-gray-500"
                  required
                  value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  type="text"
                  placeholder="Last Name"
                  />
              </div>
              <h3 className="text-lg font-medium mb-2">What is your email</h3>
              <input
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-gray-500"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="email@example.com"
              />
              <h3 className="text-lg font-medium mb-2">Enter Password</h3>
              <input
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-gray-500"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
              />
<h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

              <button className="bg-black text-white px-4 py-2 rounded w-full mt-5">
                Create a Captain Account
              </button>
              <p className="text-center">
                Already have account as Captain ?{" "}
                <Link to="/captain-login" className="text-blue-600">
                  Login
                </Link>
              </p>
            </form>
          </div>
          <div>
            <p className='text-10px mt -6leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and Terms of Service apply.</p>
          </div>
        </div>
      );
}

export default CaptainSignup
