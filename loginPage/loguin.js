import { requestLoguin } from "../requests/loguin.js"
import { verifyTypeUser } from "../requests/verifyTypeUser.js"

function headerFunctionality() {
    let imgOptionsMobile = document.querySelector(".imgOptionsMobile")
    let imgExitMobile = document.querySelector(".imgExitMobile")
    let divButtonsHeader = document.querySelector(".divButtonsHeader")

    let buttonLoguin = document.querySelector(".buttonLoguin")
    let buttonHome = document.querySelector(".buttonHome")

    imgOptionsMobile.addEventListener("click", () => {
        imgExitMobile.classList.toggle("displayNone")
        imgOptionsMobile.classList.toggle("displayNone")
        divButtonsHeader.style.display = "flex"
    })

    imgExitMobile.addEventListener("click", () => {
        imgExitMobile.classList.toggle("displayNone")
        imgOptionsMobile.classList.toggle("displayNone")
        divButtonsHeader.style.display = "none"

    })

    buttonLoguin.addEventListener("click", () => {
        window.location.assign("/registerPage/register.html")
    })

    buttonHome.addEventListener("click", () => {
        window.location.assign("/homePage/index.html")

    })



}
headerFunctionality()

function observer() {
    let observ = new IntersectionObserver((entries) => {
        let divButtonsHeader = document.querySelector(".divButtonsHeader")

        entries.forEach(entry => {

            if (entry.isIntersecting) {


                divButtonsHeader.style.display = "flex"

            } else {

                divButtonsHeader.style.display = "none"

            }
        })
    })
    let divObserver = document.querySelector(".divObserver")

    observ.observe(divObserver)


} observer()


function submitForm() {

    let form = document.querySelector("form")
    let main = document.querySelector("main")
    let divTostErro = document.createElement("div")
    let pTostErro = document.createElement("div")
    let inputEmail = document.querySelector("#email")
    let inputSenha = document.querySelector("#password")
    let buttonregisterForm = document.querySelector(".buttonregisterForm")

    divTostErro.classList.add("divTostErro")
    pTostErro.classList.add("pTostErro")
    pTostErro.innerText = "Email ou senha invalidos"

    let obj = {}

    form.addEventListener("submit", async (elemento) => {
        elemento.preventDefault()

        form.childNodes.forEach(element => {


            if (element.tagName == "INPUT") {
                obj[element.name] = element.value

            }

        })

        let res = await requestLoguin(JSON.stringify(obj))

        if (res.token) {
            localStorage.setItem("token", res.token)

            let userIsAdmin = await verifyTypeUser(res.token)

            if (userIsAdmin.is_admin) {
                window.location.assign("/AdmPage/adm.html")

            } else {

                window.location.assign("/userPage/user.html")

            }


        } else {

            main.appendChild(divTostErro)
            divTostErro.appendChild(pTostErro)
        }
    })

    inputEmail.addEventListener("keyup", () => {
        if (divTostErro) {
            divTostErro.remove()
        }
    })
    inputSenha.addEventListener("keyup", () => {
        if (divTostErro) {
            divTostErro.remove()
        }

    })

    buttonregisterForm.addEventListener("click", () => {
        window.location.assign("/registerPage/register.html")
    })

}

submitForm()