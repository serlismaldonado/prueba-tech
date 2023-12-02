'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import db from '@/local/db'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
export default function Page() {
	const router = useRouter()
	const loginSchema = z.object({
		username: z.string().min(6),
		password: z.string().min(6),
	})

	const form = useForm({
		defaultValues: {
			username: '',
			password: '',
		},
		resolver: zodResolver(loginSchema),
	})

	function onSubmit(values: z.infer<typeof loginSchema>) {
		const user = db.createUser(values)
		db.createSession({
			user,
			token: db.generateToken(),
		})

		router.push('/')
	}

	return (
		<div className='md:container max-sm:px-5  mt-8 flex flex-col w-full h-full justify-center items-center'>
			<div className='flex flex-col items-center bg-white rounded-lg shadow-md p-4'>
				<h1 className='text-lg font-bold'>SignUp</h1>
				<p className='text-sm'>Ingresa tus credenciales</p>

				<Form {...form}>
					<form className='flex flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<Input {...field} type='text' />

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<Input
										{...field}
										type='password'
										autoComplete='current-password'
									/>

									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type='submit'>Registar Usuario</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}
