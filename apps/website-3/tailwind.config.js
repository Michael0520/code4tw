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
  		],
  		brand: [
  			'var(--font-brand)'
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
  			primary: '#000095',
  			brand: {
  				50: '#e6e6f4',
  				100: '#c0c0e5',
  				200: '#9999d6',
  				300: '#6666c2',
  				400: '#3333ad',
  				500: '#000095',
  				600: '#000080',
  				700: '#00006b',
  				800: '#000056',
  				900: '#000040'
  			}
  		},
  		typography: {
  			// Display text (hero sections, major headings)
  			display: {
  				large: 'text-5xl md:text-6xl',
  				medium: 'text-4xl md:text-5xl',
  				small: 'text-3xl md:text-4xl'
  			},
  			// Heading text (section titles, card titles)
  			heading: {
  				h1: 'text-3xl md:text-4xl',
  				h2: 'text-2xl md:text-3xl',
  				h3: 'text-xl md:text-2xl',
  				h4: 'text-lg md:text-xl'
  			},
  			// Body text (paragraphs, descriptions)
  			body: {
  				large: 'text-lg md:text-xl',
  				medium: 'text-base md:text-lg',
  				small: 'text-sm md:text-base'
  			},
  			// Caption text (labels, small text)
  			caption: {
  				large: 'text-sm',
  				small: 'text-xs'
  			}
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
