'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-navy">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Something went wrong!
        </h2>
        <button
          onClick={() => reset()}
          className="bg-light-green text-dark-navy px-6 py-2 rounded-lg font-semibold hover:bg-light-green/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
