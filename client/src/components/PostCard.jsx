import React from 'react'
import { BadgeCheck } from 'lucide-react'
import moment from 'moment'

const PostCard = ({ post }) => {
  if (!post) return null

  return (
    <div className='rounded-xl bg-white shadow p-4 space-y-4 w-full max-w-2xl'>
      {/* user info */}
      <div className='inline-flex items-center gap-3 cursor-pointer'>
        <img src={post.user?.profile_picture} alt="" className='w-10 h-10 shadow rounded-full'/>
        <div>
          <div className='items-center space-x-1 flex'>
            <span>{post.user?.full_name}</span>
            <BadgeCheck className='w-4 h-4 text-blue-500'/>
          </div>
          <div className='text-gray-500 text-sm'>
            @{post.user?.username} • {moment(post.createdAt).fromNow()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
