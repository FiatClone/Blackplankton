import { useState } from 'react'
import { useComic } from '../../contexts/ComicContext'

export default function ComicUpload() {
  const { uploadComic } = useComic()
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)

  const handleUpload = async (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    if (!file) return
    
    try {
      setIsUploading(true)
      await uploadComic(file)
    } catch (err) {
      setError(err.message || 'Failed to upload comic')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Comic</h2>
      <div className="border-2 border-dashed border-teal-300 rounded-lg p-8 text-center">
        <input 
          type="file" 
          onChange={handleUpload}
          accept=".pdf,.cbz,.cbr,.zip"
          disabled={isUploading}
          className="hidden"
          id="comic-upload"
        />
        <label 
          htmlFor="comic-upload"
          className="block px-4 py-2 bg-teal-900 text-teal-300 rounded-lg cursor-pointer hover:bg-teal-800"
        >
          {isUploading ? 'Uploading...' : 'Select Comic File'}
        </label>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        <p className="mt-4 text-sm text-gray-400">
          Supported formats: PDF, CBZ, CBR, ZIP
        </p>
      </div>
    </div>
  )
}