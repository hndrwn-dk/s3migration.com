---
layout: docs
title: Documentation
description: Complete documentation for S3 Migration Scheduler - installation, configuration, and usage guides.
permalink: /docs/
---

# S3 Migration Scheduler Documentation

Welcome to the S3 Migration Scheduler documentation. Here you'll find everything you need to get started with migrating your S3 data efficiently and reliably.

## Quick Start

Ready to get started? Follow these steps:

1. **[Install S3 Migration Scheduler]({{ '/docs/installation/' | relative_url }})** - Choose your platform
2. **[Run Your First Migration]({{ '/docs/quick-start/' | relative_url }})** - Complete walkthrough
3. **[Download Latest Release]({{ '/downloads/' | relative_url }})** - Get the software

## What is S3 Migration Scheduler?

S3 Migration Scheduler is an enterprise-grade, open-source tool designed to simplify and automate S3 data migrations. Whether you're moving data between AWS regions, migrating to a different cloud provider, or creating scheduled backups, our tool provides:

- **Real-time Monitoring** - Track progress with detailed metrics and logs
- **Data Reconciliation** - Verify migration integrity automatically
- **Multi-platform Support** - Available on Windows, Linux, and Docker
- **Enterprise Security** - Secure credential management and audit logging

## Getting Started

### 1. Choose Your Installation Method

- **[Docker]({{ '/docs/installation/#docker' | relative_url }})** (Recommended) - Get started instantly
- **[Desktop App]({{ '/docs/installation/#desktop' | relative_url }})** - Native GUI applications
- **[Build from Source]({{ '/docs/installation/#source' | relative_url }})** - For developers and contributors

### 2. Configure Your Migration

Create a simple configuration file:
```yaml
# config.yml
source:
  endpoint: "https://s3.amazonaws.com"
  bucket: "source-bucket"
  access_key: "your-access-key"
  secret_key: "your-secret-key"

destination:
  endpoint: "https://s3.amazonaws.com"
  bucket: "destination-bucket"
  access_key: "your-access-key"
  secret_key: "your-secret-key"

options:
  workers: 4
  chunk_size: "64MB"
  verify_checksums: true
```

### 3. Run Your First Migration

```bash
# Using Docker
docker run -v $(pwd)/config.yml:/app/config.yml \
  hndrwn/s3-migration-scheduler migrate --config /app/config.yml

# Using CLI
s3-migration-scheduler migrate --config config.yml
```

## User Interface

S3 Migration Scheduler provides an intuitive web-based interface for managing your migrations. The interface includes:

- **Dashboard** - Overview of all migrations and system status
- **Migration Setup** - Easy-to-use forms for configuring new migrations  
- **Progress Monitoring** - Real-time tracking with detailed metrics and logs
- **Settings** - Configuration management and preferences

*Screenshots will be added once the UI is finalized.*

## Key Features

### Real-time Monitoring
Track your migrations with comprehensive metrics:
- Transfer progress and speed
- File-level status tracking
- Error reporting and retry logic
- Performance metrics and statistics

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

## Next Steps

Ready to dive deeper?

1. **[Installation Guide]({{ '/docs/installation/' | relative_url }})** - Detailed setup instructions
2. **[Quick Start Guide]({{ '/docs/quick-start/' | relative_url }})** - Step-by-step tutorial
3. **[Download Software]({{ '/downloads/' | relative_url }})** - Get the latest version