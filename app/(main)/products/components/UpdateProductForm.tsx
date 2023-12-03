'use client'
import { Sheet, SheetClose, SheetContent, SheetTrigger, SheetPortal } from '@/components/ui/sheet'
import { useContext, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Product } from '@/types'
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
import { Input } from '@/components/ui/input'
import { ProductsContext } from './ProductsTable'

export const ProductSchema: z.ZodType<Omit<Product, 'code'>> = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	stock: z.string().transform((value) => parseInt(value, 10)),
	price: z.string().transform((value) => parseFloat(value)),
})
export default function UpdateCustomerform() {
	const { setIsUpdated, itemToUpdate, setItemToUpdate } = useContext(ProductsContext)
	const [open, setOpen] = useState(false)
	const form = useForm<z.infer<typeof ProductSchema>>({
		resolver: zodResolver(ProductSchema),
		defaultValues: {
			name: '',
			stock: 0,
			price: 0,
		},
	})

	function onSubmit(values: z.infer<typeof ProductSchema>) {
		db.updateProduct({
			code: itemToUpdate?.code || '',
			name: values.name,
			stock: Number(values.stock),
			price: Number(values.price),
		})
		setIsUpdated(true)
		setOpen(false)

		form.reset()
	}

	useEffect(() => {
		if (itemToUpdate) {
			form.setValue('name', itemToUpdate.name)
			form.setValue('stock', String(itemToUpdate.stock))
			form.setValue('price', String(itemToUpdate.price))
			setOpen(true)
		}
	}, [itemToUpdate, form, setOpen])

	useEffect(() => {
		if (!open) {
			setItemToUpdate(null)
		}
	}, [open, setItemToUpdate])

	return (
		<Sheet open={open} defaultOpen={open} onOpenChange={setOpen} modal>
			<SheetTrigger asChild hidden></SheetTrigger>
			<SheetContent>
				<div className=' flex flex-col gap-4'>
					<div className='flex flex-col '>
						<h1 className='text-2xl font-bold'>Actualizar Producto</h1>
						<p className='text-sm'>Ingresa los datos del Producto</p>
					</div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-4 grid grid-cols-2 gap-2'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem className='col-span-2'>
										<FormLabel>Nombre</FormLabel>
										<FormControl>
											<Input placeholder='Nombre del producto' {...field} />
										</FormControl>
										<FormDescription>Nombre del producto</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='stock'
								render={({ field }) => (
									<FormItem className='col-span-1'>
										<FormLabel>RTN</FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='RTN del producto'
												{...field}
												{...field}
											/>
										</FormControl>
										<FormDescription>RTN del producto</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='price'
								render={({ field }) => (
									<FormItem className='col-span-2'>
										<FormLabel>Precio</FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='Precio del Proyecto'
												{...field}
											/>
										</FormControl>
										<FormDescription>Precio del producto</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='flex justify-end space-x-2 col-span-2'>
								<Button
									variant='outline'
									onClick={() => {
										form.reset()
										setOpen(false)
									}}>
									{' '}
									Cancelar
								</Button>

								<Button type='submit'>Actualizar producto</Button>
							</div>
						</form>
					</Form>
				</div>
			</SheetContent>
		</Sheet>
	)
}
