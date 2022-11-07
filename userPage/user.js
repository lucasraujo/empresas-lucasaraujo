import { editUserInfo } from "../requests/editUser.js"
import { getAllCompanies } from "../requests/getAllCompanies.js"
import { allCoWoker } from "../requests/getAllCoWoker.js"
import { getInfoUser } from "../requests/getInfoUser.js"




function logout() {
    let buttonLogout = document.querySelector(".buttonLogout")

    buttonLogout.addEventListener("click", () => {
        localStorage.removeItem("token")
        window.location.assign("/homePage/index.html")
    })

}

logout()

async function getUserInfo() {

    let token = localStorage.getItem("token")

    let objResponse = await getInfoUser(token)



    let h2UserName = document.querySelector(".h2UserName")
    let userEmail = document.querySelector(".userEmail")
    let userStatus = document.querySelector(".userStatus")
    let userModality = document.querySelector(".userModality")
    let main = document.querySelector("main")
    



    h2UserName.innerText = objResponse.username
    userEmail.innerText = objResponse.email
    userStatus.innerText = objResponse.professional_level

    console.log(objResponse)

    if (objResponse.kind_of_work == null) {
        userModality.innerText = ""
    } else {
        userModality.innerText = objResponse.kind_of_work
    }

    if (objResponse.department_uuid == null) {

        main.insertAdjacentHTML("beforeend", `
    <section class="container sectionContainerDefault">
        <p class="pDefault">Você ainda não foi contratado</p>
    </section> `)

    let sectionContainer = document.querySelector(".sectionContainer")

    sectionContainer.classList.add("displayNone")

   

    } else {

        let sectionContainer = document.querySelector(".sectionContainer")
        let h2CompanyName = document.querySelector(".h2CompanyName")
        let h2DepartmentName = document.querySelector(".h2DepartmentName")
        let spaceOfCards = document.querySelector(".spaceOfCards")

        sectionContainer.classList="sectionContainer container"



        let res = await allCoWoker(token)
        let allEnterprise =await getAllCompanies()
        let enterpriseOfUser = allEnterprise.find(el =>  el.uuid === res[0].company_uuid)

        console.log(res)



        h2CompanyName.innerText=enterpriseOfUser.name
        h2DepartmentName.innerText = res[0].name

        res[0].users.forEach(ele =>{

            let Card = document.createElement("div")
            let NameCard = document.createElement("p")
            let statusCards = document.createElement("span")

            Card.classList.add("Card")
            NameCard.classList.add("NameCard")
            statusCards.classList.add("statusCards")

            NameCard.innerText=ele.username
            statusCards.innerText =ele.professional_level

            spaceOfCards.appendChild(Card)
            Card.append(NameCard,statusCards)

        } )

















    }


}

getUserInfo()






function modalEdit() {
    let imgEdit = document.querySelector(".imgEdit")
    let modal = document.querySelector(".modal")
    let exitModal = document.querySelector(".exitModal")


    imgEdit.addEventListener("click", () => {
        modal.showModal()
    })

    exitModal.addEventListener("click", () => {
        modal.close()
    })
}
modalEdit()

function createObjRequest() {
    let form = document.querySelector(".formModal")
    let token = localStorage.getItem("token")

    let obj = {}

    form.addEventListener("submit", async (elem) => {
        elem.preventDefault()

        form.childNodes.forEach(element => {

            if (element.tagName == "INPUT" && element.value != "")

                obj[element.name] = element.value
        })


        let objString = JSON.stringify(obj)

        await editUserInfo(token, objString)

        getUserInfo()

        document.querySelector(".modal").close()

    })

}

createObjRequest()



