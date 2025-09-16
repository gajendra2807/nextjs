import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-black/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/10 text-center">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">Page Not Found</h2>
        <p className="text-gray-300 mb-6">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link href="/" className="inline-block bg-gradient-to-br from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105">
          Go back home
        </Link>
      </div>
    </div>
  );
}
