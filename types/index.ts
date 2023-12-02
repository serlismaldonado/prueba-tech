interface Product {
	code: string
	name: string
	stock: number | string
	price: number | string
}

interface Client {
	code: string
	name: string
	rtn: string
	address: string
}

interface Invoice {
	products: Product[]
	client: Client
	interface: 'Cash' | 'Credit'
	subtotal: number
	isv: number
	total: number
}

interface Database {
	products: Product[]
	clients: Client[]
	invoices: Invoice[]
}

export type { Product, Client, Invoice, Database }
