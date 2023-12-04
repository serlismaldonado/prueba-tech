'use client'

import InvoicesByPaymentMethod from './InvoicesByPaymentMethod'
import ProductWarning from './ProductWarning'

export default function Dashboard() {
	return (
		<div className='flex gap-2 flex-wrap'>
			<ProductWarning />
			<InvoicesByPaymentMethod />
		</div>
	)
}
