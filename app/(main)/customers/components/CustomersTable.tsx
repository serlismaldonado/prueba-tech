'use client'
import db from '@/local/db'
import { Client } from '@/types'
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
import CreateCustomerForm from './CreateCustomerForm'
import UpdateCustomerform from './UpdateCustomerForm'
// import CreatecustomerForm from './CreatecustomerForm'

interface customerContextProps {
	isCreated: boolean
	setIsCreated: React.Dispatch<React.SetStateAction<boolean>>
	isUpdated: boolean
	setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>
	itemToUpdate: Client | null
	setItemToUpdate: React.Dispatch<React.SetStateAction<Client | null>>
}
export const customersContext = createContext({} as customerContextProps)
export default function CustomersTable() {
	const [customers, setCustomers] = useState<Client[]>([])
	const [loading, setLoading] = useState(false)
	const [itemToUpdate, setItemToUpdate] = useState<Client | null>(null)
	const [isCreated, setIsCreated] = useState(false)
	const [isUpdated, setIsUpdated] = useState(false)
	const [isDeleted, setIsDeleted] = useState(false)
	const [isUndo, setIsUndo] = useState(false)

	useEffect(() => {
		setCustomers(db.getAllCustomers())
		isCreated && toast.success('Cliente creado correctamente') && setIsCreated(false)
		isUpdated && toast.success('Cliente actualizado correctamente') && setIsUpdated(false)
		isDeleted && toast.error('Cliente eliminado correctamente') && setIsDeleted(false)
		isUndo && toast.info('Deshacer operación') && setIsUndo(false)
	}, [isCreated, isUpdated, isDeleted, isUndo])

	return (
		<customersContext.Provider
			value={{
				isCreated,
				setIsCreated,
				isUpdated,
				setIsUpdated,
				itemToUpdate,
				setItemToUpdate,
			}}>
			<div className='mt-8 p-4 bg-white rounded-md shadow-md '>
				<div className='flex justify-between'>
					<div>
						<h1 className='text-xl font-bold'>Clientes</h1>
						<p className='text-sm'> Tabla de Clientes </p>
					</div>
					<CreateCustomerForm />
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Codigo</TableHead>
							<TableHead>Nombre</TableHead>
							<TableHead>RTN</TableHead>
							<TableHead> Domicilio</TableHead>
							<TableHead> acciones</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{customers.map((customer) => (
							<TableRow key={Math.random().toString(36).slice(2)}>
								<TableCell>{customer.code}</TableCell>
								<TableCell>{customer.name}</TableCell>
								<TableCell>{customer.rtn}</TableCell>
								<TableCell>{customer.address}</TableCell>
								<TableCell className='flex gap-2'>
									<Button
										variant='outline'
										onClick={() => setItemToUpdate(customer)}>
										<Pencil1Icon
											className='text-blue-500 w-5 h-5'
											strokeWidth={2}
										/>
									</Button>

									<Button
										variant='outline'
										onClick={() => {
											db.deleteClient(customer)
											setIsDeleted(true)
											toast('customer deleted', {
												action: {
													label: 'Undo',
													onClick: () => {
														db.createClient(customer)
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
			<UpdateCustomerform />
		</customersContext.Provider>
	)
}
