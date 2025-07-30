import { useState } from 'react'
import { useComic } from '../contexts/ComicContext'
import ComicBrowser from '../components/comics/ComicBrowser'
import ComicUpload from '../components/comics/ComicUpload'
import MyComics from '../components/comics/MyComics'
import ComicReader from '../components/comics/ComicReader'

export default function ComicPage() {
  const { selectedComic } = useComic()
  const [activeTab, setActiveTab] = useState('browse')

  if (selectedComic) {
    return (
      <ComicReader 
        comic={selectedComic} 
        onBack={() => setActiveTab('browse')} 
      />
    )
  }

  return (
    <div className="comic-page">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('browse')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'browse' ? 'bg-teal-900 text-teal-300' : 'bg-gray-800'}`}
        >
          Browse Comics
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'upload' ? 'bg-teal-900 text-teal-300' : 'bg-gray-800'}`}
        >
          Upload Comic
        </button>
        <button
          onClick={() => setActiveTab('myworks')}
          className={`px-4 py-2 rounded-lg ${activeTab === 'myworks' ? 'bg-teal-900 text-teal-300' : 'bg-gray-800'}`}
        >
          My Works
        </button>
      </div>

      {activeTab === 'browse' && <ComicBrowser />}
      {activeTab === 'upload' && <ComicUpload />}
      {activeTab === 'myworks' && <MyComics />}
    </div>
  )
}