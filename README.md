# akeelsalman.com

My personal portfolio — a fast, accessible, warm-editorial personal site built
with the Next.js App Router. **Live at [akeelsalman.com](https://akeelsalman.com).**

## Highlights

- **Light / dark theme** — toggle in the nav, persisted to `localStorage`,
  defaults to the visitor's OS preference, with an anti-flash inline script so
  there's no flash of the wrong theme on load.
- **Responsive** — mobile navigation (hamburger dropdown) and layouts tuned for
  phones through desktop.
- **Contact form** — server-side API route backed by [Resend](https://resend.com);
  no third-party form widgets, and the API key stays in environment variables.
- **`/resume` page** — a print-optimized résumé with a one-click download-to-PDF
  button, styled to match the site in both themes.
- **SEO essentials** — Open Graph image, favicons, `sitemap.xml`, `robots.txt`,
  and JSON-LD structured data.
- **Accessibility & polish** — semantic markup, keyboard-friendly controls, and a
  custom 404 page.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Resend](https://resend.com) for transactional email
- Typography: Space Grotesk (display) + Inter (body), with an amber-gold accent
- Deployed on [Vercel](https://vercel.com)

## Local development

```bash
npm install
npm run dev
```

The dev server runs on [http://localhost:3100](http://localhost:3100).

To exercise the contact form locally, set `RESEND_API_KEY` in a `.env.local`
file (it is git-ignored and never committed).

## Project notes

- Site copy lives in `app/content.js` — a single place to edit text.
- Components are colocated under `app/components/`.
- Route handlers (e.g. the contact endpoint) live under `app/api/`.

## License

Personal project. Feel free to browse for reference; please don't republish the
content or design as your own.
