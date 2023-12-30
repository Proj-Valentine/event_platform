import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

//  wee need to control routes to public and private
// this middleware from CLEARK will help us to do that once we have the middleware set up
// we need to configure it to allow some pages to be public and others private

// export default authMiddleware({
//     publicRoutes: [
//         '/', 
//         'events/:id', 
//         '/api/webhook/clerk', 
//         '/api/webhook/stripe',
//         'api/uploadthing'
//         ],
//     ignoredRoutes:[
//         '/api/webhook/clerk', 
//         '/api/webhook/stripe',
//         'api/uploadthing' 
//     ]
// });
 
// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };
 

 
export default authMiddleware({
  publicRoutes: [
    '/',
    '/events/:id',
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing'
  ],
  ignoredRoutes: [
    '/api/webhook/clerk',
    '/api/webhook/stripe',
    '/api/uploadthing'
  ]
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 