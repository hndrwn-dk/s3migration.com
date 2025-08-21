# 🚀 Deployment Guide for s3migration.com

This guide walks you through deploying the S3 Migration Scheduler website to GitHub Pages with a custom domain.

## 📋 Prerequisites

Before you begin, ensure you have:
- [ ] GitHub account with repository access
- [ ] Domain name purchased (s3migration.com)
- [ ] DNS management access for your domain
- [ ] Basic understanding of GitHub Actions

## 🏗️ Step 1: Repository Setup

### 1.1 Create GitHub Repository

```bash
# Create new repository on GitHub
# Repository name: s3migration.com (or your preferred name)
# Make it public for GitHub Pages

# Clone this workspace to your repository
git clone <your-repo-url>
cd s3migration.com

# Add all files from this workspace
cp -r /workspace/* .
cp /workspace/.* . 2>/dev/null || true

# Initial commit
git add .
git commit -m "🎉 Initial website setup with Jekyll and GitHub Pages"
git push origin main
```

### 1.2 Repository Settings

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Configure source:
   - **Source**: Deploy from a branch
   - **Branch**: `main` (or use GitHub Actions for more control)
   - **Folder**: `/ (root)`

## 🌐 Step 2: Domain Configuration

### 2.1 DNS Configuration

Configure your DNS provider with these records:

```dns
# A Records (point to GitHub Pages IPs)
@ A 185.199.108.153
@ A 185.199.109.153
@ A 185.199.110.153
@ A 185.199.111.153

# CNAME Record (for www subdomain)
www CNAME hndrwn-dk.github.io.

# Optional: CNAME for specific subdomain
# Replace 'hndrwn-dk' with your GitHub username
```

### 2.2 GitHub Pages Custom Domain

1. In your repository settings, go to **Pages**
2. Under **Custom domain**, enter: `s3migration.com`
3. Check **Enforce HTTPS** (wait for SSL certificate provisioning)
4. GitHub will automatically create/update the `CNAME` file

### 2.3 Verify Domain

```bash
# Check DNS propagation
dig s3migration.com
nslookup s3migration.com

# Test HTTPS
curl -I https://s3migration.com
```

## ⚙️ Step 3: GitHub Actions Setup

### 3.1 Enable GitHub Actions

The repository includes two workflows:

1. **`deploy.yml`** - Main deployment workflow
2. **`sync-releases.yml`** - Sync releases from main repository

### 3.2 Configure Permissions

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**

### 3.3 Enable Pages Deployment

1. Go to **Settings** → **Pages**
2. Change source to: **GitHub Actions**
3. The deploy workflow will now handle builds and deployments

## 🔄 Step 4: Release Synchronization

### 4.1 Configure Main Repository Integration

Update the repository URLs in `_config.yml`:

```yaml
# GitHub repository info
github:
  repository_url: "https://github.com/hndrwn-dk/s3-migration-scheduler"
  releases_url: "https://api.github.com/repos/hndrwn-dk/s3-migration-scheduler/releases"

# Docker info
docker:
  hub_url: "https://hub.docker.com/r/hndrwn/s3-migration-scheduler"
  image_name: "hndrwn/s3-migration-scheduler"
```

### 4.2 Setup Webhook (Optional)

For real-time release sync, configure a webhook in your main repository:

1. Go to main repository **Settings** → **Webhooks**
2. Add webhook:
   - **Payload URL**: `https://api.github.com/repos/hndrwn-dk/s3migration.com/dispatches`
   - **Content type**: `application/json`
   - **Events**: Just the push event
   - **Active**: ✅

## 🧪 Step 5: Testing

### 5.1 Local Testing

```bash
# Install dependencies
bundle install

# Start local server
bundle exec jekyll serve

# Test in browser
open http://localhost:4000
```

### 5.2 Production Testing

```bash
# Test main domain
curl -I https://s3migration.com

# Test www redirect
curl -I https://www.s3migration.com

# Test specific pages
curl -I https://s3migration.com/downloads/
curl -I https://s3migration.com/docs/
```

### 5.3 Performance Testing

```bash
# Test page speed
lighthouse https://s3migration.com

# Test mobile responsiveness
# Use browser dev tools or online tools
```

## 📊 Step 6: Monitoring & Analytics

### 6.1 GitHub Pages Analytics

GitHub provides basic analytics in repository insights:
- **Traffic** → **Views** and **Clones**
- **Popular content** and **Referring sites**

### 6.2 Google Analytics (Optional)

Add Google Analytics to `_layouts/default.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔧 Step 7: Customization

### 7.1 Update Site Configuration

Edit `_config.yml` to match your setup:

```yaml
title: Your Site Title
description: Your site description
url: "https://yourdomain.com"
author:
  name: "Your Name"
  email: "your-email@domain.com"
```

### 7.2 Update Contact Information

Update footer and contact information in:
- `_layouts/default.html`
- Contact forms or email links
- Social media links

### 7.3 Customize Styling

Modify `assets/css/style.scss` for:
- Brand colors
- Typography
- Layout adjustments
- Custom components

## 🚨 Troubleshooting

### Common Issues

#### 1. Site Not Loading
```bash
# Check DNS
dig yourdomain.com

# Check GitHub Pages status
curl -I https://yourusername.github.io/repository-name/
```

#### 2. Build Failures
```bash
# Check workflow logs in GitHub Actions tab
# Common issues:
# - Ruby version mismatch
# - Missing dependencies
# - Syntax errors in YAML/Markdown
```

#### 3. Custom Domain Not Working
```bash
# Verify CNAME file exists and contains correct domain
cat CNAME

# Check DNS propagation
nslookup yourdomain.com 8.8.8.8
```

#### 4. SSL Certificate Issues
- Wait 24-48 hours for SSL provisioning
- Ensure DNS is correctly configured
- Try disabling and re-enabling custom domain

### Debug Commands

```bash
# Test Jekyll build locally
bundle exec jekyll build --verbose

# Check for broken links
bundle exec jekyll build
# Use html-proofer if installed
bundle exec htmlproofer ./_site --check-html --check-favicon

# Validate HTML
validator https://yourdomain.com
```

## 📚 Additional Resources

### Documentation
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Tools
- [DNS Checker](https://dnschecker.org/)
- [SSL Checker](https://www.sslshopper.com/ssl-checker.html)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## ✅ Post-Deployment Checklist

- [ ] Domain resolves correctly
- [ ] HTTPS is working
- [ ] All pages load without errors
- [ ] Mobile responsiveness is good
- [ ] Download links work
- [ ] GitHub API integration functions
- [ ] Contact forms/links work
- [ ] SEO meta tags are present
- [ ] Analytics are tracking (if enabled)
- [ ] Performance is acceptable

## 🔄 Maintenance

### Regular Tasks

**Weekly:**
- Check for broken links
- Verify download links work
- Monitor site performance

**Monthly:**
- Review analytics
- Update dependencies
- Check for security updates

**As Needed:**
- Update content
- Sync with main repository releases
- Respond to user feedback

---

## 🆘 Support

If you encounter issues:

1. **Check GitHub Actions logs** for build errors
2. **Review this guide** for missed steps
3. **Search GitHub Issues** for similar problems
4. **Create an issue** with detailed error information

**Happy deploying! 🚀**