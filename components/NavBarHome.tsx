'use client'
import Link from 'next/link'
import LogOut from './auth/LogOut'
import db from '@/local/db'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ModeToggle } from './theme/ToggleMode'
import {
	UserGroupIcon,
	ShoppingCartIcon,
	DocumentChartBarIcon,
	HomeIcon,
	ArrowRightOnRectangleIcon,
	Bars3BottomRightIcon,
} from '@heroicons/react/24/solid'
import { Button } from './ui/button'

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
			<Button
				className='fixed top-4 right-4 rounded-full p-2 bg-stone-800 hover:bg-stone-700 hover:text-white dark:hover:bg-stone-200 dark:hover:text-stone-800 dark:text-stone-700 dark:bg-stone-200 text-white'
				variant={'outline'}
				onClick={() => {
					db.logout()
					router.push('/login')
				}}>
				<ArrowRightOnRectangleIcon className='w-6 h-6' />
			</Button>

			<nav className='flex fixed items-center justify-between p-4 bg-stone-800 text-white w-full max-sm:hidden'>
				<ul className='flex gap-4 mx-10 max-sm:mx-2'>
					<li className={pathname === '/' ? 'font-bold' : ''}>
						<Link href='/' className='flex items-center gap-2'>
							<HomeIcon className='w-5 h-5' />
							<span>Home</span>
						</Link>
					</li>
					<li className={active === '/products' ? 'font-bold text-green-500' : ''}>
						<Link href='/products/' className='flex items-center gap-2'>
							<ShoppingCartIcon className='w-5 h-5' />
							<span>Productos</span>
						</Link>
					</li>
					<li className={active === '/customers' ? 'font-bold text-green-500' : ''}>
						<Link href='/customers/' className='flex items-center gap-2'>
							<UserGroupIcon className='w-5 h-5' />
							<span>Clientes</span>
						</Link>
					</li>
					<li className={active === '/invoices' ? 'font-bold text-green-500' : ''}>
						<Link href='/invoices' className='flex items-center gap-2'>
							<DocumentChartBarIcon className='w-5 h-5' />
							<span>Facturas</span>
						</Link>
					</li>
					<li className={active === '/ai' ? 'font-bold text-green-500' : ''}>
						<Link href='/ai' className='flex items-center gap-2'>
							<Bars3BottomRightIcon className='w-5 h-5' />
							<span>AI Chat</span>
						</Link>
					</li>
				</ul>

				<div className='flex gap-4 self-end items-center'>
					<p className='font-bold max-sm:hidden'>
						{' '}
						Bienvenido {session?.user?.username}!
					</p>
					<LogOut />
					<ModeToggle />
				</div>
			</nav>

			<nav className='hidden fixed items-center justify-center p-4 bottom-0 bg-stone-800 text-white w-full max-sm:flex'>
				<ul className='flex items-center justify-around gap-4 mx-10 max-sm:mx-2 w-full'>
					<li className={pathname === '/' ? 'font-bold' : ''}>
						<Link href='/'>
							{' '}
							<HomeIcon className='h-6 w-6' />
						</Link>
					</li>
					<li className={active === '/products' ? 'font-bold text-green-500' : ''}>
						<Link href='/products/'>
							{' '}
							<ShoppingCartIcon className='h-6 w-6' />
						</Link>
					</li>
					<li className={active === '/customers' ? 'font-bold text-green-500' : ''}>
						<Link href='/customers/'>
							{' '}
							<UserGroupIcon className='h-6 w-6' />
						</Link>
					</li>
					<li className={active === '/invoices' ? 'font-bold text-green-500' : ''}>
						<Link href='/invoices'>
							{' '}
							<DocumentChartBarIcon className='h-6 w-6' />
						</Link>
					</li>
					<li className={active === '/ai' ? 'font-bold text-green-500' : ''}>
						<Link href='/ai'>
							{' '}
							<Bars3BottomRightIcon className='h-6 w-6' />
						</Link>
					</li>
				</ul>

				<div className='flex gap-4 self-end items-center max-sm:hidden'>
					<LogOut />
					<ModeToggle />
				</div>
			</nav>
		</div>
	)
}
