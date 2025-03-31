import { setpetPost } from "@/redux/post/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetPetPost = () => {
    const dispatch = useDispatch();
    const { pet } = useSelector((store) => store.auth);
    
    useEffect(() => {
        if (!pet?._id) return; // Ensure pet ID exists

        const getPetPost = async () => {
            try {
                const res = await axios.get(`/posts/petpost/${pet._id}`, { withCredentials: true });
                if (res.data) {
                    dispatch(setpetPost(res.data.posts));
                    console.log(res.data.posts)
                }
            } catch (err) {
                console.error("Error fetching pet posts:", err);
            }
        };

        getPetPost();
    }, [dispatch, pet]); // Dependencies

};

export default useGetPetPost;
