# Bramble Premium V2 (Next.js + Animations) + Table Booking (PHP)

## Run
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Booking API
Upload `php-api/book.php` to PHP hosting:
`public_html/api/book.php`

Set in `.env.local`:
`NEXT_PUBLIC_BOOKING_API=https://YOUR_PHP_DOMAIN.com/api/book.php`

## Replace images
- public/hero.jpg
- public/about.jpg
- public/gallery/*.jpg
- public/events/*.jpg
- public/locations/*.png
- public/menu/menu-*.jpg (already added from your menu photos)

### Note about copying images
Use only photos you own or have permission to use.
