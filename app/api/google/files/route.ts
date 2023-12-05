import { auth, createDocument, getData } from '@/lib/google/api.google'
import { NextRequest, NextResponse } from 'next/server'
export const GET = async (req: NextRequest, res: NextResponse) => {
	try {
		const data = await getData()
		console.log(data)
		return new Response(JSON.stringify(data))
	} catch (error) {
		return new Response(JSON.stringify(error))
	}
}
