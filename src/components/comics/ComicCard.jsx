import { Link } from 'react-router-dom';
import RatingStars from '../ui/RatingStars';

export default function ComicCard({ comic }) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <Link to={`/comic/${comic.id}`}>
        <div className="relative pb-[150%]">
          <img 
            src={comic.coverImage || '/images/default-comic-cover.png'} 
            alt={comic.title}
            className="absolute h-full w-full object-cover"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/comic/${comic.id}`}>
          <h3 className="font-bold text-lg mb-1 hover:text-blue-400 truncate">{comic.title}</h3>
        </Link>
        <p className="text-gray-400 text-sm mb-2 line-clamp-2">{comic.description}</p>
        
        <div className="flex justify-between items-center">
          <RatingStars rating={comic.rating || 0} />
          <span className="text-xs bg-gray-700 px-2 py-1 rounded">
            {comic.pageCount || 0} pages
          </span>
        </div>
      </div>
    </div>
  );
}