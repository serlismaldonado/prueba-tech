import { getDocument } from '@/lib/google/api.google'
import { NextRequest } from 'next/server'

export const POST = async (req: NextRequest, res: Response) => {
	try {
		const body = await req.json()
		const id = body.id

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
