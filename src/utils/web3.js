export const getContractInstance = (address, abi, provider) => {
  return new ethers.Contract(address, abi, provider);
};

export const parseTransactionError = (error) => {
  if (error.message.includes('user rejected transaction')) {
    return 'Transaction was rejected by user';
  }
  if (error.message.includes('insufficient funds')) {
    return 'Insufficient funds for transaction';
  }
  if (error.message.includes('gas')) {
    return 'Gas estimation failed. Try adjusting slippage.';
  }
  return 'Transaction failed. Please try again.';
};

export const estimateGasCost = async (txFunction) => {
  try {
    const estimatedGas = await txFunction.estimateGas();
    return ethers.utils.formatUnits(estimatedGas, 'gwei');
  } catch (error) {
    console.error('Gas estimation failed:', error);
    return null;
  }
};

export const waitForTransaction = async (txHash, confirmations = 1) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return provider.waitForTransaction(txHash, confirmations);
};