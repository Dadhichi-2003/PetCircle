
import { setPosts } from "@/redux/post/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetAllPost = () => {
    const dispatch = useDispatch();
    const posts = useSelector(store => store.post.posts); // ✅ Redux se posts le lo

    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await axios.get('/posts/allpost', { withCredentials: true });
                if (res.data) { 
                    console.log(res.data.posts);
                    dispatch(setPosts(res.data.posts));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPost();
    }, [dispatch]);

    return posts; // ✅ Posts return karo
};
export default useGetAllPost;
