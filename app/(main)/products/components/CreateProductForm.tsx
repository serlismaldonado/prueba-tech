'use client'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useContext } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'
import db from '@/local/db'
import { useRouter } from 'next/navigation'
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
export default function CreateProductForm() {
	const { setIsCreated } = useContext(ProductsContext)
	const form = useForm<z.infer<typeof ProductSchema>>({
		resolver: zodResolver(ProductSchema),
		defaultValues: {
			name: '',
			stock: 0,
			price: 0,
		},
	})

	function onSubmit(values: z.infer<typeof ProductSchema>) {
		db.createProduct(values)
		setIsCreated(true)
		const close = document.getElementById('close')

		if (close) {
			close.click()
		}

		form.reset()
	}
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button>Crear Producto</Button>
			</SheetTrigger>
			<SheetContent>
				<div className=' flex flex-col gap-4'>
					<div className='flex flex-col '>
						<h1 className='text-2xl font-bold'>Crear Producto</h1>
						<p className='text-sm'>Ingresa los datos del nuevo producto</p>
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
											<Input placeholder='Nombre del Producto' {...field} />
										</FormControl>
										<FormDescription>Nombre del Producto</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='stock'
								render={({ field }) => (
									<FormItem className='col-span-1'>
										<FormLabel>Existencia</FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='Existencia del producto'
												{...field}
											/>
										</FormControl>
										<FormDescription>Existencia del producto</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='price'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Precio</FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='Precio del producto'
												{...field}
											/>
										</FormControl>
										<FormDescription>Precio del producto</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className='flex justify-end space-x-2 col-span-2'>
								<Button variant='outline'> Cancelar</Button>

								<Button type='submit'>Crear producto</Button>
								<SheetClose id='close' />
							</div>
						</form>
					</Form>
				</div>
			</SheetContent>
		</Sheet>
	)
}
