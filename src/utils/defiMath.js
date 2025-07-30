export function calculateImpermanentLoss(priceChange, initialRatio = 1) {
  const sqrt = Math.sqrt(priceChange);
  const numerator = 2 * sqrt;
  const denominator = 1 + priceChange;
  const value = ((numerator / denominator) - 1) * 100;
  return value * initialRatio;
}

export function calculateAPY(dailyRate, compoundFrequency = 365) {
  return (Math.pow(1 + dailyRate, compoundFrequency) - 1) * 100;
}

export function calculateLiquidityValue(
  reservesA,
  reservesB,
  totalSupply,
  lpTokens
) {
  const share = lpTokens / totalSupply;
  return {
    tokenA: reservesA * share,
    tokenB: reservesB * share
  };
}

export function estimateSwapOutput(
  inputAmount,
  inputReserve,
  outputReserve,
  fee = 0.003
) {
  const inputAfterFee = inputAmount * (1 - fee);
  return (outputReserve * inputAfterFee) / (inputReserve + inputAfterFee);
}