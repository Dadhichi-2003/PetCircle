import React, { useEffect } from 'react'
import Posts from './posts/Posts'
import useGetAllPost from '@/components/hooks/useGetAllPost'
import { useDispatch } from 'react-redux'
import { setPosts } from '@/redux/post/postSlice'
import RightSidebar from '../suggestedComp/RightSidebar'
import useGetSuggestedUsers from '@/components/hooks/useGetSuggestedUsers'
import useGetPetPost from '@/components/hooks/useGetPetPost'
import useGetAllCommunityPost from '@/components/hooks/useGetAllCommunityPost'

const Feed = () => {

  useGetAllPost();
  useGetSuggestedUsers();
  useGetPetPost();
  useGetAllCommunityPost();
  // const dispatch = useDispatch()

  // const posts = useGetAllPost();

  // useEffect(() => {
  //   dispatch(setPosts(posts)); // Redux state update karo
  // }, [posts, dispatch]); // ✅ Dependencies add ki 

  

  
  return (

    <>
    <div className='flex justify-center items-center  '>
      
        <Posts/>
      
      <div className=' hidden md:flex md:self-start md:items-end '>
      <RightSidebar/>
      </div>
    </div>
    </>
    // my-8 flex flex-col items-center
    //  
  )
}

export default Feed
