# Ishan Sinha — Freelance Web Developer

Source for my freelance portfolio: <https://my-portfolio-dhey.vercel.app>

I build websites, landing pages, React/Next.js web apps and full-stack MERN applications for clients in India and worldwide.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router, static export), React, TypeScript
- [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), [Magic UI](https://magicui.design/), Framer Motion
- [Web3Forms](https://web3forms.com/) for the contact form
- Deployed on [Vercel](https://vercel.com/)

## Editing content

All text, projects, services, FAQ and contact details live in one file: [`src/data/resume.tsx`](./src/data/resume.tsx).
Items marked `TODO(content)` are placeholders to replace.

- **Projects:** add an entry to `projects`. Use `category: "internship"` for client/internship work; those are listed first. Put screenshots in `public/posters/`.
- **Testimonials:** add quotes to `testimonials`; the section stays hidden while it's empty.
- **Contact form:** submissions go through [Web3Forms](https://web3forms.com/) to the address you register there. Put your access key in `contact.formAccessKey` in `src/data/resume.tsx`. If the key is missing or sending fails, visitors get one-click WhatsApp, Gmail and email-app buttons with their message pre-filled.

## Running locally

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # static export to ./out
```

## License

MIT. Based on [Dillion Verma's portfolio template](https://github.com/dillionverma/portfolio); see [LICENSE](./LICENSE).
