import { useState } from 'react';
import { useIPFS } from '../../../services/ipfs/ipfsClient';

export default function ComicUploadForm() {
  const { uploadToIPFS } = useIPFS();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handlePageUpload = (e) => {
    if (e.target.files) {
      setPages([...pages, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Upload cover image
      const coverCID = await uploadToIPFS(coverImage);
      
      // Upload pages
      const pageCIDs = await Promise.all(
        pages.map(page => uploadToIPFS(page))
      );
      
      // TODO: Call smart contract to mint comic NFT
      console.log({ title, description, coverCID, pageCIDs });
      
      // Reset form
      setTitle('');
      setDescription('');
      setCoverImage(null);
      setPages([]);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsLoading(false);
    }
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
        <label className="block mb-2">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full bg-gray-700 p-3 rounded-lg"
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
          className="w-full bg-gray-700 p-3 rounded-lg"
          required
        />
        <div className="mt-2 grid grid-cols-4 gap-2">
          {pages.map((page, index) => (
            <div key={index} className="bg-gray-600 p-1 rounded">
              <p className="text-xs truncate">{page.name}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-purple-600 hover:bg-purple-700 py-3 px-4 rounded-lg text-lg font-semibold disabled:opacity-50"
      >
        {isLoading ? 'Uploading...' : 'Publish Comic'}
      </button>
    </form>
  );
}