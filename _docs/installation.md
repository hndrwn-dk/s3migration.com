---
layout: docs
title: Installation
description: Install S3 Migration Scheduler on your platform - Docker, Windows, macOS, Linux, or build from source.
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

# Run with default configuration
docker run -d \
  --name s3-migration \
  -p 8080:8080 \
  hndrwn/s3-migration-scheduler:latest

# Access the web interface
open http://localhost:8080
```

### With Custom Configuration

```bash
# Create a config directory
mkdir -p ./config

# Create your configuration file
cat > ./config/config.yml << EOF
source:
  endpoint: "https://s3.amazonaws.com"
  bucket: "my-source-bucket"
  region: "us-east-1"
  
destination:
  endpoint: "https://s3.us-west-2.amazonaws.com"
  bucket: "my-destination-bucket"
  region: "us-west-2"
EOF

# Run with custom config
docker run -d \
  --name s3-migration \
  -p 8080:8080 \
  -v $(pwd)/config:/app/config \
  hndrwn/s3-migration-scheduler:latest
```

### Docker Compose

For production deployments, use Docker Compose:

```yaml
# docker-compose.yml
version: '3.8'

services:
  s3-migration:
    image: hndrwn/s3-migration-scheduler:latest
    container_name: s3-migration
    ports:
      - "8080:8080"
    volumes:
      - ./config:/app/config
      - ./logs:/app/logs
      - ./data:/app/data
    environment:
      - LOG_LEVEL=info
      - MAX_WORKERS=8
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # Optional: Add a reverse proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - s3-migration
```

```bash
# Start the stack
docker-compose up -d

# View logs
docker-compose logs -f s3-migration

# Stop the stack
docker-compose down
```

## Desktop Applications {#desktop}

Native desktop applications with GUI interface for easy migration management.

### Windows {#windows}

#### System Requirements
- Windows 10 version 1903 or later
- .NET 6.0 Runtime (included in installer)
- At least 4GB RAM
- 500MB free disk space

#### Installation Steps

1. **Download the installer** from the [Downloads page]({{ '/downloads/' | relative_url }})
2. **Run the installer** as Administrator
3. **Follow the setup wizard**
4. **Launch from Start Menu** or Desktop shortcut

#### Alternative Installation Methods

```powershell
# Using Chocolatey
choco install s3-migration-scheduler

# Using Winget
winget install hndrwn.S3MigrationScheduler

# Portable version (no installation required)
# Download the ZIP file and extract to any folder
```

#### Configuration Location
- **Settings**: `%APPDATA%\S3MigrationScheduler\config.yml`
- **Logs**: `%APPDATA%\S3MigrationScheduler\logs\`
- **Data**: `%APPDATA%\S3MigrationScheduler\data\`

### macOS {#macos}

#### System Requirements
- macOS 11.0 (Big Sur) or later
- Intel or Apple Silicon Mac
- At least 4GB RAM
- 500MB free disk space

#### Installation Steps

1. **Download the DMG** from the [Downloads page]({{ '/downloads/' | relative_url }})
2. **Open the DMG** and drag the app to Applications folder
3. **Right-click the app** and select "Open" (first launch only)
4. **Grant necessary permissions** when prompted

#### Alternative Installation Methods

```bash
# Using Homebrew
brew install --cask s3-migration-scheduler

# Using MacPorts
sudo port install s3-migration-scheduler
```

#### Configuration Location
- **Settings**: `~/Library/Application Support/S3MigrationScheduler/config.yml`
- **Logs**: `~/Library/Logs/S3MigrationScheduler/`
- **Data**: `~/Library/Application Support/S3MigrationScheduler/data/`

### Linux {#linux}

#### System Requirements
- Modern Linux distribution (Ubuntu 20.04+, CentOS 8+, etc.)
- glibc 2.31 or later
- At least 4GB RAM
- 500MB free disk space

#### AppImage (Universal)

The AppImage format works on most Linux distributions without installation:

```bash
# Download AppImage
wget https://github.com/hndrwn-dk/s3-migration-scheduler/releases/latest/download/S3MigrationScheduler-x86_64.AppImage

# Make executable
chmod +x S3MigrationScheduler-x86_64.AppImage

# Run directly
./S3MigrationScheduler-x86_64.AppImage

# Optional: Integrate with system
./S3MigrationScheduler-x86_64.AppImage --appimage-extract
sudo mv squashfs-root/usr/share/applications/s3-migration-scheduler.desktop /usr/share/applications/
sudo mv squashfs-root/usr/share/icons/hicolor/256x256/apps/s3-migration-scheduler.png /usr/share/icons/hicolor/256x256/apps/
```

#### Debian/Ubuntu (.deb)

```bash
# Download and install
wget https://github.com/hndrwn-dk/s3-migration-scheduler/releases/latest/download/s3-migration-scheduler_amd64.deb
sudo dpkg -i s3-migration-scheduler_amd64.deb

# Install dependencies if needed
sudo apt-get install -f

# Start the application
s3-migration-scheduler

# Or use the desktop entry
gtk-launch s3-migration-scheduler
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

- **Go 1.21** or later
- **Node.js 18** or later (for web UI)
- **Git**
- **Make** (optional, but recommended)

### Build Steps

```bash
# Clone the repository
git clone https://github.com/hndrwn-dk/s3-migration-scheduler.git
cd s3-migration-scheduler

# Build the backend
go mod download
go build -o bin/s3-migration-scheduler ./cmd/server

# Build the web UI
cd web
npm install
npm run build
cd ..

# Run the application
./bin/s3-migration-scheduler
```

### Using Make

```bash
# Build everything
make build

# Build for specific platform
make build-linux
make build-windows
make build-darwin

# Build Docker image
make docker-build

# Run tests
make test

# Clean build artifacts
make clean
```

### Cross-compilation

```bash
# Build for all platforms
make build-all

# Build for specific platforms
GOOS=linux GOARCH=amd64 go build -o bin/s3-migration-scheduler-linux-amd64 ./cmd/server
GOOS=windows GOARCH=amd64 go build -o bin/s3-migration-scheduler-windows-amd64.exe ./cmd/server
GOOS=darwin GOARCH=amd64 go build -o bin/s3-migration-scheduler-darwin-amd64 ./cmd/server
```

### Development Setup

```bash
# Install development dependencies
make dev-deps

# Run in development mode (with hot reload)
make dev

# Run tests with coverage
make test-coverage

# Run linter
make lint
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

#### Permission Denied (Linux/macOS)
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