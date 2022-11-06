import { getAllCompanies } from "../requests/getAllCompanies.js"
import { getAllSectors } from "../requests/getAllSectors.js"
import { getCompaniesBySectors } from "../requests/getCompaniesBySectors.js"

function optionsHeader() {

    let options = document.querySelector(".imgOptions")
    let exit = document.querySelector(".imgExit")
    let loginAndRegister = document.querySelector(".loginAndRegister")
    let selectSector = document.querySelector(".selectSector")

    options.addEventListener("click", () => {
        options.classList.toggle("displayNone")
        exit.classList.toggle("displayNone")
        loginAndRegister.classList.toggle("displayNone")
        selectSector.classList.toggle("displayNone")
    })

    exit.addEventListener("click", () => {

        options.classList.toggle("displayNone")
        exit.classList.toggle("displayNone")
        loginAndRegister.classList.toggle("displayNone")
        selectSector.classList.toggle("displayNone")

    })


}

optionsHeader()

async function getSectors() {
    let allSectors = await getAllSectors()
    let selectSector = document.querySelector(".selectSector")
    let companys = document.querySelector(".companys")



    allSectors.forEach(element => {

        let options = document.createElement("option")

        options.innerText = element.description
        options.value = element.description


        selectSector.appendChild(options)


    });


    selectSector.addEventListener("input", async() => {
        if(selectSector.value !== "all"){

            companys.innerHTML=""
            renderCompaniesBySectors(await getCompaniesBySectors(selectSector.value))
           
        }else{

            companys.innerHTML=""
            renderAllCompanies()
            
        }

    })





}
getSectors()




async function renderCompaniesBySectors(request) {

    let arrAllCompanies = await request
    let companys = document.querySelector(".companys")

    companys.innerHTML = ""

    arrAllCompanies.forEach(element => {

        companys.insertAdjacentHTML("afterbegin", `
        <div class="company">

        <h2 class="companyTitle">${element.name}</h2>

        <p class="companyTime">${element.opening_hours} hs</p>

        <span class="companySector">${element.sectors.description}</span>

        </div>
    `)

    });



}


async function renderAllCompanies() {

    let arrAllCompanies = await getAllCompanies()
    let companys = document.querySelector(".companys")

    arrAllCompanies.forEach(element => {

        companys.insertAdjacentHTML("afterbegin", `
        <div class="company">

        <h2 class="companyTitle">${element.name}</h2>

        <p class="companyTime">${element.opening_hours} hs</p>

        <span class="companySector">${element.sectors.description}</span>

        </div>
    `)

    });


}


renderAllCompanies()


function buttonsRedirectPages(){
   let buttonRegisterHeader = document.querySelector(".buttonRegisterHeader")
   let buttonLoginHeader = document.querySelector(".buttonLoginHeader")

   let buttonRegister = document.querySelector(".buttonRegister")
   let buttonLogin = document.querySelector(".buttonLogin")

   buttonLogin.addEventListener("click",()=>{

    window.location.assign("/loginPage/loguin.html")

   })
   buttonRegister.addEventListener("click",()=>{
    window.location.assign("/registerPage/register.html")

    })
   buttonLoginHeader.addEventListener("click",()=>{
    window.location.assign("/loginPage/loguin.html")

    })
   buttonRegisterHeader.addEventListener("click",()=>{
    window.location.assign("/registerPage/register.html")

    })
}

buttonsRedirectPages()