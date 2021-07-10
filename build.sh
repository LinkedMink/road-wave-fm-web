#/bin/sh

IMAGE_NAME="road-wave-fm-web"
ARCHITECTURES="linux/amd64,linux/arm64"
DOCKER_ARGS=""

if [ -z "$DOCKER_SCOPE" ]; then
  DOCKER_SCOPE="linkedmink/" 
fi

if [ -z "$DOCKER_REGISTRY" ]; then
  DOCKER_REGISTRY="registry.linkedmink.space/" 
fi

if [ -z "$KUBERNETES_NAMESPACE" ]; then
  KUBERNETES_NAMESPACE="road-wave-fm" 
fi

startTime=$(date +"%s")
echo "---------- Build Started: $startTime ----------"

if [ "$2" = "prod" ]; then
  yarn run build:prod
  yarn run build:serve:prod
  DOCKER_ARGS="--build-arg ENVIRONMENT=production"
else
  yarn run build
  yarn run build:serve
fi

if [ "$1" = "deploy" ]; then
  kubectl set image \
    "deployment/${IMAGE_NAME}" \
    $IMAGE_NAME="${DOCKER_REGISTRY}${DOCKER_SCOPE}${IMAGE_NAME}" \
    --namespace="${KUBERNETES_NAMESPACE}"
fi

docker buildx build ${DOCKER_ARGS} \
  --platform "${ARCHITECTURES}" \
  -t "${DOCKER_REGISTRY}${DOCKER_SCOPE}${IMAGE_NAME}:latest" \
  --push .

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
