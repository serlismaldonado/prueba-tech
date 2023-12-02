import ProductsTable from './components/ProductsTable'

export default function Page() {
	return (
		<div>
			<div className=' flex justify-between'>
				<h1 className='text-3xl font-bold'>Productos</h1>
			</div>
			<ProductsTable />
		</div>
	)
}
