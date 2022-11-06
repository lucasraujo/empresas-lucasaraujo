
export async function getInfoUser(token){
    let request = await fetch("http://localhost:6278/users/profile",{
        method:"GET",
        headers:{
            Authorization : `Bearer ${token}`
        },
        
    })

    let response = await request.json()
     
    return response

}