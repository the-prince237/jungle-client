import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Routes publiques (accessibles sans authentification)
const isPublicRoute = createRouteMatcher([
  '/',
  '/search(.*)',
  '/auth/(.*)',
  '/api/webhooks/(.*)',
  '/support',
])

// Routes protégées nécessitant authentification
const isProtectedRoute = createRouteMatcher([
  '/profile/me(.*)',
  '/new(.*)',
  '/settings(.*)',
  '/(.+)/advanced(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()
  const { pathname } = req.nextUrl

  // Logique de protection personnalisée
  const isPrivateProfileRoute = pathname.startsWith('/profile/') && 
    (pathname.includes('/my-properties') || pathname.includes('/archives'))
  
  const isAdvancedContentRoute = pathname.includes('/advanced')
  
  const needsAuth = isProtectedRoute(req) || isPrivateProfileRoute || isAdvancedContentRoute

  // Rediriger les utilisateurs non authentifiés vers sign-in
  if (needsAuth && !userId) {
    const signInUrl = new URL('/auth/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}