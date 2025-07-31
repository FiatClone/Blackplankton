import { createContext, useContext, useState, useEffect } from 'react';
import { useContract, useContractRead } from '@thirdweb-dev/react';
import { useIPFS } from '../services/ipfs/ipfsClient';

const ComicContext = createContext();

export function ComicProvider({ children }) {
  const { contract } = useContract(process.env.REACT_APP_COMIC_NFT_CONTRACT);
  const { getFromIPFS } = useIPFS();
  const [myComics, setMyComics] = useState([]);
  const [featuredComics, setFeaturedComics] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: myComicIds } = useContractRead(contract, 'getComicsByCreator', [address]);
  const { data: featuredComicIds } = useContractRead(contract, 'getFeaturedComics');

  useEffect(() => {
    const loadComics = async () => {
      try {
        // Load metadata for user's comics
        const myComicsData = await Promise.all(
          myComicIds.map(async (id) => {
            const metadataUri = await contract.call('tokenURI', [id]);
            const metadata = await getFromIPFS(metadataUri);
            return { id, ...metadata };
          })
        );
        
        // Load metadata for featured comics
        const featuredComicsData = await Promise.all(
          featuredComicIds.map(async (id) => {
            const metadataUri = await contract.call('tokenURI', [id]);
            const metadata = await getFromIPFS(metadataUri);
            return { id, ...metadata };
          })
        );

        setMyComics(myComicsData);
        setFeaturedComics(featuredComicsData);
      } catch (error) {
        console.error('Error loading comics:', error);
      } finally {
        setLoading(false);
      }
    };

    if (myComicIds && featuredComicIds) {
      loadComics();
    }
  }, [myComicIds, featuredComicIds, contract, getFromIPFS]);

  return (
    <ComicContext.Provider value={{ myComics, featuredComics, loading }}>
      {children}
    </ComicContext.Provider>
  );
}

export function useComics() {
  return useContext(ComicContext);
}