
import React, { useEffect, useState } from 'react'
import { BadgeCheck ,X } from 'lucide-react'
const StoryViewer = ({viewStory, setViewStory}) => {

  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    let timer, progressInterval;
    
    if(viewStory && viewStory.media_type !== 'video') {
      setProgress(0);
      const duration = 10000; // 10 seconds for images and text
      const stepTime = 100;
      let elapsed = 0;

      progressInterval = setInterval(() => {
        elapsed += stepTime;
        setProgress((elapsed / duration) * 100);     
      }, stepTime);

      timer = setTimeout(() => {
        setViewStory(null);
      }, duration);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [viewStory, setViewStory]);

  if(!viewStory) return null;
  
  const handleClose = () => {
    setViewStory(null)
  }
  const renderMedia = () => {
    switch(viewStory.media_type) {
      case 'image':
        return (
          <img src={viewStory.media_url} alt='' className='max-w-full max-h-screen object-contain'/>
        );
     case 'video':
        return (
          <video src={viewStory.media_url} controls autoPlay onEnded={()=>setViewStory(null)} className='max-w-full max-h-screen object-contain'/>
        );
         case 'text':
        return (
          <div className='w-full h-full flex items-center justify-center p-8 text-center text-white text-2xl'>
                   {viewStory.content}
          </div>
        );
      default:
        return null;    
    }
  }
  return (
    <div className='fixed inset-0 h-screen bg-black bg-opacity-90 z-110 flex items-center justify-center' style={{backgroundColor: viewStory.media_type === 'text' ? viewStory.background_color : '#000000'}}>
      
      {/* Progress Bar */}
      <div className='absolute top-0 left-0 w-full h-1 bg-gray-700'>
        <div className='h-full bg-white transition-all duration-100 linear' style={{width: `${progress}%`}}></div>
      </div>
      {/* user info  */}
      <div className='absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 sm:p-4 sm:px-8 backdrop-blur-2xl rounded bg-black/50'>
      <img src={viewStory.user?.profile_picture} alt='' className='w-7 sm:w-8 rounded-full object-cover border border-white' />
      <div className='text-white font-medium flex items-center gap-1.5'>
        <span>{viewStory.user?.full_name}</span>
        <BadgeCheck  size={18}/>
      </div>

      </div>
      {/* close button */}
     <button onClick={handleClose} className='absolute top-4 right-4 text-white text-3xl font-bold cursor-pointer focus-outline-none'>
        <X className='cursor-pointer w-8 h-8 transition hover:scale-110'/>
     </button>
     {/* Media content */}
     {renderMedia()}
    </div>
  )
}

export default StoryViewer
