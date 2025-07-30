import { useState, useEffect } from 'react';
import { useContract, useContractEvents, useContractWrite } from '@thirdweb-dev/react';

export function useTokenStreams() {
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { contract } = useContract(process.env.REACT_APP_STREAMING_CONTRACT);
  const { mutateAsync: createStream } = useContractWrite(contract, 'createStream');
  
  // Listen for stream creation events
  const { data: streamEvents } = useContractEvents(
    contract,
    "StreamCreated",
    { subscribe: true }
  );

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        // TODO: Replace with actual stream fetching logic
        const mockStreams = [
          {
            id: 1,
            name: "Team Vesting",
            amount: 10000,
            tokenSymbol: "PLK",
            startTime: "2023-06-01T00:00:00Z",
            endTime: "2024-06-01T00:00:00Z"
          }
        ];
        setStreams(mockStreams);
      } catch (error) {
        console.error("Error fetching streams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreams();
  }, [streamEvents]); // Refetch when new streams are created

  const createNewStream = async (streamData) => {
    try {
      const tx = await createStream({
        args: [
          streamData.recipient,
          ethers.utils.parseUnits(streamData.amount.toString(), 18),
          streamData.duration * 86400 // Convert days to seconds
        ]
      });
      return tx;
    } catch (error) {
      console.error("Stream creation failed:", error);
      throw error;
    }
  };

  return {
    streams,
    loading,
    createNewStream
  };
}