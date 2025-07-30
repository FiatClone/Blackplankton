export const validateAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const validateAmount = (amount, balance) => {
  if (isNaN(amount) || amount <= 0) return false;
  if (balance && parseFloat(amount) > parseFloat(balance)) return false;
  return true;
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateComicMetadata = (metadata) => {
  if (!metadata.title || metadata.title.length < 3) return false;
  if (!metadata.description || metadata.description.length < 10) return false;
  if (!metadata.coverImage) return false;
  if (!metadata.pages || metadata.pages.length === 0) return false;
  return true;
};