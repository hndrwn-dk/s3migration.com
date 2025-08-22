---
layout: docs
title: Installation
description: Install S3 Migration Scheduler on your platform - Docker, Windows, Linux, or build from source.
---

# Installation Guide

S3 Migration Scheduler is available for all major platforms. Choose the installation method that works best for your environment.

## Docker (Recommended) {#docker}

Docker is the fastest way to get started. No installation required, works everywhere Docker runs.

### Prerequisites
- Docker 20.10 or later
- At least 2GB RAM
- Network access to your S3 endpoints

### Quick Start

```bash
# Pull the latest image
docker pull hndrwn/s3-migration-scheduler:latest

# Run the container
docker run -d \
  --name s3-migration \
  -p 8080:8080 \
  -v s3-migration-data:/app/data \
  hndrwn/s3-migration-scheduler:latest

# Access the web interface
open http://localhost:8080
```

### Docker Compose (Production)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  s3-migration:
    image: hndrwn/s3-migration-scheduler:latest
    container_name: s3-migration-scheduler
    ports:
      - '8080:8080'
    volumes:
      - ./config:/app/config
      - ./data:/app/data
      - ./logs:/app/logs
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

Run with Docker Compose:

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f s3-migration

# Stop services
docker-compose down
```

### Docker Hub
Visit [hndrwn/s3-migration-scheduler](https://hub.docker.com/r/hndrwn/s3-migration-scheduler) on Docker Hub for more information and tags.

## Desktop Applications {#desktop}

Native desktop applications with GUI interface for easy migration management.

### Windows {#windows}

#### System Requirements
- Windows 10 or later
- At least 4GB RAM
- 500MB free disk space

#### Download Options

**Windows Installer (x64)** - Recommended for most users
```
https://github.com/hndrwn-dk/s3-migration-scheduler/releases/download/v1.1.0/S3.Migration.Scheduler-1.1.0-win-x64.exe
```

**Portable Version (x64)** - No installation required
```
https://github.com/hndrwn-dk/s3-migration-scheduler/releases/download/v1.1.0/S3.Migration.Scheduler-1.1.0-win-x64.exe
```

Or visit the [Downloads page]({{ '/downloads/' | relative_url }}) for the latest versions.

#### Installation Steps

1. **Download** the Windows installer (.exe) from above
2. **Run the installer** as Administrator if prompted
3. **Follow the setup wizard** to complete installation
4. **Launch** from Start Menu or Desktop shortcut

#### Configuration Locations
- **Settings**: `%APPDATA%\S3MigrationScheduler\config.yml`
- **Logs**: `%APPDATA%\S3MigrationScheduler\logs\`
- **Data**: `%APPDATA%\S3MigrationScheduler\data\`

#### Older Windows Platforms
For Windows 7, 8, or other legacy versions, please check the [GitHub Releases page](https://github.com/hndrwn-dk/s3-migration-scheduler/releases) for compatible versions.



### Linux {#linux}

#### System Requirements
- Modern Linux distribution (Ubuntu 20.04+, CentOS 8+, etc.)
- At least 4GB RAM
- 500MB free disk space

#### Download Options

**AppImage (Universal)** - Works on most Linux distributions
```
https://github.com/hndrwn-dk/s3-migration-scheduler/releases/download/v1.1.0/S3.Migration.Scheduler-1.1.0.AppImage
```

**Debian/Ubuntu (.deb)**
```
https://github.com/hndrwn-dk/s3-migration-scheduler/releases/download/v1.1.0/s3-migration-scheduler-desktop_1.1.0_amd64.deb
```

**Red Hat/Fedora (.rpm)**
```
https://github.com/hndrwn-dk/s3-migration-scheduler/releases/download/v1.1.0/s3-migration-scheduler-desktop-1.1.0.x86_64.rpm
```

**Tarball (.tar.gz)**
```
https://github.com/hndrwn-dk/s3-migration-scheduler/releases/download/v1.1.0/s3-migration-scheduler-desktop-1.1.0.tar.gz
```

#### AppImage Installation

The AppImage format works on most Linux distributions without installation:

```bash
# Download AppImage
wget https://github.com/hndrwn-dk/s3-migration-scheduler/releases/download/v1.1.0/S3.Migration.Scheduler-1.1.0.AppImage

# Make executable
chmod +x S3.Migration.Scheduler-1.1.0.AppImage

# Run directly
./S3.Migration.Scheduler-1.1.0.AppImage

```

#### Debian/Ubuntu (.deb)

# Download
wget https://github.com/hndrwn-dk/s3-migration-scheduler/releases/latest/download/s3-migration-scheduler-desktop_1.0.0_amd64.deb

# Install
sudo dpkg -i s3-migration-scheduler-desktop_1.0.0_amd64.deb
sudo apt-get install -f  # Fix dependencies if needed

# Launch from menu or command line
s3-migration-scheduler-desktop
```


#### Red Hat/Fedora (.rpm)

```bash
# Download and install
wget https://github.com/hndrwn-dk/s3-migration-scheduler/releases/latest/download/s3-migration-scheduler-x86_64.rpm
sudo rpm -i s3-migration-scheduler-x86_64.rpm

# Or using dnf
sudo dnf install s3-migration-scheduler-x86_64.rpm

# Start the application
s3-migration-scheduler
```

#### Tarball (Generic)

```bash
# Download and extract
wget https://github.com/hndrwn-dk/s3-migration-scheduler/releases/latest/download/s3-migration-scheduler-linux-x64.tar.gz
tar -xzf s3-migration-scheduler-linux-x64.tar.gz
cd s3-migration-scheduler

# Run directly
./s3-migration-scheduler

# Optional: Install system-wide
sudo cp s3-migration-scheduler /usr/local/bin/
sudo cp s3-migration-scheduler.desktop /usr/share/applications/
sudo cp icons/* /usr/share/icons/hicolor/256x256/apps/
```

#### Configuration Location
- **Settings**: `~/.config/s3-migration-scheduler/config.yml`
- **Logs**: `~/.local/share/s3-migration-scheduler/logs/`
- **Data**: `~/.local/share/s3-migration-scheduler/data/`

## Build from Source {#source}

For developers and contributors who want to build from source.

### Prerequisites

- **Node.js 18** or later
- **npm** or **yarn**
- **Git**

### Build Steps

```bash
# Clone the repository
git clone https://github.com/hndrwn-dk/s3-migration-scheduler.git
cd s3-migration-scheduler

# Install dependencies
npm install

# Build the application
npm run build

# Start the application
npm start
```

The application will be available at http://localhost:8080

### Development Mode

```bash
# Run in development mode with hot reload
npm run dev

# Clean build artifacts
make clean
```

### Additional Development Commands

```bash
# Run tests
npm test

# Run linter
npm run lint

# Clean build artifacts
npm run clean

```

## Verification

After installation, verify that S3 Migration Scheduler is working correctly:

### Check Version
```bash
# Command line
s3-migration-scheduler --version

# Docker
docker run --rm hndrwn/s3-migration-scheduler:latest --version

# Web interface
curl http://localhost:8080/api/version
```

### Health Check
```bash
# Web interface health check
curl http://localhost:8080/health

# Expected response
{
  "status": "healthy",
  "version": "1.0.0",
  "uptime": "5m30s",
  "database": "connected",
  "storage": "accessible"
}
```

## Troubleshooting

### Common Issues

#### Permission Denied (Linux)
```bash
# Make the binary executable
chmod +x s3-migration-scheduler

# Or for AppImage
chmod +x S3MigrationScheduler-x86_64.AppImage
```

#### Port Already in Use
```bash
# Check what's using port 8080
lsof -i :8080

# Use a different port
s3-migration-scheduler --port 8081

# Or in Docker
docker run -p 8081:8080 hndrwn/s3-migration-scheduler:latest
```

#### Missing Dependencies (Linux)
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install libc6 libgcc1 libstdc++6

# CentOS/RHEL
sudo yum install glibc libgcc libstdc++

# Or use the static binary
wget https://github.com/hndrwn-dk/s3-migration-scheduler/releases/latest/download/s3-migration-scheduler-linux-static
```

### Getting Help

If you encounter issues during installation:

1. **Check the [Troubleshooting Guide]({{ '/docs/troubleshooting/' | relative_url }})**
2. **Search [GitHub Issues]({{ site.github.repository_url }}/issues)**
3. **Ask for help in [Discussions]({{ site.github.repository_url }}/discussions)**
4. **Join our community chat** (link in repository)

## Next Steps

After successful installation:

1. **[Quick Start Guide]({{ '/docs/quick-start/' | relative_url }})** - Run your first migration
2. **[Configuration]({{ '/docs/configuration/' | relative_url }})** - Customize for your needs
3. **[Migration Workflows]({{ '/docs/migration-workflows/' | relative_url }})** - Learn best practices

---

*Having trouble? Check our [FAQ]({{ '/docs/faq/' | relative_url }}) or reach out to the community for help.*
