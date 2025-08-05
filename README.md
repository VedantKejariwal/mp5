# Link Shortener App

A modern URL shortener built with Next.js and MongoDB that transforms long URLs into compact, shareable links.

## Features

- Create custom short links with your own aliases
- Dark theme interface with Inter font
- Click tracking and analytics
- URL validation and cycle prevention
- Real-time copy-to-clipboard functionality

## Quick Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure MongoDB:**
   - Create a MongoDB Atlas account at https://www.mongodb.com/atlas
   - Create a new cluster and database
   - Get your connection string
   - Update `.env.local` with your actual MongoDB URI:
   ```
   MONGO_URI="mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database"
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file in the root directory with:

```
MONGO_URI="your-mongodb-connection-string"
```

**Important:** Replace the placeholder values with your actual MongoDB credentials.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- MongoDB
- Tailwind CSS
- Inter font

## Project Structure

```
├── app/
│   ├── api/shorten/route.ts    # API endpoint for URL shortening
│   ├── [slug]/page.tsx         # Dynamic route for redirects
│   ├── page.tsx               # Home page
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   └── UrlForm.tsx            # Main form component
├── config/
│   └── database.ts            # Database connection
├── utils/
│   ├── findUrlBySlug.ts       # URL lookup utility
│   └── incrementClickCount.ts # Click tracking utility
└── types/
    └── index.ts               # TypeScript types
```

## Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Add your `MONGO_URI` environment variable in Vercel's project settings
   - Deploy

## Development Notes

- The application uses API Routes instead of Server Actions for clear backend separation
- Click counting is implemented for basic analytics
- The dark theme uses Tailwind CSS with Inter font
- All database operations are handled asynchronously with proper error handling

## Troubleshooting

### "Database configuration error"
- Ensure your `.env.local` file exists and contains a valid `MONGO_URI`
- Check that your MongoDB cluster allows connections from your IP address
- Verify your MongoDB credentials are correct

### "Connection refused"
- Make sure the development server is running (`npm run dev`)
- Check that port 3000 is not being used by another application 