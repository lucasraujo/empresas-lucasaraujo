export async function getAllUsers(token){
    let request = await fetch("http://localhost:6278/users",{
        method:"GET",
        headers:{
            Authorization : `Bearer ${token}`
        }
        
    })

    let response = await request.json()
     
    return response

}