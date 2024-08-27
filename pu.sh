#!/bin/zsh

REPOSITORY_NAME="global-pdr"
PROJECT_NAME="landing"
ENVIRONMENT="Global PDR (Landing)"
TAG=${1:-staging}

docker build -t registry.ventic.tv/$REPOSITORY_NAME/$PROJECT_NAME:$TAG .
docker push registry.ventic.tv/$REPOSITORY_NAME/$PROJECT_NAME:$TAG
if [ $TAG = "staging" ]
then
  kubectl rollout restart deployment/$PROJECT_NAME-staging -n $REPOSITORY_NAME
else
  kubectl rollout restart deployment/$PROJECT_NAME -n $REPOSITORY_NAME
fi


