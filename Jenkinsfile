pipeline{

    agent any

    environment{
        //REPOSITORY PROJECTNAME - SEE CONVENTION FOR CALIBUR:
        //caliber-assessment
        //caliber-quality
        //caliber-config
        //caliber-category
        //caliber-batch
        RegisterFilename = "CHANGEME"
        //THE NAME OF THE DOCKER ECR REPOSITORY  ====  DO NOT CHANGE ====
        Register ="367484709954.dkr.ecr.us-east-2.amazonaws.com/${RegisterFilename}"
        //THE JENKINS CREDENTIAL ID TO MATCH ECR REPOSITORY CREDENTIALS   ====  DO NOT CHANGE ====
        RegisterCredential ="RevatureECR"
        dockerImage =""
    }
  stages{

    stage('Install/update Devkit/GetNodeVersion'){
        steps
            {
                sh 'npm install @angular-devkit/build-angular'
                sh 'node --version'
            }
        }
      stage(' Build'){
            
            steps{
                  
                  sh 'ng build'
                  sh 'pwd'                
                }
          }
   stage('Docker Build')
    {
        steps{
            script
            {
            dockerImage = docker.build("${forTheAWSecr}")
            echo '${dockerImage}'
            }
        }
    }
  
   stage ('Push to ECR')
    {

        steps
        {
            script{

                docker.withRegistry('https://367484709954.dkr.ecr.us-east-2.amazonaws.com', "${REGION}:${ID}")
                {
                    dockerImage.push("latest")
                }
            }  
        }
    }
    stage ("Remove docker image"){
        steps
        {
          sh "docker rmi 367484709954.dkr.ecr.us-east-2.amazonaws.com/caliber-angular:latest"
        }
      }
    }
}
