import React from 'react';
import ComicCard from './ComicCard';

// Data dummy (nanti bisa diganti dengan props atau API call)
const comics = [
  {
    id: 1,
    title: 'The Rise of Plankton',
    author: 'Satoshi Sponge',
    cover: '/images/default-comic-cover.png',
    description: 'The legendary beginning of decentralized marine domination.',
  },
  {
    id: 2,
    title: 'Ocean Chain Wars',
    author: 'Marine Vitalik',
    cover: '/images/default-comic-cover.png',
    description: 'An epic battle across the crypto seas.',
  },
  // Tambahkan data lain sesuai kebutuhan
];

const ComicBrowser = () => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {comics.map((comic) => (
        <ComicCard key={comic.id} comic={comic} />
      ))}
    </div>
  );
};

export default ComicBrowser;