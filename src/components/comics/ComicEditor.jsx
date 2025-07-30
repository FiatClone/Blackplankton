import { useState, useRef } from 'react';
import { useIPFS } from '../../../services/ipfs/ipfsClient';

export default function ComicEditor({ onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pages, setPages] = useState([]);
  const fileInputRef = useRef(null);

  const handlePageUpload = (e) => {
    const files = Array.from(e.target.files);
    setPages([...pages, ...files]);
  };

  const removePage = (index) => {
    setPages(pages.filter((_, i) => i !== index));
  };

  const movePage = (fromIndex, toIndex) => {
    const newPages = [...pages];
    const [movedPage] = newPages.splice(fromIndex, 1);
    newPages.splice(toIndex, 0, movedPage);
    setPages(newPages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comicData = {
      title,
      description,
      pages
    };
    onSave(comicData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-700 p-3 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-gray-700 p-3 rounded-lg"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block mb-2">Comic Pages</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePageUpload}
          ref={fileInputRef}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="w-full bg-gray-700 hover:bg-gray-600 py-3 px-4 rounded-lg mb-3"
        >
          Add Pages
        </button>
        
        <div className="space-y-2">
          {pages.map((page, index) => (
            <div key={index} className="flex items-center bg-gray-700 p-2 rounded-lg">
              <span className="mr-3 text-gray-400">{index + 1}</span>
              <img 
                src={URL.createObjectURL(page)} 
                alt={`Page ${index + 1}`} 
                className="h-12 object-cover rounded"
              />
              <div className="ml-auto flex space-x-2">
                {index > 0 && (
                  <button 
                    type="button"
                    onClick={() => movePage(index, index - 1)}
                    className="p-1 bg-gray-600 rounded"
                  >
                    ↑
                  </button>
                )}
                {index < pages.length - 1 && (
                  <button 
                    type="button"
                    onClick={() => movePage(index, index + 1)}
                    className="p-1 bg-gray-600 rounded"
                  >
                    ↓
                  </button>
                )}
                <button 
                  type="button"
                  onClick={() => removePage(index)}
                  className="p-1 bg-red-600 rounded"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!title || !description || pages.length === 0}
        className="w-full bg-purple-600 hover:bg-purple-700 py-3 px-4 rounded-lg text-lg font-semibold disabled:opacity-50"
      >
        Save Comic
      </button>
    </form>
  );
}