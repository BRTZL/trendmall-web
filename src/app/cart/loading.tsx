export default function CartLoading() {
  return (
    <div className="flex h-96 w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="size-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  )
}
