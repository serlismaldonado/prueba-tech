'use client'
import Link from 'next/link'
import LogOut from './auth/LogOut'
import db from '@/local/db'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NavBarHome() {
	const [isLoading, setIsLoading] = useState(true)
	const session = db.getSession()
	const pathname = usePathname()
	const [active, setActive] = useState(pathname)
	const router = useRouter()

	useEffect(() => {
		if (!session) {
			router.push('/login')
		} else {
			setIsLoading(false)
		}
	}, [session, router])

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
		<div className=''>
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
						Bienvenido {session?.user?.username}!
					</p>
					<LogOut />
				</div>
			</nav>
		</div>
	)
}
