/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: ['./src/**/*.{tsx,css}'],
  theme: {
  	fontFamily: {
  		sans: [
  			'Inter',
  			'sans-serif'
  		],
  		mono: [
  			'Monaco',
  			'ui-monospace',
  			'SFMono-Regular',
  			'Menlo',
  			'Consolas',
  			'Liberation Mono',
  			'Courier New',
  			'monospace'
  		]
  	},
  	container: {
  		center: true,
  		screens: {
  			sm: '50rem'
  		}
  	},
  	extend: {
  		colors: {
  			slate: {
  				'850': 'hsl(222deg 47% 16%)'
  			},
  			primary: '#5fc3e7'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: []
};
