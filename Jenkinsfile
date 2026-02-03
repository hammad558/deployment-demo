pipeline {
    agent any
    
    tools {
        nodejs 'NodeJs-25'
    }
//..    
    
    
    environment {
        DEPLOY_DIR = '/var/www/deployment-demo'
        RELEASES_DIR = "${DEPLOY_DIR}/releases"
        CURRENT_LINK = "${DEPLOY_DIR}/current"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }
        
        stage('Get Version') {
            steps {
                script {
                    def packageJson = readJSON file: 'package.json'
                    env.APP_VERSION = packageJson.version
                    echo "Building version: ${env.APP_VERSION}"
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test -- --coverage --watchAll=false'
            }
        }
        
        stage('Build Application') {
            steps {
                echo 'Building React application...'
                sh """
                    export REACT_APP_VERSION=${env.APP_VERSION}
                    export REACT_APP_BUILD_DATE=\$(date +%Y-%m-%d)
                    npm run build
                """
            }
        }
        
        stage('Create Release') {
            steps {
                echo "Creating release ${env.APP_VERSION}..."
                sh """
                    mkdir -p ${RELEASES_DIR}/${env.APP_VERSION}
                    cp -r build/* ${RELEASES_DIR}/${env.APP_VERSION}/
                    echo "Release created at: ${RELEASES_DIR}/${env.APP_VERSION}"
                """
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                sh """
                    # Update symlink to new release
                    ln -sfn ${RELEASES_DIR}/${env.APP_VERSION} ${CURRENT_LINK}
                    
                    # Reload Nginx
                    sudo systemctl reload nginx
                    
                    # Cleanup old releases (keep last 5)
                    cd ${RELEASES_DIR}
                    ls -t | tail -n +6 | xargs -r rm -rf
                    
                    echo "Deployment completed successfully!"
                    echo "Version ${env.APP_VERSION} is now live"
                """
            }
        }
        
        stage('Verify Deployment') {
            steps {
                echo 'Verifying deployment...'
                sh """
                    sleep 3
                    curl -f http://localhost || exit 1
                    echo "Deployment verified!"
                """
            }
        }
    }
    
    post {
        success {
            echo "✓ Pipeline completed successfully!"
            echo "Version ${env.APP_VERSION} deployed"
        }
        failure {
            echo "✗ Pipeline failed!"
        }
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}
