pipeline{

agent any

    environment{
        Register ="damier85/damier-raymond"
        RegisterCrudential ="Mydocker20"
        dockerImage =""
        forTheAWSecr="367484709954.dkr.ecr.us-east-2.amazonaws.com/caliber-angular"
        Region ="ecr:us-east-2"
        ID="damierTestEcr"


    }
 
  stages{

    stage('Install/update Devkit and Get Node Version'){
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
        stage('Building the image'){
         
          
           steps
        {
            script
            {
                sh'docker image prune'
                echo 'yes'
                dockerImage = docker.build("${Register}:my-image-Angular")
            }
        }
          
        }
    


   stage('AWS Building Bloc'){

        steps{
              script
              {
                dockerImage = docker.build("${forTheAWSecr}")
              }
        }
}
  
   stage ('Deploy image to AWS Ecr'){

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

    stage ("Remove unUsed docker image"){
        steps
        {
          sh "docker rmi ${dockerImage}"
        }
    }

 



}

}
