pipeline{

agent any

    environment{
        Register ="damier85/damier-raymond"
        RegisterCrudential ="Mydocker20"
        dockerImage =""
        forTheAWSecr="367484709954.dkr.ecr.us-east-2.amazonaws.com/caliber-angular"
        Region ="ecr:us-east-2"
        ID="RevatureECRr"


    }
 
  stages{

    stage('Install/update Devkit and Get Node Version'){
            steps
                {
                  sh 'npm install @angular-devkit/build-angular'
                  sh 'node --version'
                }
          }
      stage('lint'){
            
            steps{
                  
                  sh 'ng build'
                  sh 'pwd'                
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
