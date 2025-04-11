import React from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SuggestedUser from './SuggestedUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const RightSidebar = () => {
    const { user } = useSelector(store => store.auth);
    return (
      <div className='w-fit my-10 pr-32'>
        <div className='flex items-center gap-2'>
          <Link to={`/main/profile/${user?._id}`}>
            <Avatar>
              <AvatarImage src={user?.profilePic} alt="post_image" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <h1 className='font-semibold text-sm'><Link to={`/main/profile/${user?._id}`}>{user?.username}</Link></h1>
            <span className='text-gray-600 text-sm w-25 line-clamp-2'>{user?.bio || 'Bio here...'}</span>
          </div>
        </div>
        <SuggestedUser/>
      </div>
    )
}

export default RightSidebar
