
import { setAllCommPost } from "@/redux/community/communitySlice";
import { setPosts } from "@/redux/post/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetAllCommunityPost = () => {
    const dispatch = useDispatch();
    const communityPosts = useSelector(store => store.community.communityPosts); // ✅ Redux se posts le lo

    useEffect(() => {
        const fetchAllCommunityPost = async () => {
            try {
                const res = await axios.get('/community/all-community-posts', { withCredentials: true });
                if (res.data) { 
                    console.log(res.data.posts);
                    dispatch(setAllCommPost(res.data.posts));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllCommunityPost();
    }, [dispatch]);

    return communityPosts; // ✅ Posts return karo
};
export default useGetAllCommunityPost;
