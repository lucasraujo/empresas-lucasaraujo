
export async function requestLoguin(bod){
    let request =await fetch(`http://localhost:6278/auth/login`,{
        method: "POST",
        headers:{ "Content-type": "application/json " },
        body:bod
        
    },
    )

    let response = await request.json()
    return response
}