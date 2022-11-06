export async function getCompaniesBySectors(sector){
    let request =await fetch(`http://localhost:6278/companies/${sector}`,{
        method: "GET",
        headers:{ "Authorization": "Bearer null" }
        
    })


    let response = await request.json()

    

    return response
}