'use client'
import CustomersTable from './components/CustomersTable'

export default function Page() {
	return (
		<div>
			<div className=' flex justify-between'>
				<h1 className='text-3xl font-bold'>Clientes</h1>
			</div>
			<CustomersTable />
		</div>
	)
}
