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
      steps {
        sh 'yarn e2e:all'
        sh 'tar -czvf report.tar.gz playwright-report'
        archiveArtifacts artifacts: 'report.tar.gz', fingerprint: true

      }
    }
  }
}
