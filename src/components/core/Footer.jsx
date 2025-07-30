import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-lg font-bold mb-4">Plankton DeFi</h4>
          <p className="text-gray-400">
            The all-in-one platform for decentralized finance and NFT comics.
          </p>
        </div>
        
        <div>
          <h5 className="font-bold mb-4">DeFi</h5>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/swap" className="hover:text-blue-400">Swap</Link></li>
            <li><Link to="/stake" className="hover:text-blue-400">Staking</Link></li>
            <li><Link to="/liquidity" className="hover:text-blue-400">Liquidity</Link></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-bold mb-4">Comics</h5>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/comic" className="hover:text-blue-400">Browse</Link></li>
            <li><Link to="/comic-upload" className="hover:text-blue-400">Upload</Link></li>
            <li><Link to="/comic-myworks" className="hover:text-blue-400">My Works</Link></li>
          </ul>
        </div>
        
        <div>
          <h5 className="font-bold mb-4">Resources</h5>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/whitepaper.pdf" className="hover:text-blue-400">Whitepaper</a></li>
            <li><a href="#" className="hover:text-blue-400">Docs</a></li>
            <li><a href="#" className="hover:text-blue-400">GitHub</a></li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Plankton DeFi. All rights reserved.</p>
      </div>
    </footer>
  );
}