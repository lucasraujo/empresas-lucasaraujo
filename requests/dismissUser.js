
export async function dismissUser (token,id){
    let request = await fetch(`http://localhost:6278/departments/dismiss/${id}`,{
        method:"PATCH",
        headers:{
            Authorization : `Bearer ${token}`
        },

        
    })

     let response = await request.json()
     
     return response

}