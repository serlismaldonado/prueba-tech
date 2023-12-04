import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json()
		const user = body.user
		console.log(user)
		return new NextResponse(JSON.stringify({ user }))
	} catch (error) {
		return new NextResponse(JSON.stringify({ error }))
	}
}
