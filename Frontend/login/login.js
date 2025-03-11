async function Login(event) {
    event.preventDefault()

    const name = document.getElementById('name').value
    const CPF = document.getElementById('CPF').value

    const data = { name, CPF }
    console.log(data)

    const response = await fetch('http://localhost:3332/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    console.log(response)
    const results = await response.json()
    console.log(results)

    if (results.success) {
        let userData = results.data;
        localStorage.setItem("Informacoes", JSON.stringify(userData));

        console.log("Dados salvos no localStorage:", localStorage.getItem("Informacoes"));

        alert(results.message);
        window.location.href = '../Inicio/index.html';
    } else {
        console.log("Erro no login:", results.message);
    }
}
