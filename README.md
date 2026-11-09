# Frame&Co Studio website

Website for a photo, film and podcast studio in Chennai. Built with Next.js (App Router), React and TypeScript. One design for three screen sizes: phone, tablet and desktop.

## Run it

Needs Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build       # production build (all pages are pre-rendered)
npm run start       # serve the production build
npm run typecheck   # TypeScript check
```

## Design

White and ink with one rich orange (`--o`, #F05A0A) for the next action and one emphasised word per heading. Photography leads and the interface stays quiet. Fonts: Hanken Grotesk, Instrument Serif (italic accent words) and JetBrains Mono (small labels). All colours and sizes are CSS variables at the top of `src/styles/globals.css`.

The layout changes by screen size:

| Screen | Navigation | Layout |
|---|---|---|
| Phone, under 720 px | Floating dark tab bar (Home, Work, Book, Studio, More) and a sticky action bar on detail pages | One column, photo cards scroll sideways, booking one step at a time |
| Tablet, 720 to 1099 px | Left side rail | Two panes: details on the left, sticky booking summary on the right |
| Desktop, 1100 px and up | Top header with the full menu | Wide layouts, hero photo behind the header, sticky summary panels |

## Pages

| URL | What it is |
|---|---|
| `/` | Home: hero, live studio slots, services, recent work, review |
| `/services` | All six services |
| `/services/wedding-photography` and the other service slugs | Service detail with packages and a package chooser |
| `/services/podcast-studio-rental` | Studio rental: day, start time, length, add-ons and a live estimate |
| `/portfolio` | Filterable masonry grid and a full-screen photo viewer |
| `/book` | Booking in three steps: what, when, your details |
| `/pricing` | Packages by type of shoot, studio rates and terms |
| `/about` | Story, crew, studio and equipment |
| `/contact` | Address, hours, call, WhatsApp and email |
| `/menu` | All pages as a list (phone "More" tab) |

Old static-site addresses such as `/wedding-photography.html` redirect to the new URLs (see `next.config.ts`).

## Folder structure

```
public/images/            photos by category and og.jpg
src/
  app/                    routes, page-level SEO, sitemap, robots
  components/
    layout/               TopBar, TabBar (phone), SideRail (tablet), Footer
    home/                 Hero, QuickActions, StudioToday, service scroller, recent work, reviews
    service/              ServiceDetail, PackagePanel
    studio/               StudioBooker
    booking/              BookingWizard
    gallery/              PortfolioBrowser, GalleryStrip, Viewer
    pricing/              PricingTabs
    motion/               Motion (fade up on scroll), Waveform
    ui/                   Icon, ButtonLink, Photo, PhotoCard, SectionHead, FaqList, CtaPanel
    seo/                  JSON-LD structured data
  data/                   all content as typed data (edit here)
  lib/                    helpers: rupee formatting, WhatsApp links, validation, availability, metadata
  styles/globals.css      the whole design system
  types/                  shared TypeScript types
```

## Change the content

Everything the visitor reads lives in `src/data`:

| File | Content |
|---|---|
| `site.ts` | Studio name, phone, WhatsApp number, email, address, hours, rental rates |
| `services.ts` | The six services: text, prices, packages, add-ons, FAQs, gallery photos |
| `home.ts` | Reviews and the photos in "Recent work" |
| `about.ts` | Story, team, equipment |
| `pricing.ts` | Payment and delivery terms |
| `images.ts` | Photo list with alt text, category and size |
| `presentation.ts` | Card captions and price tags |
| `navigation.ts` | Header menu |

To add a photo: put the file in `public/images/<category>/`, then add an entry in `src/data/images.ts` with its alt text, category and pixel size.

Set the live site address in `.env.local` (copy `.env.example`):

```
NEXT_PUBLIC_SITE_URL=https://www.yourdomain.in
```

## How booking works

There is no server or database. The booking steps and the studio slot picker open WhatsApp with the customer's request already written, sent to the number in `src/data/site.ts`.

Studio availability and the "booked" days on the calendar are a **sample** pattern (`src/lib/availability.ts`). Connect a real calendar or booking service before launch.

## Replace before launch (sample content)

- Studio name, phone, WhatsApp number, email, address, opening hours (`src/data/site.ts`)
- Website address (`NEXT_PUBLIC_SITE_URL`)
- Instagram and YouTube links
- **Photos.** The current photos are free-licence stock images from Unsplash used as stand-ins. Replace the files in `public/images/` with the studio's own work, keeping the same file names. Use photos at least 1600 px wide for the home hero, since it fills the full width on desktop.
- Prices, packages and delivery times: confirm with the studio
- Reviews, rating, shoot counts, team names, equipment and founding year: all invented for the demo
- The map on the contact page is a drawing. Embed a real map.
- The Tamil language switch on the menu page is a placeholder and does nothing yet.

## Deploy

Vercel is the simplest: push the folder to a Git repository, import it at vercel.com and set `NEXT_PUBLIC_SITE_URL`. Any host that runs Node.js also works with `npm run build` and `npm run start`.
