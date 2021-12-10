# Road Wave FM - Web App

![Build State](https://github.com/LinkedMink/road-wave-fm-web/actions/workflows/verify-build.yml/badge.svg)

## Overview

Development on this project has stalled in favor of focusing on a mobile app front-end
([road_wave_fm_ui](https://github.com/LinkedMink/road_wave_fm_ui)).
We wanted a UI that would be convenient to use while driving, but web apps lack tight
integration on mobile devices. If someone&apos;s interested in picking this project up
feel free to reach out on our Github page.

## Dependencies

- [node-user-service](https://github.com/LinkedMink/node-user-service)
- [road-wave-fm-api](https://github.com/LinkedMink/road-wave-fm-api)
- MongoDB ^4.0 (for API dependencies)

## Deployment

This package creates static files that can be served by any web server. Some tested options:

### Kubernetes Bare Metal

- Serving Files: Docker Nginx Image
- Orchestration with Dependencies: Kubernetes Bare-Metal (amd64 and arm64 images)
- Database: MongoDB Bare-Metal Replica Set

#### Environment Config

- deploy/build-docker.sh
- deploy/kube-deploy.yaml

### AWS

- Serving Files: AWS Amplify
- Orchestratio with Dependencies : AWS EKS (amd64 and arm64 images)
- Database: AWS MongoDB Atlas

#### Environment Config

- deploy/aws.amplify.env
