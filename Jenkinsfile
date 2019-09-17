#!/usr/bin/env groovy
node {
  try {
    withCredentials([[
      $class           : 'AmazonWebServicesCredentialsBinding',
      credentialsId    : 'jenkins-aws',
      accessKeyVariable: 'AWS_ACCESS_KEY_ID',
      secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
    ]]) {
      timeout(10) {
        stage ('Checkout') {
            deleteDir()
            checkout scm
        }
      }
      stage ('Build & Push container') {
          IMAGE = "873441650155.dkr.ecr.ap-southeast-1.amazonaws.com/users"

          if (env.JOB_NAME == "PROD-deploy-USERS") {
            TAG = "prod"
          } else if (env.JOB_NAME == "STG-deploy-USERS"){
            TAG = "stg"
          } else if (env.JOB_NAME == "DEV-deploy-USERS"){
            TAG = "latest"
          }
          sh """
          sudo docker build -t $IMAGE:$TAG api/
          sudo \$(aws ecr get-login --no-include-email --region ap-southeast-1)
          sudo docker push $IMAGE
          """
      }
      stage ('Deploy') {
          sh "ecs-deploy -n $ECS_SERVICE -k ${env.AWS_ACCESS_KEY_ID} -s ${env.AWS_SECRET_ACCESS_KEY} -r $ECS_REGION -c $ECS_CLUSTER_NAME -i $IMAGE:$TAG -t $TIMEOUT"
          slackSend (color: '#00FF00', message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
          dir('node_modules') {
              deleteDir()
          }
      }
    }
  } catch (error) {
    currentBuild.result = "FAILED"
    sh """
    sudo docker image prune -f --filter label=stage=intermediate || true
    sudo docker rmi \$(sudo docker images --filter "dangling=true" -q --no-trunc) || true
    """
    slackSend (color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    slackSend (color: '#d6b330', message: "Error message: '${error}")
    throw error
   }
}
