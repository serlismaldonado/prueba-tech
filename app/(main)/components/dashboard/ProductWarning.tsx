'use client'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import db from '@/local/db'
import { useEffect, useState } from 'react'
import { Product } from '@/types'
export default function ProductWarning() {
	const [products, setProducts] = useState<Product[]>([])
	useEffect(() => {
		setProducts(db.products)
	}, [])
	Chart.register(...registerables)
	return (
		<div className='flex flex-col justify-between bg-white dark:bg-stone-800 rounded-md p-4 shadow-md w-fit'>
			<h1 className='text-lg font-bold'>Existencias {`<`} 10</h1>
			<Bar
				className='bg-white dark:bg-stone-800 dark:text-white w-[200px] h-[200px]'
				data={{
					labels: products
						.filter((product) => Number(product.stock) <= 10)
						.map((product) => product.name),
					datasets: [
						{
							label: 'Existencias',
							data: products
								.filter((product) => Number(product.stock) <= 10)
								.map((product) => product.stock),
							backgroundColor: [
								'rgba(255, 99, 132, 0.2)',
								'rgba(54, 162, 235, 0.2)',
								'rgba(255, 206, 86, 0.2)',
								'rgba(75, 192, 192, 0.2)',
								'rgba(153, 102, 255, 0.2)',
								'rgba(255, 159, 64, 0.2)',
							],
							borderColor: [
								'rgba(255, 99, 132, 1)',
								'rgba(54, 162, 235, 1)',
								'rgba(255, 206, 86, 1)',
								'rgba(75, 192, 192, 1)',
								'rgba(153, 102, 255, 1)',
								'rgba(255, 159, 64, 1)',
							],
							borderWidth: 1,
						},
					],
				}}
				height={200}
				width={200}
			/>
		</div>
	)
}
