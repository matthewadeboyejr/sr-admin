INSTANCE_ID="i-01a7a6b17f979d477"
APP_CONTAINER_NAME="nextjs-app"
APP_CONTAINER_IMAGE="$CI_REGISTRY_IMAGE:${CI_COMMIT_SHA:0:8}"

DOCKER_LOGIN_COMMAND="echo $CI_REGISTRY_PASSWORD | docker login $CI_REGISTRY -u $CI_REGISTRY_USER --password-stdin"
DOCKER_PULL_COMMAND="docker pull $APP_CONTAINER_IMAGE"

CONTAINER_STOP_COMMAND="if [ \$(docker ps -q -f name=$APP_CONTAINER_NAME) ]; then docker stop $APP_CONTAINER_NAME && docker rm $APP_CONTAINER_NAME; if [ $? -eq 0 ]; then echo 'Container stopped successfully.'; else echo 'Failed to stop the container.'; exit 1; fi; else echo 'Container $APP_CONTAINER_NAME is not running. Skipping stop command.'; fi"

CONTAINER_START_COMMAND="docker run -d --restart unless-stopped -p 80:3000 --name $APP_CONTAINER_NAME $APP_CONTAINER_IMAGE"

COMMAND_ID=$(aws ssm send-command \
    --document-name "AWS-RunShellScript" \
    --targets "Key=instanceIds,Values=$INSTANCE_ID" \
    --parameters commands="[\"$DOCKER_LOGIN_COMMAND\", \"$DOCKER_PULL_COMMAND\", \"$CONTAINER_STOP_COMMAND\", \"$CONTAINER_START_COMMAND\"]" \
    --query "Command.CommandId" \
    --output text)
