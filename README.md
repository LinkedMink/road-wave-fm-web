# Road Wave FM for Web

![Build State](https://github.com/LinkedMink/road-wave-fm-web/actions/workflows/build-main.yml/badge.svg)

## Notice

Development on this project has stalled in favor of focusing on a mobile app front-end
([road_wave_fm_ui](https://github.com/LinkedMink/road_wave_fm_ui)).
We wanted a UI that would be convenient to use while driving, but web apps lack tight
integration on mobile devices. If someone&apos;s interested in picking this project up
feel free to reach out on our Github page.

## Overview

Road Wave FM for Web provides a front end interface to query data about terrestrial radio stations.
The app aims to be a mobile friendly and simple, so that you can hear fresh tunes on long road trips.

- Use your device's location to find nearby stations
  - Track your location automatically when moving across long distance (like on road trips)
- Find by using Google's Places API autocomplete (search by Cities, Addresses, etc.)
- Filter by formats and remember settings
- Covers the United States and Canada

### Dependencies

- [node-user-service](https://github.com/LinkedMink/node-user-service)
- [road-wave-fm-api](https://github.com/LinkedMink/road-wave-fm-api)
- MongoDB ^4.0 (for API dependencies)

### Deployment

This package creates static files that can be served by any web server. Some tested options:

#### Kubernetes Bare Metal

- Serving Files: Docker Nginx Image
- Orchestration with Dependencies: Kubernetes Bare-Metal (amd64 and arm64 images)
- Database: MongoDB Bare-Metal Replica Set

##### Environment Config

- deploy/build-docker.sh
- deploy/kube-deploy.yaml

#### AWS

- Serving Files: AWS Amplify
- Orchestratio with Dependencies : AWS EKS (amd64 and arm64 images)
- Database: AWS MongoDB Atlas

##### Environment Config

- deploy/aws.amplify.env
