pipeline {
    agent any

    environment {
        SSH_CREDENTIALS_ID = 'ssh-credentials-ida' // Reemplaza esto con el ID de tus credenciales SSH en Jenkins
        SERVER_IP = 'your.server.ip' // Reemplaza esto con la IP de tu servidor
        SERVER_USER = 'your-server-user' // Reemplaza esto con el usuario de tu servidor
        APP_NAME = 'your-angular-app' // Reemplaza esto con el nombre de tu aplicación Angular
        REMOTE_DIR = '/var/www/your-angular-app' // Reemplaza esto con el directorio remoto donde deseas desplegar tu aplicación
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/tu_usuario/tu_repositorio.git' // Reemplaza con tu repositorio de GitHub
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

        stage('Deploy to Server') {
            steps {
                script {
                    // Empaquetar la aplicación Angular construida
                    sh "tar -czf ${env.APP_NAME}.tar.gz -C dist/${env.APP_NAME} ."
                    
                    // Copiar el archivo empaquetado al servidor
                    sshagent(credentials: [env.SSH_CREDENTIALS_ID]) {
                        sh "scp ${env.APP_NAME}.tar.gz ${env.SERVER_USER}@${env.SERVER_IP}:${env.REMOTE_DIR}"
                        
                        // Conectar al servidor y desplegar la aplicación
                        sh """
                        ssh ${env.SERVER_USER}@${env.SERVER_IP} << EOF
                        cd ${env.REMOTE_DIR}
                        tar -xzf ${env.APP_NAME}.tar.gz -C .
                        rm ${env.APP_NAME}.tar.gz
                        sudo systemctl restart nginx
                        EOF
                        """
                    }
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
