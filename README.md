# Next Study — Liquid Glass (black & orange)

React + TanStack Router + Tailwind, liquid-glass style (frosted panels over a drifting orange/amber aurora backdrop), installable as a PWA.

The admin panel used to live at `/admin` in this same project - it's now its own separate app, **next-study-admin**, so this project is purely the public-facing site. Both share the same Firebase project, so changes made in the admin app show up here live.

## What's on the home page

1. **Hero** — the Next Study logo bounces gently with a slow-spinning orange ring orbiting it, then "PREMIUM ECOSYSTEM" / "Choose Platform".
2. **Site Announcement** (`src/components/SiteAnnouncement.jsx`) — an optional banner set from the admin app's Announce tab; hidden unless an admin turns it on.
3. **Urgent Alert banner** — red, pulsing, links to the channel set from the admin app.
4. **4 platform cards**:

| Card | Behavior |
|---|---|
| PW ULTIMATE | Opens `/pw` — an internal dashboard listing the PW variants |
| NEXT TOPPER ULTIMATE | Opens `/next-topper` — an internal dashboard listing the Next Topper variants |
| Vibrant Academy | Direct external link, opens in a new tab |
| Mission Jeet | Locked by default — any card can be locked/unlocked live from the admin app |

5. **Footer** + **Telegram popup** (can be turned on/off from the admin app).

## Live data, not a local file

`src/lib/platformsFirestore.js` reads (and the public site only ever *reads*, never writes admin-controlled config) straight from Firestore:
- `config/platforms` — lock state + edited links for every card
- `config/announcement` — the site announcement banner
- `config/appControl` — Telegram popup / urgent alert on-off + their URLs
- `stats/counters` — this site bumps `totalOpens` by 1 on every load (see `recordAppOpen()`)
- `presence/*` — this site pings its own session doc every 20s so the admin app's "Online Now" has something to count

All four are realtime (`onSnapshot`), so an admin's change shows up here within seconds — no rebuild or redeploy.

## PW / Next Topper dashboards — and why the URL never shows

`PW ULTIMATE` and `NEXT TOPPER ULTIMATE` each open their own internal page (`/pw`, `/next-topper`) listing that group's platforms. Tapping one navigates to `/pw/<id>` or `/next-topper/<id>` (`src/routes/pw-viewer.jsx`, `src/routes/next-topper-viewer.jsx`), which renders the real site **inside an iframe** (`src/components/PlatformViewer.jsx`). Because that's still our own route, the browser's address bar keeps showing your domain the whole time.

**Honest caveat**: some sites send an `X-Frame-Options` / CSP header that blocks iframe embedding entirely - that's controlled by the destination site, not by this app. If a platform doesn't load, there's a small "Trouble loading? Open directly" fallback link under the iframe.

## Managing this site — the admin app

Go build/deploy **next-study-admin** (a separate project, delivered alongside this one) and use it to:
- Lock/unlock any of the 4 top-level cards, or edit a PW/Next Topper sub-platform's URL (**Links** tab)
- Turn the Telegram popup / urgent alert banner on or off, or edit where they link (**Control** / **Buttons** tabs)
- Write the site announcement banner (**Announce** tab)
- See real stats: total opens, online now, locked count, admin count (**Stats** tab)
- Chat with a voice-enabled AI Tutor (**AI Chat** tab)

Both apps share the same Firebase project (`next-study-admin-pannel`) — see `next-study-admin/README.md` for the one-time Firebase setup (enabling auth, creating the Firestore database, and the security rules to paste in).

**Adding a brand-new platform** (not just editing an existing one) means adding it to `src/data/constants.js` in *both* projects, since each keeps its own copy of the base list that Firestore overrides get merged into — that part isn't admin-editable by design, since a totally new platform needs actual routing/UI, not just a config toggle.

## New in this update

- **PW PI PRO** — a new top-level card (direct link, opens in a new tab).
- **NEXT TOPPER 3** — a new entry inside the NEXT TOPPER ULTIMATE dashboard.
- **Kuku TV banner** — a red banner right above Urgent Alert, same style, with its real logo, admin-controllable (on/off + link) from Control/Buttons.
- New logos for PW ULTIMATE, PW PI PRO, NEXT TOPPER ULTIMATE, and Mission Jeet (Vibrant Academy's stayed the same).
- "Choose **Platform**" — "Platform" is now orange.
- **Every platform can now be locked individually** — not just the 4 top-level cards, but every PW/Next Topper sub-platform too. A card with no URL set (like Mission Jeet, until an admin adds one) shows "Coming Soon" automatically, even before it's explicitly locked.
- **Maintenance Mode now actually does something** — previously the toggle only changed a number on the admin's own Stats tab; now flipping it on shows every visitor a real "Down for Maintenance" screen (`src/components/MaintenanceGate.jsx`, wraps the whole site in `src/routes/__root.jsx`), with a built-in 2.5s timeout so a slow Firestore response can never leave the site stuck blank.

## If a toggle "isn't working" — how to tell why

If flipping something in the admin app doesn't seem to reach the public site, it's essentially always one of these three, in order of likelihood:

1. **Firestore rules were never published.** Firebase denies all reads/writes by default until you paste `firestore.rules` (in the `next-study-admin` project) into Firebase console → Firestore Database → Rules → Publish. The admin app now shows a visible red error box when a save is blocked this way, instead of silently doing nothing — if you see that error, this is the fix.
2. **This site (or the admin app) is running an older deployed build.** Both need to be rebuilt (`npm run build`) and redeployed after pulling these changes — a live site keeps serving whatever was last deployed.
3. **They're pointed at different Firebase projects.** Both `src/lib/firebase.js` files (one in each project) must have the exact same `projectId`. They do in what's provided here — just flagging it in case either gets edited separately later.

## PWA (installable app)

`public/manifest.webmanifest`, `public/icons/`, `public/sw.js`, registered in `src/main.jsx`. Once deployed over HTTPS, Android Chrome offers an "Install app" prompt and iOS Safari supports Share → "Add to Home Screen".

## Running it

```bash
npm install
npm run dev
```

`npm run build` produces a production build in `dist/`.
