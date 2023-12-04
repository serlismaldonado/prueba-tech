'use client'
import db from '@/local/db'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

export default function LogOut() {
	const router = useRouter()

	return (
		<div>
			<Button
				variant={'outline'}
				onClick={() => {
					db.logout()
					router.push('/login')
				}}>
				Cerrar sesión
			</Button>
		</div>
	)
}
