import { ratelimit } from '@/lib/upstash';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const ip = req.ip ?? '127.0.0.1';

  const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip);

  const now = Date.now();
  const retryAter = Math.floor((reset - now) / 1000);

  return success
    ? NextResponse.next()
    : new NextResponse('Too many requests', {
        status: 429,
        headers: {
          'Retry-After': `${retryAter}`,
        },
      });
}

export const config = {
  matcher: '/api/:path*',
};
