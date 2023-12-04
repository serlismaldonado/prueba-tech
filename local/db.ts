import { Client, Product, Invoice, Database, User, Session } from '../types/index'

// Function to initialize the database if it doesn't exist
const storage = typeof localStorage !== 'undefined' ? localStorage : null
const sessionStore = typeof sessionStorage !== 'undefined' ? sessionStorage : null
function initializeDatabase() {
	const database = storage?.getItem('database')

	if (!database) {
		const initialDatabase: Database = {
			products: [],
			clients: [],
			invoices: [],
			users: [],
			sessions: [],
		}

		storage?.setItem('database', JSON.stringify(initialDatabase))
	}
}

function createUser(user: User) {
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	database.users.push(user)
	storage?.setItem('database', JSON.stringify(database))

	return user
}

function deleteUser(user: User) {
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	database.users = database.users.filter((u) => u.username !== user.username)
	storage?.setItem('database', JSON.stringify(database))
}

function updateUser(user: User) {
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	database.users = database.users.map((u) => (u.username === user.username ? user : u))
	storage?.setItem('database', JSON.stringify(database))
}

function createSession(session: Session) {
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	database.sessions.push(session)
	storage?.setItem('database', JSON.stringify(database))
}

function login(username: string, password: string) {
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	const user = database.users.find((u) => u.username === username && u.password === password)

	if (!user) {
		return null
	}

	const session: Session = {
		token: generateToken(),
		user,
	}

	sessionStorage?.setItem('token', session.token)

	createSession(session)

	return session
}

function getSession() {
	const currentSession = sessionStorage?.getItem('token')

	if (!currentSession) {
		return null
	}

	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	const session = database.sessions.find((s) => s.token === currentSession)

	if (!session) {
		return null
	}

	return session
}

function logout() {
	const currentSession = sessionStore?.getItem('token')

	if (!currentSession) {
		return
	}

	sessionStorage?.removeItem('token')
	deleteSession(currentSession)
}

function deleteSession(token: string) {
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	database.sessions = database.sessions.filter((s) => s.token !== token)
	storage?.setItem('database', JSON.stringify(database))
}

function updateSession(session: Session) {
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	database.sessions = database.sessions.map((s) => (s.token === session.token ? session : s))
	storage?.setItem('database', JSON.stringify(database))
}

// Function to generate a token
function generateToken() {
	return Math.random().toString(36).substring(2, 15)
}

// Function to get the current session token

// Function to create a new product
function createProduct(product: Omit<Product, 'code'>) {
	const code = Math.random().toString(36).slice(2)

	const newProduct: Product = {
		...product,
		code,
	}
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	database.products.push(newProduct)
	storage?.setItem('database', JSON.stringify(database))
}

function deleteProduct(product: Product) {
	const db: Database = JSON.parse(storage?.getItem('database') || '{}')
	console.log('eliminar el producto', product)

	if (db.products.length > 0) {
		db.products = db.products.filter((p) => p.code !== product.code)
		storage?.setItem('database', JSON.stringify(db))
	}
}

function updateProduct(product: Product) {
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	database.products = database.products.map((p) => (p.code === product.code ? product : p))
	storage?.setItem('database', JSON.stringify(database))
}

// Function to create a new client
function createClient(client: Omit<Client, 'code'>) {
	const code = Math.random().toString(36).slice(2)
	const newClient: Client = {
		...client,
		code,
	}
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	database.clients.push(newClient)
	storage?.setItem('database', JSON.stringify(database))
}

// Function to delete a client
function deleteClient(client: Client) {
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	database.clients = database.clients.filter((c) => c.code !== client.code)
	storage?.setItem('database', JSON.stringify(database))
}

// Function to update a client
function updateClient(client: Client) {
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	database.clients = database.clients.map((c) => (c.code === client.code ? client : c))
	storage?.setItem('database', JSON.stringify(database))
}

// Function to create a new invoice
function createInvoice(invoice: Omit<Invoice, 'code'>) {
	const code = Math.random().toString(36).slice(2)

	const newInvoice: Invoice = {
		...invoice,
		code,
		createdAt: new Date(),
	}
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	database.invoices.push(newInvoice)
	storage?.setItem('database', JSON.stringify(database))
}

// Function to delete a invoice
function deleteInvoice(invoice: Invoice) {
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	database.invoices = database.invoices.filter((i) => i.code !== invoice.code)
	storage?.setItem('database', JSON.stringify(database))
}

// Function to update a invoice
function updateInvoice(invoice: Invoice) {
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	database.invoices = database.invoices.map((i) => (i.code === invoice.code ? invoice : i))
	storage?.setItem('database', JSON.stringify(database))
}

// Function to get all products
function getAllProducts() {
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	return database.products
}

// Function to get all invoices
function getAllInvoices() {
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	return database.invoices
}

function getAllCustomers() {
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	return database.clients
}

function reset() {
	storage?.removeItem('database')
	storage?.removeItem('token')
}

// Example Usage:
initializeDatabase()

const db = {
	products: getAllProducts(),
	invoices: getAllInvoices(),
	clients: getAllCustomers(),

	reset,

	login,
	logout,

	createUser,
	deleteUser,
	updateUser,

	createSession,
	deleteSession,
	updateSession,
	getSession,

	createProduct,
	deleteProduct,
	updateProduct,

	createInvoice,
	deleteInvoice,
	updateInvoice,

	createClient,
	deleteClient,
	updateClient,

	getAllProducts,
	getAllInvoices,
	getAllCustomers,
	generateToken,
}

export default db
