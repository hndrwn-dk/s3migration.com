---
layout: docs
title: Documentation
description: Complete documentation for S3 Migration Scheduler - installation, configuration, and usage guides.
---

# S3 Migration Scheduler Documentation

Welcome to the S3 Migration Scheduler documentation. Here you'll find everything you need to get started with migrating your S3 data efficiently and reliably.

## Quick Navigation

<div class="docs-grid">
  <div class="docs-card">
    <div class="docs-card-icon">🚀</div>
    <h3><a href="{{ '/docs/installation/' | relative_url }}">Installation</a></h3>
    <p>Get S3 Migration Scheduler installed on your platform of choice.</p>
  </div>
  
  <div class="docs-card">
    <div class="docs-card-icon">⚡</div>
    <h3><a href="{{ '/docs/quick-start/' | relative_url }}">Quick Start</a></h3>
    <p>Run your first migration in just a few minutes.</p>
  </div>
  
  <div class="docs-card">
    <div class="docs-card-icon">⚙️</div>
    <h3><a href="{{ '/docs/configuration/' | relative_url }}">Configuration</a></h3>
    <p>Configure the scheduler for your specific needs.</p>
  </div>
  
  <div class="docs-card">
    <div class="docs-card-icon">🔄</div>
    <h3><a href="{{ '/docs/migration-workflows/' | relative_url }}">Migration Workflows</a></h3>
    <p>Learn about different migration patterns and best practices.</p>
  </div>
</div>

## What is S3 Migration Scheduler?

S3 Migration Scheduler is an enterprise-grade, open-source tool designed to simplify and automate S3 data migrations. Whether you're moving data between AWS regions, migrating to a different cloud provider, or creating scheduled backups, our tool provides:

- **Real-time Monitoring** - Track progress with detailed metrics and logs
- **Scheduled Migrations** - Automate migrations with cron-like scheduling
- **Data Reconciliation** - Verify migration integrity automatically
- **Multi-platform Support** - Available on Windows, macOS, Linux, and Docker
- **Enterprise Security** - Secure credential management and audit logging

## Getting Started

### 1. Choose Your Installation Method

- **[Docker]({{ '/docs/installation/#docker' | relative_url }})** (Recommended) - Get started instantly
- **[Desktop App]({{ '/docs/installation/#desktop' | relative_url }})** - Native GUI applications
- **[Build from Source]({{ '/docs/installation/#source' | relative_url }})** - For developers and contributors

### 2. Basic Configuration

```yaml
# config.yml
source:
  endpoint: "https://s3.amazonaws.com"
  bucket: "my-source-bucket"
  region: "us-east-1"
  
destination:
  endpoint: "https://s3.us-west-2.amazonaws.com"
  bucket: "my-destination-bucket"
  region: "us-west-2"

migration:
  workers: 4
  chunk_size: "64MB"
  verify: true
```

### 3. Run Your First Migration

```bash
# Using Docker
docker run -v $(pwd)/config.yml:/app/config.yml \
  hndrwn/s3-migration-scheduler migrate --config /app/config.yml

# Using CLI
s3-migration-scheduler migrate --config config.yml
```

## Key Features

### Real-time Monitoring
Monitor your migrations with a comprehensive web dashboard that shows:
- Transfer progress and speed
- File-level status tracking
- Error reporting and retry logic
- Performance metrics and statistics

### Scheduled Migrations
Set up automated migrations using cron expressions:
```yaml
schedule:
  # Daily backup at 2 AM
  - cron: "0 2 * * *"
    source: "production-bucket"
    destination: "backup-bucket"
    
  # Weekly sync every Sunday
  - cron: "0 0 * * 0"
    source: "staging-bucket"
    destination: "archive-bucket"
```

### Data Reconciliation
Ensure data integrity with built-in verification:
- **Checksum Verification** - Compare MD5/SHA256 hashes
- **Size Validation** - Verify file sizes match
- **Metadata Comparison** - Check object metadata
- **Missing File Detection** - Identify incomplete transfers

## Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Source S3     │    │  S3 Migration    │    │ Destination S3  │
│     Bucket      │◄──►│    Scheduler     │◄──►│     Bucket      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │  Web Dashboard   │
                       │   & Monitoring   │
                       └──────────────────┘
```

The scheduler acts as an intelligent proxy between your source and destination S3 endpoints, providing:
- Multi-threaded transfers for optimal performance
- Automatic retry logic for failed transfers
- Progress tracking and detailed logging
- Web-based monitoring interface

## Common Use Cases

### 1. Cloud Migration
Moving data between different cloud providers or regions:
```yaml
# AWS to Google Cloud Storage
source:
  endpoint: "https://s3.amazonaws.com"
  bucket: "aws-bucket"
  
destination:
  endpoint: "https://storage.googleapis.com"
  bucket: "gcs-bucket"
```

### 2. Backup & Archive
Automated backups to long-term storage:
```yaml
# Daily backup to Glacier
schedule:
  - cron: "0 1 * * *"
    source: "production-data"
    destination: "glacier-archive"
    storage_class: "GLACIER"
```

### 3. Data Synchronization
Keep multiple buckets in sync:
```yaml
# Bi-directional sync
sync:
  - source: "primary-bucket"
    destination: "replica-bucket"
    bidirectional: true
    delete_orphaned: false
```

## Support & Community

- **[GitHub Issues]({{ site.github.repository_url }}/issues)** - Bug reports and feature requests
- **[Discussions]({{ site.github.repository_url }}/discussions)** - Community support and Q&A
- **[Contributing Guide]({{ '/docs/contributing/' | relative_url }})** - How to contribute to the project
- **[API Reference]({{ '/docs/api/' | relative_url }})** - Complete API documentation

## Next Steps

Ready to get started? Choose your path:

1. **New Users** → Start with [Installation]({{ '/docs/installation/' | relative_url }}) then [Quick Start]({{ '/docs/quick-start/' | relative_url }})
2. **Existing Users** → Check out [Migration Workflows]({{ '/docs/migration-workflows/' | relative_url }}) for advanced patterns
3. **Developers** → See [API Reference]({{ '/docs/api/' | relative_url }}) and [Contributing Guide]({{ '/docs/contributing/' | relative_url }})
4. **System Administrators** → Review [Configuration]({{ '/docs/configuration/' | relative_url }}) and [Monitoring]({{ '/docs/monitoring/' | relative_url }})

---

*Need help? Join our community on [GitHub Discussions]({{ site.github.repository_url }}/discussions) or check our [FAQ]({{ '/docs/faq/' | relative_url }}).*