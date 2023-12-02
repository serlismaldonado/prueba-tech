'use client'
import db from '@/local/db'
import { Product } from '@/types'
import { useEffect, useState } from 'react'
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
export default function ProductsTable() {
	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(false)
	const [isCreated, setIsCreated] = useState(false)
	const [isUpdated, setIsUpdated] = useState(false)
	const [isDeleted, setIsDeleted] = useState(false)
	const [isUndo, setIsUndo] = useState(false)
	useEffect(() => {
		setProducts(db.getAllProducts())
		isCreated && toast.success('Producto creado correctamente') && setIsCreated(false)
		isUpdated && toast.success('Producto actualizado correctamente') && setIsUpdated(false)
		isDeleted && toast.error('Producto eliminado correctamente') && setIsDeleted(false)
		isUndo && toast.info('Deshacer operación') && setIsUndo(false)
	}, [isCreated, isUpdated, isDeleted, isUndo])

	return (
		<div className='mt-8 p-4 bg-white rounded-md shadow-md '>
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
						<TableHead> acciones</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map((product) => (
						<TableRow key={product.code}>
							<TableCell>{product.code}</TableCell>
							<TableCell>{product.name}</TableCell>
							<TableCell>{product.stock}</TableCell>
							<TableCell>{product.price}</TableCell>
							<TableCell className='flex gap-2'>
								<Button variant='outline'>
									<Link href={`/products/${product.code}/edit`}>
										<Pencil1Icon
											className='text-blue-500 w-5 h-5'
											strokeWidth={2}
										/>
									</Link>
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
									<TrashIcon className='text-red-500 w-5 h-5' strokeWidth={2} />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
