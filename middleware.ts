import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as auth from '@/lib/google/api.google'

export function middleware(request: NextRequest) {
	try {
		return NextResponse.next()
	} catch (error) {
		return new Response(JSON.stringify(error))
	}
}
