export async function editUserInfo (token,bod){
    let request = await fetch("http://localhost:6278/users",{
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