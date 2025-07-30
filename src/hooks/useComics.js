import { useEffect, useState } from 'react';
import { useComicActions } from '../services/contracts/comicService';
import { useIPFS } from '../services/ipfs/ipfsClient';

export function useComics() {
  const { publishComic, getComicDetails, comicCount } = useComicActions();
  const { uploadToIPFS } = useIPFS();
  const [myComics, setMyComics] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadComic = async (comicData) => {
    setLoading(true);
    try {
      // Upload metadata to IPFS
      const metadata = {
        title: comicData.title,
        description: comicData.description,
        pages: []
      };

      // Upload pages
      const pageCIDs = await Promise.all(
        comicData.pages.map(page => uploadToIPFS(page))
      );
      metadata.pages = pageCIDs;

      // Upload metadata
      const metadataCID = await uploadToIPFS(
        new Blob([JSON.stringify(metadata)], { type: 'application/json' })
      );

      // Publish to blockchain
      const tx = await publishComic(metadataCID);
      return tx;
    } catch (error) {
      console.error('Error uploading comic:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchMyComics = async () => {
    setLoading(true);
    try {
      // TODO: Fetch comics for current user
      // This would involve querying the contract for comics owned by the user
      const mockComics = []; // Replace with actual data
      setMyComics(mockComics);
    } catch (error) {
      console.error('Error fetching comics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyComics();
  }, [comicCount]);

  return {
    myComics,
    uploadComic,
    loading,
    refresh: fetchMyComics
  };
}