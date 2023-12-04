import NavBarHome from '../../components/NavBarHome'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<div className='flex min-h-screen flex-col bg-stone-200 dark:bg-stone-900'>
				<NavBarHome />
				<div className='md:container max-sm:px-5  mt-8 '>{children}</div>
			</div>
		</div>
	)
}
