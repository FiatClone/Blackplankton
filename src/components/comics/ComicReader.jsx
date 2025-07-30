import { useState, useEffect } from 'react';
import { useIPFS } from '../../../services/ipfs/ipfsClient';

export default function ComicReader({ comicCid, pageCids }) {
  const { getFromIPFS } = useIPFS();
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPages = async () => {
      try {
        const loadedPages = await Promise.all(
          pageCids.map(cid => getFromIPFS(cid))
        );
        setPages(loadedPages);
      } catch (error) {
        console.error('Error loading comic pages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, [pageCids, getFromIPFS]);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <div className="text-center py-8">Loading comic...</div>;

  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage + 1} of {pages.length}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === pages.length - 1}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="flex justify-center">
        {pages[currentPage] ? (
          <img 
            src={pages[currentPage]} 
            alt={`Page ${currentPage + 1}`} 
            className="max-h-screen max-w-full rounded shadow-lg"
          />
        ) : (
          <div className="text-red-500">Failed to load page</div>
        )}
      </div>
    </div>
  );
}