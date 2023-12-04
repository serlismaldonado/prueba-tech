'use client'
import db from '@/local/db'
import { Chart, registerables } from 'chart.js'
import { Invoice } from '@/types'
import { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
export default function InvoicesByPaymentMethod() {
	const [invoices, setInvoices] = useState<Invoice[]>([])
	useEffect(() => {
		setInvoices(db.getAllInvoices())
	}, [])

	Chart.register(...registerables)
	return (
		<div className='flex flex-col  bg-white dark:bg-stone-800 rounded-md p-4 shadow-md '>
			<h1 className='text-lg font-bold'>Facturas por Metodo de Pago</h1>
			<div className='flex justify-center items-center justify-self-center self-center '>
				<Doughnut
					className='bg-white dark:bg-stone-800 dark:text-white w-[200px] h-[200px]'
					data={{
						labels: ['Efectivo', 'Credito'],
						datasets: [
							{
								label: 'Facturas por Metodo de Pago',
								data: [
									invoices.filter((invoice) => invoice.paymentMethod === 'Cash')
										.length,
									invoices.filter((invoice) => invoice.paymentMethod === 'Credit')
										.length,
									0,
									0,
								],
								backgroundColor: [
									'rgba(20, 206, 86, 0.2)',
									'rgba(54, 162, 235, 0.2)',
									'rgba(255, 206, 86, 0.2)',
								],
								borderColor: [
									'rgba(25, 206, 86, 1)',
									'rgba(54, 162, 235, 1)',
									'rgba(255, 206, 86, 1)',
								],
								borderWidth: 1,
							},
						],
					}}
					height={200}
					width={200}
				/>
			</div>
		</div>
	)
}
