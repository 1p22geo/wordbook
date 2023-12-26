pipeline {
  agent any

  stages {
    stage('Install dependencies') {
      steps {
        cache(maxCacheSize: 250, defaultBranch: 'main', caches: [
          arbitraryFileCache(path: 'node_modules', cacheValidityDecidingFile: 'yarn.lock')
            ]) {
              sh 'yarn install --frozen-lockfile'
        }
        cache(maxCacheSize: 250, defaultBranch: 'main', caches: [
          arbitraryFileCache(path: '~/.cache/ms-playwright', cacheValidityDecidingFile: 'playwright.config.ts')
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
        sh 'tar -czvf coverage.tar.gz coverage'
        archiveArtifacts artifacts: 'coverage.tar.gz', fingerprint: true
      }
    }
    stage('End-to-end tests') {
      parallel {
        stage('End-to-end: desktop') {
          steps {
            sh 'yarn e2e:desktop'
            sh 'tar -czvf report-desktop.tar.gz playwright-report'
            archiveArtifacts artifacts: 'report-desktop.tar.gz', fingerprint: true
          }
        }
        stage('End-to-end: brand') {
          steps {
            sh 'yarn e2e:brand'
            sh 'tar -czvf report-brand.tar.gz playwright-report'
            archiveArtifacts artifacts: 'report-brand.tar.gz', fingerprint: true
          }
        }
        stage('End-to-end: webkit') {
          steps {
            sh 'yarn e2e:webkit'
            sh 'tar -czvf report-webkit.tar.gz playwright-report'
            archiveArtifacts artifacts: 'report-webkit.tar.gz', fingerprint: true
          }
        }
        stage('End-to-end: iphone') {
          steps {
            sh 'yarn e2e:iphone'
            sh 'tar -czvf report-iphone.tar.gz playwright-report'
            archiveArtifacts artifacts: 'report-iphone.tar.gz', fingerprint: true
          }
        }
        stage('End-to-end: mobile') {
          steps {
            sh 'yarn e2e:mobile'
            sh 'tar -czvf report-mobile.tar.gz playwright-report'
            archiveArtifacts artifacts: 'report-mobile.tar.gz', fingerprint: true
          }
        }
      }
    }
  }
}
