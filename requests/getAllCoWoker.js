
export async function allCoWoker(token){
    let request =await fetch(`http://localhost:6278/users/departments/coworkers`,{
        method:"GET",
        headers:{Authorization:`Bearer ${token}`},
    })

    let response = await request.json()

    
    return response
}