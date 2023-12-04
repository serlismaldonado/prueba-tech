import { Button } from '@/components/ui/button'
import {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableCell,
	TableRow,
} from '@/components/ui/table'
import { DriveFile } from '@/types'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function FileList() {
	const [files, setFiles] = useState<DriveFile[]>([])

	const getFiles = async () => {
		try {
			const res = await fetch('/api/google/files', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const data = await res.json()

			console.log(data)
			if (data.error) {
				toast.error(data.error)
				return
			}

			if (data) {
				setFiles(data)
			}
		} catch (error) {
			toast.error('Error al obtener los archivos')
		}
	}

	const downloadDFile = async (id: string) => {
		const res = await fetch(`/api/google/document/download/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id,
			}),
		})

		const data = await res.json()
		if (data.error) {
			toast.error(data.error)
			return
		}

		if (data) {
			const blob = new Blob([data], { type: 'application/pdf' })
			const url = URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.href = url
			link.download = data.name
			link.click()
			URL.revokeObjectURL(url)

			toast.success('Archivo descargado')
		}
	}

	const getDocument = async (id: string) => {
		const res = await fetch(`/api/google/document/get/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},

			body: JSON.stringify({
				id,
			}),
		})
		const data = await res.json()
		if (data.error) {
			toast.error(data.error)
			return
		}

		if (data) {
			console.log(data)
		}
	}

	useEffect(() => {
		getFiles().catch((error) => toast.error('Error al obtener los archivos'))
	}, [])
	return (
		<div>
			<div className='flex flex-col gap-4 bg-white dark:bg-stone-800  rounded-lg shadow-md p-4 '>
				<h1 className='text-xl font-bold'>Archivos</h1>
				<Table>
					<TableHeader>
						<TableRow>
							<TableCell>Nombre</TableCell>
							<TableCell>Acciones</TableCell>
						</TableRow>
					</TableHeader>
					<TableBody>
						{files.map((file) => (
							<TableRow key={file.id}>
								<TableCell>{file.name}</TableCell>
								<TableCell className='flex gap-2'>
									<Button
										onClick={() => {
											downloadDFile(file.id)
										}}>
										Descargar
									</Button>
									<Button
										onClick={() => {
											getDocument(file.id)
										}}>
										Ver
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
