# Voice Extractor Shared Repository

## Overview
This repository serves as a centralized hub for shared configurations, dependencies, and Docker build files used across multiple projects at **VoxExtract Labs**. It is intended **for internal use only** by the VoxExtract Labs team.

## Repository Structure

```
voice-extractor-shared/
├── README.md                      # This file
├── biome.json -> config/biome.json # Symlink to shared Biome config
├── commitlint.config.cjs -> config/commitlint.config.cjs # Symlink to shared CommitLint config
├── lefthook.yml -> config/lefthook.yml # Symlink to shared Lefthook config
├── config/
│   ├── biome.json                  # Shared Biome configuration
│   ├── commitlint.config.cjs        # Shared CommitLint configuration
│   ├── lefthook.yml                 # Shared Lefthook hooks
├── docker/
│   ├── ci/
│   │   ├── Dockerfile               # Primary CI Dockerfile
│   │   ├── docker-compose.yml       # Docker Compose configuration for CI
│   │   ├── docker-entrypoint.sh     # Entry point script for CI container
│   │   ├── redis.conf               # Redis configuration
│   │   ├── start-mysql.sh           # Script to initialize MySQL
│   │   ├── supervisord.conf         # Supervisor configuration
│   ├── ci-alpha/
│   │   ├── Dockerfile               # Experimental CI Dockerfile
├── python/
│   ├── requirements.in              # Base Python dependencies
│   ├── requirements.txt             # Resolved Python dependencies
│   ├── requirements.gpu.in          # GPU-specific dependencies (base)
│   ├── requirements.gpu.txt         # GPU-specific dependencies (resolved)
├── src/
│   └── index.ts                     # Placeholder TypeScript source file
├── package.json                     # Shared Node.js dependencies and scripts
├── bun.lockb                        # Lock file for Bun dependencies
├── tsconfig.json                     # TypeScript configuration
```

## Purpose
This repository consolidates shared assets across multiple VoxExtract Labs projects, reducing duplication and ensuring consistency. Key features include:

- **Shared CI/CD Configuration**: Docker build files and related scripts for CI environments.
- **Standardized Linting & Hook Configurations**: Common **Biome**, **CommitLint**, and **Lefthook** configurations.
- **Python Dependency Management**: Centralized Python requirements, including GPU-specific dependencies.

## Usage
### **Node.js Projects**
Projects can reference shared linting and hook configurations via symlinks to the `config/` directory.

### **Docker Builds**
Projects can pull from this repository to reuse standardized Docker images for CI.

### **Python Dependencies**
Projects requiring Python dependencies can install shared requirements via:
```sh
pip install -r https://raw.githubusercontent.com/VoxExtract-Labs/voice-extractor-shared/main/python/requirements.txt
```
For GPU-specific installations:
```sh
pip install -r https://raw.githubusercontent.com/VoxExtract-Labs/voice-extractor-shared/main/python/requirements.gpu.txt
```

## Internal Use Only
While this repository is public for easier access, it is intended **only for internal use** by **VoxExtract Labs**.
External contributions or usage are not supported.

## Repository URL
[**https://github.com/VoxExtract-Labs/voice-extractor-shared**](https://github.com/VoxExtract-Labs/voice-extractor-shared)

