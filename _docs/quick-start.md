---
layout: docs
title: Quick Start
description: Get started with S3 Migration Scheduler in minutes. Run your first migration with this step-by-step guide.
---

# Quick Start Guide

Get S3 Migration Scheduler up and running in just a few minutes. This guide will walk you through your first migration from start to finish.

## Prerequisites

Before you begin, make sure you have:

- S3 Migration Scheduler installed ([Installation Guide]({{ '/docs/installation/' | relative_url }}))
- Access credentials for your source and destination S3-compatible storage
- Network connectivity to both storage endpoints

## Step 1: Launch the Application

Choose your preferred method:

### Docker (Recommended)
```bash
# Pull and run in one command
docker run -d \
  --name s3-migration \
  -p 8080:8080 \
  -v s3-migration-data:/app/data \
  hndrwn/s3-migration-scheduler:latest

# Or pull first, then run
docker pull hndrwn/s3-migration-scheduler:latest
docker run -d --name s3-migration -p 8080:8080 hndrwn/s3-migration-scheduler:latest
```
Open your browser and navigate to:
```
http://localhost:8080
```

### Windows
```bash
Download [latest release] (https://github.com/hndrwn-dk/s3-migration-scheduler/tags) based on your platform
```
### Linux
```bash
Download [latest release] (https://github.com/hndrwn-dk/s3-migration-scheduler/tags) based on your platform
```
Double click 'S3 Migration Scheduler' application,yYou should see the S3 Migration Scheduler dashboard with the main interface for configuring and monitoring your migrations.

## Step 2: Configure Your First Migration (CYFM)

### Using the Web Interface

1. **Click "Configure"** on the dashboard
2. **Click "+ Add S3 Connection"**
3. **Configure Source Settings**:
   ```
   Alias Name: Your Source S3 Bucket 
   Endpoint URL: https://s3.amazonaws.com or https://minio.example.com or https://s3-compatible-onpremises.corp.com
   Access Key: AKIA...
   Secret Key: ********
   ```

4. **Configure Destination Settings**:
   ```
   Alias Name: Your Destination S3 Bucket 
   Endpoint URL: https://s3.amazonaws.com or https://minio.example.com or https://s3-compatible-onpremises.corp.com
   Access Key: AKIA...
   Secret Key: ********
   ```

5. **Click Test Connection**:

## Step 3: Start Your First Migration (SYFM)

### Using the Web Interface

1. **Click "Migrate"** on the dashboard
2. **Select Your S3 Source Alias and Source Bucket Name"**
3. **Select Your S3 Destination Alias and Destination Bucket Name"**
4. **Click "Show Advanced Option**
   ```
   - Check "Overwrite existing files" to Overwrite files in destination
   - Check "Remove files from destination that don't exist in source" to Remove files from destination that don't exist in source
   - Add Exclude Pattern, to exclude files from migration
   - Select Checksum Algorithm.
     Valid values are: CRC32,CRC32C,SHA1,SHA256
   - Check "Preserve attributes" to Maintains file/object attributes and bucket policies/locking configurations
   - "Enable retry on errors" to Automatically retries failed objects during migration
   - "Dry run (test mode)" to Simulates the migration without actually transferring files
   - "Watch for changes" to Continuously monitors source and syncs new/changed files
   ```

5. **Select Your Migration Timing**:
```
Start Immediately or Schedule for Later
```
Create a `config.yml` file:
6. **Click Start Migration**

## Step 4: Monitor Progress

### History and Logs Menu
The web interface provides real-time monitoring:

- **Overall Progress**: Files transferred, remaining, and percentage complete
- **Transfer Speed**: Current and average transfer rates
- **Worker Status**: Individual worker progress and status
- **Error Tracking**: Failed transfers and retry attempts
- **Logs**: Detailed operation logs with filtering

## Step 5: Reconcilation

After the migration completes, you can check status for reconciliation from history menu.
It will showing missing files, extra files, size differences, and other discrepancies with full file paths, sizes, and URLs for manual verification or remediation.

---

*Congratulations! You've successfully completed your first S3 migration with S3 Migration Scheduler!*
