'use client'
import Link from 'next/link'
import db from '../../local/db'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter()
	const pathname = usePathname()
	const [isLoading, setIsLoading] = useState(true)
	const [active, setActive] = useState(pathname)

	const user = db.getSession()

	if (!user) {
		router.push('/login')
	}

	useEffect(() => {
		setIsLoading(false)
	}, [user])

	useEffect(() => {
		setActive(pathname)
	}, [pathname])

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
					<ul className='flex gap-4 mx-10 max-sm:mx-2'>
						<li className={pathname === '/' ? 'font-bold' : ''}>
							<Link href='/'>Inicio</Link>
						</li>
						<li className={active === '/products' ? 'font-bold text-green-500' : ''}>
							<Link href='/products/'>Productos</Link>
						</li>
						<li className={active === '/customers' ? 'font-bold text-green-500' : ''}>
							<Link href='/customers/'>Clientes</Link>
						</li>
						<li className={active === '/invoices' ? 'font-bold text-green-500' : ''}>
							<Link href='/invoices'>Facturas</Link>
						</li>
					</ul>

					<div className='flex gap-4 self-end items-center'>
						<p className='font-bold max-sm:hidden'>
							{' '}
							Bienvenido {user?.user.username}!
						</p>
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
