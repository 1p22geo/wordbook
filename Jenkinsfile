pipeline {
  agent any

  stages {
    stage('Install dependencies') {
      steps {
        cache(maxCacheSize: 250, defaultBranch: 'main', caches: [
          arbitraryFileCache(path: 'node_modules', cacheValidityDecidingFile: 'yarn.lock')
            ]) {
              sh 'yarn install --frozen-lockfile'
              sh 'PLAYWRIGHT_BROWSERS_PATH=0 npx playwright install'
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
        archiveArtifacts artifacts: 'coverage/', fingerprint: true
      }
    }
    stage('End-to-end tests') {
      parallel {
        stage('End-to-end: desktop') {
          steps {
            sh 'yarn e2e:desktop'
            archiveArtifacts artifacts: 'playwright-report/', fingerprint: true
          }
        }
        stage('brand') {
          steps {
            sh 'End-to-end: dyarn e2e:brand'
            archiveArtifacts artifacts: 'playwright-report/', fingerprint: true
          }
        }
        stage('webkit') {
          steps {
            sh 'End-to-end: dyarn e2e:webkit'
            archiveArtifacts artifacts: 'playwright-report/', fingerprint: true
          }
        }
        stage('iphone') {
          steps {
            sh 'End-to-end: dyarn e2e:iphone'
            archiveArtifacts artifacts: 'playwright-report/', fingerprint: true
          }
        }
        stage('mobile') {
          steps {
            sh 'End-to-end: dyarn e2e:mobile'
            archiveArtifacts artifacts: 'playwright-report/', fingerprint: true
          }
        }
      }
    }
  }
}
