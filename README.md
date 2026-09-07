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

## Animation and accessibility

The portfolio opens immediately, without a timed loading screen. A lazy-loaded React Three Fiber canvas renders a continuously rotating particle sculpture. The vertex shader morphs the same geometry from a torus knot to a sphere and then a galaxy as the visitor moves through the journey and into the work section. Ambient orbital rings and pointer response give the opening depth.

- The hero name reveals letter by letter; the introduction recedes with scrolling.
- The personal journey pairs four readable chapters with a sticky SVG route whose progress and traveling marker follow normal document scrolling.
- Project cards use spring-driven pointer tilt and a local light effect. The F1 student-flow diagram has sequential node pulses.
- A word-by-word scroll reveal introduces the About section.
- The navigation has a visible motion pause control. Operating-system reduced-motion preferences take precedence and disable transform effects, loops, and smooth scrolling.
- Mobile uses fewer particles and a simpler stacked journey. The canvas caps pixel density, pauses while the tab is hidden, and falls back to the background if WebGL fails. It is loaded separately from the content bundle.

Navigation retains a skip link, visible keyboard focus, native section links, and a mobile menu with Escape and outside-click dismissal. The contact form opens a prefilled `mailto:` draft in the visitor’s email application; it does not send or store messages. Visitors review and send the email themselves. The direct email link remains available when no email application is configured.

## Validation

Run `npm run build` for production compilation. Browser or visual verification is a separate step; a successful build alone does not validate GPU rendering or scroll appearance. No dependencies or hosting settings were changed for the animation revision.
