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

### Progress Indicators
```
Migration: My First Migration
Status: Running
Progress: 1,247 / 5,000 files (24.9%)
Speed: 45.2 MB/s (avg: 38.7 MB/s)
ETA: 2h 15m
Errors: 3 (auto-retrying)
```

### Command Line Monitoring
```bash
# Check migration status
s3-migration-scheduler status

# Follow logs in real-time
s3-migration-scheduler logs --follow

# Get detailed statistics
s3-migration-scheduler stats --migration-id abc123
```

## Step 7: Verify Migration

After the migration completes, verify the results:

### Automatic Verification
If you enabled checksum verification, the tool automatically validates:
- ✅ File integrity (MD5/SHA256 checksums)
- ✅ File sizes match
- ✅ Object metadata preserved
- ✅ No missing files

### Manual Verification
```bash
# Compare source and destination
s3-migration-scheduler verify --config config.yml

# Generate reconciliation report
s3-migration-scheduler reconcile --output report.json
```

### Verification Report
```json
{
  "migration_id": "abc123",
  "status": "completed",
  "summary": {
    "total_files": 5000,
    "transferred": 5000,
    "verified": 5000,
    "failed": 0,
    "skipped": 0
  },
  "integrity": {
    "checksum_matches": 5000,
    "size_matches": 5000,
    "metadata_preserved": 4987
  },
  "completion_time": "2024-01-15T10:30:00Z",
  "duration": "2h 18m 45s"
}
```

## Common Use Cases

### 1. One-time Migration
```yaml
# Simple one-time transfer
migrations:
  - name: "Production Backup"
    source:
      endpoint: "https://s3.amazonaws.com"
      bucket: "production-data"
    destination:
      endpoint: "https://s3.amazonaws.com"
      bucket: "backup-archive"
      storage_class: "GLACIER"
```

### 2. Scheduled Backup
```yaml
# Daily backup at 2 AM
schedules:
  - name: "Daily Backup"
    cron: "0 2 * * *"
    migration:
      source:
        bucket: "live-data"
      destination:
        bucket: "daily-backups"
        prefix: "backup-{{ .Date }}"
```

### 3. Cross-Cloud Migration
```yaml
# AWS to Google Cloud Storage
migrations:
  - name: "AWS to GCS"
    source:
      endpoint: "https://s3.amazonaws.com"
      bucket: "aws-bucket"
    destination:
      endpoint: "https://storage.googleapis.com"
      bucket: "gcs-bucket"
    options:
      preserve_acl: false  # GCS has different ACL format
```

## Troubleshooting Quick Issues

### Connection Failed
```bash
# Check network connectivity
ping s3.amazonaws.com

# Verify credentials
aws s3 ls s3://your-bucket --profile your-profile

# Check firewall/proxy settings
curl -I https://s3.amazonaws.com
```

### Slow Transfer Speed
```yaml
# Optimize performance
options:
  workers: 8              # Increase parallel transfers
  chunk_size: "128MB"     # Larger chunks for big files
  connection_timeout: 60  # Increase timeout
  retry_attempts: 5       # More retries for unstable connections
```

### Permission Errors
```json
{
  "error": "Access Denied",
  "solution": "Ensure your credentials have the required permissions",
  "required_permissions": [
    "s3:ListBucket",
    "s3:GetObject",
    "s3:PutObject",
    "s3:GetObjectAcl",
    "s3:PutObjectAcl"
  ]
}
```

---

*Congratulations! You've successfully completed your first S3 migration with S3 Migration Scheduler!*
