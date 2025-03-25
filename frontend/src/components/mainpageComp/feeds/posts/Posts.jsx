import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetAllPost from '@/components/hooks/useGetAllPost'
import { Key } from 'lucide-react'

const Posts = () => {
  
  const {posts} = useSelector(store=>store.post);

 
  return (
   
    <div>
      {
        posts?.map((post,index) => <Post key={index} post={post}/>)

      }
    </div>
  )
}

export default Posts
