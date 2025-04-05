

import { setAllComm } from "@/redux/community/communitySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetAllCommunity = () => {
    
    const dispatch = useDispatch()
    const {allCommunities} = useSelector(store => store.community)

    useEffect(() => {
        const fetchAllCommunities = async () => {
            try {
                const res = await axios.get('/community/getallcommunities', { withCredentials: true });
                if (res.data) { 
                    console.log(res.data.communities);
                    dispatch(setAllComm(res.data.communities))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllCommunities();
    }, [dispatch]);

    return allCommunities; 
};
export default useGetAllCommunity;
