'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { getOpenAiCompletion } from '@/actions'
import db from '@/local/db'
import {
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormControl,
	Form,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const formSchema = z.object({
	prompt: z.string().min(1, { message: 'Prompt is required' }),
})
export default function ChatGPT() {
	const form = useForm({
		defaultValues: {
			prompt: '',
		},
	})

	const [response, setResponse] = useState('')
	const [promptData, setPromptData] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		const data = {
			products: db.products,
			clients: db.clients,
			invoices: db.invoices,
		}

		setPromptData(JSON.stringify(data))
	}, [])

	useEffect(() => {
		if (response === 'Ha ocurrido un error') {
			toast.error('Ha ocurrido un error, intenta de nuevo')
		}
	}, [response])

	async function onSubmit(data: z.infer<typeof formSchema>) {
		setIsLoading(true)

		const res = await getOpenAiCompletion(data.prompt, promptData)
		setIsLoading(false)
		res && setResponse(res)
	}
	return (
		<div className='flex flex-col gap-2 w-full items-center'>
			<div className='flex flex-col bg-white dark:bg-stone-800  rounded-lg shadow-md p-4 gap-3 w-full'>
				<div className='flex flex-col '>
					<h1 className='text-lg font-bold'>Asistente de Inteligencia </h1>
					<p className='text-sm'> </p>
				</div>
				<Form {...form}>
					<form
						className='flex flex-col gap-4 w-full'
						onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='prompt'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Ingresa lo que necesites saber acerca de tu negocio
										(Ejemplo: `Listar todos los productos disponibles para el
										cliente`)
									</FormLabel>
									<Textarea
										className='dark:bg-stone-700 bg-stone-100'
										{...field}
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='flex justify-end '>
							<Button className='flex items-center gap-2' type='submit'>
								<svg
									height='16px'
									width='16px'
									className='text-green-500 '
									color='#'
									version='1.1'
									viewBox='0 0 64 64'
									xmlns='http://www.w3.org/2000/svg'
									stroke-width='3'
									stroke='#32d893'
									fill='none'>
									<g id='SVGRepo_bgCarrier' stroke-width='0'></g>
									<g
										id='SVGRepo_tracerCarrier'
										stroke-linecap='round'
										stroke-linejoin='round'></g>
									<g id='SVGRepo_iconCarrier'>
										<circle cx='34.52' cy='11.43' r='5.82'></circle>
										<circle cx='53.63' cy='31.6' r='5.82'></circle>
										<circle cx='34.52' cy='50.57' r='5.82'></circle>
										<circle cx='15.16' cy='42.03' r='5.82'></circle>
										<circle cx='15.16' cy='19.27' r='5.82'></circle>
										<circle cx='34.51' cy='29.27' r='4.7'></circle>
										<line x1='20.17' y1='16.3' x2='28.9' y2='12.93'></line>
										<line x1='38.6' y1='15.59' x2='49.48' y2='27.52'></line>
										<line x1='50.07' y1='36.2' x2='38.67' y2='46.49'></line>
										<line x1='18.36' y1='24.13' x2='30.91' y2='46.01'></line>
										<line x1='20.31' y1='44.74' x2='28.7' y2='48.63'></line>
										<line x1='17.34' y1='36.63' x2='31.37' y2='16.32'></line>
										<line x1='20.52' y1='21.55' x2='30.34' y2='27.1'></line>
										<line x1='39.22' y1='29.8' x2='47.81' y2='30.45'></line>
										<line x1='34.51' y1='33.98' x2='34.52' y2='44.74'></line>
									</g>
								</svg>
								Generar Respuesta
							</Button>
						</div>
					</form>
				</Form>
			</div>
			<div className='flex flex-col  bg-white dark:bg-stone-800  rounded-lg shadow-md p-4 gap-3  w-full h-full'>
				<div className='flex flex-col '>
					<h1 className='text-lg font-bold'>Respuesta</h1>
					<p className='text-sm'></p>
				</div>

				<div className='flex flex-col h-full w-full'>
					{isLoading ? (
						<div className='flex flex-col  animate-pulse gap-2 rounded-lg  p-4  w-full min-h-[200px] bg-stone-100 dark:bg-stone-700'>
							<div className='w-full h-4 bg-gray-300 bg-opacity-50  dark:bg-stone-700'></div>
							<div className='w-full h-4 bg-gray-300 bg-opacity-50  dark:bg-stone-700'></div>
							<div className='w-[80%] h-4 bg-gray-300 bg-opacity-50  dark:bg-stone-700'></div>
						</div>
					) : (
						<div className='flex flex-col  bg-stone-100 dark:bg-stone-700  rounded-lg  p-4 gap-2 w-full min-h-[200px]'>
							<p className='text-sm w-full'>
								{response ? response : 'No hay respuesta'}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
