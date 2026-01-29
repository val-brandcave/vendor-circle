/**
 * Realwired Branding Component
 * 
 * Displays "Powered by Realwired" footer for auth pages
 * Provides trust signal and brand association
 */

export function RealwiredBranding() {
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <span>Powered by</span>
      <img 
        src="/logos/Realwired-Logo-Primary.svg" 
        alt="Realwired" 
        className="h-4 dark:hidden" 
      />
      <img 
        src="/logos/Realwired-Logo-White.svg" 
        alt="Realwired" 
        className="h-4 hidden dark:block" 
      />
    </div>
  );
}
