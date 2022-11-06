export async function getAllSectors(){
    let request =await fetch("http://localhost:6278/sectors")

    let response = await request.json()
    return response
}