import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import store from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'

const UserComment = ({comment}) => {
    
   
    return (

    <div className='my-2'>
    <div className='flex gap-3 items-center'>
        <Avatar>
            <AvatarImage src={comment?.user?.profilePic} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className='font-bold text-sm'>{comment?.user?.username}<span className='font-normal pl-1'>{comment?.content}</span></h1>
    </div>
</div>
  )
}

export default UserComment
