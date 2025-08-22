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
# Pull the latest image
docker pull hndrwn/s3-migration-scheduler:latest

# Run the container
docker run -d \
  --name s3-migration \
  -p 8080:8080 \
  -v s3-migration-data:/app/data \
  hndrwn/s3-migration-scheduler:latest
```

### Desktop Application
- **Windows**: Start Menu → S3 Migration Scheduler
- **Linux**: Launch from Applications menu or run the AppImage/installed binary

## Step 2: Access the Web Interface

Open your browser and navigate to:
```
http://localhost:8080
```

You should see the S3 Migration Scheduler dashboard with the main interface for configuring and monitoring your migrations.

## Step 3: Configure Your First Migration

### Using the Web Interface

1. **Click "New Migration"** on the dashboard
2. **Configure Source Settings**:
   ```
   Endpoint: https://s3.amazonaws.com
   Bucket: your-source-bucket
   Region: us-east-1
   Access Key: AKIA...
   Secret Key: ********
   ```

3. **Configure Destination Settings**:
   ```
   Endpoint: https://s3.us-west-2.amazonaws.com
   Bucket: your-destination-bucket
   Region: us-west-2
   Access Key: AKIA...
   Secret Key: ********
   ```

4. **Set Migration Options**:
   ```
   Workers: 4
   Chunk Size: 64MB
   Verify Checksums: ✓ Enabled
   Overwrite Existing: ✗ Disabled
   ```

### Using Configuration File

Create a `config.yml` file:

```yaml
# config.yml
migrations:
  - name: "My First Migration"
    source:
      endpoint: "https://s3.amazonaws.com"
      bucket: "your-source-bucket"
      region: "us-east-1"
      access_key: "AKIA..."
      secret_key: "your-secret-key"
      
    destination:
      endpoint: "https://s3.us-west-2.amazonaws.com"
      bucket: "your-destination-bucket"
      region: "us-west-2"
      access_key: "AKIA..."
      secret_key: "your-secret-key"
      
    options:
      workers: 4
      chunk_size: "64MB"
      verify: true
      overwrite: false
```

### Using Environment Variables

For Docker deployments, you can use environment variables:

```bash
docker run -d \
  --name s3-migration \
  -p 8080:8080 \
  -e SOURCE_ENDPOINT="https://s3.amazonaws.com" \
  -e SOURCE_BUCKET="your-source-bucket" \
  -e SOURCE_ACCESS_KEY="AKIA..." \
  -e SOURCE_SECRET_KEY="your-secret-key" \
  -e DEST_ENDPOINT="https://s3.us-west-2.amazonaws.com" \
  -e DEST_BUCKET="your-destination-bucket" \
  -e DEST_ACCESS_KEY="AKIA..." \
  -e DEST_SECRET_KEY="your-secret-key" \
  hndrwn/s3-migration-scheduler:latest
```

## Step 4: Test the Connection

Before starting the migration, test your connections:

### Web Interface
1. Click **"Test Source Connection"**
2. Click **"Test Destination Connection"**
3. Verify both show ✅ **Connected**

### Command Line
```bash
# Test source connection
s3-migration-scheduler test-connection --config config.yml --source

# Test destination connection
s3-migration-scheduler test-connection --config config.yml --destination
```

### API
```bash
# Test connections via API
curl -X POST http://localhost:8080/api/test-connection \
  -H "Content-Type: application/json" \
  -d '{
    "endpoint": "https://s3.amazonaws.com",
    "bucket": "your-source-bucket",
    "access_key": "AKIA...",
    "secret_key": "your-secret-key"
  }'
```

## Step 5: Start Your First Migration

### Web Interface
1. Click **"Start Migration"**
2. Monitor progress in real-time on the dashboard
3. View detailed logs in the "Logs" tab

### Command Line
```bash
# Start migration with config file
s3-migration-scheduler migrate --config config.yml

# Start migration with CLI flags
s3-migration-scheduler migrate \
  --source-endpoint "https://s3.amazonaws.com" \
  --source-bucket "your-source-bucket" \
  --dest-endpoint "https://s3.us-west-2.amazonaws.com" \
  --dest-bucket "your-destination-bucket" \
  --workers 4
```

### API
```bash
curl -X POST http://localhost:8080/api/migrations \
  -H "Content-Type: application/json" \
  -d @config.json
```

## Step 6: Monitor Progress

### Real-time Dashboard
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