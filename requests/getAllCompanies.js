

export async function getAllCompanies(){
    let request =await fetch("http://localhost:6278/companies")

    let response = await request.json()

    return response
}

