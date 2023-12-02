import { Client, Product, Invoice, Database } from '../types/index'

// Function to initialize the database if it doesn't exist
function initializeDatabase() {
	const database = localStorage.getItem('database')

	if (!database) {
		const initialDatabase: Database = {
			products: [],
			clients: [],
			invoices: [],
		}

		localStorage.setItem('database', JSON.stringify(initialDatabase))
	}
}

// Function to generate a token
function generateToken() {
	return Math.random().toString(36).substring(2, 15)
}

// Function to get the current session token
function getSessionToken() {
	return localStorage.getItem('token')
}

// Function to set a new session token
function setSessionToken(token: string) {
	localStorage.setItem('token', token)
}

// Function to create a new product
function createProduct(product: Product) {
	const database: Database = JSON.parse(localStorage.getItem('database') || '{}')
	database.products.push(product)
	localStorage.setItem('database', JSON.stringify(database))
}

function deleteProduct(product: Product) {
	const database: Database = JSON.parse(localStorage.getItem('database') || '{}')
	database.products = database.products.filter((p) => p.code !== product.code)
	localStorage.setItem('database', JSON.stringify(database))
}

function updateProduct(product: Product) {
	const database: Database = JSON.parse(localStorage.getItem('database') || '{}')
	database.products = database.products.map((p) => (p.code === product.code ? product : p))
	localStorage.setItem('database', JSON.stringify(database))
}

// Function to create a new client
function createClient(client: Client) {
	const database: Database = JSON.parse(localStorage.getItem('database') || '{}')
	database.clients.push(client)
	localStorage.setItem('database', JSON.stringify(database))
}

// Function to create a new invoice
function createInvoice(invoice: Invoice) {
	const database: Database = JSON.parse(localStorage.getItem('database') || '{}')
	database.invoices.push(invoice)
	localStorage.setItem('database', JSON.stringify(database))
}

// Function to get all products
function getAllProducts() {
	const database: Database = JSON.parse(localStorage.getItem('database') || '{}')
	return database.products
}

// Function to get all invoices
function getAllInvoices() {
	const database: Database = JSON.parse(localStorage.getItem('database') || '{}')
	return database.invoices
}

// Example Usage:
initializeDatabase()

const db = {
	products: getAllProducts(),
	invoices: getAllInvoices(),

	createProduct,
	deleteProduct,
	updateProduct,
	createClient,
	createInvoice,

	getSessionToken,
	setSessionToken,

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
