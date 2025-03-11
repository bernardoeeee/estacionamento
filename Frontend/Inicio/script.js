document.addEventListener("DOMContentLoaded", () => {

    window.addEventListener("load", () => {
        if (localStorage.getItem("Informacoes")) {
            let Html = document.getElementById('Informacoes')
            const dados = JSON.parse(localStorage.getItem('Informacoes'))

            Html.innerHTML = `<div style="display: flex; flex-direction: column; align-items: start;">
                     CPF: ${dados.CPF}
                    </div>`

        }
    })
})


async function cadastrarCarro(event) {
    event.preventDefault()

    const placa = document.getElementById('placa').value
    const marca = document.getElementById('marca').value
    const modelo = document.getElementById('modelo').value
    const vagas = document.getElementById('vagas').value
    // const dados = JSON.parse(localStorage.getItem("Informacoes")) || {};
    // const CPF = dados.CPF; // Pega o CPF armazenado

    if (!placa || !marca || !modelo || !vagas) {
        alert("Preencha todos os campos!");
        return;
    }

    const data = {placa, marca, modelo, vagas}

    const response = await fetch('http://localhost:3332/carros', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    // .then(response => response.json())
    // .then(data => {
    //     alert(data.message);
    // })
    // .catch(error => console.error("Erro ao cadastrar:", error));

    console.log(response)

    const results = await response.json()
    console.log(results)


    if (results.success) {
        alert(results.message);
        window.location.href = '../listar-carros/listagem.html';
    } else {
        console.log("Erro no cadastro do carro :", results.message);
    }
}