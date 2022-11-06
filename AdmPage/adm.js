import { createDepartment } from "../requests/createDepartment.js";
import { deletDepartments } from "../requests/deletDepartment.js";
import { deletUser } from "../requests/deletUser.js";
import { dismissUser } from "../requests/dismissUser.js";
import { editDepartmant } from "../requests/editDeparment.js";
import { editUserAdmin } from "../requests/editUserAdmin.js";
import { getAllCompanies } from "../requests/getAllCompanies.js"
import { getAllDepartments } from "../requests/getAllDepartments.js";
import { getAllUsers } from "../requests/getAllUsers.js";
import { DepartmentsPerCompanies } from "../requests/getDeparmentPerCompanies.js";
import { hireEmployee } from "../requests/hireEmployee.js";
import { getUserNoDeparment } from "../requests/usersNoDepartment.js";



function logout() {
    let buttonLogout = document.querySelector(".buttonLogout")

    buttonLogout.addEventListener("click",()=>{

        localStorage.removeItem("token")
        window.location.replace("/homePage/index.html")


    })



}
logout()

function getToken() {


    let token = localStorage.getItem("token")
    return token
}



async function AllCompaniesInSelect() {
    let selectEnterprise = document.querySelector(".selectEnterprise")
    let companies = await getAllCompanies()


    companies.forEach(element => {
        let opt = document.createElement("option")

        opt.innerText = element.name
        opt.value = element.uuid

        selectEnterprise.appendChild(opt)
    });

    selectEnterprise.addEventListener("input", () => {
        let id = selectEnterprise.value
        renderDepartments(id)
    })



}

AllCompaniesInSelect()


async function renderDepartments(id) {


    let cardsDepartments = document.querySelector(".cardsDepartments")


    if (id == "" || id == null) {
        let allDepartments = await getAllDepartments(getToken())

        allDepartments.forEach(element => {

            let cardDepartment = document.createElement("div")
            let h3CardDepartment = document.createElement("h3")
            let DivContentCardDepartment = document.createElement("div")
            let pCardDepartment = document.createElement("p")
            let spanCardDepartment = document.createElement("span")
            let divButtonsCardDepartment = document.createElement("div")
            let view = document.createElement("img")
            let pincel = document.createElement("img")
            let trash = document.createElement("img")

            cardDepartment.classList.add("cardDepartment")
            h3CardDepartment.classList.add("h3CardDepartment")
            DivContentCardDepartment.classList.add("DivContentCardDepartment")
            pCardDepartment.classList.add("pCardDepartment")
            spanCardDepartment.classList.add("spanCardDepartment")
            divButtonsCardDepartment.classList.add("divButtonsCardDepartment")
            view.classList.add("view")
            pincel.classList.add("pincel")
            trash.classList.add("trash")

            h3CardDepartment.innerText = element.name
            pCardDepartment.innerText = element.description
            spanCardDepartment.innerText = element.companies.name

            view.src = "/assets/view.png"
            pincel.src = "/assets/pincel-black.png"
            trash.src = "/assets/trash.png"



            view.addEventListener("click", async () => {

                let viewDeparment = document.querySelector(".viewDeparment")
                let buttonX3 = document.querySelector(".buttonX3")
                let nameDepartmentModal = document.querySelector(".nameDepartmentModal")
                let h3Desc = document.querySelector(".h3Desc")
                let pEnterprise = document.querySelector(".pEnterprise")
                let selectUser = document.querySelector(".selectUser")
                let formView = document.querySelector(".formView")
                let sectionCardsModal = document.querySelector(".sectionCardsModal")

                nameDepartmentModal.innerText = element.name
                h3Desc.innerText = element.description
                pEnterprise.innerText = element.companies.name



                let res = await getUserNoDeparment(getToken())

                res.forEach(elem => {
                    let opt = document.createElement("option")
                    opt.innerText = elem.username
                    opt.value = elem.uuid

                    selectUser.appendChild(opt)

                })

                formView.addEventListener("submit", async () => {

                    let obj = {}

                    formView.childNodes.forEach(ele => {
                        if (ele.tagName == "SELECT") {
                            obj[ele.name] = ele.value
                        }


                    })

                    obj["department_uuid"] = element.uuid


                    let objJson = JSON.stringify(obj)

                    let response = await hireEmployee(getToken(), objJson)




                })

                let allUsersModal = await getAllUsers(getToken())


                console.log(allUsersModal)

                let usersNoAdm = allUsersModal.filter(el => {
                    if (!el.is_admin) return el
                })


                usersNoAdm.forEach(async el => {


                    let cardUserModal = document.createElement("div")
                    let h4UserName = document.createElement("h4")
                    let spanStatusUser = document.createElement("span")
                    let pCompanyUser = document.createElement("p")
                    let buttonDismiss = document.createElement("button")

                    cardUserModal.classList.add("cardUserModal")
                    h4UserName.classList.add("h4UserName")
                    spanStatusUser.classList.add("spanStatusUser")
                    pCompanyUser.classList.add("pCompanyUser")
                    buttonDismiss.classList.add("buttonDismiss")

                    h4UserName.innerText = el.username
                    spanStatusUser.innerText = el.professional_level

                    buttonDismiss.innerText = "Desligar"

                    let allDepartments = await getAllDepartments(getToken())

                    let res = allDepartments.find(elemento => elemento.uuid === el.department_uuid)


                    if (res !== undefined) {

                        pCompanyUser.innerText = res.companies.name
                    }

                    buttonDismiss.addEventListener("click", async () => {
                        let idUser = el.uuid

                        let res = await dismissUser(getToken(), idUser)

                        window.location.reload()




                    })



                    sectionCardsModal.appendChild(cardUserModal)
                    cardUserModal.append(h4UserName, spanStatusUser, pCompanyUser, buttonDismiss)


                })


                viewDeparment.showModal()
                buttonX3.addEventListener("click", () => {
                    viewDeparment.close()
                })





            })

            pincel.addEventListener("click", () => {

                let editDepartmantModal = document.querySelector(".editDepartmantModal")
                let buttonX2 = document.querySelector(".buttonX2")
                let formModal2 = document.querySelector(".formModal2")
                let obj = {}
                editDepartmantModal.showModal()

                buttonX2.addEventListener("click", () => {
                    editDepartmantModal.close()
                })

                formModal2.addEventListener("submit", async (ele) => {
                    ele.preventDefault()

                    formModal2.childNodes.forEach(elem => {
                        if (elem.tagName == "INPUT" || elem.tagName == "SELECT") {

                            if (!elem.value == "") {

                                obj[elem.name] = elem.value

                            }
                        }
                    })

                    console.log(obj)

                    let objJson = JSON.stringify(obj)

                    let res = await editDepartmant(element.uuid, getToken(), objJson)

                    console.log(res)

                    cardsDepartments.innerHTML = ""

                    renderDepartments()


                })

            })

            trash.addEventListener("click", () => {
                let modal = document.querySelector(".modalConfirm1")
                let closeModal = document.querySelector(".closeModal")
                let buttonConfirm = document.querySelector(".buttonConfirm")
                let spanModal = document.querySelector(".spanModal")
                spanModal.innerText = element.name

                modal.showModal()

                buttonConfirm.addEventListener("click", async () => {


                    let response = await deletDepartments(getToken(), element.uuid)
                    console.log(response)

                    modal.close()

                    window.location.reload()
                })

                closeModal.addEventListener("click", () => {
                    modal.close()
                })

            })

            cardsDepartments.appendChild(cardDepartment)
            cardDepartment.append(h3CardDepartment, DivContentCardDepartment)
            DivContentCardDepartment.append(pCardDepartment, spanCardDepartment, divButtonsCardDepartment)
            divButtonsCardDepartment.append(view, pincel, trash)




        })



    } else {

        let departmentsPerCompanies = await DepartmentsPerCompanies(getToken(), id)

        cardsDepartments.innerHTML = ""

        departmentsPerCompanies.forEach(element => {

            let cardDepartment = document.createElement("div")
            let h3CardDepartment = document.createElement("h3")
            let DivContentCardDepartment = document.createElement("div")
            let pCardDepartment = document.createElement("p")
            let spanCardDepartment = document.createElement("span")
            let divButtonsCardDepartment = document.createElement("div")
            let view = document.createElement("img")
            let pincel = document.createElement("img")
            let trash = document.createElement("img")

            cardDepartment.classList.add("cardDepartment")
            h3CardDepartment.classList.add("h3CardDepartment")
            DivContentCardDepartment.classList.add("DivContentCardDepartment")
            pCardDepartment.classList.add("pCardDepartment")
            spanCardDepartment.classList.add("spanCardDepartment")
            divButtonsCardDepartment.classList.add("divButtonsCardDepartment")
            view.classList.add("view")
            pincel.classList.add("pincel")
            trash.classList.add("trash")

            h3CardDepartment.innerText = element.name
            pCardDepartment.innerText = element.description
            spanCardDepartment.innerText = element.companies.name

            view.src = "/assets/view.png"
            pincel.src = "/assets/pincel-black.png"
            trash.src = "/assets/trash.png"


            view.addEventListener("click", async () => {

                let viewDeparment = document.querySelector(".viewDeparment")
                let buttonX3 = document.querySelector(".buttonX3")
                let nameDepartmentModal = document.querySelector(".nameDepartmentModal")
                let h3Desc = document.querySelector(".h3Desc")
                let pEnterprise = document.querySelector(".pEnterprise")
                let selectUser = document.querySelector(".selectUser")
                let formView = document.querySelector(".formView")
                let sectionCardsModal = document.querySelector(".sectionCardsModal")

                nameDepartmentModal.innerText = element.name
                h3Desc.innerText = element.description
                pEnterprise.innerText = element.companies.name



                let res = await getUserNoDeparment(getToken())

                res.forEach(elem => {
                    let opt = document.createElement("option")
                    opt.innerText = elem.username
                    opt.value = elem.uuid

                    selectUser.appendChild(opt)

                })

                formView.addEventListener("submit", async () => {

                    let obj = {}

                    formView.childNodes.forEach(ele => {
                        if (ele.tagName == "SELECT") {
                            obj[ele.name] = ele.value
                        }


                    })

                    obj["department_uuid"] = element.uuid


                    let objJson = JSON.stringify(obj)

                    let response = await hireEmployee(getToken(), objJson)




                })

                let allUsersModal = await getAllUsers(getToken())


                console.log(allUsersModal)

                let usersNoAdm = allUsersModal.filter(el => {
                    if (!el.is_admin) return el
                })


                usersNoAdm.forEach(async el => {


                    let cardUserModal = document.createElement("div")
                    let h4UserName = document.createElement("h4")
                    let spanStatusUser = document.createElement("span")
                    let pCompanyUser = document.createElement("p")
                    let buttonDismiss = document.createElement("button")

                    cardUserModal.classList.add("cardUserModal")
                    h4UserName.classList.add("h4UserName")
                    spanStatusUser.classList.add("spanStatusUser")
                    pCompanyUser.classList.add("pCompanyUser")
                    buttonDismiss.classList.add("buttonDismiss")

                    h4UserName.innerText = el.username
                    spanStatusUser.innerText = el.professional_level

                    buttonDismiss.innerText = "Desligar"

                    let allDepartments = await getAllDepartments(getToken())

                    let res = allDepartments.find(elemento => elemento.uuid === el.department_uuid)


                    if (res !== undefined) {

                        pCompanyUser.innerText = res.companies.name
                    }

                    buttonDismiss.addEventListener("click", async () => {
                        let idUser = el.uuid

                        let res = await dismissUser(getToken(), idUser)

                        window.location.reload()




                    })






                    sectionCardsModal.appendChild(cardUserModal)
                    cardUserModal.append(h4UserName, spanStatusUser, pCompanyUser, buttonDismiss)



                })








                viewDeparment.showModal()
                buttonX3.addEventListener("click", () => {
                    viewDeparment.close()
                })





            })

            pincel.addEventListener("click", () => {

                let editDepartmantModal = document.querySelector(".editDepartmantModal")
                let buttonX2 = document.querySelector(".buttonX2")
                let formModal2 = document.querySelector(".formModal2")
                let obj = {}
                editDepartmantModal.showModal()

                buttonX2.addEventListener("click", () => {
                    editDepartmantModal.close()
                })

                formModal2.addEventListener("submit", async (ele) => {
                    ele.preventDefault()

                    formModal2.childNodes.forEach(elem => {
                        if (elem.tagName == "INPUT" || elem.tagName == "SELECT") {

                            if (!elem.value == "") {

                                obj[elem.name] = elem.value

                            }
                        }
                    })

                    console.log(obj)

                    let objJson = JSON.stringify(obj)

                    let res = await editDepartmant(element.uuid, getToken(), objJson)

                    console.log(res)

                    cardsDepartments.innerHTML = ""

                    renderDepartments()


                })

            })

            trash.addEventListener("click", () => {
                let modal = document.querySelector(".modalConfirm1")
                let closeModal = document.querySelector(".closeModal")
                let buttonConfirm = document.querySelector(".buttonConfirm")
                let spanModal = document.querySelector(".spanModal")
                spanModal.innerText = element.name

                modal.showModal()

                buttonConfirm.addEventListener("click", async () => {


                    let response = await deletDepartments(getToken(), element.uuid)
                    console.log(response)

                    modal.close()

                    window.location.reload()
                })

                closeModal.addEventListener("click", () => {
                    modal.close()
                })

            })

            cardsDepartments.appendChild(cardDepartment)
            cardDepartment.append(h3CardDepartment, DivContentCardDepartment)
            DivContentCardDepartment.append(pCardDepartment, spanCardDepartment, divButtonsCardDepartment)
            divButtonsCardDepartment.append(view, pincel, trash)



        })


    }

}

renderDepartments()


async function renderAllUsers() {

    let allUsers = await getAllUsers(getToken())
    let DivCardsUsers = document.querySelector(".DivCardsUsers")

    let allUserNoAdmin = allUsers.filter(element => {

        if (element.is_admin !== true) return element

    })

    allUserNoAdmin.forEach(async element => {

        let DivCardUser = document.createElement("div")
        let userNameCard = document.createElement("h3")
        let statusCard = document.createElement("p")
        let companyNameCard = document.createElement("span")
        let divButtonsUser = document.createElement("div")
        let pincel = document.createElement("img")
        let trash = document.createElement("img")

        DivCardUser.classList.add("DivCardUser")
        userNameCard.classList.add("userNameCard")
        statusCard.classList.add("statusCard")
        companyNameCard.classList.add("companyNameCard")
        divButtonsUser.classList.add("divButtonsUser")
        pincel.classList.add("pincel")
        trash.classList.add("trash")

        userNameCard.innerText = element.username
        statusCard.innerText = element.professional_level
        companyNameCard.innerText = ""

        let allDepartments = await getAllDepartments(getToken())

        let res = allDepartments.find(elemento => elemento.uuid === element.department_uuid)


        if (res !== undefined) {

            companyNameCard.innerText = res.companies.name
        }


        pincel.src = "/assets/pincel-blue.png"
        trash.src = "/assets/trash.png"



        pincel.addEventListener("click", () => {
            let editUserModal = document.querySelector(".editUserModal")
            let buttonX4 = document.querySelector(".buttonX4")
            let formEditUser = document.querySelector(".formEditUser")
            let obj={}

            editUserModal.showModal()


            buttonX4.addEventListener("click", () => {
                editUserModal.close()
            })

            formEditUser.addEventListener("submit",async (E) => {
                E.preventDefault()
                formEditUser.childNodes.forEach(elem => {
                    if (elem.tagName === "SELECT") {
                        if(elem.value !=""){

                            obj[elem.name] = elem.value
                        }
                    }

                })


                let objJson = JSON.stringify(obj)
                let res =await editUserAdmin(getToken(),objJson,element.uuid)

                window.location.reload()

            })


        })

        trash.addEventListener("click", () => {
            let modalConfirm2 = document.querySelector(".modalConfirm2")
            modalConfirm2.showModal()
            let closeModal2 = document.querySelector(".closeModal2")
            let spanModal2 = document.querySelector(".spanModal2")
            let buttonConfirm2 = document.querySelector(".buttonConfirm2")

            spanModal2.innerText=element.username

            closeModal2.addEventListener("click",()=>{
                modalConfirm2.close()
            })

            buttonConfirm2.addEventListener("click",async()=>{
                let res = await deletUser(getToken(),element.uuid)
                console.log(res)
                window.location.reload()
            })


        })

        DivCardsUsers.appendChild(DivCardUser)
        DivCardUser.append(userNameCard, statusCard, companyNameCard, divButtonsUser)
        divButtonsUser.append(pincel, trash)

    })

}


renderAllUsers()


async function ModalCreateDepatment() {
    addSelectOption("selectModal")

    let buttonCreateDepartment = document.querySelector(".buttonCreateDepartment")
    let createDepartmentModal = document.querySelector(".createDepartmentModal")
    let formModal = document.querySelector(".formModal")
    let buttonX = document.querySelector(".buttonX")
    let cardsDepartments = document.querySelector(".cardsDepartments")
    let obj = {}

    buttonCreateDepartment.addEventListener("click", () => {
        createDepartmentModal.showModal()
    })

    buttonX.addEventListener("click", () => {
        createDepartmentModal.close()
    })

    formModal.addEventListener("submit", async (elem) => {


        formModal.childNodes.forEach(element => {

            if (element.tagName == "INPUT" || element.tagName == "SELECT") {
                obj[element.name] = element.value
            }
        })


        cardsDepartments.innerHTML = ""

        let objJson = JSON.stringify(obj)

        let response = await createDepartment(getToken(), objJson)
        console.log(response)

        renderDepartments()

    })



}

ModalCreateDepatment()


async function addSelectOption(Class) {
    let selectModal = document.querySelector(`.${Class}`)
    let companies = await getAllCompanies()

    selectModal.name = "company_uuid"

    companies.forEach(element => {
        let opt = document.createElement("option")

        opt.innerText = element.name
        opt.value = element.uuid

        selectModal.appendChild(opt)

    });

}





