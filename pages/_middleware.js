import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const secret = process.env.JWT_SECRET;
  const { pathname } = req.nextUrl;

  const token = await getToken({ req, secret }).then((token) => {
    if (token || pathname.includes('/api/auth')) {
      return NextResponse.next();
    }
  });

  console.log('secret is ' + secret);
  console.log('token is ' + token);

  // redirect to log in page if there is no token
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login');
  }
}
