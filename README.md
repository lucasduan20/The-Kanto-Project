# The Kanto Project

A small, dependency-free static site. Node 20+ is sufficient.

Run `npm run build`, then `npm start`. Open http://127.0.0.1:4173.
Deploy the `dist` directory on any static host. `dist` is tracked so the delivered site is ready to serve.

## Content

Edit `content.mjs`, then rebuild. All page copy, reported facts, navigation labels, and organization details are centralized there.

Contact configuration:
- `contact.email`: contact@thekantoproject.org.
- `contact.socials`: Instagram entries with `label`, `url`, and `platform`.
- `contact.form.action` and `contact.form.endpoint`: FormSubmit delivery destinations. If changing the recipient, update both and verify the new inbox.
- `contact.form`: labels, submission subject, and honest success/error/activation states.
- The combined Get Involved section handles donation inquiries, support, and general contact. The original `#say-hello` link still targets this section.

Remaining content to supply:
- `gallery.images`: authentic project photographs with `src`, `alt`, `caption`, `width`, and `height`. Put optimized files in `dist/assets/photos` and use URLs such as `/assets/photos/filename.webp`. Only publish photos with appropriate permission. The gallery and keyboard-accessible lightbox appear automatically when entries are added.

`impact.value`, `impact.label`, `impact.asOf`, `story.milestone`, and `footer.designation` hold the supplied impact and nonprofit facts. The user updated the figure to 25,000 cards donated so far; the earlier August 2026 date has been removed. The figure is manually maintained, never an animated/live counter. An optional `impact.asOf` is shown only when provided. `footer.copyrightYear` is editable.

## Design and assets

Fraunces and DM Sans are self-hosted, OFL-licensed fonts. License copies live in `dist/assets/fonts`. Their role is an original interpretation of the requested lettering references, not a claim to use the references’ proprietary typefaces. The supplied PNG is preserved byte-for-byte, displayed without distortion, and reused as the favicon. Its original artwork is unchanged; no additional gradients or decorative images are introduced.

Semantic static HTML is generated at build time, so content and links remain available without JavaScript. JavaScript enhances the mobile menu, anchor focus, photo dialog, and contact form. The form sends to FormSubmit over HTTPS; name, reply email, and message are forwarded to the configured inbox. It works with native form submission if JavaScript is unavailable. No tracking or payment backend is included.

## Email activation

FormSubmit requires a one-time recipient confirmation. A setup submission triggered the activation email to contact@thekantoproject.org. The owner chose to activate later. Until they click **Activate Form**, forwarding is not active. AJAX activation responses display an unavailable message rather than a false success; entered text is retained. A genuine provider success clears the form and confirms submission, without claiming inbox delivery. Failures, malformed responses, timeouts, and double submissions are handled. A honeypot is included; FormSubmit manages its own filtering. Direct email and Instagram links work independently.
