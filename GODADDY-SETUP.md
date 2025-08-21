# 🌐 GoDaddy Domain Setup for GitHub Pages

This guide shows you exactly how to configure your GoDaddy domain (s3migration.com) to work with your GitHub Pages website.

## 🎯 Overview

You'll configure DNS records in GoDaddy to point your domain to GitHub Pages servers, then configure GitHub to serve your site on that custom domain.

## 📋 Step-by-Step Setup

### Step 1: Configure DNS in GoDaddy

1. **Login to GoDaddy**
   - Go to [godaddy.com](https://godaddy.com)
   - Login to your account
   - Go to "My Products" → "Domains"

2. **Access DNS Management**
   - Find your domain `s3migration.com`
   - Click the **DNS** button (or "Manage DNS")

3. **Configure DNS Records**

   **Delete existing records** (if any):
   - Delete any existing A records for `@`
   - Delete any existing CNAME records for `www`

   **Add new A records** (for apex domain):
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   TTL: 1 Hour
   
   Type: A
   Name: @
   Value: 185.199.109.153
   TTL: 1 Hour
   
   Type: A
   Name: @
   Value: 185.199.110.153
   TTL: 1 Hour
   
   Type: A
   Name: @
   Value: 185.199.111.153
   TTL: 1 Hour
   ```

   **Add CNAME record** (for www subdomain):
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   TTL: 1 Hour
   ```
   
   **Replace `yourusername`** with your actual GitHub username!

### Step 2: Configure GitHub Pages

1. **Go to your repository on GitHub**
   - Navigate to your `s3migration.com` repository
   - Go to **Settings** → **Pages**

2. **Set Custom Domain**
   - In the "Custom domain" field, enter: `s3migration.com`
   - Click **Save**
   - GitHub will automatically create a `CNAME` file in your repo

3. **Enable HTTPS**
   - Wait 5-10 minutes for DNS to propagate
   - Check **Enforce HTTPS** (this may take 24-48 hours to become available)

## 🔧 GoDaddy DNS Configuration Screenshots

Here's exactly what your GoDaddy DNS should look like:

```
DNS Records for s3migration.com:

┌─────────┬──────┬─────────────────────┬─────────┐
│ Type    │ Name │ Value               │ TTL     │
├─────────┼──────┼─────────────────────┼─────────┤
│ A       │ @    │ 185.199.108.153     │ 1 Hour  │
│ A       │ @    │ 185.199.109.153     │ 1 Hour  │
│ A       │ @    │ 185.199.110.153     │ 1 Hour  │
│ A       │ @    │ 185.199.111.153     │ 1 Hour  │
│ CNAME   │ www  │ yourusername.github.io │ 1 Hour  │
└─────────┴──────┴─────────────────────┴─────────┘

Note: Replace 'yourusername' with your actual GitHub username
```

## ⚠️ Important Notes

### DNS Propagation
- DNS changes can take **15 minutes to 48 hours** to propagate globally
- Use [dnschecker.org](https://dnschecker.org) to check propagation status
- Test with: `dig s3migration.com` or `nslookup s3migration.com`

### GitHub Username
- **Critical**: Replace `yourusername.github.io` with your actual GitHub username
- Example: If your GitHub username is `john-doe`, use `john-doe.github.io`
- Find your username at the top right of GitHub when logged in

### SSL Certificate
- HTTPS will be available 24-48 hours after DNS propagation
- GitHub automatically provisions SSL certificates for custom domains
- Don't enable "Enforce HTTPS" until the certificate is ready

## 🧪 Testing Your Setup

### 1. Check DNS Configuration
```bash
# Test A records
dig s3migration.com A

# Should return GitHub's IP addresses:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153

# Test CNAME record
dig www.s3migration.com CNAME

# Should return: yourusername.github.io
```

### 2. Test Website Access
```bash
# Test main domain (may take time to work)
curl -I http://s3migration.com

# Test GitHub Pages directly (should work immediately)
curl -I https://yourusername.github.io/repository-name/
```

### 3. Online Tools
- **DNS Checker**: [dnschecker.org](https://dnschecker.org)
- **SSL Checker**: [sslshopper.com/ssl-checker.html](https://sslshopper.com/ssl-checker.html)
- **Domain Health**: [mxtoolbox.com](https://mxtoolbox.com/SuperTool.aspx)

## 🚨 Troubleshooting

### Common Issues

#### 1. "Domain not found" or 404 Error
**Cause**: DNS not propagated or incorrect configuration

**Solutions**:
```bash
# Check if DNS has propagated
nslookup s3migration.com

# If no results, wait longer or check GoDaddy configuration
# Ensure A records point to correct GitHub IPs
```

#### 2. "Repository not found"
**Cause**: Incorrect CNAME record or repository settings

**Solutions**:
- Verify CNAME points to `yourusername.github.io` (not the repo name)
- Check repository is public
- Verify custom domain setting in GitHub Pages

#### 3. SSL/HTTPS Issues
**Cause**: Certificate not ready or DNS issues

**Solutions**:
- Wait 24-48 hours after DNS propagation
- Temporarily disable "Enforce HTTPS"
- Re-save the custom domain in GitHub settings

#### 4. "www" subdomain not working
**Cause**: Missing or incorrect CNAME record

**Solutions**:
```
# Ensure CNAME record exists:
Type: CNAME
Name: www
Value: yourusername.github.io
```

### Step-by-Step Debugging

1. **Check GoDaddy DNS**:
   - Login to GoDaddy
   - Verify all 4 A records are present
   - Verify CNAME record points to `yourusername.github.io`

2. **Check GitHub Settings**:
   - Repository Settings → Pages
   - Custom domain shows `s3migration.com`
   - Source is set to "Deploy from a branch" or "GitHub Actions"

3. **Wait and Test**:
   - Wait 2-4 hours minimum
   - Test with `dig s3migration.com`
   - Try accessing the site

## 📞 Getting Help

### GoDaddy Support
- **Phone**: Available 24/7
- **Chat**: Available on their website
- **Help**: [godaddy.com/help](https://godaddy.com/help)

### GitHub Support
- **GitHub Pages Docs**: [docs.github.com/pages](https://docs.github.com/pages)
- **Community Forum**: [github.community](https://github.community)

### DNS Tools
- **What's My DNS**: [whatsmydns.net](https://whatsmydns.net)
- **DNS Propagation**: [dnschecker.org](https://dnschecker.org)
- **MX Toolbox**: [mxtoolbox.com](https://mxtoolbox.com)

## ✅ Final Checklist

Before considering the setup complete:

- [ ] All 4 A records added to GoDaddy DNS
- [ ] CNAME record for www added to GoDaddy DNS
- [ ] Custom domain configured in GitHub Pages settings
- [ ] CNAME file exists in repository
- [ ] DNS propagation complete (test with dig/nslookup)
- [ ] Website loads at s3migration.com
- [ ] Website loads at www.s3migration.com
- [ ] HTTPS works (may take 24-48 hours)
- [ ] All pages and links work correctly

## 🎉 Success!

Once everything is working:

1. **Test thoroughly**: Check all pages, downloads, links
2. **Monitor**: Use GitHub Pages insights to track visitors
3. **Update content**: Your site will auto-deploy when you push changes
4. **Enjoy**: You now have a professional website with zero hosting costs!

---

**Need help?** Create an issue in your repository with:
- Your GitHub username
- Screenshots of GoDaddy DNS settings
- Error messages you're seeing
- Results of `dig s3migration.com`