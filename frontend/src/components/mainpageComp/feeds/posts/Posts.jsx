import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetAllPost from '@/components/hooks/useGetAllPost'
import { Key } from 'lucide-react'
import CommunityPosts from './CommunityPosts'

const Posts = () => {

  const { posts } = useSelector(store => store.post);
  const {communityPosts} = useSelector(store=>store.community)
  console.log(communityPosts);
  

  return (

    <div className='md:w-[60%]'>
      {
        posts
          ?.filter((post) => post?.pet !== null)
          .map((post, index) => <Post key={index} post={post} />)
      }

      {
        communityPosts
        ?.filter((post) => post.pet == null)
        .map((post, index) => <CommunityPosts key={index} post={post} />)
      }
    </div>
  )
}

export default Posts
