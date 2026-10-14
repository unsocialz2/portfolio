# Ahmed Emad — Cybersecurity Portfolio

An original, animated and responsive portfolio covering offensive security, SOC experience, and software development. Written in plain HTML, CSS, and JavaScript; no build step or package installation required.

## Content

- Career profile, education, and five professional roles
- Offensive security, security operations, and development expertise
- Filterable toolkit
- Training and certificates; learning paths are identified separately from certification
- Links to LinkedIn, GitHub, TryHackMe, and Hack The Box
- Downloadable original CV
- Dark/light themes, responsive navigation, email copying, and Cairo local time
- Highlight cards for security focus, Telecom Egypt SOC experience, and the completed HTB path
- Featured ReconX project, linked to its public repository
- Animated role typing, ambient network canvas, floating badges, scroll reveals, card tilt and tool ticker
- Local interactive profile terminal: help, whoami, skills, experience, projects, education, contact, clear
- Reduced-motion support and animation pausing in background tabs

The supplied AhmedEmadCV.pdf is the authoritative source for career details and dates. Public LinkedIn profile information was cross-checked where accessible. The featured ReconX description is grounded in its public repository README. No client findings, invented project outcomes, testimonials, proficiency percentages, or unearned certification claims are included. The design is original; no code or assets were copied from the inspiration site.

## Run locally

Open `index.html`, or run `python3 -m http.server 8000` in this folder and open `http://localhost:8000`.

Google Fonts are optional external resources; system fonts provide a fallback if unavailable. Clipboard copying requires a secure context; the email link remains available everywhere. No analytics, tracking, API keys, or backend services.

## Publish on GitHub Pages

Upload the contents of this directory to the `main` branch of a repository named `portfolio`. In Settings → Pages → Build and deployment, select **GitHub Actions** as the source, then run the included **Deploy portfolio to GitHub Pages** workflow (or push a new commit).

The workflow publishes only the website files and assets, including the CV. Source files and documentation are not included in its deployment artifact. The CV contains the professional contact details supplied for this public portfolio.

Profile links intentionally point to WinchesterxZ, as provided in the CV; hosting can use the separately selected unsocialz2 account.

## Edit

- `index.html`: content and links
- `style.css`: layout, colors, and responsive behavior
- `script.js`: menu, theme, filters, clock, copy button
- `assets/AhmedEmadCV.pdf`: replace when updating the CV

## Validation

JavaScript syntax, HTML anchors/local resources, SVG parsing, CSS brace structure, and interactive script behavior were checked locally. The published site is reviewed through browser interaction after deployment; a separate local preview is not available in the build environment.
