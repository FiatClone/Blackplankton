import { ethers } from 'ethers';

export const encodeFunctionData = (abi, functionName, params) => {
  const iface = new ethers.utils.Interface(abi);
  return iface.encodeFunctionData(functionName, params);
};

export const decodeFunctionResult = (abi, functionName, data) => {
  const iface = new ethers.utils.Interface(abi);
  return iface.decodeFunctionResult(functionName, data);
};

export const getFunctionSignature = (abi, functionName) => {
  const iface = new ethers.utils.Interface(abi);
  return iface.getSighash(functionName);
};

export const simulateTransaction = async (provider, tx) => {
  try {
    const result = await provider.call(tx);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: parseTransactionError(error) };
  }
};