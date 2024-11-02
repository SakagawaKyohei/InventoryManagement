import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith('/login');
      const isOnForgotPassword = nextUrl.pathname.startsWith('/forgot-password');
      const isOnResetPassword = nextUrl.pathname.startsWith('/reset-password');
  
      if (isOnForgotPassword || isOnResetPassword) {
        return true; 
      }
  
      if (isLoggedIn) {
        if (isOnLoginPage) {
          return Response.redirect(new URL('/', nextUrl)); 
        }
        return true;
      } else if (nextUrl.pathname.startsWith('/')) {
        return false;
      }
      
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;