pipeline {
  environment {
    registry = "1p22geo/wordbook"
    registryCredential = 'dockerhub_id'
    dockerImage = ''
}
  agent any

  stages {
    stage('Install dependencies') {
      steps {
        cache(maxCacheSize: 10024, defaultBranch: 'main', caches: [
          arbitraryFileCache(path: 'node_modules', cacheValidityDecidingFile: 'LICENSE')
            ]) {
              sh 'yarn install --frozen-lockfile'
        }
        cache(maxCacheSize: 10024, defaultBranch: 'main', caches: [
          arbitraryFileCache(path: '~/.cache/ms-playwright', cacheValidityDecidingFile: 'LICENSE')
            ]) {
              sh 'yarn playwright install'
        }
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
    stage('Build Docker image'){
      steps {
        script {
          if (env.BRANCH_NAME == 'main'){
            dockerImage = docker.build "1p22geo/wordbook:${env.BUILD_TAG}"
          }
        }
      }
    }
    stage('Push image'){
      steps {
        script {
          if (env.BRANCH_NAME == 'main'){
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
    }
  }
}


