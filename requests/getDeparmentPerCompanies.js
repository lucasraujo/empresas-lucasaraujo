export async function DepartmentsPerCompanies(token,id){
    let request = await fetch("http://localhost:6278/departments/"+id,{
        method:"GET",
        headers:{
            Authorization : `Bearer ${token}`
        }
        
    })

    let response = await request.json()
     
    return response

}