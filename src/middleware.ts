import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 1. Define which routes require Admin privileges
const isAdminRoute = createRouteMatcher([
  "/admin", 
  "/admin/dashboard(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // 2. If the user is trying to access any admin route
  if (isAdminRoute(req)) {
    
    // If not logged in at all, redirect to your custom sign-in page
    if (!userId) {
      const { redirectToSignIn } = await auth();
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // 3. Extract the role from the Session Token (JWT)
    // Ensure you added publicMetadata to your Session Token in Clerk Dashboard!
    const role = (sessionClaims?.publicMetadata as { role?: string })?.role;

    // 4. If they are logged in but NOT an admin, kick them back to the home page
    if (role !== "admin") {
      const homeUrl = new URL("/", req.url);
      return NextResponse.redirect(homeUrl);
    }
  }
  
  // For all other routes, let them pass through
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Standard Clerk matcher: Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};