

export async function createDepartment(token, bod) {
    let request = await fetch(`http://localhost:6278/departments`, {
        method: "POST",
        headers: {
            "Content-type": "application/json ",
            "Authorization":`Bearer ${token}`
        },
        body: bod

    }
    )

    let response = await request.json()
    console.log(response)
    return response
}