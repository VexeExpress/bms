<div align="center">

  <br>
  <img src="https://raw.githubusercontent.com/VexeExpress/bms/refs/heads/main/public/static/logo.png" width="400" alt="VexeExpress logo"/>
  <br>

# VexeExpress 🚌

**VexeExpress is a bus operations management web application made to serve public or private-owned bus stations.**

![Development status][status-badge] ![Total commits][commit-count] ![NextJS version][nextjs-version]

[Installation](#-installation) • [Dependencies](#-dependencies)

</div>

## 🚀 Installation

First, clone this project repository:

```bash
git clone https://github.com/VexeExpress/bms.git
cd bms
```

Next, install the project's dependencies:

```bash
npm i
# Or yarn
yarn
# Or bun
bun i
```

Finally, create an `.env` at the root of the project:

```env

```

Okay, you're all set, time to start the devlopment server or build for production:

_For local development:_

```bash
npm run dev
# Or yarn
yarn dev
# Or bun
bun run dev
```

_For building to production:_

```bash
npm run build
# Or yarn
yarn build
# Or bun
bun run build
```

## 🧩 Dependencies

**Styling:**

- MUI Material
- Tailwindcss
- CSS Modules

**Others:**

- Husky for pre-commit hooks
- Prettier for formmatting
- ESLint for code linting checks

[status-badge]: https://img.shields.io/badge/status-in_development-orange
[commit-count]: https://img.shields.io/github/commit-activity/t/VexeExpress/bms
[nextjs-version]: https://img.shields.io/badge/nextjs-^14.2.16-white?logo=vercel&labelColor=black
