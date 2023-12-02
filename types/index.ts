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

interface User {
	username: string
	password: string
}

interface Session {
	token: string
	user: User
}

interface Database {
	products: Product[]
	clients: Client[]
	invoices: Invoice[]
	users: User[]
	sessions: Session[]
}

export type { Product, Client, Invoice, User, Session, Database }
