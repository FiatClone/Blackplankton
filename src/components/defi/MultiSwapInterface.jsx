import { useState } from 'react';
import { useWeb3 } from '../../../contexts/Web3Context';
import TokenSelectModal from '../Swap/TokenSelectModal';
import TokenAmountInput from '../ui/TokenAmountInput';

export default function MultiSwapInterface() {
  const { tokenBalances } = useWeb3();
  const [steps, setSteps] = useState([
    { from: 'ETH', to: 'PLK', amount: '' },
    { from: 'PLK', to: 'USDC', amount: '' }
  ]);
  const [slippage, setSlippage] = useState(0.5);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddStep = () => {
    if (steps.length >= 5) return;
    setSteps([...steps, { from: '', to: '', amount: '' }]);
  };

  const handleRemoveStep = (index) => {
    if (steps.length <= 1) return;
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  const handleStepChange = (index, field, value) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  const executeMultiSwap = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement multi-swap logic
      console.log('Executing multi-swap:', steps);
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Multi-swap executed successfully!');
    } catch (error) {
      console.error('Multi-swap failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Multi-Token Swap</h3>
      
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-gray-400">Step {index + 1}</h4>
              {steps.length > 1 && (
                <button
                  onClick={() => handleRemoveStep(index)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-gray-600 p-3 rounded-lg">
                <label className="block text-gray-400 mb-1 text-sm">From</label>
                <TokenSelectModal 
                  selectedToken={step.from} 
                  onSelect={(token) => handleStepChange(index, 'from', token)} 
                  triggerClassName="w-full"
                />
              </div>
              
              <div className="bg-gray-600 p-3 rounded-lg">
                <label className="block text-gray-400 mb-1 text-sm">To</label>
                <TokenSelectModal 
                  selectedToken={step.to} 
                  onSelect={(token) => handleStepChange(index, 'to', token)} 
                  triggerClassName="w-full"
                />
              </div>
              
              <div>
                <TokenAmountInput
                  value={step.amount}
                  onChange={(value) => handleStepChange(index, 'amount', value)}
                  tokenBalance={tokenBalances[step.from] || 0}
                  tokenSymbol={step.from}
                  onMax={() => handleStepChange(index, 'amount', tokenBalances[step.from] || 0)}
                />
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex space-x-3">
          <button
            onClick={handleAddStep}
            disabled={steps.length >= 5}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            + Add Step
          </button>
          
          <div className="flex-1">
            <SlippageSettings slippage={slippage} setSlippage={setSlippage} />
          </div>
        </div>
        
        <button
          onClick={executeMultiSwap}
          disabled={isLoading || steps.some(step => !step.from || !step.to || !step.amount)}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 px-4 rounded-lg text-lg font-semibold disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Execute Multi-Swap'}
        </button>
      </div>
    </div>
  );
}