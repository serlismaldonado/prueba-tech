import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/theme-provider'
const inter = Inter({ subsets: ['latin'] })
import 'mapbox-gl/dist/mapbox-gl.css'

export const metadata: Metadata = {
	title: 'Prueba Tech - Facturas',
	description: 'Prueba Tech - Facturas',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<link
					href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css'
					rel='stylesheet'
				/>
			</head>
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange>
					{children}

					<Toaster richColors expand={true} />
				</ThemeProvider>
			</body>
		</html>
	)
}
