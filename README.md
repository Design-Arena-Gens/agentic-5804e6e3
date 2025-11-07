# Mustafizur Chat

Mustafizur Chat is a modern, WhatsApp-inspired messaging experience designed for lightning-fast collaboration and a calm, focused interface. The app ships as a full-featured Next.js application ready to deploy on Vercel.

## ✨ Highlights

- Sleek two-pane chat layout with animated interactions powered by Framer Motion
- Tailwind CSS styling with a custom WhatsApp-like dark theme
- Responsive design tuned for desktop and large tablet breakpoints
- Smart search across conversations and message history
- Keyboard-friendly composer with `Shift + Enter` for multi-line drafts

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to explore the experience locally.

## 🧱 Tech Stack

- [Next.js 14](https://nextjs.org/)
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## 🛠️ Scripts

- `npm run dev` – Start the local dev server
- `npm run build` – Build the production bundle
- `npm run start` – Serve the production build
- `npm run lint` – Run Next.js linting

## 📦 Deployment

The project is optimized for Vercel. Build the app locally, then deploy:

```bash
npm run build
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-5804e6e3
```

Finish by verifying the deployment with:

```bash
curl https://agentic-5804e6e3.vercel.app
```

Enjoy chatting the Mustafizur way! 🎉
