export async function getUserNoDeparment(token){
    let request = await fetch("http://localhost:6278/admin/out_of_work",{
        method:"GET",
        headers:{
            Authorization : `Bearer ${token}`
        },
        
    })

    let response = await request.json()
     
    return response

}