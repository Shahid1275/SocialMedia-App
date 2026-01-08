import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import { dummyPostsData } from '../assets/assets';
import StoriesBar from '../components/StoriesBar';
import PostCard from '../components/PostCard';
const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () =>{
    setFeeds(dummyPostsData)
    setLoading(false);
  }
  useEffect(()=>{
    fetchFeeds();
  }, [])
  return !loading ? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/*  left sidebar stories and posts */}
      <div>
        <StoriesBar/>
    <div className='p-4 space-y-6'>
      {feeds.map((post)=>(
        <div key={post._id}>
          <PostCard post={post}/>
        </div>
      ))}
    </div>
      </div>

         {/* right sidebar */}
         <div>
         <div>
          <h1>Sponsored</h1>
         </div>
         <h1>Recent messages </h1>
         </div>
    </div>
  ) :  <Loading/>
}

export default Feed
