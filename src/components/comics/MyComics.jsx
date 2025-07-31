import { useEffect, useState } from 'react'
import { useComic } from '../contexts/ComicContext'
import ComicCard from './ComicCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'

export default function MyComics() {
  const { fetchUserComics, selectComic } = useComic()
  const [comics, setComics] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadComics = async () => {
      try {
        setIsLoading(true)
        const userComics = await fetchUserComics()
        setComics(userComics)
      } catch (err) {
        setError(err.message || 'Failed to load your comics')
      } finally {
        setIsLoading(false)
      }
    }

    loadComics()
  }, [fetchUserComics])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-900/30 rounded-lg">
        {error}
      </div>
    )
  }

  if (comics.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400">
        <p className="text-lg">You haven't uploaded any comics yet.</p>
        <p>Upload your first comic to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {comics.map((comic) => (
        <ComicCard 
          key={comic.id} 
          comic={comic} 
          onClick={() => selectComic(comic)}
          showAuthor={false}
        />
      ))}
    </div>
  )
}