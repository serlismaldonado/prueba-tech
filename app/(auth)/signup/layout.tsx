export default function Layout({ children }: { children: React.ReactNode }) {
	return <div className='flex min-h-screen w-full h-screen flex-col bg-stone-200'>{children}</div>
}
