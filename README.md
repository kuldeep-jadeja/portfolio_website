<div align="center">

# 🌟 Portfolio Website

### _Kuldeepsinh Jadeja - Full-Stack Software Engineer_

[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Sass](https://img.shields.io/badge/Sass-1.94.1-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

_A modern, responsive portfolio with integrated blog and project showcase_

[🚀 Live Demo](#) • [📖 Documentation](#getting-started) • [🐛 Report Bug](https://github.com/kuldeep-jadeja/portfolio_website/issues) • [✨ Request Feature](https://github.com/kuldeep-jadeja/portfolio_website/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Key Highlights](#-key-highlights)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Features Deep Dive](#-key-features-deep-dive)
- [Customization](#-customization)
- [Deployment](#-deployment)
- [Performance & SEO](#-performance--seo)
- [Contact](#-contact)

---

## 🎯 About

A comprehensive personal portfolio built with **Next.js 16** and **React 19**, showcasing my journey as a full-stack software engineer. This isn't just a simple portfolio—it's a feature-rich platform that integrates:

> _"Passionate about Tech, turned me into Software engineer ❤️"_
>
> _"I love building things and helping people."_

**Professional Journey:**

- 🚀 **Current**: Full-Stack MERN Developer at **Redlio Designs** (July 2024 - Present)
- 💼 **Previous**: Adobe Magento2 Frontend Developer at **Salecto** (June 2022 - June 2024)
- 🎓 **Specialization**: React, Next.js, Node.js, MongoDB, Magento2, and modern web technologies

---

## ✨ Key Highlights

🎨 **Medium Blog Integration** - Automatically fetches and displays your Medium articles with rich previews  
📚 **Interactive Project Docs** - Dynamic README viewer for showcasing project documentation  
🎭 **macOS-Style Dock Navigation** - Elegant, animated navigation inspired by macOS  
🌓 **Smart Theme System** - Persistent dark/light mode with system preference detection  
🚀 **Lenis Smooth Scroll** - Buttery-smooth scrolling experience throughout  
📱 **Fully Responsive** - Pixel-perfect on all devices from mobile to 4K displays  
⚡ **Google Analytics** - Built-in analytics integration for tracking visitor insights

---

## ⚡ Features

<table>
<tr>
<td width="50%">

### 🎨 Design & UX

- ✅ **Responsive Design** - Pixel-perfect on all devices
- ✅ **Dark/Light Mode** - Persistent theme with localStorage
- ✅ **Smooth Animations** - Lenis smooth scrolling
- ✅ **macOS-Style Dock** - Animated navigation with active state
- ✅ **Modern UI/UX** - Clean, intuitive interface
- ✅ **SCSS Modules** - Component-scoped styling

</td>
<td width="50%">

### 🚀 Functionality

- ✅ **Medium Integration** - Auto-fetch articles via RSS
- ✅ **Dynamic Routing** - SSR for blog posts and docs
- ✅ **README Viewer** - Interactive project documentation
- ✅ **Google Analytics** - Built-in tracking
- ✅ **SEO Optimized** - Meta tags and structured data
- ✅ **Image Optimization** - Next.js Image component

</td>
</tr>
</table>

### 📄 Page Overview

| Page               | Route            | Description                                           |
| ------------------ | ---------------- | ----------------------------------------------------- |
| **Home**           | `/`              | Main portfolio with skills, experience, and projects  |
| **Medium Blog**    | `/medium`        | Grid view of all Medium articles                      |
| **Blog Post**      | `/medium/[slug]` | Individual article with markdown rendering            |
| **Readme Hub**     | `/readme`        | Interactive checklist and project documentation index |
| **Project Readme** | `/readme/[slug]` | Detailed project documentation viewer                 |

---

## 🛠️ Tech Stack

<div align="center">

| Technology                                                                                            | Purpose    | Version | Features Used                                              |
| ----------------------------------------------------------------------------------------------------- | ---------- | ------- | ---------------------------------------------------------- |
| ![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js&logoColor=white) | Framework  | 16.0.3  | SSR, Dynamic Routing, Image Optimization, Script Component |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)      | UI Library | 19.2.0  | Hooks, Context API, Components                             |
| ![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=sass&logoColor=white)         | Styling    | 1.94.1  | Modules, Variables, Mixins                                 |
| ![Lucide](https://img.shields.io/badge/Lucide-F56565?style=flat-square&logo=lucide&logoColor=white)   | Icons      | 0.554.0 | React Icons                                                |
| ![Lenis](https://img.shields.io/badge/Lenis-4A90E2?style=flat-square)                                 | Scroll     | 1.3.15  | Smooth Scrolling                                           |
| ![React Markdown](https://img.shields.io/badge/React_Markdown-000000?style=flat-square)               | Parser     | 10.1.0  | Markdown Rendering, GFM, Raw HTML                          |

</div>

### Additional Dependencies

- **github-markdown-css** (^5.8.1) - Markdown styling for README viewer
- **rehype-raw** (^7.0.0) - HTML support in markdown
- **remark-gfm** (^4.0.1) - GitHub Flavored Markdown support

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/kuldeep-jadeja/portfolio_website.git
    cd portfolio_website
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up environment variables** (Optional)

    Create a `.env.local` file in the root directory:

    ```env
    # Google Analytics (if you want to change the tracking ID)
    NEXT_PUBLIC_GA_ID=G-H9RNHSBV4Y
    ```

4. **Run the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. **Open your browser**

    Navigate to [http://localhost:3000](http://localhost:3000) 🎉

### Available Scripts

| Command         | Description                                |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Start development server at localhost:3000 |
| `npm run build` | Build for production                       |
| `npm run start` | Start production server                    |

---

## 📂 Project Structure

```
portfolio_website/
│
├── 📁 components/              # Reusable React components
│   ├── Dock/                   # macOS-style animated dock navigation
│   │   ├── Dock.js            # Main dock component with active state
│   │   └── Dock.module.scss   # Dock styling
│   └── MainWrapper/            # Layout wrapper with theme toggle
│       ├── MainWrapper.js      # Wrapper component with Dock integration
│       └── MainWrapper.module.scss
│
├── 📁 contexts/                # React Context providers
│   └── ThemeContext.js         # Theme management (dark/light with localStorage)
│
├── 📁 pages/                   # Next.js pages & routing
│   ├── _app.js                 # Custom App (Lenis, Google Analytics, Theme)
│   ├── _document.js            # Custom Document
│   ├── index.js                # Home page (portfolio, skills, experience)
│   ├── api/                    # API routes
│   │   └── readme.js           # Fetch README content from GitHub
│   ├── medium/                 # Medium blog integration
│   │   ├── index.js            # Articles listing page
│   │   └── [slug].js           # Dynamic article detail page (SSR)
│   └── readme/                 # Project documentation
│       ├── index.js            # README hub with project index
│       └── [slug].js           # Dynamic README viewer with markdown
│
├── 📁 public/                  # Static assets (served from root)
│   ├── fonts/                  # Custom fonts
│   └── images/                 # Images (profile, project screenshots, GIFs)
│
├── 📁 styles/                  # Global & module styles
│   ├── globals.scss            # Global SCSS styles with theme variables
│   ├── github-markdown.css     # GitHub markdown styling
│   ├── Home.module.scss        # Home page styles
│   ├── MediumPageList.module.scss    # Medium articles grid
│   ├── MediumPageDetails.module.scss # Article detail page
│   ├── readme.module.scss      # README hub styles
│   └── readmeDetail.module.scss      # README viewer styles
│
├── 📄 next.config.mjs          # Next.js config (image domains, React strict mode)
├── 📄 jsconfig.json            # JavaScript configuration with path aliases
├── 📄 package.json             # Project dependencies and scripts
└── 📄 README.md                # This file!
```

### Key Architecture Decisions

- **SCSS Modules**: Component-scoped styling to prevent style conflicts
- **Context API**: Global theme state management without external libraries
- **Dynamic Routes**: SSR for blog posts and documentation for better SEO
- **Lenis Integration**: Smooth scrolling configured in `_app.js` for global effect
- **Image Optimization**: Next.js Image component with configured domains

---

## 💪🏻 Key Features Deep Dive

### 1. 🎭 macOS-Style Dock Navigation

An elegant, animated navigation system inspired by macOS:

- **Active State Tracking**: Automatically highlights current page
- **Smooth Transitions**: Animated limelight effect follows active item
- **Route Matching**: Smart detection of current route including nested paths
- **External Links**: Handles both internal routing and external links
- **Icons**: Lucide React icons for clean, scalable graphics

**Implementation**: `components/Dock/Dock.js`

### 2. 🌓 Persistent Theme System

Smart theme management with user preference persistence:

- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **LocalStorage**: Saves user preference across sessions
- **System Detection**: Respects OS color scheme preference on first visit
- **Global State**: Context API for theme state throughout the app
- **CSS Variables**: Dynamic theme variables in SCSS

**Implementation**: `contexts/ThemeContext.js`

### 3. 📝 Medium Blog Integration

Automatically fetches and displays your Medium articles:

- **RSS Feed Parsing**: Fetches articles from Medium RSS feed
- **Dynamic Routing**: SEO-friendly URLs generated from article titles
- **Image Extraction**: Automatically extracts thumbnail from article content
- **Markdown Rendering**: Rich content display with GitHub Flavored Markdown
- **SSR Support**: Server-side rendering for better SEO and performance

**Key Files**:

- `pages/medium/index.js` - Articles grid
- `pages/medium/[slug].js` - Article detail page

### 4. 📚 Interactive README Viewer

Showcase project documentation with style:

- **Dynamic Content**: Fetches README from GitHub repositories
- **Markdown Support**: Full GFM support with syntax highlighting
- **GitHub Styling**: Uses official GitHub markdown CSS
- **Project Index**: Interactive checklist and project cards
- **Navigation**: Easy access to all project documentation

**Key Files**:

- `pages/readme/index.js` - Project index hub
- `pages/readme/[slug].js` - README viewer
- `pages/api/readme.js` - API to fetch GitHub content

### 5. 🚀 Lenis Smooth Scrolling

Buttery-smooth scrolling throughout the site:

- **Optimized Performance**: RAF-based animation
- **Customizable Easing**: Fine-tuned easing curve
- **Mobile Support**: Touch-optimized experience
- **Global Implementation**: Configured in `_app.js`

### 6. 📊 Google Analytics Integration

Built-in analytics for tracking visitor insights:

- **Next.js Script Component**: Optimized loading strategy
- **Custom Tracking ID**: Easily configurable
- **Privacy-Friendly**: Respects user preferences

---

## 🎨 Customization

### Updating Personal Information

1. **Profile & Bio**
    - Edit `pages/index.js` - Update name, tagline, and about section
    - Work Experience section with company logos and details
    - Skills list with your tech stack

2. **Theme Colors**
    - Modify `styles/globals.scss`
    - Update CSS variables for `[data-theme="dark"]` and `[data-theme="light"]`

3. **Profile Image**
    - Replace `public/images/test(1).png` with your photo
    - Update company logos in `public/images/`

4. **Google Analytics**
    - Update tracking ID in `pages/_app.js`
    - Or set `NEXT_PUBLIC_GA_ID` in `.env.local`

### Customizing the Dock

Edit `components/Dock/Dock.js` to add/remove navigation items:

```javascript
const defaultItems = [
    { id: "home", icon: <Home />, label: "Home", href: "/" },
    {
        id: "github",
        icon: <Github />,
        label: "Github",
        href: "your-github-url",
        target: "_blank",
    },
    // Add more items...
];
```

### Integrating Your Medium Blog

The blog automatically fetches from Medium RSS. To use your own:

1. Update the RSS feed URL in the Medium page components
2. Your Medium username: `https://medium.com/feed/@your-username`

---

## 🚢 Deployment

### Deploy on Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kuldeep-jadeja/portfolio_website)

**Steps:**

1. **Push to GitHub**

    ```bash
    git add .
    git commit -m "Initial commit"
    git push origin main
    ```

2. **Import to Vercel**
    - Visit [vercel.com/new](https://vercel.com/new)
    - Import your GitHub repository
    - Vercel auto-detects Next.js and configures settings

3. **Configure Environment Variables** (if needed)
    - Add `NEXT_PUBLIC_GA_ID` in Vercel dashboard
    - Settings → Environment Variables

4. **Deploy** 🎉
    - Automatic deployments on every push
    - Preview deployments for pull requests
    - Production URL ready in minutes!

### Deploy on Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Environment Variables**: Add any required variables

### Deploy on AWS Amplify

1. Connect your repository
2. Use the Amplify Console
3. Configure build settings:
    ```yaml
    version: 1
    frontend:
        phases:
            preBuild:
                commands:
                    - npm install
            build:
                commands:
                    - npm run build
        artifacts:
            baseDirectory: .next
            files:
                - "**/*"
        cache:
            paths:
                - node_modules/**/*
    ```

### Self-Hosting

For traditional hosting:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

The app will run on `http://localhost:3000`. Use a process manager like PM2 for production:

```bash
npm install -g pm2
pm2 start npm --name "portfolio" -- start
```

---

## ⚡ Performance & SEO

### Performance Optimizations

- ✅ **Next.js Image Optimization**: Automatic image resizing and WebP conversion
- ✅ **Code Splitting**: Automatic route-based code splitting
- ✅ **Lazy Loading**: Images and components load on demand
- ✅ **SCSS Modules**: No CSS bloat, tree-shaking friendly
- ✅ **Lenis Smooth Scroll**: GPU-accelerated scrolling

### SEO Best Practices

- ✅ **Server-Side Rendering**: Dynamic pages rendered on server
- ✅ **Meta Tags**: Proper title and description tags
- ✅ **Semantic HTML**: Proper heading hierarchy
- ✅ **Alt Text**: All images have descriptive alt attributes
- ✅ **Sitemap Ready**: Easy to generate sitemap for search engines
- ✅ **Google Analytics**: Track and analyze traffic

### Lighthouse Scores (Target)

- 🟢 **Performance**: 90+
- 🟢 **Accessibility**: 95+
- 🟢 **Best Practices**: 95+
- 🟢 **SEO**: 100

---

## 🛠️ Troubleshooting

### Common Issues

**Issue**: Images not loading

- **Solution**: Ensure image domains are configured in `next.config.mjs`

**Issue**: Theme not persisting

- **Solution**: Check browser localStorage permissions

**Issue**: Smooth scroll not working

- **Solution**: Verify Lenis is properly initialized in `_app.js`

**Issue**: Build fails

- **Solution**:
    ```bash
    rm -rf .next node_modules
    npm install
    npm run build
    ```

---

## 📚 Learn More

### Useful Links

- [React Documentation](https://react.dev/)
- [Sass Documentation](https://sass-lang.com/documentation)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)
- [Lucide Icons](https://lucide.dev/)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/kuldeep-jadeja/portfolio_website/issues) if you want to contribute.

### How to Contribute

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

You're free to use this portfolio as a template for your own! Just make sure to:

- Update all personal information
- Replace images with your own
- Customize the styling to match your brand
- Give credit if you'd like (appreciated but not required!)

---

## 👨‍💻 Contact

<div align="center">

**Kuldeepsinh Jadeja**

Full-Stack Software Engineer | MERN Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kuldeepsinh-jadeja/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/kuldeep-jadeja/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your-email@example.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white)](https://kuldeepjadeja.dev)

**💼 Open to opportunities and collaborations!**

</div>

---

## 🌟 Showcase

### Featured Projects

This portfolio showcases several key projects:

1. **Award Winning Slider** 🎠
    - Modern image carousel with GSAP animations
    - Technologies: HTML5, CSS3, JavaScript, jQuery, Slick Carousel
    - [Live Demo](https://award-winning-slider.kuldeepjadeja.dev/) | [GitHub](https://github.com/kuldeep-jadeja/AwardWinningSlider)

2. **Ultimate Self-Hosted File Server** 💪🏻
    - Node.js file server with Express and Flmngr
    - Technologies: Node.js, Express.js, Flmngr, Multer
    - [Live Demo](https://files.kuldeepjadeja.dev/file-server) | [GitHub](https://github.com/kuldeep-jadeja/clipper-file-server)

3. **Automated Twitch Clipper** ⚡
    - AI-powered clip detection and social media automation
    - Technologies: Next.js, Node.js, MongoDB, Redis, BullMQ, FFmpeg
    - _Private repository - Coming soon!_

---

<div align="center">

### 💫 _Built with passion and ❤️_

**If you found this project helpful or inspiring, please consider giving it a ⭐!**

**Made with ☕ by [Kuldeepsinh Jadeja](https://github.com/kuldeep-jadeja/)**

---

_© 2025 Kuldeepsinh Jadeja. All rights reserved._

</div>
