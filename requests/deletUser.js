export async function deletUser(token,id){

    try{

        let request = await fetch(`http://localhost:6278/admin/delete_user/${id}`,{
            method:"DELETE",
            headers:{
                
                Authorization : `Bearer ${token}`
            },
    
            
        })
    
         let response = await request.json()
         
         return response

    }catch(elem){
        console.log(elem)
    }


}