pipeline {
    agent any

    environment {
        APP_NAME = 'arrienda-tu-finca' // Reemplaza esto con el nombre de tu aplicación Angular
        NGINX_DIR = '/var/www/arrienda-tu-finca' // Reemplaza esto con el directorio de Nginx donde deseas desplegar tu aplicación
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Angular App') {
            steps {
                sh '''
                # Instalar dependencias de npm
                npm install
                # Construir la aplicación Angular
                npm run build --prod
                '''
            }
        }

        stage('Deploy to Nginx') {
            steps {
                script {
                    // Empaquetar la aplicación Angular construida
                    sh "tar -czf ${env.APP_NAME}.tar.gz -C dist/${env.APP_NAME} ."
                    
                    // Desplegar los archivos en el directorio de Nginx
                    sh """
                    sudo rm -rf ${env.NGINX_DIR}/*
                    sudo tar -xzf ${env.APP_NAME}.tar.gz -C ${env.NGINX_DIR}
                    sudo systemctl restart nginx
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
