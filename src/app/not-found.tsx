import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-navy">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Not Found</h2>
        <p className="text-text-gray mb-6">Could not find requested resource</p>
        <Link
          href="/"
          className="bg-light-green text-dark-navy px-6 py-2 rounded-lg font-semibold hover:bg-light-green/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
