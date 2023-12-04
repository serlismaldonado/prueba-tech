import InvoicesByPaymentMethod from './components/InvoicesByPaymentMethod'
import InvoicesTable from './components/InvoicesTable'

export default function Page() {
	return (
		<div className='mt-8 gap-4 p-4'>
			<InvoicesByPaymentMethod />
			<InvoicesTable />
		</div>
	)
}
