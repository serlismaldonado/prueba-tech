// page.js
'use client'

import Map, { NavigationControl, GeolocateControl, Marker, Popup } from 'react-map-gl'
import airports from '@/local/airports.json'
import 'mapbox-gl/dist/mapbox-gl.css'
import classes from '../Page.module.css'
import { useState, useRef, useEffect } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import db from '@/local/db'
import { Client } from '@/types'

export default function MapLocations() {
	const [selectedMarker, setSelectedMarker] = useState(null)
	const [clients, setClients] = useState<Client[]>([])
	const mapRef = useRef<any | null>(null)

	useEffect(() => {
		setClients(db.getAllCustomers())
	}, [])

	const zoomToSelectedLoc = (e: any, airport: any, index: number) => {
		// stop event bubble-up which triggers unnecessary events

		e.stopPropagation()

		setSelectedMarker({ airport, index } as any)

		mapRef.current?.flyTo({ center: [airport.lon, airport.lat], zoom: 10 })
	}

	const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

	return (
		<div className=' '>
			<div className={classes.mainStyle}>
				<Map
					style={{
						width: '500px',
						height: '500px',
						zIndex: 1,
						borderRadius: '10px',
						position: 'fixed',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
						boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
					}}
					mapboxAccessToken={mapboxToken}
					mapStyle='mapbox://styles/mapbox/streets-v12'
					initialViewState={{ latitude: 35.668641, longitude: 139.750567, zoom: 10 }}
					maxZoom={20}
					minZoom={3}>
					<GeolocateControl />
					<NavigationControl />

					{clients
						?.filter((client) => client.lat && client.lng)
						.map((client, index) => (
							<Marker
								key={Number(index)}
								longitude={Number(client.lat)}
								latitude={Number(client.lng)}>
								<button
									type='button'
									className='cursor-pointer'
									onClick={(e) => zoomToSelectedLoc(e, client, index)}>
									<PaperAirplaneIcon className='w-6 h-6 text-blue-500' />
								</button>
							</Marker>
						))}
				</Map>
			</div>
		</div>
	)
}
