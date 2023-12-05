/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
		config.externals.push({
			fs: 'fs',
		})

		return config
	},
}

module.exports = nextConfig
