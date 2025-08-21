# S3 Migration Scheduler Website

This repository contains the official website for [S3 Migration Scheduler](https://github.com/hndrwn-dk/s3-migration-scheduler) - an enterprise-grade, open-source tool for S3 data migrations.

🌐 **Live Site**: [s3migration.com](https://s3migration.com)

## 🏗️ Architecture

This website is built with **Jekyll** and deployed to **GitHub Pages** for:
- ✅ Zero server costs
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Seamless GitHub integration
- ✅ Automatic deployments

### Technology Stack

- **Static Site Generator**: Jekyll 4.x
- **Hosting**: GitHub Pages
- **Domain**: s3migration.com (custom domain)
- **Deployment**: GitHub Actions
- **Styling**: Sass/SCSS with modern CSS
- **JavaScript**: Vanilla JS with GitHub API integration
- **Icons**: SVG icons and emoji

## 📁 Repository Structure

```
s3migration.com/
├── _config.yml              # Jekyll configuration
├── _layouts/                # Page layouts
│   ├── default.html         # Main layout with nav/footer
│   ├── page.html           # Standard page layout
│   └── docs.html           # Documentation layout
├── _docs/                   # Documentation pages
│   ├── index.md            # Documentation home
│   ├── installation.md     # Installation guide
│   ├── quick-start.md      # Quick start guide
│   └── ...                 # Other docs
├── assets/                  # Static assets
│   ├── css/style.scss      # Main stylesheet
│   ├── js/main.js          # JavaScript functionality
│   └── images/             # Images and icons
├── .github/workflows/       # GitHub Actions
│   ├── deploy.yml          # Main deployment workflow
│   └── sync-releases.yml   # Release sync from main repo
├── index.html              # Homepage
├── downloads.html          # Downloads page
├── CNAME                   # Custom domain configuration
└── README.md              # This file
```

## 🚀 Key Features

### Homepage
- **Hero Section**: Compelling value proposition with terminal demo
- **Features Grid**: Key capabilities and benefits
- **Quick Start**: Multi-platform installation options
- **Downloads**: Platform-specific download links
- **Community**: GitHub stats and community links

### Downloads Page
- **Platform Detection**: Auto-detect user's OS
- **GitHub API Integration**: Real-time release information
- **Multiple Formats**: Docker, desktop apps, source code
- **Installation Help**: Links to documentation

### Documentation
- **Comprehensive Guides**: Installation, quick start, configuration
- **Searchable**: Client-side search functionality
- **Mobile-Friendly**: Responsive design
- **Auto-Generated**: Navigation from folder structure

### GitHub Integration
- **Release Sync**: Automatic updates from main repository
- **Live Stats**: GitHub stars, downloads, contributors
- **Download Links**: Direct links to GitHub releases
- **Issue Tracking**: Links to GitHub issues and discussions

## 🔄 Automated Workflows

### Main Deployment (`deploy.yml`)
- **Trigger**: Push to `main` branch
- **Process**: Jekyll build → GitHub Pages deployment
- **Features**: Ruby setup, dependency caching, artifact upload

### Release Sync (`sync-releases.yml`)
- **Trigger**: New release in main repository
- **Process**: Fetch release info → Update website → Commit changes
- **Updates**: Version numbers, changelog, download links
- **Frequency**: Real-time + daily check

## 🛠️ Development

### Prerequisites
- Ruby 3.1+
- Bundler
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/hndrwn-dk/s3migration.com.git
cd s3migration.com

# Install dependencies
bundle install

# Start local server
bundle exec jekyll serve

# Open in browser
open http://localhost:4000
```

### Making Changes

1. **Content Changes**: Edit Markdown files in `_docs/` or HTML files in root
2. **Styling**: Modify `assets/css/style.scss`
3. **Functionality**: Update `assets/js/main.js`
4. **Configuration**: Adjust `_config.yml`

### Testing

```bash
# Build site
bundle exec jekyll build

# Serve with drafts
bundle exec jekyll serve --drafts

# Check for broken links (if using html-proofer)
bundle exec htmlproofer ./_site
```

## 📝 Content Management

### Adding Documentation
1. Create new `.md` file in `_docs/`
2. Add front matter with layout and title
3. Update navigation in `_layouts/docs.html`

### Updating Releases
Releases are automatically synced from the main repository, but you can manually trigger:

```bash
# Trigger sync workflow
gh workflow run sync-releases.yml
```

### Modifying Download Links
Download links are automatically generated from GitHub releases. To customize:
1. Edit `assets/js/main.js`
2. Modify the `updateDownloadLinks` function

## 🎨 Design System

### Colors
- **Primary**: `#2563eb` (Blue)
- **Secondary**: `#64748b` (Slate)
- **Accent**: `#06b6d4` (Cyan)
- **Success**: `#10b981` (Green)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: 600-800 weight
- **Body**: 400 weight
- **Code**: Monaco, Menlo, Ubuntu Mono

### Components
- **Buttons**: Primary, secondary, outline variants
- **Cards**: Feature cards, download cards, help cards
- **Code Blocks**: Syntax highlighted with copy buttons
- **Navigation**: Sticky header with mobile toggle

## 🔧 Configuration

### Custom Domain
The site uses `s3migration.com` as configured in:
- `CNAME` file
- GitHub Pages settings
- DNS configuration (external)

### Jekyll Configuration
Key settings in `_config.yml`:
```yaml
title: S3 Migration Scheduler
description: Enterprise S3 Migration Made Simple
url: "https://s3migration.com"
github:
  repository_url: "https://github.com/hndrwn-dk/s3-migration-scheduler"
docker:
  hub_url: "https://hub.docker.com/r/hndrwn/s3-migration-scheduler"
```

### GitHub API Integration
The site fetches real-time data from:
- Repository information (stars, forks)
- Latest releases (version, assets)
- Contributors count
- Download statistics

## 🚀 Deployment

### Automatic Deployment
- **Trigger**: Push to `main` branch
- **Build Time**: ~2-3 minutes
- **CDN Update**: ~5-10 minutes globally

### Manual Deployment
```bash
# Build locally
bundle exec jekyll build

# Deploy to GitHub Pages (automatic via Actions)
git push origin main
```

### Environment Variables
No environment variables required - all configuration is in `_config.yml`.

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** locally
5. **Submit** a pull request

### Guidelines
- Follow existing code style
- Test on mobile devices
- Optimize images before adding
- Update documentation for new features

## 📊 Analytics & Monitoring

### GitHub Pages Analytics
- Built-in GitHub Pages insights
- Traffic and popular pages
- Referrer information

### Performance Monitoring
- Lighthouse CI (can be added)
- Core Web Vitals tracking
- Page load speed optimization

## 🔗 Related Repositories

- **Main Project**: [s3-migration-scheduler](https://github.com/hndrwn-dk/s3-migration-scheduler)
- **Docker Images**: [Docker Hub](https://hub.docker.com/r/hndrwn/s3-migration-scheduler)

## 📄 License

This website is open source under the MIT License. See [LICENSE](LICENSE) for details.

The S3 Migration Scheduler project itself is also MIT licensed.

## 🆘 Support

- **Website Issues**: [GitHub Issues](https://github.com/hndrwn-dk/s3migration.com/issues)
- **Product Support**: [Main Repository](https://github.com/hndrwn-dk/s3-migration-scheduler/issues)
- **Community**: [GitHub Discussions](https://github.com/hndrwn-dk/s3-migration-scheduler/discussions)

---

**Built with ❤️ using Jekyll and GitHub Pages**