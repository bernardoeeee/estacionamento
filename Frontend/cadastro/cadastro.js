// async function cadastroUser(event) {
//     event.preventDefault();

//     const name = document.getElementById('name').value.trim();
//     const CPF = document.getElementById('CPF').value.trim();

//     if (!name || !CPF) {
//         alert("Preencha todos os campos!");
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:3332/cadastro', {
//             method: 'POST',
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data)
//         });

//         const results = await response.json();

//         if (results.success) {
//             alert("Cadastro realizado com sucesso!");
//             window.location.href = '../login/login.html';
//         } else {
//             alert("Erro no cadastro: " + results.message);
//         }
//     } catch (error) {
//         alert("Erro ao conectar com o servidor.");
//         // console.error("Erro no cadastro:", error);
//     }
// }


async function cadastroUser(event) {
    event.preventDefault()

    const name = document.getElementById('name').value
    const CPF = document.getElementById('CPF').value

    const data = { name, CPF }
    console.log(data)

    const response = await fetch('http://localhost:3332/cadastro', {
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
        alert(results.message);
        window.location.href = '../login/login.html';
    } else {
        console.log("Erro no cadastro:", results.message);
    }
}