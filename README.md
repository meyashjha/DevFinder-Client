# DevFinder 🚀

Hey there! Welcome to DevFinder - where developers find... well, other developers! Think Tinder, but for code buddies. 

## What's This?

A fun little app where devs can:
- 🤝 Connect with other developers
- 💬 Chat in real-time (because why not?)
- 👍 Send connection requests (like friend requests but nerdier)
- 🔍 Browse through a feed of potential coding buddies

## Tech Stack (The Cool Stuff)

- **React 19** - Because we like living on the edge
- **Vite** - Fast like your coffee should be ☕
- **Redux Toolkit** - State management without the headache
- **Socket.io** - Real-time chat that actually works!
- **TailwindCSS + DaisyUI** - Making things pretty without crying
- **React Router** - Pages go brrr

## Getting Started

1. **Clone this bad boy**
   ```bash
   git clone <your-repo-url>
   cd frontend
   ```

2. **Install the things**
   ```bash
   npm install
   ```

3. **Set up your environment**
   - Copy `.env.example` to `.env.local`
   - Update `VITE_API_URL` if your backend isn't on localhost:3000
   ```bash
   cp .env.example .env.local
   ```

4. **Run it!**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) and watch the magic happen! ✨

## Available Scripts

- `npm run dev` - Starts development server (hot reload included!)
- `npm run build` - Builds for production (makes it smol and fast)
- `npm run preview` - Preview the production build
- `npm run lint` - Yells at you about code quality

## Deploying to Vercel




1. Deploy your backend first (important!)
2. Push code to GitHub
3. Import to Vercel
4. Add `VITE_API_URL` environment variable
5. Deploy and flex 💪



## Project Structure

```
src/
├── components/     # All the UI stuff
├── hooks/          # Custom React hooks
├── utils/          # Redux store, slices, and helpers
└── assets/         # Images and stuff
```

## Features

- ✅ User authentication (login/signup)
- ✅ Profile management
- ✅ Browse developer feed
- ✅ Send/receive connection requests
- ✅ Real-time chat with Socket.io
- ✅ Responsive design (works on your phone too!)

## Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:3000
```

**Note:** In production (Vercel), set this to your actual backend URL!

## Need Help?

- 🐛 Found a bug? Open an issue!
- 💡 Have an idea? Open an issue!
- 🤔 Confused? That's normal. Open an issue!

## License

MIT - Do whatever you want with it! 🎉

---

Built with ❤️ and probably too much coffee ☕
