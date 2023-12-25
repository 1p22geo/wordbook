pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                sh 'yarn install --frozen-lockfile'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
