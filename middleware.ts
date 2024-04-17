import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/api/webhooks/(.*)"],
});

export const config = {
  matcher: [
    "/((?!\\.(?:js|css|json|xml|rss|png|jpg|jpeg|gif|svg|woff|woff2|ico|txt|xml|pdf|zip|gz|map|mp3|mp4|csv|ts|tsx)$|_next).*)",
    "/", 
    "/(api|trpc)(.*)"
  ],
};
