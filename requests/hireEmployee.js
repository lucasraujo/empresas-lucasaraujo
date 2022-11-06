
export async function hireEmployee (token,bod){
    let request = await fetch("http://localhost:6278/departments/hire/",{
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