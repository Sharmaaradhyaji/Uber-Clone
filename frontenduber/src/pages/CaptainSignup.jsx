import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [userData, setUserData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({
            fullname:{
                firstname: firstname,
                lastname: lastname
            },
            email: email,
            password: password
        });
        setEmail("");
        setPassword("");    
        setFirstname("");
        setLastname("");
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
            <p className='text-10px leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and Terms of Service apply.</p>
          </div>
        </div>
      );
}

export default CaptainSignup
