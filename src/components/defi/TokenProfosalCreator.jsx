import { useState } from 'react';
import { useWeb3 } from '../../../contexts/Web3Context';
import ConfirmationModal from '../../modals/ConfirmationModal';

export default function TokenProposalCreator({ isAdmin }) {
  const { createProposal } = useWeb3();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [actions, setActions] = useState([{ target: '', value: '', signature: '', data: '' }]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleAddAction = () => {
    setActions([...actions, { target: '', value: '', signature: '', data: '' }]);
  };

  const handleRemoveAction = (index) => {
    if (actions.length <= 1) return;
    const newActions = [...actions];
    newActions.splice(index, 1);
    setActions(newActions);
  };

  const handleActionChange = (index, field, value) => {
    const newActions = [...actions];
    newActions[index][field] = value;
    setActions(newActions);
  };

  const handleCreateProposal = async () => {
    if (!title || !description) return;
    
    setIsCreating(true);
    try {
      await createProposal(title, description, actions);
      alert('Proposal created successfully!');
      setTitle('');
      setDescription('');
      setActions([{ target: '', value: '', signature: '', data: '' }]);
    } catch (error) {
      console.error('Proposal creation failed:', error);
    } finally {
      setIsCreating(false);
      setShowConfirm(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="bg-gray-800 p-6 rounded-xl text-center">
        <h3 className="text-xl font-bold mb-4">Create Proposal</h3>
        <p className="text-gray-400">
          You must be an administrator to create proposals
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4">Create New Proposal</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-700 p-3 rounded-lg"
            maxLength={100}
          />
        </div>
        
        <div>
          <label className="block text-gray-400 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-700 p-3 rounded-lg"
            rows={4}
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-gray-400">Actions</label>
            <button
              onClick={handleAddAction}
              className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm"
            >
              + Add Action
            </button>
          </div>
          
          <div className="space-y-3">
            {actions.map((action, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Action #{index + 1}</span>
                  {actions.length > 1 && (
                    <button
                      onClick={() => handleRemoveAction(index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">Target Address</label>
                    <input
                      type="text"
                      value={action.target}
                      onChange={(e) => handleActionChange(index, 'target', e.target.value)}
                      placeholder="0x..."
                      className="w-full bg-gray-600 p-2 rounded text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">Value (ETH)</label>
                    <input
                      type="text"
                      value={action.value}
                      onChange={(e) => handleActionChange(index, 'value', e.target.value)}
                      placeholder="0"
                      className="w-full bg-gray-600 p-2 rounded text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">Function Signature</label>
                    <input
                      type="text"
                      value={action.signature}
                      onChange={(e) => handleActionChange(index, 'signature', e.target.value)}
                      placeholder="transfer(address,uint256)"
                      className="w-full bg-gray-600 p-2 rounded text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-xs mb-1">Call Data (hex)</label>
                    <input
                      type="text"
                      value={action.data}
                      onChange={(e) => handleActionChange(index, 'data', e.target.value)}
                      placeholder="0x..."
                      className="w-full bg-gray-600 p-2 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => setShowConfirm(true)}
          disabled={!title || !description || isCreating}
          className={`w-full py-3 px-4 rounded-lg text-lg font-semibold ${
            !title || !description ? 'bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isCreating ? 'Creating...' : 'Create Proposal'}
        </button>
      </div>
      
      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleCreateProposal}
        title="Confirm Proposal Creation"
        message="Are you sure you want to create this proposal? This action will require token holders to vote."
        confirmText="Create Proposal"
      />
    </div>
  );
}