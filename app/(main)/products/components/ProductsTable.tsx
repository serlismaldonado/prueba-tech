'use client'
import db from '@/local/db'
import { Product } from '@/types'
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
import { Pencil1Icon, TrashIcon, UpdateIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'
import CreateProductForm from './CreateProductForm'
import UpdateProductForm from './UpdateProductForm'

interface ProductContextProps {
	isCreated: boolean
	setIsCreated: React.Dispatch<React.SetStateAction<boolean>>
	isUpdated: boolean
	setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>
	itemToUpdate: Product | null
	setItemToUpdate: React.Dispatch<React.SetStateAction<Product | null>>
}
export const ProductsContext = createContext({} as ProductContextProps)
export default function ProductsTable() {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(false)
	const [isCreated, setIsCreated] = useState(false)
	const [isUpdated, setIsUpdated] = useState(false)
	const [isDeleted, setIsDeleted] = useState(false)
	const [itemToUpdate, setItemToUpdate] = useState<Product | null>(null)
	const [isUndo, setIsUndo] = useState(false)
	useEffect(() => {
		setProducts(db.getAllProducts())
		isCreated && toast.success('Producto creado correctamente') && setIsCreated(false)
		isUpdated && toast.success('Producto actualizado correctamente') && setIsUpdated(false)
		isDeleted && toast.error('Producto eliminado correctamente') && setIsDeleted(false)
		isUndo && toast.info('Deshacer operación') && setIsUndo(false)
	}, [isCreated, isUpdated, isDeleted, isUndo])

	return (
		<ProductsContext.Provider
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
						<h1 className='text-xl font-bold'>Productos</h1>
						<p className='text-sm'> Tabla de Productos </p>
					</div>
					<CreateProductForm />
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Codigo</TableHead>
							<TableHead>Nombre</TableHead>
							<TableHead>Existencia</TableHead>
							<TableHead> Precio</TableHead>
							<TableHead className='flex gap-2 items-end justify-end'> </TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((product) => (
							<TableRow key={Math.random().toString(36).slice(2)}>
								<TableCell>{product.code}</TableCell>
								<TableCell>{product.name}</TableCell>
								<TableCell>{product.stock}</TableCell>
								<TableCell>{product.price}</TableCell>
								<TableCell className='flex gap-2 items-end justify-end'>
									<Button
										variant='outline'
										onClick={() => setItemToUpdate(product)}>
										<Pencil1Icon
											className='text-blue-500 w-5 h-5'
											strokeWidth={2}
										/>
									</Button>

									<Button
										variant='outline'
										onClick={() => {
											db.deleteProduct(product)
											setIsDeleted(true)
											toast('Product deleted', {
												action: {
													label: 'Undo',
													onClick: () => {
														db.createProduct(product)
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

				<UpdateProductForm />
			</div>
		</ProductsContext.Provider>
	)
}
