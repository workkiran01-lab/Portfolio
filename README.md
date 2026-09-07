# Kiran Shahi — Portfolio

Personal portfolio for Kiran Shahi, a Computer Science student at California State University, Long Beach. Built with React 19, Vite, Tailwind CSS, and Framer Motion.

## Development

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Deploy the generated `dist` directory with the existing hosting provider. The refresh does not change the hosting configuration or add service credentials.

## Content and maintenance

- `src/data/profile.js`: contact destinations, resume path, skills, and experience.
- `src/components/ProjectsSection.jsx`: featured work and project descriptions.
- `src/components/HeroOverlay.jsx`: introduction and internship availability.
- `src/index.css`: design tokens, responsive styles, focus states, and reduced-motion overrides.
- `public/resume.pdf`: the existing downloadable resume, preserved as provided. Review it separately for current education and availability before sending applications.

The CSULB affiliation and ParkOS mention come from the supplied LinkedIn profile screenshot. F1 Tax Helper features were checked against its public source. ParkOS is intentionally described only as an in-development multi-tenant SaaS project until its repository, stack, and capabilities are available. No user counts or new performance claims are assumed.

## Interaction and accessibility

Section reveals run once. Operating-system reduced-motion preferences disable transform effects, smooth scrolling, and the animated progress line. Navigation includes a skip link, active section state, keyboard focus styles, and a mobile menu that closes on Escape, outside clicks, and navigation. Links work without custom scroll handlers.

The contact form opens a prefilled `mailto:` draft in the visitor’s email application; it does not send or store messages. Visitors must send the email themselves. The direct email link remains available when no email application is configured. This replaces the original unconfigured Formspree endpoint.

The earlier WebGL background components remain in the repository for reference but are no longer imported into the application. Dependencies and lockfile are preserved.
