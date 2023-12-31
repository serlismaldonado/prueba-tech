'use client'

import Dashboard from './components/dashboard/Dashboard'

export default function Page() {
	return (
		<div className='md:container max-sm:px-5 max-sm:pb-20  mt-12 p-4'>
			<div className='flex flex-col gap-4 '>
				<h1 className='text-xl font-bold'>Dashboard</h1>
				<Dashboard />
			</div>
		</div>
	)
}
