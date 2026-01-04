# 🇪🇹 Ethiopian IT Park Website

<div align="center">

![Ethiopian IT Park Logo](public/images/Asset%2022@30x.png)

<!-- Tagline removed per latest request -->

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.1-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.5-7952B3?style=for-the-badge&logo=bootstrap)](https://getbootstrap.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

[🌐 Live Demo (Netlify)](https://itpc-web.netlify.app/) [vercel](https://itpcwebsite.vercel.app/) • [🌐 Live Demo (Official)](https://ethiopianitpark.gov.et) • [📖 Documentation](#documentation) • [🚀 Quick Start](#quick-start) • [🤝 Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🎨 Styling Frameworks](#-styling-frameworks)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [🎬 Live Streaming](#-live-streaming)
- [📱 Responsive Design](#-responsive-design)
- [🌐 API Integration](#-api-integration)
- [🎨 Design System](#-design-system)
- [📊 Performance](#-performance)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Overview

The **Ethiopian IT Park Website** is a comprehensive digital platform designed to showcase Ethiopia's premier technology hub. Built with modern web technologies, it serves as the primary gateway for investors, startups, tech companies, and innovators looking to engage with Ethiopia's growing digital ecosystem.

### 🌟 Mission
To position Ethiopia as a leading digital hub in Africa by providing a world-class platform that connects technology companies, fosters innovation, attracts foreign investment, and enhances the country's technological infrastructure.

### 🎯 Target Audience
- **International Investors** seeking tech investment opportunities
- **Startups and Entrepreneurs** looking for incubation and acceleration
- **Technology Companies** interested in establishing operations in Ethiopia
- **Government Officials** and policy makers
- **Media and Press** covering Ethiopia's tech ecosystem
- **General Public** interested in Ethiopia's digital transformation

---

## ✨ Features

### 🏢 **Core Business Features**
- **🏗️ Investment Zones** - Comprehensive information about available investment opportunities
- **🚀 Startup Incubation** - Programs and services for emerging tech companies
- **🏢 Office & Land Leasing** - Real estate management for tech companies
- **📚 Training & Workshops** - Capacity building programs
- **🤝 Partnership Management** - International collaboration opportunities
- **📊 Business Tools & Templates** - Resources for entrepreneurs

### 🎥 **Media & Communication**
- **📺 Live Streaming** - Real-time event broadcasting with HLS and YouTube integration
- **📸 Media Gallery** - Professional photo and video management
- **📰 News & Events** - Dynamic content management with commenting system
- **💬 Live Chat Widget** - AI-powered customer support
- **📱 Social Media Integration** - Multi-platform content sharing

### 🎨 **User Experience**
- **📱 Fully Responsive Design** - Optimized for all devices
- **🌙 Dark/Light Mode** - Adaptive theme system
- **🌍 Multi-language Support** - English and Amharic
- **♿ Accessibility Compliant** - WCAG 2.1 AA standards
- **⚡ Performance Optimized** - Sub-3 second load times
- **🔍 Advanced Search** - Intelligent content discovery

### 🛡️ **Technical Features**
- **🔐 Secure API Integration** - RESTful backend connectivity
- **📊 Analytics Integration** - Comprehensive user behavior tracking
- **🎯 SEO Optimized** - Advanced meta management and structured data
- **🚀 Progressive Web App** - Offline capabilities and app-like experience
- **🔄 Real-time Updates** - Live data synchronization
- **📈 Performance Monitoring** - Automated performance tracking

---

## 🛠️ Tech Stack

### **Frontend Core**
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.0.0 | UI Library with latest concurrent features |
| **TypeScript** | 5.7.2 | Type-safe development |
| **Vite** | 6.3.1 | Lightning-fast build tool and dev server |
| **React Router** | 7.5.2 | Client-side routing and navigation |

### **State Management & Data**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Axios** | 1.9.0 | HTTP client for API communication |
| **React Hooks** | Built-in | State management and lifecycle |

### **Animation & Interaction**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Framer Motion** | 12.12.1 | Advanced animations and gestures |
| **GSAP** | 3.13.0 | High-performance animations |
| **React Intersection Observer** | 9.16.0 | Scroll-triggered animations |

### **Media & Streaming**
| Technology | Version | Purpose |
|------------|---------|---------|
| **HLS.js** | 1.6.9 | HTTP Live Streaming support |
| **GoJS** | 3.0.21 | Interactive diagrams and visualizations |

---

## 🎨 Styling Frameworks

### **CSS Frameworks & Libraries**
| Framework | Version | Usage | Features |
|-----------|---------|-------|----------|
| **🎨 TailwindCSS** | 3.4.17 | **Primary** | Utility-first CSS, custom design system |
| **🅱️ Bootstrap** | 5.3.5 | **Secondary** | Component library, grid system |
| **💅 Styled Components** | 6.1.17 | **Dynamic** | CSS-in-JS, theme-based styling |

### **Icon Libraries**
| Library | Version | Usage |
|---------|---------|-------|
| **FontAwesome** | 6.7.2 | Primary icons, social media |
| **Heroicons** | 2.2.0 | Modern outline/solid icons |
| **Tabler Icons** | 3.31.0 | Additional UI icons |
| **React Icons** | 5.5.0 | Comprehensive icon collection |
| **Lucide React** | 0.511.0 | Clean, consistent icons |

### **Typography & Fonts**
| Font Family | Usage | Source |
|-------------|-------|--------|
| **Tagesschrift** | Brand headlines | Google Fonts |
| **Poppins** | Primary text | Google Fonts |
| **Manrope** | Secondary text | Google Fonts |
| **Inter** | UI elements | System/Google Fonts |

### **Design System**
```css
/* Brand Color Palette */
:root {
  --primary: #0C7C92;      /* Ethiopian Blue */
  --secondary: #6EC9C4;    /* Turquoise */
  --accent: #16284F;       /* Deep Navy */
  --neutral: #f4f4f4;      /* Light Gray */
}
```

### **Animation Libraries**
| Library | Purpose | Implementation |
|---------|---------|----------------|
| **Framer Motion** | Page transitions, micro-interactions | React components |
| **GSAP** | Complex animations, scroll triggers | Timeline-based |
| **CSS Animations** | Hover effects, loading states | Custom keyframes |

### **Responsive Design**
- **Mobile-First Approach** with TailwindCSS breakpoints
- **Bootstrap Grid System** for complex layouts
- **Custom CSS Grid** for specialized components
- **Flexbox** for component-level layouts

---

## 🚀 Quick Start

### **Prerequisites**
- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher (or **yarn** 1.22.0+)
- **Git** for version control

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/your-org/ethiopian-it-park-website.git
cd ethiopian-it-park-website
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment setup**
```bash
# Copy environment template
cp .env.example .env.local

# Configure your environment variables
nano .env.local
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
```
http://localhost:3002
```

### **Available Scripts**

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

---

## 🎥 Live Events Page (`/live-events`)

A modern live event experience inspired by YouTube / Facebook Live.

### Key Capabilities
* Embedded stream player (powered by `react-player`) with poster + play overlay
* Automatic event state: Upcoming (with countdown) / Live Now / Ended
* Add to Calendar (ICS auto generation when `cta.href` is `"#"`)
* Live Chat simulation (seed + ambient messages + pinned host messages)
* Realistic viewer count synced across browser tabs using `BroadcastChannel`
* Share bar (X, Facebook, LinkedIn, WhatsApp, Copy Link) responsive placement
* Dynamic agenda vertical timeline highlighting Current / Completed / Upcoming sessions with animated nodes
* Speaker list and meta info panel (location, timezone)

### Configuration (`public/data/live-event.json`)
```jsonc
{
  "id": "itpc-annual-innovation",
  "title": "ITPC Annual Innovation Conference",
  "subtitle": "",
  "date": "2025-12-01",
  "startTime": "10:00",
  "endTime": "16:00",
  "timezone": "Africa/Addis_Ababa",
  "location": "IT Park, Addis Ababa + Live Stream",
  "stream": {
    "platform": "youtube",
    "url": "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    "poster": "/images/hero/icons8-support-64.PNG",
    "aspect": "16:9"
  },
  "chat": { "enabled": true, "pinned": [{"author": "Host", "text": "Welcome!"}] },
  "agenda": [ { "time": "10:00", "title": "Opening" } ],
  "speakers": [ { "name": "Jane Doe", "role": "CTO" } ],
  "cta": { "label": "Add to Calendar", "href": "#" },
  "analytics": { "estimatedViewers": 1200 }
}
```

### Agenda Timeline Logic
Each agenda item is evaluated relative to the client clock:
- Current: now >= item.start && now < nextItem.start (node glows)
- Completed: now > nextItem.start (node becomes solid accent)
- Upcoming: future items (neutral node)

Badges used:
- `Current` (red / attention)
- `Completed` (emerald)
- `Upcoming` (slate)

Status chips at top reflect overall event state: `LIVE`, `UPCOMING`, or `ENDED`.

If the user's clock is significantly off, highlighting may appear inaccurate. For production with backend, send server time offset.

### Behavior Notes
* Setting `chat.enabled` to `false` hides interaction but preserves layout.
* `analytics.estimatedViewers` seeds the baseline; tabs add simulated presence.
* ICS file is generated client-side and offered as a download data URI.

### Styling
* Realistic viewer count synced across browser tabs using `BroadcastChannel`
* Custom gradient header + glass panels defined in `src/styles/liveEvents.css`.
* Tailwind utility classes for layout, badges, and responsive adjustments.

### Future Enhancements (Roadmap Ideas)
* WebSocket powered real chat & presence
* Polls / Q&A side panel toggles
* Moderation (delete / ban / slow-mode)
* HLS quality selector & DVR timeline
* Server-provided agenda progress & real analytics

---

## 📁 Project Structure

```
ethiopian-it-park-website/
├── 📁 public/                    # Static assets
│   ├── 🖼️ images/               # Images and media files
│   ├── 🎥 videos/               # Video content
│   ├── 📄 js/                   # Legacy JavaScript files
│   └── 🔤 webfonts/             # Font files
├── 📁 src/                      # Source code
│   ├── 📁 components/           # Reusable React components
│   │   ├── 🎯 LiveStream/       # Live streaming components
│   │   ├── 🏗️ layout/          # Layout components (Header, Footer)
│   │   ├── 🎨 ui/               # UI components
│   │   └── 💬 LiveChatWidget.tsx
│   ├── 📁 pages/                # Page components
│   │   ├── 🏠 Home/             # Homepage
│   │   ├── 💼 Investment/       # Investment pages
│   │   ├── 🚀 Incubation/       # Startup incubation
│   │   ├── 📺 LiveEvents/       # Live streaming pages
│   │   ├── 📰 NewsEvents/       # News and events
│   │   ├── 📸 MediaGallery/     # Media management
│   │   ├── 👥 About/            # About pages
│   │   └── 🛠️ Services/        # IT services
│   ├── 📁 services/             # API and external services
│   │   ├── 🔌 apiService.ts     # Main API client
│   │   └── 📺 mediaService.ts   # Media API client
│   ├── 📁 hooks/                # Custom React hooks
│   ├── 📁 utils/                # Utility functions
│   ├── 📁 styles/               # Global styles
│   ├── 📁 assets/               # Static assets
│   ├── 🎯 App.tsx               # Main application component
│   ├── 🚀 main.tsx              # Application entry point
│   └── 🎨 index.css             # Global CSS
├── 📁 dist/                     # Production build output
├── 📄 package.json              # Dependencies and scripts
├── ⚙️ vite.config.ts            # Vite configuration
├── 🎨 tailwind.config.js        # TailwindCSS configuration
├── 📝 tsconfig.json             # TypeScript configuration
└── 📖 README.md                 # Project documentation
```

### **Key Directories Explained**

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| **`/src/components`** | Reusable UI components | `LivePlayer.tsx`, `Header.tsx`, `Footer.tsx` |
| **`/src/pages`** | Route-based page components | `Home.tsx`, `LiveStreamPage.tsx`, `NewsEvents.tsx` |
| **`/src/services`** | API integration and external services | `apiService.ts`, `mediaService.ts` |
| **`/public`** | Static assets served directly | Images, videos, fonts, legacy JS |

---

## 🔧 Configuration

### **Environment Variables**

Create a `.env.local` file in the root directory:

```env
# Live Streaming Configuration
VITE_LIVE_TYPE=youtube                    # 'hls' or 'youtube'
VITE_LIVE_SRC=YOUR_STREAM_URL            # Stream source URL
VITE_LIVE_POSTER=/images/live-poster.jpg # Optional poster image

# API Configuration
VITE_API_BASE_URL=https://api.ethiopianitpark.gov.et
VITE_BACKEND_URL=https://your-backend-url.com

# Analytics (Optional)
VITE_GA_TRACKING_ID=GA_MEASUREMENT_ID
VITE_HOTJAR_ID=HOTJAR_SITE_ID
```

### **TailwindCSS Configuration**

```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6EC9C4',
          default: '#0C7C92',
          dark: '#16284F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        brand: ['Tagesschrift', 'system-ui'],
      }
    }
  }
}
```

### **Vite Configuration**

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    emptyOutDir: true,
  },
});
```

---

## 🎬 Live Streaming

### **Supported Streaming Platforms**

| Platform | Protocol | Use Case | Configuration |
|----------|----------|----------|---------------|
| **YouTube Live** | RTMP/WebRTC | Easy setup, wide reach | `VITE_LIVE_TYPE=youtube` |
| **HLS Streaming** | HTTP Live Streaming | Professional broadcasting | `VITE_LIVE_TYPE=hls` |
| **Custom RTMP** | Real-Time Messaging | Enterprise solutions | Custom integration |

### **Live Streaming Features**

- ✅ **Adaptive Bitrate Streaming** - Automatic quality adjustment
- ✅ **Low Latency Mode** - Real-time interaction support
- ✅ **Mobile Optimization** - Touch-friendly controls
- ✅ **Fallback Support** - Cross-browser compatibility
- ✅ **Event Scheduling** - Automated stream management
- ✅ **Recording Archive** - Automatic recording storage

### **Implementation Example**

```typescript
// Live streaming component usage
<LivePlayer
  sourceType="hls"
  src="https://stream.example.com/live.m3u8"
  poster="/images/stream-poster.jpg"
  autoplay={true}
  muted={true}
/>
```

---

## 📱 Responsive Design

### **Breakpoint System**

| Device | Breakpoint | TailwindCSS | Bootstrap | Usage |
|--------|------------|-------------|-----------|-------|
| **Mobile** | < 640px | `sm:` | `xs` | Primary mobile experience |
| **Tablet** | 640px - 768px | `md:` | `sm` | Tablet portrait |
| **Laptop** | 768px - 1024px | `lg:` | `md` | Small laptops |
| **Desktop** | 1024px - 1280px | `xl:` | `lg` | Standard desktop |
| **Large** | > 1280px | `2xl:` | `xl` | Large screens |

### **Mobile-First Approach**
- **Progressive Enhancement** - Start with mobile, enhance for larger screens
- **Touch-Friendly** - Minimum 44px touch targets
- **Performance Optimized** - Lazy loading, image optimization
- **Offline Support** - Service worker implementation

---

## 🌐 API Integration

### **Backend Services**

| Service | Endpoint | Purpose | Authentication |
|---------|----------|---------|----------------|
| **News API** | `/api/newsf` | News and articles | Public |
| **Events API** | `/api/eventsf` | Event management | Public |
| **Media API** | `/api/mediaf` | Media gallery | Public |
| **Comments API** | `/api/news/:id/comments` | User comments | Optional |

### **API Client Configuration**

```typescript
// services/apiService.ts
export const BACKEND_URL = "https://api.ethiopianitpark.gov.et";

export async function request<T>(url: string, options: AxiosRequestConfig = {}): Promise<T> {
  const response = await axios({
    url: `${BACKEND_URL}/api${url}`,
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return response.data;
}
```

### **Data Models**

```typescript
// News Item Interface
interface NewsItem {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  image: string[];
  tags: string[];
  commentsData: Comment[];
}

// Event Item Interface
interface EventItem {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  tags: string[];
}
```

---

## 🎨 Design System

### **Color Palette**

```css
/* Primary Colors */
--primary: #0C7C92;        /* Ethiopian Blue - Trust, Technology */
--secondary: #6EC9C4;      /* Turquoise - Innovation, Growth */
--accent: #16284F;         /* Deep Navy - Stability, Professionalism */
--neutral: #f4f4f4;        /* Light Gray - Clean, Modern */

/* Semantic Colors */
--success: #28a745;        /* Green - Success states */
--warning: #ffc107;        /* Yellow - Warning states */
--error: #dc3545;          /* Red - Error states */
--info: #17a2b8;          /* Blue - Information */
```

### **Typography Scale**

| Element | Font | Size | Weight | Usage |
|---------|------|------|--------|-------|
| **H1** | Tagesschrift | 3.2rem | 400 | Page titles |
| **H2** | Poppins | 2.5rem | 600 | Section headers |
| **H3** | Poppins | 2rem | 500 | Subsection headers |
| **Body** | Manrope | 1rem | 400 | Regular text |
| **Caption** | Inter | 0.875rem | 400 | Small text |

### **Spacing System**

```css
/* Consistent spacing scale */
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
```

### **Component Library**

| Component | Framework | Customization | Usage |
|-----------|-----------|---------------|-------|
| **Cards** | Bootstrap + Custom CSS | Brand colors, shadows | Content containers |
| **Buttons** | TailwindCSS | Custom variants | CTAs, actions |
| **Forms** | React Bootstrap | Validation styling | User input |
| **Navigation** | Custom CSS | Brand styling | Site navigation |
| **Modals** | Bootstrap | Custom animations | Overlays, dialogs |

---

## 📊 Performance

### **Performance Metrics**

| Metric | Target | Current | Tool |
|--------|--------|---------|------|
| **First Contentful Paint** | < 1.5s | ~1.2s | Lighthouse |
| **Largest Contentful Paint** | < 2.5s | ~2.1s | Lighthouse |
| **Time to Interactive** | < 3.0s | ~2.8s | Lighthouse |
| **Cumulative Layout Shift** | < 0.1 | ~0.05 | Lighthouse |

### **Optimization Strategies**

- **🖼️ Image Optimization** - WebP format, lazy loading, responsive images
- **📦 Code Splitting** - Route-based and component-based splitting
- **🗜️ Bundle Optimization** - Tree shaking, minification
- **🚀 CDN Integration** - Static asset delivery
- **💾 Caching Strategy** - Browser caching, service workers
- **⚡ Preloading** - Critical resources preloading

### **Bundle Analysis**

```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

---

## 🧪 Testing

### **Testing Strategy**

| Type | Framework | Coverage | Purpose |
|------|-----------|----------|---------|
| **Unit Tests** | Jest + React Testing Library | 80%+ | Component logic |
| **Integration Tests** | Cypress | Key user flows | Feature testing |
| **E2E Tests** | Playwright | Critical paths | Full user journey |
| **Visual Tests** | Chromatic | UI components | Visual regression |

### **Running Tests**

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

---

## 🚀 Deployment

### **Production Build**

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

### **Deployment Platforms**

| Platform | Configuration | Use Case |
|----------|---------------|----------|
| **Netlify** | `netlify.toml` | Static hosting with CDN |
| **Vercel** | `vercel.json` | Serverless deployment |
| **AWS S3 + CloudFront** | Custom | Enterprise hosting |
| **GitHub Pages** | GitHub Actions | Open source projects |

### **Environment-Specific Builds**

```bash
# Development
npm run dev

# Staging
npm run build:staging

# Production
npm run build:production
```

### **CI/CD Pipeline**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: netlify/actions/deploy@master
```

---

## 🤝 Contributing

### **Development Workflow**

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm run test
   npm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### **Code Standards**

- **TypeScript** - Strict type checking enabled
- **ESLint** - Airbnb configuration with custom rules
- **Prettier** - Consistent code formatting
- **Conventional Commits** - Standardized commit messages
- **Husky** - Pre-commit hooks for quality assurance

### **Pull Request Guidelines**

- ✅ Include tests for new features
- ✅ Update documentation as needed
- ✅ Follow the existing code style
- ✅ Add meaningful commit messages
- ✅ Keep PRs focused and atomic

---

## 📚 Documentation

### **Additional Resources**

| Resource | Description | Link |
|----------|-------------|------|
| **API Documentation** | Backend API reference | [API Docs](docs/api.md) |
| **Component Library** | UI component documentation | [Storybook](docs/components.md) |
| **Deployment Guide** | Production deployment steps | [Deploy Guide](docs/deployment.md) |
| **Contributing Guide** | Development guidelines | [Contributing](CONTRIBUTING.md) |

### **Architecture Decisions**

-   **[ADR-001](docs/adr/001-react-typescript.md)** - React + TypeScript choice
-   **[ADR-002](docs/adr/002-styling-approach.md)** - Multi-framework styling strategy
-   **[ADR-003](docs/adr/003-live-streaming.md)** - Live streaming implementation

---

## 🔒 Security & Compliance

### **Implemented Security Measures**
-   **🛡️ Content Security Policy (CSP)** - Implemented via HTTP headers and `<meta>` tags to prevent XSS and data injection.
-   **🔐 HTTPS & HSTS** - Enforced Secure Sockets Layer and Strict-Transport-Security (1 year) with preload support.
-   **🚫 Clickjacking Protection** - `X-Frame-Options: SAMEORIGIN` and `frame-ancestors 'self'` directives applied.
-   **🔍 MIME Sniffing Protection** - `X-Content-Type-Options: nosniff` header enforced.
-   **🛡️ Subresource Integrity (SRI)** - Cryptographic hashes and `crossorigin` attributes for all external fonts and scripts.
-   **🕵️ Information Disclosure protection** - Masked `X-Powered-By` headers and blocked access to sensitive files (`package.json`, `.env`, etc.).
-   **📂 Directory Security** - Disabled directory browsing and resolved 500 errors on `/assets` and `/images` with index fallbacks.

### **Manual Plesk Configuration (REQUIRED to pass scans)**
The security scanner (ZAP) is still detecting missing headers because the **Nginx Proxy** in Plesk overrides the application's settings. You **MUST** apply these settings manually:

1.  **Enable HSTS**: In **SSL/TLS Certificates**, turn **HSTS** to **ON**.
2.  **Force Headers via Nginx**: Go to **Apache & nginx Settings** > **Additional nginx directives** and paste this:
    ```nginx
    # Force Security Headers (Fixes ZAP Medium/Low Alerts)
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: http:; connect-src 'self' https://api.ethiopianitpark.et https://optimizationguide-pa.googleapis.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self';" always;

    # Hide Server Version & Fingerprint
    server_tokens off;
    proxy_hide_header X-Powered-By;
    fastcgi_hide_header X-Powered-By;
    ```
3.  **Fix Directory 500s**: Ensure that in **Hosting Settings**, the option **"Permanent SEO-safe 301 redirect from HTTP to HTTPS"** is checked.

---

## 🌐 API & Route Reference

### **Frontend Routes**
Base: `https://test.ethiopianitpark.et`

| Route | Description |
| :--- | :--- |
| `/` | Homepage |
| `/services/*` | Network, Software, Cloud, Office/Land Leasing |
| `/investment/*` | Zones, Steps to Invest |
| `/incubation/*` | Training, Programs, How to Apply |
| `/resources/*` | Digital Hub, Gallery, News, Policy, FAQs |
| `/career/*` | Job board, Application tracking |
| `/live-events` | Real-time event broadcasting |
| `/contact` | Contact Us form |

### **Backend API Endpoints**
Base: `https://api.ethiopianitpark.et/api`

-   `GET /newsf` - Fetch news items
-   `GET /eventsf` - Fetch all events
-   `POST /contact` - Submit contact form
-   `GET /careers/jobs` - List open positions
-   `POST /careers/jobs/apply` - Submit applications
-   `GET /offices/buildings` - Property listings
-   `GET /lands/zones` - Investment land data
-   `GET /live-events/active` - Active stream config

---

## 🔒 Security

### **Security Measures**

-   **🛡️ Content Security Policy** - XSS protection
-   **🔐 HTTPS Enforcement** - Secure data transmission
-   **🚫 Input Validation** - Server-side validation
-   **🔑 API Rate Limiting** - DDoS protection
-   **📊 Security Headers** - OWASP recommendations

### **Reporting Security Issues**

Please report security vulnerabilities to: **security@ethiopianitpark.gov.et**

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### **Special Thanks**

- **Ethiopian Government** - For supporting digital transformation initiatives
- **Development Team** - For their dedication and expertise
- **Open Source Community** - For the amazing tools and libraries
- **Beta Testers** - For valuable feedback and testing

### **Built With Love In**

<div align="center">

🇪🇹 **Ethiopia** - The Cradle of Humanity and Future of Technology

**Made with ❤️ by the Ethiopian IT Park Team**

---

**📧 Contact:** info@ethiopianitpark.gov.et
**🌐 Website:** [ethiopianitpark.gov.et](https://ethiopianitpark.gov.et)
**📱 Social:** [@EthiopianITPark](https://twitter.com/EthiopianITPark)

</div>
