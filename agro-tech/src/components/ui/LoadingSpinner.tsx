export function LoadingSpinner({ label = 'Загрузка...' }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-agro-200 border-t-agro-600 dark:border-agro-700 dark:border-t-agro-400" />
      <p className="text-sm text-agro-600 dark:text-agro-400">{label}</p>
    </div>
  )
}
