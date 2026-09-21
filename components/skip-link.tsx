// Visually hidden until focused — lets keyboard users jump past the nav and
// hero straight to the main content instead of tabbing through everything.
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
    >
      Skip to content
    </a>
  )
}
