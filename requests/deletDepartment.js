
export async function deletDepartments(token,id){
    let request = await fetch(`http://localhost:6278/departments/${id}`,{
        method:"DELETE",
        headers:{
            Authorization : `Bearer ${token}`
        }
        
    })
     
    return  request

}