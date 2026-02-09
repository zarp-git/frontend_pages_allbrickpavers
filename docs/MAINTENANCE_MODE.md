# Maintenance Mode

This application includes a professional maintenance mode implementation using Next.js Middleware that displays a branded maintenance page to visitors while you perform updates or fixes.

## Architecture

This implementation uses **Next.js Middleware** for optimal performance and SEO:

- **Middleware** (`src/middleware.ts`) - Intercepts all requests before they reach your application
- **Dedicated Route** (`src/app/maintenance/page.tsx`) - React-based maintenance page
- **Custom Layout** (`src/app/maintenance/layout.tsx`) - Minimal layout without Header/Footer
- **Reusable Component** (`src/presentation/components/organisms/page-layout/MaintenancePage.tsx`) - The actual UI

### Why This Approach?

✅ **SEO Friendly** - Returns proper HTTP 503 status code  
✅ **Performance** - Intercepts requests early in the pipeline  
✅ **React-based** - Full React component with your design system  
✅ **IP Whitelist Ready** - Easy to allow team access during maintenance  
✅ **Blocks All Routes** - Including API routes  
✅ **Clean URLs** - Visitors stay on their requested URL  

## How to Enable Maintenance Mode

### Option 1: Using Environment Variable (Recommended for Development)

1. Create a `.env.local` file in the root directory if it doesn't exist
2. Add the following line:
   ```
   NEXT_PUBLIC_MAINTENANCE_MODE=true
   ```
3. Restart your development server:
   ```bash
   pnpm dev
   ```

### Option 2: Using Vercel/Production Environment Variables

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add a new variable:
   - **Name**: `NEXT_PUBLIC_MAINTENANCE_MODE`
   - **Value**: `true`
   - **Environment**: Production (or as needed)
4. Redeploy your application

## How to Disable Maintenance Mode

Simply set the environment variable to `false` or remove it entirely:

```env
NEXT_PUBLIC_MAINTENANCE_MODE=false
```

Or remove the variable from your `.env.local` file and restart the server.

## Advanced: IP Whitelist (Allow Team Access)

To allow your team to access the site during maintenance:

1. Add allowed IPs to your environment variables:
   ```env
   MAINTENANCE_WHITELIST_IPS=192.168.1.1,203.0.113.0
   ```

2. Uncomment the IP whitelist code in `src/middleware.ts`:
   ```typescript
   const allowedIPs = process.env.MAINTENANCE_WHITELIST_IPS?.split(",") || [];
   const clientIP = request.ip || request.headers.get("x-forwarded-for") || "";
   if (allowedIPs.includes(clientIP)) {
     return NextResponse.next();
   }
   ```

## Customizing the Maintenance Page

The maintenance page component is located at:
```
src/presentation/components/organisms/page-layout/MaintenancePage.tsx
```

You can customize:
- Heading and description text
- Estimated completion time
- Contact information (phone number)
- Colors and styling
- Logo and branding
- Animations and effects

## Testing Maintenance Mode Locally

### Quick Test

1. Create `.env.local` file:
   ```bash
   echo "NEXT_PUBLIC_MAINTENANCE_MODE=true" > .env.local
   ```

2. Restart your dev server:
   ```bash
   pnpm dev
   ```

3. Visit any URL (e.g., `http://localhost:3000`) to see the maintenance page

4. To disable, change the value to `false` or delete the `.env.local` file

### Test the Maintenance Page Directly

You can also visit the maintenance page directly without enabling maintenance mode:
```
http://localhost:3000/maintenance
```

## How It Works

1. **Request comes in** → Middleware intercepts it
2. **Check maintenance mode** → Reads `NEXT_PUBLIC_MAINTENANCE_MODE`
3. **If enabled** → Rewrites request to `/maintenance` route
4. **Sets HTTP 503** → Proper status code for search engines
5. **Renders React page** → Your branded MaintenancePage component
6. **If disabled** → Request proceeds normally

## Important Notes

- The environment variable **must** start with `NEXT_PUBLIC_` to be accessible in middleware
- Changes to environment variables require a server restart in development
- In production (Vercel), you need to redeploy after changing environment variables
- The middleware runs on **all routes** including API routes
- Static assets (images, CSS, JS) are excluded from middleware for performance

## File Structure

```
src/
├── middleware.ts                          # Intercepts requests
├── app/
│   └── maintenance/
│       ├── layout.tsx                     # Minimal layout (no Header/Footer)
│       └── page.tsx                       # Maintenance route
└── presentation/
    └── components/
        └── organisms/
            └── page-layout/
                └── MaintenancePage.tsx    # UI component
```

## Production Deployment Checklist

- [ ] Set `NEXT_PUBLIC_MAINTENANCE_MODE=true` in Vercel
- [ ] (Optional) Configure `MAINTENANCE_WHITELIST_IPS` for team access
- [ ] Redeploy the application
- [ ] Verify maintenance page is showing
- [ ] Check that HTTP 503 status is returned
- [ ] Test that static assets still load
- [ ] After maintenance, set to `false` and redeploy

## Troubleshooting

**Maintenance page not showing?**
- Verify environment variable is set correctly
- Restart your development server
- Clear browser cache
- Check middleware.ts is in the correct location (`src/middleware.ts`)

**Getting redirect loops?**
- The middleware excludes `/maintenance` route automatically
- Check that you haven't modified the pathname check in middleware

**Static assets not loading?**
- Middleware excludes `_next/static`, `_next/image`, and files with extensions
- Verify your assets are in the correct public folder
