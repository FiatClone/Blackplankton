import { Component } from 'react'
import { useNavigate } from 'react-router-dom'

class ErrorBoundary extends Component {
  state = { hasError: false, error: null }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // You can log errors to an error tracking service here
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
          <div className="bg-gray-800 p-8 rounded-xl border border-red-400/30 max-w-md w-full text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-2 text-red-400">Something went wrong</h2>
            <p className="text-gray-400 mb-6">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <div className="bg-gray-700 p-3 rounded-lg mb-6 text-left text-sm">
              <code className="text-red-300">{this.state.error.toString()}</code>
            </div>
            <div className="flex space-x-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Refresh Page
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      )
    }
    
    return this.props.children
  }
}

export default ErrorBoundary