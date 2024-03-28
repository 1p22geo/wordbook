pipeline {
  environment {
    registry = "1p22geo/wordbook"
    registryCredential = 'dockerhub_id'
    dockerImage = ''
}
  agent {
    label 'node && playwright && docker'
  }

  stages {
    stage('Install dependencies') {
      steps {
        sh 'yarn install --immutable'
        sh 'yarn playwright install'
      }
    }
    stage('Build') {
      steps {
        sh 'yarn build'
      }
    }
    stage('Prettier checks') {
      steps {
        sh 'yarn prettier'
      }
    }
    stage('Lint checks') {
      steps {
        sh 'yarn lint'
      }
    }
    stage('Unit tests') {
      steps {
        sh 'yarn coverage'
      }
    }
    stage('End-to-end tests') {
      environment {
        MONGO_URI = 'mongodb://192.168.50.46:27017'
      }
      steps {
        script {
          docker.image('mongo').withRun('-p 27017:27017') { c ->
            sh 'bash -c "for (( ;; )) do [ \\"\\$(curl http://192.168.50.46:27017 | sha256sum)\\" == \\"ab6fc4ecfa3ab9090a7f9e32a767788adb5cea7719b04a269ab28886950f0d23  -\\" ] && break;  done"'
            sh 'sleep 5'
            sh 'yarn e2e:all'
          }
        }
      }
    }
    stage('Build storybook') {
      steps {
        sh 'yarn build-storybook'
      }
    }
    stage('Build Docker image'){
      steps {
        script {
          if (env.BRANCH_NAME == 'main'){
            dockerImage = docker.build "1p22geo/wordbook:latest"
          }
          if (env.BRANCH_NAME == 'staging'){
            dockerImage = docker.build "1p22geo/wordbook:${env.BUILD_TAG}"
          }
        }
      }
    }
    stage('Push image'){
      steps {
        script {
          if (env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'staging'){
            docker.withRegistry( '', registryCredential ) {
              dockerImage.push()
            }
          }
        }
      }
    }
  }
  post {
    always {
      sh 'tar -czvf coverage.tar.gz coverage'
      archiveArtifacts artifacts: 'coverage.tar.gz'
      sh 'tar -czvf report.tar.gz playwright-report'
      archiveArtifacts artifacts: 'report.tar.gz'
      sh 'tar -czvf results.tar.gz test-results'
      archiveArtifacts artifacts: 'results.tar.gz'
      sh 'tar -czvf storybook-static.tar.gz storybook-static'
      archiveArtifacts artifacts: 'storybook-static.tar.gz'

    }
  }
}


