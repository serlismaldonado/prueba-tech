import { downloadFile } from '@/lib/google/api.google'
export const POST = async (req: Request, res: Response) => {
	try {
		const body = await req.json()

		const data = (await downloadFile(body.id)) as any

		return new Response(JSON.stringify(data))
	} catch (error) {
		return new Response(JSON.stringify(error))
	}
}
