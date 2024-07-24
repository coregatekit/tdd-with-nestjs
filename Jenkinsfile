pipeline {
    agent any

    environment {
        DOCKER_IMAGE = ''
        DOCKER_REGISTRY = ''
        DOCKER_CREDENTIALS_ID = ''
    }

    options {
        ansiColor('xterm')
    }

    parameters {
        string(name: 'DOCKER_IMAGE', defaultValue: '', description: 'Docker Image Name')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/coregatekit/tdd-with-nestjs.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test:cov'
            }
        }
    }

    post {
        success {
            echo 'Build Success'
            cleanWs()
        }
        failure {
            echo 'Build Failed'
            cleanWs()
        }
    }
}
