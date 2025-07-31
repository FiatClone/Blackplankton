export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-16 h-16 border-4 border-teal-900 rounded-full"></div>
        
        {/* Spinning arc */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-teal-300 border-t-transparent rounded-full animate-spin"></div>
        
        {/* Optional: Add loading text below */}
        <p className="mt-4 text-center text-teal-300">Loading...</p>
      </div>
    </div>
  )
}