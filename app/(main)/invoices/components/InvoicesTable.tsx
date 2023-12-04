'use client'
import db from '@/local/db'
import { Client, Invoice } from '@/types'
import { createContext, useEffect, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'
import CreateInvoiceForm from './CreateInvoiceForm'

interface InvoicesContextProps {
	isCreated: boolean
	setIsCreated: React.Dispatch<React.SetStateAction<boolean>>
	isUpdated: boolean
	setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>
	itemToUpdate: Invoice | null
	setItemToUpdate: React.Dispatch<React.SetStateAction<Invoice | null>>
}

export const InvoicesContext = createContext({} as InvoicesContextProps)
export default function InvoicesTable() {
	const [invoices, setInvoices] = useState<Invoice[]>([])
	const [loading, setLoading] = useState(false)
	const [itemToUpdate, setItemToUpdate] = useState<Invoice | null>(null)
	const [isCreated, setIsCreated] = useState(false)
	const [isUpdated, setIsUpdated] = useState(false)
	const [isDeleted, setIsDeleted] = useState(false)
	const [isUndo, setIsUndo] = useState(false)

	useEffect(() => {
		setInvoices(db.getAllInvoices())
		isCreated && toast.success('Factura creado correctamente') && setIsCreated(false)
		isUpdated && toast.success('Factura actualizado correctamente') && setIsUpdated(false)
		isDeleted && toast.error('Factura eliminado correctamente') && setIsDeleted(false)
		isUndo && toast.info('Deshacer operación') && setIsUndo(false)
	}, [isCreated, isUpdated, isDeleted, isUndo])

	return (
		<InvoicesContext.Provider
			value={{
				isCreated,
				setIsCreated,
				isUpdated,
				setIsUpdated,
				itemToUpdate,
				setItemToUpdate,
			}}>
			<div className='mt-8 p-4 bg-white rounded-md shadow-md dark:bg-stone-800'>
				<div className='flex justify-between'>
					<div>
						<h1 className='text-xl font-bold'>Facturas</h1>
						<p className='text-sm'> Tabla de Facturas </p>
					</div>
					<CreateInvoiceForm />
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>#</TableHead>
							<TableHead>Código</TableHead>
							<TableHead>Fecha</TableHead>
							<TableHead>Cliente</TableHead>
							<TableHead>Forma de pago</TableHead>
							<TableHead>Subtotal</TableHead>
							<TableHead>ISV</TableHead>
							<TableHead>Total</TableHead>
							<TableHead className='flex gap-2 items-end justify-end'> </TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{invoices.map((invoice, index) => (
							<TableRow key={Math.random().toString(36).slice(2)}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{invoice.code}</TableCell>
								<TableCell>
									{typeof invoice.createdAt === 'string' &&
										new Date(invoice.createdAt).toLocaleString('es-ES', {
											day: 'numeric',
											month: 'numeric',
											year: 'numeric',
										})}
								</TableCell>
								<TableCell>
									{
										db.clients.find(
											(client) => client.code === invoice.clientId,
										)?.name
									}
								</TableCell>
								<TableCell>{invoice.paymentMethod}</TableCell>
								<TableCell>{invoice.subtotal}</TableCell>
								<TableCell>{invoice.isv}</TableCell>
								<TableCell>{invoice.total}</TableCell>
								<TableCell className='flex gap-2 items-end justify-end'>
									<Button
										variant='outline'
										onClick={() => {
											db.deleteInvoice(invoice)
											setIsDeleted(true)
											toast('invoice deleted', {
												action: {
													label: 'Undo',
													onClick: () => {
														db.createInvoice(invoice)
														setIsUndo(true)
													},
												},
											})
										}}>
										<TrashIcon
											className='text-red-500 w-5 h-5'
											strokeWidth={2}
										/>
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			{/* <Updateinvoiceform /> */}
		</InvoicesContext.Provider>
	)
}
