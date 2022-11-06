export async function editDepartmant(id,token,bod){
    let request = await fetch(`http://localhost:6278/departments/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
            Authorization : `Bearer ${token}`
        },
        body: bod

        
    })

     let response = await request.json()
     
     return response

}