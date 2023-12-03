'use client'
import { Sheet, SheetClose, SheetContent, SheetTrigger, SheetPortal } from '@/components/ui/sheet'
import { useContext, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Client } from '@/types'
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
import { customersContext } from './CustomersTable'

export const CustumerSchema: z.ZodType<Omit<Client, 'code'>> = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	rtn: z.string().min(1, { message: 'Rtn is required' }),
	address: z.string().min(1, { message: 'Address is required' }),
})
export default function UpdateCustomerform() {
	const { setIsUpdated, itemToUpdate, setItemToUpdate } = useContext(customersContext)
	const [open, setOpen] = useState(false)
	const form = useForm<z.infer<typeof CustumerSchema>>({
		resolver: zodResolver(CustumerSchema),
		defaultValues: {
			name: itemToUpdate?.name || '',
			rtn: itemToUpdate?.rtn || '',
			address: itemToUpdate?.address || '',
		},
	})

	function onSubmit(values: z.infer<typeof CustumerSchema>) {
		db.updateClient({
			code: itemToUpdate?.code || '',
			name: values.name,
			rtn: values.rtn,
			address: values.address,
		})
		setIsUpdated(true)
		setOpen(false)

		form.reset()
	}

	useEffect(() => {
		if (itemToUpdate) {
			form.setValue('name', itemToUpdate.name)
			form.setValue('rtn', itemToUpdate.rtn)
			form.setValue('address', itemToUpdate.address)
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
						<h1 className='text-2xl font-bold'>Actualizar Cliente</h1>
						<p className='text-sm'>Ingresa los datos del Cliente</p>
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
											<Input placeholder='Nombre del Cliente' {...field} />
										</FormControl>
										<FormDescription>Nombre del Cliente</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='rtn'
								render={({ field }) => (
									<FormItem className='col-span-1'>
										<FormLabel>RTN</FormLabel>
										<FormControl>
											<Input
												type='text'
												placeholder='RTN del Cliente'
												{...field}
												{...field}
											/>
										</FormControl>
										<FormDescription>RTN del Cliente</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='address'
								render={({ field }) => (
									<FormItem className='col-span-2'>
										<FormLabel>Dirección</FormLabel>
										<FormControl>
											<Input
												type='text'
												placeholder='Dirección del Cliente'
												{...field}
											/>
										</FormControl>
										<FormDescription>Dirección del Cliente</FormDescription>
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

								<Button type='submit'>Actualizar Cliente</Button>
							</div>
						</form>
					</Form>
				</div>
			</SheetContent>
		</Sheet>
	)
}
