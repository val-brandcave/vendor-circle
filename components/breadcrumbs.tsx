import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-lg" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors font-semibold"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-gray-900 dark:text-white font-semibold" : "text-gray-500 dark:text-gray-400 font-semibold"}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-600" />}
          </div>
        );
      })}
    </nav>
  );
}
