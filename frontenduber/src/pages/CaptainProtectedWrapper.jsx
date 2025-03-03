import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'


const captainProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {captain, setCaptain} = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }
    }, [token])

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            setCaptain(response.data.captain)
            setIsLoading(false)
        }
    }).catch((error) => {
        console.log(error)
        localStorage.removeItem('token')
        navigate('/captain-login')
    })

    if(isLoading){
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default captainProtectedWrapper