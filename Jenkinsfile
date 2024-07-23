pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim'
            args '-p 3000:3000'
        }
    }

    environment {
        DOCKER_IMAGE = ''
        DOCKER_REGISTRY = ''
        DOCKER_CREDENTIALS_ID = ''
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/coregatekit/tdd-with-nestjs.git'
            }
        }

        stage('Preparing Environment') {
            steps {
                sh 'corepack enable'
                sh 'corepack prepare pnpm@latest-9 --activate'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'pnpm install'
            }
        }
    }
}
