'use client'
import Link from 'next/link'
import db from '../../local/db'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(true)

	const user = db.getSession()

	if (!user) {
		router.push('/login')
	}

	useEffect(() => {
		setIsLoading(false)
	}, [user])

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-screen gap-1'>
				<div
					className='spinner-border animate-pulse duration-1000 inline-block w-3 h-3  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full'
					role='status'></div>
				<div
					className='spinner-border animate-pulse duration-1000 inline-block w-3 h-3  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full'
					role='status'></div>
				<div
					className='spinner-border animate-pulse duration-1000 inline-block w-3 h-3  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full'
					role='status'></div>
			</div>
		)
	}

	return (
		<div>
			<div className='flex min-h-screen flex-col bg-stone-200'>
				<nav className='flex fixed items-center justify-between p-4 bg-stone-800 text-white w-full'>
					<ul className='flex gap-4'>
						<li>
							<Link href='/'>Inicio</Link>
						</li>
						<li>
							<Link href='/products/'>Productos</Link>
						</li>
						<li>
							<Link href='/invoices'>Facturas</Link>
						</li>
					</ul>
					<div className='flex gap-4 self-end'>
						<Button
							variant={'outline'}
							onClick={() => {
								db.logout()
								router.push('/login')
							}}>
							Logout
						</Button>
					</div>
				</nav>
				<div className='md:container max-sm:px-5  mt-8 '>{children}</div>
			</div>
		</div>
	)
}
