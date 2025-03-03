import axios from "axios";

export const getAddressCoordinates = async (address) => {
  try {
    // Uncomment and use the actual API call once you have the API key
    // const response = await axios.get(
    //   `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    // );
    // if (response.data.status === "OK") {
    //   const location = response.data.results[0].geometry.location;
    //   return {
    //     lat: location.lat,
    //     lng: location.lng,
    //   };
    // } else {
    //   throw new Error("Address not found");
    // }

    // Sample mock data (return coordinates for a sample address)
    if (address.toLowerCase() === "new york") {
      return { lat: 40.7128, lng: -74.0060 }; // New York coordinates
    } else if (address.toLowerCase() === "los angeles") {
      return { lat: 34.0522, lng: -118.2437 }; // Los Angeles coordinates
    } else {
      throw new Error("Address not found");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDistanceTime = async (origin, destination) => {
  try {
    // Uncomment and use the actual API call once you have the API key
    // const response = await axios.get(
    //   `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    // );
    // if (response.data.status === "OK") {
    //   if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
    //     throw new Error("No results found");
    //   }
    //   return response.data.rows[0].elements[0];
    // }

    // Sample mock data for distance and time
    if (origin.toLowerCase() === "new york" && destination.toLowerCase() === "los angeles") {
      return {
        distance: { text: "2,450 miles", value: 3940000 },
        duration: { text: "5 hours 45 mins", value: 20700 },
        status: "OK",
      };
    } else if (origin.toLowerCase() === "los angeles" && destination.toLowerCase() === "new york") {
      return {
        distance: { text: "2,450 miles", value: 3940000 },
        duration: { text: "5 hours 45 mins", value: 20700 },
        status: "OK",
      };
    } else if (origin.toLowerCase() === "new york" && destination.toLowerCase() === "chicago") {
      return {
        distance: { text: "790 miles", value: 1270000 },
        duration: { text: "2 hours 30 mins", value: 9000 },
        status: "OK",
      };
    } else {
      throw new Error("Origin and destination pair not found");
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Error getting distance and time: ${error.message}`);
  }
};

export const getAutoSuggestions = async (input) => {
    if (!input) {
      throw new Error('Query is required');
    }
  
    try {
      // Uncomment and use the actual API call once you have the API key
      // const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`);
      // if (response.data.status === 'OK') {
      //     return response.data.predictions;
      // } else {
      //     throw new Error('Unable to fetch suggestions');
      // }
  
      // Sample mock data for auto-suggestions
      if (input.toLowerCase().includes("new york")) {
        return [
          { description: "New York, NY, USA", place_id: "ChIJOwg_06VPwokRYv5fB4fXw8g" },
          { description: "New York Public Library, New York, NY, USA", place_id: "ChIJBQAZ9ZkR6YkR6_mNPrphQJ8" },
        ];
      } else if (input.toLowerCase().includes("los angeles")) {
        return [
          { description: "Los Angeles, CA, USA", place_id: "ChIJE9on3F3HwoAR9uU2mAD5oGc" },
          { description: "Los Angeles International Airport (LAX), Los Angeles, CA, USA", place_id: "ChIJ3S_JXmXPwokRAFJ0C6Y9ZG5J" },
        ];
      } else if (input.toLowerCase().includes("chicago")) {
        return [
          { description: "Chicago, IL, USA", place_id: "ChIJDzFzR7FHwoARjVeXSK3M1Y4" },
          { description: "Chicago O'Hare International Airport (ORD), Chicago, IL, USA", place_id: "ChIJCzYy5ZpY2YgRUSV+7uP37P0" },
        ];
      } else {
        throw new Error("No suggestions available for the given input");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };