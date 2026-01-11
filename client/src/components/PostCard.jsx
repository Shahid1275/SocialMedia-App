import React, { useState } from 'react'
import { BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
import moment from 'moment'
import { dummyUserData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const PostCard = ({ post }) => {
  if (!post) return null

  const [likes, setLikes] = useState(post.likes_count);
  const currentuser = dummyUserData;

  const navigate = useNavigate();
  const handleLikes = () => {

  }
  const postwithhashtags = post.content?.replace(/#(\w+)/g, '<span class="text-indigo-600 cursor-pointer">#$1</span>'); 
  return (
    <div className='rounded-xl bg-white shadow p-4 space-y-4 w-full max-w-2xl'>
      {/* user info */}
      <div onClick={() => navigate('/profile/' + post.user._id)} className='inline-flex items-center gap-3 cursor-pointer'>
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
      {/* content */}
   { post.content && <div className='text-gray-800 text-sm whitespace-pre-line ' dangerouslySetInnerHTML={{__html:postwithhashtags}}>
    </div>}
      {/* post image */}
      <div className='grid grid-cols-2 gap-2'>
         {post.image_urls?.map((img,index) =>(
         <img src={img} key={index} alt='images'  className={`w-full h-48 object-cover rounded-lg ${post.image_urls.length === 1 ? 'col-span-2 h-auto' : ''}`}/>
         )) }
      </div>

      {/* actions */}
      <div className='flex items-center gap-4 text-gray-600 text-sm pt-4 border-t border-gray-300'>
       <div className='flex items-center gap-1'>
        <Heart
          className={`w-4 h-4 cursor-pointer ${likes.includes(currentuser._id) ? 'text-red-500 fill-red-500' : ''}`}
          onClick={handleLikes}
        />
        <span>{likes.length}</span>
       </div>
        <div className='flex items-center gap-1'>
          <MessageCircle className='w-4 h-4'/>
        <span>{12}</span>
       </div>
        <div className='flex items-center gap-1'>
        <Share2 className='w-4 h-4'/>
        <span>{7}</span>
       </div>
      </div>
    </div>
  )
}

export default PostCard
