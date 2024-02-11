#!/usr/bin/env bash
# Usage: build.sh [true]

IMAGE_NAME="road-wave-fm-web"
VERSION=$(npm pkg get version | sed 's/"//g')

if [ "$1" == true ]; then
  DOCKER_BUILD_OPTIONS="--push"
  ARCHITECTURES="linux/amd64,linux/arm64" 
else
  DOCKER_BUILD_OPTIONS="--load"
  ARCHITECTURES="linux/amd64"
fi

if [ -z "$DOCKER_REGISTRY" ]; then
  DOCKER_REGISTRY="" 
elif [[ "$DOCKER_REGISTRY" != "*/" ]]; then
  DOCKER_REGISTRY="${DOCKER_REGISTRY}/"
fi

if [ -z "$DOCKER_SCOPE" ]; then
  DOCKER_SCOPE="linkedmink/" 
elif [[ "$DOCKER_SCOPE" != "*/" ]]; then
  DOCKER_SCOPE="${DOCKER_SCOPE}/"
fi

startTime=$(date +"%s")
echo "---------- Build Started: $startTime ----------"

npm run build

docker buildx build ./ \
  --file "docker/Dockerfile" \
  --platform "${ARCHITECTURES}" \
  --tag "${DOCKER_REGISTRY}${DOCKER_SCOPE}${IMAGE_NAME}:latest" \
  --tag "${DOCKER_REGISTRY}${DOCKER_SCOPE}${IMAGE_NAME}:${VERSION}" \
  --progress "plain" \
  ${DOCKER_BUILD_OPTIONS}

endTime=$(date +"%s")
elapsed="$((endTime - startTime))"
echo "---------- Build Finished: ${elapsed} seconds ----------"
