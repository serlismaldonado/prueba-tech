'use server'

import { Session } from '@/types'

export const auth = async (session: Session) => {
	try {
		const response = await fetch('/api/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ session }),
		})

		const data = await response.json()

		return data
	} catch (error) {
		console.error(error)

		return null
	}
}
