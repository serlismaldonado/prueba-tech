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
function createClient(client: Client) {
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	database.clients.push(client)
	storage?.setItem('database', JSON.stringify(database))
}

// Function to create a new invoice
function createInvoice(invoice: Invoice) {
	const database: Database = JSON.parse(storage?.getItem('database') || '{}')
	database.invoices.push(invoice)
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

function reset() {
	storage?.removeItem('database')
	storage?.removeItem('token')
}

// Example Usage:
initializeDatabase()

const db = {
	products: getAllProducts(),
	invoices: getAllInvoices(),

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
	createClient,
	createInvoice,

	getAllProducts,
	getAllInvoices,

	generateToken,
}

export default db

// Simulate user login and session creation
//   const token = generateToken();
//   setSessionToken(token);

//   // Simulate creating a product

//   const newProduct: Product = {
//     code: 'P001',
//     name: 'Product 1',
//     stock: 10,
//     price: 20.5,
//   };

//   createProduct(newProduct);

//   // Simulate creating a client
//   const newClient: Client = {
//     code: 'C001',
//     name: 'Client 1',
//     rtn: '123456789',
//     address: 'Some Address',
//   };

//   createClient(newClient);

//   // Simulate creating an invoice
//   const newInvoice: Invoice = {
//     products: [newProduct],
//     client: newClient,
//     type: 'Cash',
//     subtotal: 20.5,
//     isv: 3.075,
//     total: 23.575,
//   };

//   createInvoice(newInvoice);

//   // Simulate getting all products and invoices
//   const allProducts = getAllProducts();
//   const allInvoices = getAllInvoices();

//   console.log('All Products:', allProducts);
//   console.log('All Invoices:', allInvoices);
