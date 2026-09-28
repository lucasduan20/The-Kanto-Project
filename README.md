# The Kanto Project

A small, dependency-free static site. Node 20+ is sufficient.

Run `npm run build`, then `npm start`. Open http://127.0.0.1:4173.
Deploy the `dist` directory on any static host. `dist` is tracked so the delivered site is ready to serve.

## Content

Edit `content.mjs`, then rebuild. All page copy, reported facts, navigation labels, and organization details are centralized there.

Missing fields to supply:
- `involvement.cards.details`: collection/shipping instructions and any card requirements.
- `involvement.cards.url`: a genuine donation coordination destination (optional if email is supplied).
- `involvement.financial.url`: a genuine online giving destination.
- `contact.email`: the project email.
- `contact.socials`: entries with `label` and `url`.
- `gallery.images`: authentic project photographs with `src`, `alt`, `caption`, `width`, and `height`. Put optimized files in `dist/assets/photos` and use URLs such as `/assets/photos/filename.webp`. Only publish photos with appropriate permission. The gallery and keyboard-accessible lightbox appear automatically when entries are added.

`impact.value`, `impact.label`, `impact.asOf`, `story.milestone`, and `footer.designation` hold the supplied impact and nonprofit facts. The figure is a dated editorial fact, never an animated/live counter. `footer.copyrightYear` is editable.

## Design and assets

Fraunces and DM Sans are self-hosted, OFL-licensed fonts. License copies live in `dist/assets/fonts`. Their role is an original interpretation of the requested lettering references, not a claim to use the references’ proprietary typefaces. The supplied PNG is preserved byte-for-byte, displayed without distortion, and reused as the favicon. Its original artwork is unchanged; no additional gradients or decorative images are introduced.

Semantic static HTML is generated at build time, so content and links remain available without JavaScript. JavaScript only enhances the mobile menu, anchor focus, and photo dialog. No form, payment backend, tracking, or third-party runtime requests are included.
