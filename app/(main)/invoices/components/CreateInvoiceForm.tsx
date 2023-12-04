'use client'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

import { useContext, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Client, Invoice, Product } from '@/types'
import { Button } from '@/components/ui/button'
import db from '@/local/db'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { InvoicesContext } from './InvoicesTable'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { DialogClose } from '@radix-ui/react-dialog'

import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { TrashIcon } from '@radix-ui/react-icons'

export const InvoiceSchema: z.ZodType<Omit<Invoice, 'code'>> = z.object({
	createdAt: z.string(),
	clientId: z.string().min(1, { message: 'Client is required' }),
	products: z
		.object({
			code: z.string().min(1, { message: 'Code is required' }),
			name: z.string().min(1, { message: 'Name is required' }),
			stock: z.string().transform((value) => parseInt(value, 10)),
			price: z.string().transform((value) => parseFloat(value)),
		})
		.array(),
	paymentMethod: z.enum(['Cash', 'Credit']),
	total: z.string().transform((value) => parseFloat(value)),
	subtotal: z.string().transform((value) => parseFloat(value)),
	isv: z.string().transform((value) => parseFloat(value)),
})
export default function CreateInvoiceForm() {
	const { setIsCreated } = useContext(InvoicesContext)
	const [search, setSearch] = useState('')
	const form = useForm<z.infer<typeof InvoiceSchema>>({
		resolver: zodResolver(InvoiceSchema),
		defaultValues: {
			createdAt: new Date().toISOString().slice(0, 10),
			clientId: '',
			products: [],
			paymentMethod: 'Cash',
			total: 0,
			subtotal: 0,
			isv: 0,
		},
		reValidateMode: 'onChange',
	})

	const products = form.watch('products')
	const total = form.watch('total')
	const subtotal = form.watch('subtotal')
	const isv = form.watch('isv')

	useEffect(() => {
		const total = products.reduce((acc, product) => {
			return acc + Number(product.price) * Number(product.stock)
		}, 0)
		form.setValue('subtotal', Number(total).toFixed(2))
		form.setValue('isv', (Number(total) * 0.15).toFixed(2))
	}, [products, form, total, subtotal, isv])

	useEffect(() => {
		form.setValue('total', (Number(subtotal) + Number(isv)).toFixed(2))
		console.log(products)
	}, [products, form, total, subtotal, isv])

	function onSubmit(values: z.infer<typeof InvoiceSchema>) {
		if (values.createdAt === '') {
			toast.error('Debes agregar una fecha')
			return
		}
		if (values.clientId === '') {
			toast.error('Debes agregar un cliente')
			return
		}

		if (values.products.length === 0) {
			toast.error('Debes agregar al menos un producto')
			return
		}

		db.createInvoice(values)
		for (const product of values.products) {
			const productStock = db.products.find((p) => p.code === product.code)?.stock
			console.log(productStock, product.stock)
			if (productStock) {
				db.updateProduct({
					code: product.code,
					stock: Number(productStock) - Number(product.stock),
					price: product.price,
					name: product.name,
				})
			}
		}
		setIsCreated(true)
		const close = document.getElementById('close')

		if (close) {
			close.click()
		}

		form.reset()
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Crear Factura</Button>
			</DialogTrigger>
			<DialogContent className=' w-full min-w-[500px]'>
				<div className=' flex flex-col gap-4'>
					<div className='flex flex-col '>
						<h1 className='text-2xl font-bold'>Crear Factura</h1>
						<p className='text-sm'>Ingresa los datos de la nueva Factura</p>
					</div>
					<Form {...form}>
						<form
							onSubmit={(e) => {
								e.preventDefault()
								onSubmit(form.getValues())
							}}
							className='grid grid-cols-1 gap-2'>
							<FormField
								control={form.control}
								name='createdAt'
								defaultValue={new Date().toISOString().slice(0, 10)}
								render={({ field }) => (
									<FormItem className='col-span-1'>
										<FormLabel>Fecha</FormLabel>
										<FormControl>
											<Input
												placeholder='Fecha'
												type='date'
												defaultValue={new Date().toISOString().slice(0, 10)}
												{...(field as any)}
											/>
										</FormControl>
										<FormDescription>Fecha</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='clientId'
								render={({ field }) => (
									<FormItem className='col-span-1'>
										<FormLabel>Cliente</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange}>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{db.clients.map((client) => (
														<SelectItem
															key={client.code}
															value={client.code}>
															{client.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormDescription> Seleccionar el cliente</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='col-span-2'>
								<FormLabel>Productos</FormLabel>

								<Input
									placeholder='Buscar'
									type='text'
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>

								<FormMessage />

								<Table className='w-full'>
									<TableHeader>
										<TableRow>
											<TableHead>Nombre</TableHead>
											<TableHead>Stock</TableHead>
											<TableHead>Precio</TableHead>
											<TableHead></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{search !== ''
											? db.products
													.filter((e) =>
														e.name
															.toLowerCase()
															.includes(search.toLowerCase()),
													)
													.filter((e) => Number(e.stock) > 0)
													.map((product) => (
														<TableRow key={product.code}>
															<TableCell>{product.name}</TableCell>
															<TableCell>{product.stock}</TableCell>
															<TableCell>{product.price}</TableCell>
															<TableCell className='text-right flex items-center justify-center'>
																<Checkbox
																	value={product.code}
																	onCheckedChange={(e) => {
																		if (e) {
																			form.setValue(
																				'products',
																				[
																					...products,
																					{
																						code: product.code,
																						name: product.name,
																						stock: 1,
																						price: product.price,
																					},
																				],
																			)
																		} else {
																			form.setValue(
																				'products',
																				products.filter(
																					(e) =>
																						e.code !==
																						product.code,
																				),
																			)
																		}

																		setSearch('')
																	}}
																/>
															</TableCell>
														</TableRow>
													))
											: null}
									</TableBody>
								</Table>

								<FormDescription>
									Seleccione los productos que desea agregar a la Factura
								</FormDescription>
								<FormMessage />

								<Table className='w-full'>
									<TableHeader>
										<TableRow>
											<TableHead>Code</TableHead>
											<TableHead>Nombre</TableHead>

											<TableHead>Precio</TableHead>
											<TableHead></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{products.map((product) => (
											<TableRow key={product.code}>
												<TableCell>{product.code}</TableCell>
												<TableCell>{product.name}</TableCell>

												<TableCell>
													<Input
														type='number'
														defaultValue={1}
														onChange={(e) => {
															form.setValue(
																'products',
																form
																	.getValues('products')
																	.map((p) => {
																		if (
																			p.code === product.code
																		) {
																			return {
																				...p,
																				stock: Number(
																					e.target.value,
																				),
																			}
																		}
																		return p
																	}),
															)
														}}
													/>
												</TableCell>
												<TableCell>{product.price}</TableCell>
												<TableCell className='text-right flex items-center justify-center'>
													<Button
														variant='outline'
														onClick={() => {
															form.setValue(
																'products',
																products.filter(
																	(e) => e.code !== product.code,
																),
															)
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

							<FormField
								control={form.control}
								name='paymentMethod'
								defaultValue='Cash'
								render={({ field }) => (
									<FormItem className='col-span-1'>
										<FormLabel>Metodo de Pago</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue='Cash'>
												<SelectTrigger>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='Cash'>Efectivo</SelectItem>
													<SelectItem value='Credit'>Tarjeta</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormDescription>Metodo de Pago</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='subtotal'
								render={({ field }) => (
									<FormItem className='col-span-1'>
										<FormLabel>Total</FormLabel>
										<FormControl>
											<Input
												disabled
												readOnly
												placeholder='subtotal'
												type='number'
												{...field}
											/>
										</FormControl>
										<FormDescription>subtotal</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='isv'
								render={({ field }) => (
									<FormItem className='col-span-1'>
										<FormLabel>Total</FormLabel>
										<FormControl>
											<Input
												disabled
												readOnly
												placeholder='ISV'
												type='number'
												{...field}
											/>
										</FormControl>
										<FormDescription>Impuesto sobre venta</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='total'
								render={({ field }) => (
									<FormItem className='col-span-1'>
										<FormLabel>Total</FormLabel>
										<FormControl>
											<Input
												disabled
												readOnly
												placeholder='Total'
												type='number'
												{...field}
											/>
										</FormControl>
										<FormDescription>Total</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='flex justify-end space-x-2 col-span-2'>
								<Button
									variant='outline'
									type='reset'
									onClick={() => {
										const close = document.getElementById('close')

										if (close) {
											close.click()
										}
										form.reset()
									}}>
									{' '}
									Cancelar
								</Button>

								<Button type='submit'>Crear Factura</Button>
								<DialogClose id='close' />
							</div>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	)
}
