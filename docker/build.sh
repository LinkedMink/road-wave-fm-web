#/bin/sh

IMAGE_NAME="road-wave-fm-web"
ARCHITECTURES="linux/amd64,linux/arm64"
DOCKER_ARGS=""

# React Script Args
# PUBLIC_URL=
CI=true
GENERATE_SOURCEMAP=true
REACT_APP_ENABLE_WEB_VITALS=true
REACT_APP_DISABLE_SERVICE_WORKER=true

if [ -z "$DOCKER_SCOPE" ]; then
  DOCKER_SCOPE="linkedmink/" 
fi

if [ -z "$DOCKER_REGISTRY" ]; then
  DOCKER_REGISTRY="registry.linkedmink.net/" 
fi

if [ -z "$KUBERNETES_NAMESPACE" ]; then
  KUBERNETES_NAMESPACE="road-wave-fm" 
fi

startTime=$(date +"%s")
echo "---------- Build Started: $startTime ----------"

if [ "$2" = "prod" ]; then
  REACT_APP_DISABLE_SERVICE_WORKER=false
  GENERATE_SOURCEMAP=false
  DOCKER_ARGS="--build-arg ENVIRONMENT=production"

  npm run build
else
  npm run build -- --profile
fi

if [ "$1" = "deploy" ]; then
  kubectl set image \
    "deployment/${IMAGE_NAME}" \
    $IMAGE_NAME="${DOCKER_REGISTRY}${DOCKER_SCOPE}${IMAGE_NAME}" \
    --namespace="${KUBERNETES_NAMESPACE}"
fi

docker buildx build . \
  ${DOCKER_ARGS} \
  --file "deploy/container/Dockerfile" \
  --platform "${ARCHITECTURES}" \
  --tag "${DOCKER_REGISTRY}${DOCKER_SCOPE}${IMAGE_NAME}:latest" \
  --progress "plain" \
  --push \

if [ "$1" = "deploy" ]; then
  sleep 1

  kubectl set image \
    "deployment/${IMAGE_NAME}" \
    $IMAGE_NAME="${DOCKER_REGISTRY}${DOCKER_SCOPE}${IMAGE_NAME}:latest" \
    --namespace="${KUBERNETES_NAMESPACE}" \
    --record

  kubectl rollout status \
    "deployment/${IMAGE_NAME}" \
    --namespace="${KUBERNETES_NAMESPACE}"
fi

endTime=$(date +"%s")
elapsed="$((endTime - startTime))"
echo "---------- Build Finished: ${elapsed} seconds ----------"
