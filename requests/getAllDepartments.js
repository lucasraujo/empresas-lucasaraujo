export async function getAllDepartments(token){
    let request = await fetch("http://localhost:6278/departments",{
        method:"GET",
        headers:{
            Authorization : `Bearer ${token}`
        }
        
    })

    let response = await request.json()
     
    return response

}