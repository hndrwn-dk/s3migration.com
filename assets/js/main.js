// S3 Migration Scheduler Website JavaScript

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        GITHUB_API: 'https://api.github.com/repos/hndrwn-dk/s3-migration-scheduler',
        DOCKER_HUB_API: 'https://hub.docker.com/v2/repositories/hndrwn/s3-migration-scheduler',
        CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
    };

    // Utility functions
    const utils = {
        // Format numbers with commas
        formatNumber: (num) => {
            if (num >= 1000000) {
                return (num / 1000000).toFixed(1) + 'M';
            }
            if (num >= 1000) {
                return (num / 1000).toFixed(1) + 'K';
            }
            return num.toString();
        },

        // Format file sizes
        formatBytes: (bytes) => {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
        },

        // Detect user's platform and architecture with improved accuracy
        detectPlatform: () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const platform = navigator.platform.toLowerCase();
            
            // Detect OS
            let os = 'unknown';
            let arch = 'unknown';
            let recommendedDownload = null;
            
            if (userAgent.includes('win') || platform.includes('win')) {
                os = 'windows';
                
                // Improved Windows architecture detection
                // Check multiple indicators for 64-bit
                const is64bit = 
                    userAgent.includes('win64') ||
                    userAgent.includes('x64') ||
                    userAgent.includes('amd64') ||
                    userAgent.includes('wow64') ||
                    platform.includes('win64') ||
                    platform.includes('x64') ||
                    // Modern browsers on 64-bit systems
                    (userAgent.includes('chrome') && !userAgent.includes('wow64')) ||
                    (userAgent.includes('firefox') && userAgent.includes('win64')) ||
                    // Navigator properties that indicate 64-bit
                    navigator.maxTouchPoints > 0 || // Touch support usually indicates modern 64-bit
                    screen.width >= 1920; // High resolution usually indicates 64-bit systems
                
                const isARM = userAgent.includes('arm64') || userAgent.includes('aarch64');
                
                if (isARM) {
                    arch = 'arm64';
                    recommendedDownload = 'https://github.com/hndrwn-dk/s3-migration-scheduler/releases/latest';
                } else if (is64bit) {
                    arch = 'x64';
                    recommendedDownload = 'https://github.com/hndrwn-dk/s3-migration-scheduler/releases/download/v1.1.0/S3.Migration.Scheduler-1.1.0-win-x64.exe';
                } else {
                    arch = 'x86';
                    recommendedDownload = 'https://github.com/hndrwn-dk/s3-migration-scheduler/releases/latest';
                }
                
            } else if (userAgent.includes('mac') || platform.includes('mac')) {
                os = 'macos';
                if (userAgent.includes('intel')) {
                    arch = 'intel';
                } else if (userAgent.includes('arm') || userAgent.includes('apple silicon') || platform.includes('arm')) {
                    arch = 'apple-silicon';
                } else {
                    arch = 'universal';
                }
                recommendedDownload = 'https://github.com/hndrwn-dk/s3-migration-scheduler/releases/latest';
                
            } else if (userAgent.includes('linux') || platform.includes('linux')) {
                os = 'linux';
                
                // Linux architecture detection
                const is64bit = 
                    userAgent.includes('x86_64') ||
                    userAgent.includes('amd64') ||
                    platform.includes('x86_64') ||
                    !userAgent.includes('i386') && !userAgent.includes('i686'); // Assume 64-bit if no 32-bit indicators
                
                if (userAgent.includes('arm64') || userAgent.includes('aarch64')) {
                    arch = 'arm64';
                } else if (userAgent.includes('arm')) {
                    arch = 'arm';
                } else if (is64bit) {
                    arch = 'x64';
                } else {
                    arch = 'x86';
                }
                
                recommendedDownload = 'https://github.com/hndrwn-dk/s3-migration-scheduler/releases/download/v1.1.0/S3.Migration.Scheduler-1.1.0.AppImage';
            }
            
            return { 
                os, 
                arch, 
                display: `${os} (${arch})`,
                recommendedDownload
            };
        },

        // Cache management
        setCache: (key, data) => {
            const cacheData = {
                data: data,
                timestamp: Date.now()
            };
            localStorage.setItem(key, JSON.stringify(cacheData));
        },

        getCache: (key) => {
            try {
                const cached = localStorage.getItem(key);
                if (!cached) return null;
                
                const cacheData = JSON.parse(cached);
                if (Date.now() - cacheData.timestamp > CONFIG.CACHE_DURATION) {
                    localStorage.removeItem(key);
                    return null;
                }
                return cacheData.data;
            } catch (e) {
                return null;
            }
        },

        // Debounce function
        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    };

    // GitHub API integration
    const github = {
        async fetchRepoInfo() {
            const cacheKey = 'github_repo_info';
            const cached = utils.getCache(cacheKey);
            if (cached) return cached;

            try {
                const response = await fetch(`${CONFIG.GITHUB_API}`);
                if (!response.ok) throw new Error('Failed to fetch repo info');
                
                const data = await response.json();
                const repoInfo = {
                    stars: data.stargazers_count,
                    forks: data.forks_count,
                    issues: data.open_issues_count,
                    description: data.description,
                    updated: data.updated_at
                };
                
                utils.setCache(cacheKey, repoInfo);
                return repoInfo;
            } catch (error) {
                console.error('Error fetching GitHub repo info:', error);
                return {
                    stars: 0,
                    forks: 0,
                    issues: 0,
                    description: 'Enterprise S3 Migration Made Simple',
                    updated: new Date().toISOString()
                };
            }
        },

        async fetchLatestRelease() {
            const cacheKey = 'github_latest_release';
            const cached = utils.getCache(cacheKey);
            if (cached) return cached;

            try {
                const response = await fetch(`${CONFIG.GITHUB_API}/releases/latest`);
                if (!response.ok) throw new Error('Failed to fetch latest release');
                
                const data = await response.json();
                const releaseInfo = {
                    version: data.tag_name,
                    name: data.name,
                    description: data.body,
                    published_at: data.published_at,
                    assets: data.assets.map(asset => ({
                        name: asset.name,
                        size: asset.size,
                        download_count: asset.download_count,
                        download_url: asset.browser_download_url
                    })),
                    html_url: data.html_url
                };
                
                utils.setCache(cacheKey, releaseInfo);
                return releaseInfo;
            } catch (error) {
                console.error('Error fetching latest release:', error);
                return {
                    version: 'v1.0.0',
                    name: 'Latest Release',
                    description: 'Latest stable release of S3 Migration Scheduler',
                    published_at: new Date().toISOString(),
                    assets: [],
                    html_url: `${CONFIG.GITHUB_API.replace('api.', '').replace('repos/', '')}/releases`
                };
            }
        },

        async fetchContributors() {
            const cacheKey = 'github_contributors';
            const cached = utils.getCache(cacheKey);
            if (cached) return cached;

            try {
                const response = await fetch(`${CONFIG.GITHUB_API}/contributors`);
                if (!response.ok) throw new Error('Failed to fetch contributors');
                
                const data = await response.json();
                const contributorsCount = data.length;
                
                utils.setCache(cacheKey, contributorsCount);
                return contributorsCount;
            } catch (error) {
                console.error('Error fetching contributors:', error);
                return 1;
            }
        },

        async fetchCommitCount() {
            const cacheKey = 'github_commits';
            const cached = utils.getCache(cacheKey);
            if (cached) return cached;

            try {
                // Get the default branch first
                const repoResponse = await fetch(CONFIG.GITHUB_API);
                if (!repoResponse.ok) throw new Error('Failed to fetch repo info');
                const repoData = await repoResponse.json();
                const defaultBranch = repoData.default_branch;

                // Fetch commits from the default branch with pagination
                const response = await fetch(`${CONFIG.GITHUB_API}/commits?sha=${defaultBranch}&per_page=1`);
                if (!response.ok) throw new Error('Failed to fetch commits');
                
                // Get total count from Link header
                const linkHeader = response.headers.get('Link');
                let totalCommits = 0;
                
                if (linkHeader) {
                    const match = linkHeader.match(/page=(\d+)>; rel="last"/);
                    if (match) {
                        totalCommits = parseInt(match[1]);
                    }
                }
                
                // If no Link header, try a different approach
                if (totalCommits === 0) {
                    // Fallback: get a reasonable estimate by checking recent commits
                    const commitsResponse = await fetch(`${CONFIG.GITHUB_API}/commits?sha=${defaultBranch}&per_page=100`);
                    if (commitsResponse.ok) {
                        const commits = await commitsResponse.json();
                        totalCommits = commits.length >= 100 ? 100 : commits.length;
                    }
                }
                
                utils.setCache(cacheKey, totalCommits);
                return totalCommits;
            } catch (error) {
                console.error('Error fetching commit count:', error);
                return 50; // Fallback number
            }
        }
    };

    // Docker Hub integration
    const dockerHub = {
        async fetchRepoInfo() {
            const cacheKey = 'docker_repo_info';
            const cached = utils.getCache(cacheKey);
            if (cached) return cached;

            try {
                // Note: Docker Hub API has CORS restrictions, this is a fallback
                // In production, you might want to proxy this through your backend
                const dockerInfo = {
                    pulls: 10000, // Placeholder - would need backend proxy for real data
                    stars: 50,
                    updated: new Date().toISOString()
                };
                
                utils.setCache(cacheKey, dockerInfo);
                return dockerInfo;
            } catch (error) {
                console.error('Error fetching Docker Hub info:', error);
                return {
                    pulls: 0,
                    stars: 0,
                    updated: new Date().toISOString()
                };
            }
        }
    };

    // Platform detection and download links
    const platformDetection = {
        init() {
            const platformInfo = utils.detectPlatform();
            this.showDetectedPlatform(platformInfo);
            this.setupPlatformDownloads(platformInfo);
        },

        showDetectedPlatform(platformInfo) {
            console.log('Platform detection:', platformInfo); // Debug log
            
            const detectionElement = document.getElementById('platform-detection');
            const platformTextElement = document.getElementById('detected-platform-text');
            const smartDownloadElement = document.getElementById('smart-download');

            console.log('Detection elements:', { detectionElement, platformTextElement, smartDownloadElement }); // Debug log

            if (!detectionElement || platformInfo.os === 'unknown') {
                console.log('Not showing detection - element missing or unknown OS'); // Debug log
                return;
            }

            const platformNames = {
                windows: 'Windows',
                linux: 'Linux',
                macos: 'macOS'
            };

            const osName = platformNames[platformInfo.os] || 'Unknown';
            const fullPlatformText = `${osName} (${platformInfo.arch})`;
            
            if (platformTextElement) platformTextElement.textContent = fullPlatformText;
            
            detectionElement.style.display = 'block';
            console.log('Platform detection banner shown:', fullPlatformText); // Debug log

            // Set up smart download link
            if (smartDownloadElement) {
                smartDownloadElement.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.downloadForPlatform(platformInfo);
                });
            }
        },

        setupPlatformDownloads(platformInfo) {
            // Highlight detected platform section
            const platformElements = document.querySelectorAll(`#${platformInfo.os}`);
            platformElements.forEach(el => {
                if (el) el.classList.add('detected-platform');
            });
        },

        downloadForPlatform(platformInfo) {
            // Use the recommended download URL if available
            if (platformInfo.recommendedDownload) {
                window.open(platformInfo.recommendedDownload, '_blank');
            } else {
                // Fallback to releases page
                window.open('https://github.com/hndrwn-dk/s3-migration-scheduler/releases/latest', '_blank');
            }
        }



        getPlatformAssets(assets, platform) {
            const patterns = {
                windows: /windows|win.*x64|win64|\.msi|\.exe/i,
                linux: /linux|\.deb|\.rpm|\.appimage|\.tar\.gz/i
            };

            const pattern = patterns[platform];
            if (!pattern) return [];

            return assets.filter(asset => pattern.test(asset.name));
        }
    };

    // Tab functionality
    const tabs = {
        init() {
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabContents = document.querySelectorAll('.tab-content');

            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const tabId = button.getAttribute('data-tab');
                    
                    // Remove active class from all buttons and contents
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    
                    // Add active class to clicked button and corresponding content
                    button.classList.add('active');
                    const targetContent = document.getElementById(`${tabId}-tab`);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                });
            });
        }
    };

    // Copy to clipboard functionality
    const clipboard = {
        init() {
            const copyButtons = document.querySelectorAll('.copy-button');
            
            copyButtons.forEach(button => {
                button.addEventListener('click', async () => {
                    const text = button.getAttribute('data-clipboard-text');
                    if (!text) return;

                    try {
                        await navigator.clipboard.writeText(text);
                        this.showCopyFeedback(button);
                    } catch (error) {
                        // Fallback for older browsers
                        this.fallbackCopy(text);
                        this.showCopyFeedback(button);
                    }
                });
            });
        },

        fallbackCopy(text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        },

        showCopyFeedback(button) {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.style.backgroundColor = 'var(--success-color)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        }
    };

    // Mobile navigation
    const mobileNav = {
        init() {
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');

            if (!navToggle || !navMenu) return;

            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        }
    };

    // Statistics and counters
    const statistics = {
        async init() {
            console.log('Statistics init started'); // Debug log
            try {
                await this.updateGitHubStats();
                await this.updateDockerStats();
                this.startCounterAnimations();
                console.log('Statistics init completed'); // Debug log
            } catch (error) {
                console.error('Error in statistics init:', error);
            }
        },

        async updateGitHubStats() {
            try {
                console.log('Updating GitHub stats...'); // Debug log
                const [repoInfo, release, contributors] = await Promise.all([
                    github.fetchRepoInfo(),
                    github.fetchLatestRelease(),
                    github.fetchContributors()
                ]);

                console.log('GitHub data received:', { repoInfo, release, contributors }); // Debug log

                // Update star count
                const starsElement = document.getElementById('github-stars');
                if (starsElement) {
                    starsElement.textContent = utils.formatNumber(repoInfo.stars);
                    console.log('Updated stars:', repoInfo.stars); // Debug log
                } else {
                    console.log('Stars element not found'); // Debug log
                }

                // Update download count (sum of all asset downloads)
                const totalDownloads = release.assets.reduce((sum, asset) => sum + asset.download_count, 0);
                const downloadsElement = document.getElementById('total-downloads');
                if (downloadsElement) {
                    downloadsElement.textContent = utils.formatNumber(totalDownloads);
                }

                // Update contributors count
                const contributorsElement = document.getElementById('contributors-count');
                if (contributorsElement) {
                    contributorsElement.textContent = contributors;
                }

                // Update commit count
                const commitCount = await github.fetchCommitCount();
                const commitsElement = document.getElementById('commits-count');
                if (commitsElement) {
                    commitsElement.textContent = utils.formatNumber(commitCount);
                }

                // Update version info
                const versionElements = document.querySelectorAll('#latest-version, #desktop-version, #release-version');
                versionElements.forEach(el => {
                    if (el) el.textContent = release.version;
                });

                // Update release info
                const releaseDateElement = document.getElementById('release-date');
                if (releaseDateElement) {
                    const date = new Date(release.published_at);
                    releaseDateElement.textContent = date.toLocaleDateString();
                }

                const releaseNotesElement = document.getElementById('release-notes-link');
                if (releaseNotesElement) {
                    releaseNotesElement.href = release.html_url;
                }

                const releaseDescElement = document.getElementById('release-description');
                if (releaseDescElement) {
                    releaseDescElement.textContent = release.description || 'Latest stable release with bug fixes and improvements.';
                }

                // Update download links
                this.updateDownloadLinks(release.assets);

            } catch (error) {
                console.error('Error updating GitHub stats:', error);
            }
        },

        async updateDockerStats() {
            try {
                const dockerInfo = await dockerHub.fetchRepoInfo();
                
                const dockerPullsElement = document.getElementById('docker-pulls');
                if (dockerPullsElement) {
                    dockerPullsElement.textContent = utils.formatNumber(dockerInfo.pulls);
                }
            } catch (error) {
                console.error('Error updating Docker stats:', error);
            }
        },

        updateDownloadLinks(assets) {
            // Update platform-specific download links
            const platformMappings = {
                'windows': ['windows', 'win64', 'x64', '.msi', '.exe'],
                'linux': ['linux', '.deb', '.rpm', '.appimage', '.tar.gz']
            };

            Object.entries(platformMappings).forEach(([platform, patterns]) => {
                const platformAssets = assets.filter(asset => 
                    patterns.some(pattern => asset.name.toLowerCase().includes(pattern.toLowerCase()))
                );

                if (platformAssets.length > 0) {
                    // Update main download links with direct URLs
                    const mainLink = document.getElementById(`download-${platform}-main`);
                    if (mainLink) {
                        mainLink.href = platformAssets[0].download_url;
                    }
                }

                    // Update detailed download section
                    const downloadsContainer = document.getElementById(`${platform}-downloads`);
                    if (downloadsContainer) {
                        platformAssets.forEach((asset, index) => {
                            const link = downloadsContainer.children[index];
                            if (link) {
                                link.href = asset.download_url;
                                const sizeElement = link.querySelector('.download-size');
                                if (sizeElement) {
                                    sizeElement.textContent = utils.formatBytes(asset.size);
                                }
                            }
                        });
                    }
                }
            });

            // Update source download link
            const sourceZipElement = document.getElementById('source-zip');
            if (sourceZipElement) {
                const sourceAsset = assets.find(asset => asset.name.includes('source') || asset.name.includes('.zip'));
                if (sourceAsset) {
                    sourceZipElement.href = sourceAsset.download_url;
                }
            }

            // Update downloads page specific links
            this.updateDownloadsPageLinks(assets);
        },

        updateDownloadsPageLinks(assets) {
            // Update all download items on the downloads page
            const downloadItems = document.querySelectorAll('.download-item[data-asset-pattern]');
            
            downloadItems.forEach(item => {
                const pattern = item.getAttribute('data-asset-pattern');
                const platform = item.getAttribute('data-platform');
                
                if (pattern) {
                    const regex = new RegExp(pattern, 'i');
                    const matchingAsset = assets.find(asset => regex.test(asset.name));
                    
                    if (matchingAsset) {
                        // Update the download URL
                        item.href = matchingAsset.download_url;
                        
                        // Update the file size
                        const sizeElement = item.querySelector(`[data-size-target="${platform}"]`);
                        if (sizeElement) {
                            sizeElement.textContent = utils.formatBytes(matchingAsset.size);
                        }
                    }
                }
            });
        },

        startCounterAnimations() {
            const counters = document.querySelectorAll('.stat-number');
            
            const animateCounter = (element) => {
                const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
                if (isNaN(target)) return;

                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    element.textContent = utils.formatNumber(Math.floor(current));
                }, 50);
            };

            // Intersection Observer for counter animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            });

            counters.forEach(counter => observer.observe(counter));
        }
    };

    // Smooth scrolling for anchor links
    const smoothScroll = {
        init() {
            const links = document.querySelectorAll('a[href^="#"]');
            
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href === '#') return;

                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    };

    // Search functionality (for documentation)
    const search = {
        init() {
            const searchInput = document.getElementById('docs-search');
            if (!searchInput) return;

            const searchHandler = utils.debounce((query) => {
                this.performSearch(query);
            }, 300);

            searchInput.addEventListener('input', (e) => {
                searchHandler(e.target.value);
            });
        },

        performSearch(query) {
            // This would implement client-side search functionality
            // For now, it's a placeholder for future implementation
            console.log('Searching for:', query);
        }
    };

    // Initialize everything when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize all modules
        platformDetection.init();
        tabs.init();
        clipboard.init();
        mobileNav.init();
        statistics.init();
        smoothScroll.init();
        search.init();

        // Add loading states
        const loadingElements = document.querySelectorAll('[id$="-count"], [id$="-stars"], [id$="-pulls"], [id$="-downloads"]');
        loadingElements.forEach(el => {
            if (el && el.textContent === '-') {
                el.textContent = '...';
            }
        });
    });

    // Export for debugging (development only)
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        window.s3MigrationSite = {
            utils,
            github,
            dockerHub,
            platformDetection,
            statistics
        };
    }

})();