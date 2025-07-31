import { Web3Storage } from 'web3.storage';

function getAccessToken() {
  return process.env.REACT_APP_WEB3STORAGE_TOKEN;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export function useIPFS() {
  const uploadToIPFS = async (file) => {
    if (!file) return null;
    
    const client = makeStorageClient();
    const cid = await client.put([file], {
      wrapWithDirectory: false,
    });
    
    return cid;
  };

  const uploadMultipleToIPFS = async (files) => {
    if (!files || files.length === 0) return [];
    
    const client = makeStorageClient();
    const cid = await client.put(files);
    
    return files.map((_, index) => {
      return `${cid}/${files[index].name}`;
    });
  };

  return {
    uploadToIPFS,
    uploadMultipleToIPFS,
  };
}
