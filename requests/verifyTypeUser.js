
export async function verifyTypeUser(token){
    let request =await fetch("http://localhost:6278/auth/validate_user",{
        method:"GET",
        headers:{Authorization:`Bearer ${token}`},
    })

    let response = await request.json()

    
    return response
}