import React, { useEffect } from 'react'
import Posts from './posts/Posts'
import useGetAllPost from '@/components/hooks/useGetAllPost'
import { useDispatch } from 'react-redux'
import { setPosts } from '@/redux/post/postSlice'

const Feed = () => {

  useGetAllPost();
  // const dispatch = useDispatch()

  // const posts = useGetAllPost();

  // useEffect(() => {
  //   dispatch(setPosts(posts)); // Redux state update karo
  // }, [posts, dispatch]); // ✅ Dependencies add ki 

  
  return (
    <div className='flex-1 my-8 flex flex-col items-center '>
        <Posts/>
    </div>
  )
}

export default Feed
