'use client'
import { Form, FormDescription } from '@/components/ui/form'
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'

const MessageSchema = z.object({
	title: z.string().min(1, { message: 'Title is required' }),
	content: z.string().min(1, { message: 'Content is required' }),
})

export default function CreateGoogleDocument() {
	const form = useForm<z.infer<typeof MessageSchema>>({
		resolver: zodResolver(MessageSchema),
		defaultValues: {
			title: '',
			content: '',
		},
	})

	function onSubmit(values: z.infer<typeof MessageSchema>) {
		const res = fetch('/api/google/document', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: values.title,
				content: values.content,
			}),
		})

		toast.promise(res, {
			loading: 'Enviando...',
			success: 'Documento creado',
			error: 'Error',
		})

		form.reset()
	}
	return (
		<div>
			<div className='md:container max-sm:px-5 max-sm:pb-20  mt-12 p-4 '>
				<div className='flex flex-col gap-4 bg-white dark:bg-stone-800  rounded-lg shadow-md p-4 '>
					<h1 className='text-xl font-bold'>Enviar mensaje de WhatsApp</h1>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='grid grid-cols-1 gap-2'>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem className='col-span-1'>
										<FormLabel>Titulo</FormLabel>
										<FormControl>
											<Input placeholder='Titulo' type='text' {...field} />
										</FormControl>
										<FormDescription>Titulo del documento</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='content'
								render={({ field }) => (
									<FormItem className='col-span-1'>
										<FormLabel>Contenido</FormLabel>
										<FormControl>
											<Textarea placeholder='Contenido' {...field} />
										</FormControl>
										<FormDescription>Contenido del documento</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type='submit'>Crear Documento</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	)
}
