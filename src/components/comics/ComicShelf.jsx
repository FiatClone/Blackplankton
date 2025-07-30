import { useComics } from '../../../hooks/useComics';
import ComicCard from './ComicCard';
import { useState } from 'react';

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rating' }
];

const filterOptions = [
  { value: 'all', label: 'All Comics' },
  { value: 'featured', label: 'Featured' },
  { value: 'trending', label: 'Trending' },
  { value: 'free', label: 'Free to Read' }
];

export default function ComicShelf() {
  const { featuredComics, loading } = useComics();
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedAndFilteredComics = featuredComics
    .filter(comic => {
      if (filterBy === 'featured') return comic.isFeatured;
      if (filterBy === 'trending') return comic.isTrending;
      if (filterBy === 'free') return comic.isFree;
      return true;
    })
    .filter(comic => 
      comic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comic.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'popular') return b.views - a.views;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search comics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-700 p-3 rounded-lg"
          />
        </div>
        
        <div className="flex space-x-2">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="bg-gray-700 p-3 rounded-lg"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-700 p-3 rounded-lg"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-800 rounded-xl h-80 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedAndFilteredComics.map(comic => (
            <ComicCard key={comic.id} comic={comic} />
          ))}
        </div>
      )}
      
      {!loading && sortedAndFilteredComics.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-xl">No comics found matching your criteria</p>
        </div>
      )}
    </div>
  );
}