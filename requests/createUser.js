export async function requestRegister(objBody){
    let request =await fetch("http://localhost:6278/auth/register",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:objBody
    })

    let response = await request.json()


    return response
}