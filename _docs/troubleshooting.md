---
layout: docs
title: Troubleshooting
description: Troubleshooting guide for S3 Migration Scheduler - common issues, solutions, and debugging tips.
permalink: /docs/troubleshooting/
---

# Troubleshooting S3 Migration Scheduler

Having issues with S3 Migration Scheduler? This guide will help you resolve common problems and get back to migrating your data efficiently.

## Quick Fixes

### Most Common Issues

1. **Connection Problems**
   - Verify your AWS credentials are correct
   - Check network connectivity to AWS S3
   - Ensure proper IAM permissions

2. **Performance Issues**
   - Adjust concurrent transfer settings
   - Check available bandwidth
   - Monitor system resources (CPU, memory)

3. **Migration Failures**
   - Review error logs for specific issues
   - Verify source and destination bucket permissions
   - Check file path and naming conventions

## Complete Troubleshooting Guide

For detailed troubleshooting steps, error codes, and advanced debugging techniques, please refer to our comprehensive troubleshooting documentation:

<div class="info-box">
  <h4>📖 Official Troubleshooting Guide</h4>
  <p>The complete troubleshooting guide is maintained in our GitHub repository and includes:</p>
  <ul>
    <li>Detailed error code explanations</li>
    <li>Step-by-step debugging procedures</li>
    <li>Performance optimization tips</li>
    <li>Common configuration issues</li>
    <li>Log analysis techniques</li>
  </ul>
  <p>
    <a href="https://github.com/hndrwn-dk/s3-migration-scheduler/blob/main/docs/TROUBLESHOOTING.md" class="btn btn-primary" target="_blank" rel="noopener">
      📖 View Complete Troubleshooting Guide
    </a>
  </p>
</div>

## Getting Help

If you can't find a solution in the troubleshooting guide, here are additional resources:

### Community Support
- **[GitHub Issues](https://github.com/hndrwn-dk/s3-migration-scheduler/issues)** - Report bugs or request features
- **[GitHub Discussions](https://github.com/hndrwn-dk/s3-migration-scheduler/discussions)** - Community Q&A
- **[Documentation]({{ '/docs/' | relative_url }})** - Complete user guides

### Before Reporting an Issue

To help us help you faster, please include:

1. **Version Information**
   ```bash
   s3-migration-scheduler --version
   ```

2. **System Information**
   - Operating system and version
   - Available memory and disk space
   - Network configuration

3. **Error Details**
   - Complete error messages
   - Relevant log entries
   - Steps to reproduce the issue

4. **Configuration**
   - Migration configuration (sanitized)
   - AWS region and service endpoints
   - Any custom settings

## Common Error Codes

| Error Code | Description | Quick Fix |
|------------|-------------|-----------|
| `AUTH_001` | Invalid AWS credentials | Check AWS access key and secret key |
| `CONN_002` | Network connection timeout | Verify internet connection and AWS endpoints |
| `PERM_003` | Insufficient permissions | Review IAM policy for required S3 permissions |
| `RATE_004` | API rate limit exceeded | Reduce concurrent transfers or add delays |

For complete error code documentation, see the [official troubleshooting guide](https://github.com/hndrwn-dk/s3-migration-scheduler/blob/main/docs/TROUBLESHOOTING.md).

## Log Files

S3 Migration Scheduler creates detailed logs to help diagnose issues:

### Default Log Locations

- **Windows**: `%APPDATA%\S3MigrationScheduler\logs\`
- **Linux**: `~/.s3-migration-scheduler/logs/`
- **Docker**: `/app/logs/` (inside container)

### Log Levels

- `ERROR` - Critical issues that stop migration
- `WARN` - Potential problems that don't stop migration  
- `INFO` - General migration progress information
- `DEBUG` - Detailed debugging information

## Performance Optimization

If you're experiencing slow migration speeds:

1. **Increase Concurrent Transfers**
   - Adjust the `--concurrent` parameter
   - Monitor system resources

2. **Optimize Network Settings**
   - Use AWS Transfer Acceleration if available
   - Consider running closer to AWS regions

3. **System Resources**
   - Ensure adequate RAM and CPU
   - Use SSD storage for temporary files

For detailed performance tuning, see the [complete troubleshooting guide](https://github.com/hndrwn-dk/s3-migration-scheduler/blob/main/docs/TROUBLESHOOTING.md).

---

<div class="help-footer">
  <p><strong>Still need help?</strong> Don't hesitate to reach out to our community or create an issue on GitHub. We're here to help make your S3 migration successful!</p>
</div>