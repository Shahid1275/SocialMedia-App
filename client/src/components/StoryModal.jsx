import React, { useState } from 'react'
import { ArrowLeft ,Sparkle,TextIcon, Upload} from 'lucide-react'
import { toast } from 'react-hot-toast'
const StoryModal = ({setShowModal,fetchStories}) => {

  const bgColors = [ '#4f46e5', '#7c3aed', '#db2777', '#e11d48', '#ca8a04', '#0d9488' ];
 const [mode, setMode] = useState('text');
 const [text, setText] = useState('');
  const [bgColor, setBgColor] = useState(bgColors[0]);
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleMediaChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setMedia(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }

const handleCreateStory = async () => {
}
  return (
    <div className='fixed inset-0 z-110 min-h-screen bg-black/80 flex blackdrop-blur text-white items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='items-center justify-between flex mb-4 text-center'>
          <button onClick={() => setShowModal(false)} className='text-white p-2 cursor-pointer'>
            <ArrowLeft/>
          </button>
          <h2 className='text-lg font-semibold'>
            Create Story
          </h2>
          <span className='w-10'></span>
        </div>
        <div className='rounded-lg h-96 flex items-center justify-center relative' style={{backgroundColor:bgColor}}>
          {
            mode === 'text' && (
              <textarea
              value={text}
              onChange={(e) => setText(e.target.value)} 
              placeholder="Share your thoughts. What's on your mind?"
              className='w-full h-full bg-transparent resize-none focus:outline-none p-6 text-white text-lg'
              />
            )
          }
          {
            mode === 'media' && previewUrl && (
              media?.type.startsWith('image/') ?(
                <img src={previewUrl} alt="" className='max-h-full object-contain'/>
              ):(
                <video src={previewUrl} controls className=' max-h-full object-contain'/>
              )
            )
          }

        </div>
        <div className='mt-4 gap-2 flex '>
          {
            bgColors.map((color)=>(
              <button key={color} style={{backgroundColor: color}} className="w-8 h-8 rounded-full cursor-pointer ring" onClick={() => setBgColor(color)} />
            ))
          }

        </div>
         <div className='flex gap-2 mt-4 '>
          <button onClick={()=>{setMode('text'); setMedia(null); setPreviewUrl(null);}} className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode==='text' ? 'bg-white text-black' : 'bg-zinc-800 text-white'}`}>
            <TextIcon  size={18}/> Text
          </button>
          <label className={ `flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode==='media' ? 'bg-white text-black' : 'bg-zinc-800 text-white'}`}>
            <input type="file" accept="image/*,video/*" className='hidden' onChange={(e) => handleMediaChange(e)} onClick={() => {setMode('media'); setText('');}}/>
            <Upload size={18}/> photo/Video
          </label>
         </div>
         <button  onClick={()=> toast.promise(handleCreateStory(),{
          loading: 'Creating Story...',
          success: 'Story Created!',
          error: 'Failed to create story.'
         })}className='flex items-center justify-center gap-2 p-2 rounded w-full bg-blue-600 text-white mt-4 cursor-pointer transition' >
             <Sparkle size={18}/> Create Story
         </button>
      </div>
    </div>
  )
}

export default StoryModal
