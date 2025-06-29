import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Your middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
};