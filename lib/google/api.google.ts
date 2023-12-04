import { google } from 'googleapis'

// authenticates the service account to be used in this context
const auth = new google.auth.GoogleAuth({
	// your credentials to authenticate
	keyFile: process.cwd() + '/lib/google/credentials.json',
	// the actions you are permissed to perform using this API, in this case
	// all CRUD operations are permissed, check out
	// [ https://developers.google.com/drive/api/guides/api-specific-auth ]
	// for more advice on scopes
	scopes: ['https://www.googleapis.com/auth/drive'],
})

export const getData = async () => {
	// allows you to use drive API methods e.g. listing files, creating files.
	const drive = google.drive({ version: 'v3', auth })
	try {
		const res = await drive.files.list()
		const files = res.data.files

		if (!files) {
			return null
		}

		return files
	} catch (error: any) {
		console.error('Error fetching files:', error.message)
		return null
	}
}

export const createDocument = async (name: string, content: string) => {
	// allows you to use drive API methods e.g. listing files, creating files.
	const docs = google.docs({ version: 'v1', auth })
	try {
		const res = await docs.documents.create({
			requestBody: {
				title: name,

				body: {
					content: [
						{
							paragraph: {
								elements: [
									{
										textRun: {
											content: content,
										},
									},
								],
							},
						},
					],
				},
			},
		})

		const drive = google.drive({ version: 'v3', auth })

		if (!res.data.documentId) {
			return null
		}

		const res2 = await drive.files.get({
			fileId: res.data.documentId,
		})

		return res2.data
	} catch (error: any) {
		console.error('Error fetching files:', error.message)
		return null
	}
}

export const getDocument = async (id: string) => {
	// allows you to use drive API methods e.g. listing files, creating files.
	const drive = google.docs({ version: 'v1', auth })
	try {
		const res = await drive.documents.get({
			documentId: id,
		})

		return res.data
	} catch (error: any) {
		console.error('Error fetching files:', error.message)
		return null
	}
}

export const downloadFile = async (id: string) => {
	// allows you to use drive API methods e.g. listing files, creating files.
	const drive = google.drive({ version: 'v3', auth })
	try {
		const res = await drive.files.export({
			fileId: id,
			mimeType: 'application/pdf',
			alt: 'media',
		})

		return res.data
	} catch (error: any) {
		console.error('Error fetching files:', error.message)
		return null
	}
}

export { auth }
