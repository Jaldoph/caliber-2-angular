pipeline{

    agent any

    environment{
        //REPOSITORY PROJECTNAME - SEE CONVENTION FOR CALIBUR:
        //caliber-assessment
        //caliber-quality
        //caliber-config
        //caliber-category
        //caliber-batch
        RegisterFilename = "caliber-angular"
        //THE NAME OF THE DOCKER ECR REPOSITORY  ====  DO NOT CHANGE ====
        Register ="367484709954.dkr.ecr.us-east-2.amazonaws.com/${RegisterFilename}"
        //THE JENKINS CREDENTIAL ID TO MATCH ECR REPOSITORY CREDENTIALS   ====  DO NOT CHANGE ====
        RegisterCredential ="RevatureECR"
        dockerImage = ""
        Region = 'ecr:us-east-2'
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
                }
          }
   stage('Docker Build')
    {
        steps{
            script
            {
              dockerImage = docker.build("${Register}")
              echo "${dockerImage}"
            }
        }
    }
  
   stage ('Push to ECR')
    {

        steps
        {
            script{

              docker.withRegistry('https://367484709954.dkr.ecr.us-east-2.amazonaws.com', "${REGION}:${RegisterCredential}")
                {
                    dockerImage.push("latest")
                }
            }  
        }
    }
    stage ("Remove docker image"){
        steps
        {
          sh "${Register}"
        }
      }
    }
}
