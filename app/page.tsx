'use client'
import { Product } from '@/types'
import db from '../local/db'
import { useEffect, useState } from 'react'

export default function Home() {
	const [products, setProducts] = useState<Product[]>([])

	useEffect(() => {
		setProducts(db.getAllProducts())
	}, [])

	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<h1 className='text-3xl font-bold'>Products</h1>

			<ul>
				{products.map((product) => (
					<li key={product.code}>{product.name}</li>
				))}
			</ul>
		</main>
	)
}
