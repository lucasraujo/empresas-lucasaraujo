export async function editUserAdmin(token,bod,id){
    let request = await fetch(`http://localhost:6278/admin/update_user/${id}`,{
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