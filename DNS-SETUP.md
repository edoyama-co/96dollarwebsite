# DNS Setup: 96dollarwebsite.com → Vercel

## Steps (Namecheap)

1. Log in to Namecheap → Domain List → click "Manage" next to 96dollarwebsite.com
2. Go to "Advanced DNS" tab
3. Delete any existing A records or CNAME records for @ and www
4. Add these two records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | 76.76.21.21 | Automatic |
| A Record | www | 76.76.21.21 | Automatic |

5. Save changes
6. Wait 5-30 minutes for propagation (can take up to 48 hours but usually fast)

## Verify

After DNS propagates, visit:
- https://96dollarwebsite.com
- https://www.96dollarwebsite.com

Both should show the waitlist page.

## SSL

Vercel auto-provisions SSL certificates. No action needed from you.
