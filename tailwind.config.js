/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			zIndex: {
				'1': '1',
				'6': '6',
				'1000': '1000',
			},
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
		},
	},
	plugins: [
		// eslint-disable-next-line global-require
		require('@tailwindcss/typography'),
	],
	corePlugins: {
		preflight: false,
	}
}

