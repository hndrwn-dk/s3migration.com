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
4. **[Troubleshooting Guide]({{ '/docs/troubleshooting/' | relative_url }})** - Common issues and solutions

## What is S3 Migration Scheduler?

S3 Migration Scheduler is an enterprise-grade, open-source tool designed to simplify and automate S3 data migrations. Whether you're moving data between AWS regions, S3 compatible on-premises to different public cloud provider, vice versa, or creating scheduled backups, our tool provides:

- **Real-time Monitoring** - Track progress with detailed metrics and logs
- **Data Reconciliation** - Verify migration integrity automatically
- **Multi-platform Support** - Available on Windows, Linux, and Docker
- **Enterprise Security** - Secure credential management and audit logging

## Getting Started

### Choose Your Installation Method

- **[Docker]({{ '/docs/installation/#docker' | relative_url }})** (Recommended) - Get started instantly
- **[Desktop App]({{ '/docs/installation/#desktop' | relative_url }})** - Native GUI applications
- **[Build from Source]({{ '/docs/installation/#source' | relative_url }})** - For developers and contributors

### Screenshots

### Main Dashboard
![Main Dashboard]({{ '/assets/images/docs/dashboard.png' | relative_url }})
*The main dashboard showing migration progress and system status*

### Migration Setup
![Migration Setup]({{ '/assets/images/docs/setup.png' | relative_url }})
*Configuration interface for setting up new migrations*

### Scheduling Migration
![Scheduling Migration]({{ '/assets/images/docs/scheduled.png' | relative_url }})
*Schedule and manage future migrations*

### Migration Progress Monitoring
![Migration Progress Monitoring]({{ '/assets/images/docs/progress.png' | relative_url }})
*Real-time progress tracking with detailed metrics*

### Log Monitoring
![Log Monitoring]({{ '/assets/images/docs/log.png' | relative_url }})
*Real-time progress log viewer*

### Reconciliation Modal
![Reconciliation Modal]({{ '/assets/images/docs/reconcile.png' | relative_url }})
*Detailed Migration Data Reconciliation Reports*

## Key Features

### Migration Management
- **Enhanced Bucket Selection** - **🆕 v1.1.0** Optimized for large-scale deployments
- **Source/Destination Configuration** - Support for any S3-compatible storage
- **Object Filtering** - Include/exclude patterns for selective migration
- **Bandwidth Throttling** - Control transfer speed to avoid overwhelming networks
- **Error Handling** - Automatic retry with exponential backoff
- **Progress Tracking** - Real-time updates with detailed statistics

### Scheduling & Automation
- **Cron Expressions** - Flexible scheduling with standard cron syntax
- **One-time Migrations** - Immediate execution option
- **Recurring Migrations** - Daily, weekly, monthly, or custom intervals
- **Timezone Support** - Schedule migrations in any timezone
- **Migration Queuing** - Smart queue management for multiple migrations

### Advanced Reconciliation
- **Handles millions of objects** efficiently with streaming technology
- **Smart Object Detection** - 3-tier approach for accurate object count estimation
- **Streaming Inventory** - Memory-efficient processing of large buckets (1M+ objects)
- **Database-driven Comparison** - Lightning-fast difference detection using SQL
- **Detailed Reports** - Comprehensive reconciliation results with actionable insights
- **Progressive Verification** - Checkpoint-based resumable reconciliation
- **Scalable Architecture** - Designed for enterprise-scale S3 migrations

### Monitoring & Logging
- **Real-time Dashboard** - Live migration status and statistics
- **WebSocket Updates** - Instant progress notifications
- **Health Check Endpoints** - **🆕 v1.1.0** Production monitoring
- **Detailed Logging** - Migration-specific log files
- **Error Reporting** - Comprehensive error tracking and analysis
- **Historical Data** - Complete migration history with searchable records

## Architecture Overview

## Next Steps

Ready to dive deeper?

1. **[Installation Guide]({{ '/docs/installation/' | relative_url }})** - Detailed setup instructions
2. **[Quick Start Guide]({{ '/docs/quick-start/' | relative_url }})** - Step-by-step tutorial
3. **[Troubleshooting Guide]({{ '/docs/troubleshooting/' | relative_url }})** - Common issues and solutions
4. **[Download Software]({{ '/downloads/' | relative_url }})** - Get the latest version
