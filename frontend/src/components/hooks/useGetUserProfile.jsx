import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from '@/redux/user/authSlice';



const useGetUserProfile = (userId) => {
    const dispatch = useDispatch();
    const { userProfile } = useSelector(store => store.auth);
    // const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`/user/${userId}`, { withCredentials: true });
                if (res.data) { 
                   
                    dispatch(setUserProfile(res.data.user));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserProfile();
    }, [userId, dispatch]);
}

export default useGetUserProfile
