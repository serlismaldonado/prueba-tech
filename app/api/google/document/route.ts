import { createDocument, getDocument } from '@/lib/google/api.google'
import { NextRequest } from 'next/server'
export const POST = async (req: Request, res: Response) => {
	try {
		const body = await req.json()

		const data = await createDocument(body.name, body.content)

		return new Response(JSON.stringify(data))
	} catch (error) {
		return new Response(JSON.stringify(error))
	}
}

export const GET = async (req: NextRequest, res: Response) => {
	try {
		const body = req?.nextUrl.searchParams
		const id = body.get('id')

		if (!id) {
			return new Response(JSON.stringify({}))
		}

		const data = await getDocument(id)

		if (!data) {
			return new Response(JSON.stringify({}))
		}

		return new Response(JSON.stringify(data))
	} catch (error) {
		return new Response(JSON.stringify(error))
	}
}
