import { requestRegister } from "../requests/createUser.js"

function headerFunctionality(){
    let imgOptionsMobile = document.querySelector(".imgOptionsMobile")
    let imgExitMobile = document.querySelector(".imgExitMobile")
    let divButtonsHeader = document.querySelector(".divButtonsHeader")
    
    let buttonLoguin =document.querySelector(".buttonLoguin")
    let buttonHome =document.querySelector(".buttonHome")

    imgOptionsMobile.addEventListener("click",()=>{
        imgExitMobile.classList.toggle("displayNone")
        imgOptionsMobile.classList.toggle("displayNone")
        divButtonsHeader.style.display ="flex"
    })

    imgExitMobile.addEventListener("click", ()=>{
        imgExitMobile.classList.toggle("displayNone")
        imgOptionsMobile.classList.toggle("displayNone")
        divButtonsHeader.style.display ="none"

    })

    buttonLoguin.addEventListener("click",()=>{
        window.location.assign("/loginPage/loguin.html")
    })

    buttonHome.addEventListener("click",()=>{
        window.location.assign("/homePage/index.html")
        
    })



}

headerFunctionality()

function observer(){
    let observ = new IntersectionObserver((entries) =>{

        let divButtonsHeader = document.querySelector(".divButtonsHeader")

        entries.forEach(entry =>{

            if(entry.isIntersecting ){

                divButtonsHeader.style.display ="flex"
    
            }else{

                divButtonsHeader.style.display ="none"
                
            }
        })

    })
    let divObserver = document.querySelector(".divObserver")

    observ.observe(divObserver)
    
    
}observer()

function createRegister(){

    let form = document.querySelector("form")
    let obj ={}
    form.addEventListener("submit",async (element)=>{

        element.preventDefault()

        form.childNodes.forEach( elem  =>{
            if(elem.tagName =="INPUT" || elem.tagName =="SELECT"){
    
                obj [elem.name] = elem.value
    
    
            }
    
            
        })

        let objJson = JSON.stringify( obj )

        let request = await requestRegister(objJson)

        console.log(request)

       if(request.error){

        tostFailed()

        
       }else{

        
        tostSusses()
        setTimeout(()=>{
             window.location.assign("/loginPage/loguin.html")
        },1500)


       }
        

    })


}
createRegister()

function tostSusses(){

    let main = document.querySelector("main")
    let divTostSuccess = document.createElement("div")
    let pSuccess = document.createElement("p")

    divTostSuccess.classList.add("tostSuccess")
    pSuccess.classList.add("pSuccess")
    pSuccess.innerText=`Criação de usuário bem sucedida`

    main.appendChild(divTostSuccess)
    divTostSuccess.appendChild(pSuccess)
    
}



function tostFailed(){


    
    let main = document.querySelector("main")
    let divTostFailed = document.createElement("div")
    let pFailed = document.createElement("p")

    divTostFailed.classList.add("tostFailed")
    pFailed.classList.add("pSuccess")
    pFailed.innerText=`Email ou senha invalidos`

    main.appendChild(divTostFailed)
    divTostFailed.appendChild(pFailed)

}

