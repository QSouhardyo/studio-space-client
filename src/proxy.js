import { NextResponse } from 'next/server'
import { auth } from './lib/auth';
import { headers } from 'next/headers';


// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    console.log('Proxying request:', request.url);

    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;

    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: ['/dashboard/add-studio', '/dashboard/my-listings', '/studios/edit/:path*', '/dashboard/my-bookings']
}