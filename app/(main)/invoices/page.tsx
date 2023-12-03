import InvoicesTable from './components/InvoicesTable'

export default function Page() {
	return (
		<div>
			<div className=' flex justify-between'>
				<h1 className='text-3xl font-bold'>Facturas</h1>
			</div>
			<InvoicesTable />
		</div>
	)
}
