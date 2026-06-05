import type { Config } from 'tailwindcss';

// Палитра «Lime-заряд» — токены из CSS-переменных (globals.css). См. бренд Threadhunt.
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        panel: 'var(--panel)',
        'panel-2': 'var(--panel-2)',
        line: 'var(--border)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        accent: {
          DEFAULT: 'var(--accent)',
          press: 'var(--accent-press)',
          soft: 'var(--accent-soft)',
        },
        'on-accent': 'var(--on-accent, #0b0b0f)',
        'accent-ink': 'var(--accent-ink, var(--accent))',
        success: 'var(--success)',
        danger: 'var(--danger)',
        warning: 'var(--warning)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
