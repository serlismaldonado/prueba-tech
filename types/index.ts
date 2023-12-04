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
	lat?: number | string
	lng?: number | string
}

interface Invoice {
	code: string
	createdAt: Date | string
	products: Product[]
	clientId: string
	paymentMethod: 'Cash' | 'Credit'
	subtotal: number | string
	isv: number | string
	total: number | string
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
