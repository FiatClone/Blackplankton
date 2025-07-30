import { useRouteError, Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
      <p className="text-xl mb-4">Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-400 mb-8">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg"
      >
        Go Back Home
      </Link>
    </div>
  );
}