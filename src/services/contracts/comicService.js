import { useContract, useContractWrite, useContractRead } from '@thirdweb-dev/react';

export function useComicActions() {
  const { contract } = useContract(process.env.REACT_APP_COMIC_NFT_CONTRACT);
  const { mutateAsync: mintComic } = useContractWrite(contract, 'mintComic');
  const { data: comicCount } = useContractRead(contract, 'getComicCount');

  const publishComic = async (metadataURI) => {
    try {
      const tx = await mintComic({ args: [metadataURI] });
      return tx;
    } catch (error) {
      console.error('Error publishing comic:', error);
      throw error;
    }
  };

  const getComicDetails = async (comicId) => {
    try {
      const metadataURI = await contract.call('tokenURI', [comicId]);
      return { id: comicId, metadataURI };
    } catch (error) {
      console.error('Error fetching comic details:', error);
      throw error;
    }
  };

  return {
    publishComic,
    getComicDetails,
    comicCount,
  };
}