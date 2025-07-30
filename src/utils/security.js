export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

export const validateWalletSignature = async (address, signature, message) => {
  try {
    const signerAddr = await ethers.utils.verifyMessage(message, signature);
    return signerAddr.toLowerCase() === address.toLowerCase();
  } catch (error) {
    console.error('Signature validation failed:', error);
    return false;
  }
};

export const checkMaliciousContent = async (file) => {
  // Basic check for file types
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }

  // Additional security checks can be added here
  return true;
};