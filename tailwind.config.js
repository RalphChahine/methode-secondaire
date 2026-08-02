/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
  	extend: {
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)',
			card: 'var(--radius-card)',
			large: 'var(--radius-large)',
			panel: 'var(--radius-panel)',
			pill: 'var(--radius-pill)'
		},
		boxShadow: {
			card: 'var(--shadow-card)',
			floating: 'var(--shadow-floating)',
			portal: 'var(--shadow-portal)'
		},
		colors: {
			ink: 'var(--color-ink)',
			paper: 'var(--color-paper)',
			cobalt: 'var(--color-cobalt)',
			sun: 'var(--color-sun)',
			coral: 'var(--color-coral)',
			mint: 'var(--color-mint)',
			cloud: 'var(--color-cloud)',
			brand: {
				navy: {
					950: 'var(--brand-navy-950)',
					900: 'var(--brand-navy-900)',
					800: 'var(--brand-navy-800)'
				},
				blue: {
					700: 'var(--brand-blue-700)',
					600: 'var(--brand-blue-600)',
					500: 'var(--brand-blue-500)',
					100: 'var(--brand-blue-100)',
					50: 'var(--brand-blue-50)'
				},
				gold: 'var(--brand-gold-500)',
				green: 'var(--brand-green-500)'
			},
			surface: {
				white: 'var(--surface-white)',
				soft: 'var(--surface-soft)',
				blue: 'var(--surface-blue)'
			},
			text: {
				dark: 'var(--text-dark)',
				body: 'var(--text-body)',
				muted: 'var(--text-muted)'
			},
			'border-soft': 'var(--border-soft)',
			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
