import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const { pathname } = request.nextUrl;
  
  // Detect mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  // Redirect vendor routes to mobile routes for mobile devices
  if (isMobile && pathname.startsWith('/vendor') && !pathname.startsWith('/vendor/api')) {
    const mobilePath = pathname.replace('/vendor', '/m');
    const url = new URL(mobilePath, request.url);
    // Preserve query params
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url);
  }
  
  // Redirect mobile routes to vendor routes for desktop
  if (!isMobile && pathname.startsWith('/m')) {
    const desktopPath = pathname.replace('/m', '/vendor');
    const url = new URL(desktopPath, request.url);
    // Preserve query params
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/vendor/:path*', '/m/:path*'],
};
