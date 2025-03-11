# ESTACIONAMENTO

# Index da pagina de cadastro do usuario
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./cadastro.css">
    <title>cadastroUser</title>
</head>

<body>
    <main>
        <div class="container">
            <div class="login-box">
                <h1>cadastro</h1>
                <form>
                    <label for="name">Nome:</label>
                    <input type="text" id="name" name="name" required>

                    <label for="CPF">CPF:</label>
                    <input type="text" maxlength="11" id="CPF" name="CPF" required>

                    <div class="botao">
                        <button type="submit" onclick="cadastroUser(event)">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    </main>

    <script src="./cadastro.js"></script>
</body>

</html>
```

## Cadastro do usuario
  
```
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
```

# Index da pagina de login do usuario
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./login.css">
    <title>Login</title>
</head>

<body>
    <main>
        <div class="container">
            <div class="login-box">
                <h1>Login</h1>
                <form action="#">
                    <label for="name">Nome:</label>
                    <input type="text" id="name" name="name" required>

                    <label for="CPF">CPF:</label>
                    <input type="text" maxlength="11" id="CPF" name="CPF" required>

                    <div class="botao">
                        <button onclick="Login(event)">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    </main>

    <a href="../Inicio/index.html"></a>

    <script src="./login.js"></script>
</body>

</html>
```

## Login de usuario

```
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
```

# Index da pagina do cadastro de caro
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style.css">
    <title>Formulário</title>
</head>

<body>
    <main>
        <div id="formulario">
            <input id="placa" minlength="7" maxlength="7" type="text" placeholder="Placa:">
            <!-- <label for="name">Placa</label> -->

            <input id="marca" type="text" placeholder="Marca:">
            <!-- <label for="name">Marca</label> -->

            <input id="modelo" type="text" placeholder="Modelo:">
            <!-- <label for="name">Modelo</label> -->
            <!-- <input id="dono" type="text" placeholder="Dono:"> -->

            <div class="escolher"><label for="vaga" id="selecionar_vaga">Escolha uma vaga:</label></div>
            <select id="vagas">
                <option value="normal">Normal</option>
                <option value="gestante">Gestante</option>
                <option value="deficiente">Deficiente</option>
                <option value="idoso">Idoso</option>
            </select>

            <div id="Informacoes"></div>
        </div>

        <!-- <button id="cadastrar">Cadastrar</button> -->

        <button onclick="cadastrarCarro(event)" alt="cadastrar">
            <i>C</i>
            <i>A</i>
            <i>D</i>
            <i>A</i>
            <i>S</i>
            <i>T</i>
            <i>R</i>
            <i>A</i>
            <i>R</i>
        </button>


    </main>

    <script src="./script.js"></script>
</body>

</html>
```

## Cadastro do carro
```
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
```

# Index da pagina de listar carro
```
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Carros</title>
    <link rel="stylesheet" href="listagem.css">
    <script src="https://kit.fontawesome.com/8a3618c51f.js" crossorigin="anonymous"></script>
</head>

<body>
    <div class="container">
        <h1 class="title">Lista de Carros</h1>

        <!-- Lista onde os carros serão exibidos -->
        <ul id="carros-lista">

        </ul>


        <div id="modal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="fecharModal()">&times;</span>
                <h2>Editar Carro</h2>
                <label for="placa">Placa:</label>
                <input type="text" id="placa" required>
                <label for="placa">Marca:</label>
                <input type="text" id="marca" required>
                <label for="CPF">Modelo:</label>
                <input type="text" id="modelo" required>
                <label for="vaga" id="frase_vaga">Escolha uma vaga:</label>
                <select id="vaga">
                    <option value="normal">Normal</option>
                    <option value="gestante">Gestante</option>
                    <option value="deficiente">Deficeinte</option>
                    <option value="idoso">Idoso</option>
                </select>
                <button onclick="editarCarro()">Salvar</button>
            </div>
        </div>
        <!-- Botão para atualizar a lista manualmente -->
        <!-- <button onclick="carregarCarros(event)" id="atualizar-lista">Atualizar Lista</button> -->
    </div>

    <script src="listagem.js"></script>
    <script src="https://kit.fontawesome.com/8a3618c51f.js" crossorigin="anonymous"></script>
</body>

</html>
```


## Listagem do carro
```
document.addEventListener("DOMContentLoaded", () => {
    carregarCarros();
});

async function carregarCarros() {
    const response = await fetch('http://localhost:3332/carros/listar');
    const data = await response.json();
    const listaCarros = document.getElementById('carros-lista')
    listaCarros.innerHTML = '';

    data.carro.forEach(carro => {
        const item = document.createElement('li');
        item.innerHTML = `
            <li>Placa: ${carro.placa} - Modelo: ${carro.modelo}</li>
            <li>
                <button id="remover" onclick="removerCarro('${carro.placa}')"><i class="fa-sharp fa-solid fa-trash"></i></button>
            </li>
            <li>
               <button id="editar" onclick="abrirModal('${carro.placa}', '${carro.modelo}')">Editar</button>


            </li>
        `;
        listaCarros.appendChild(item);
    });
}
```
## Remoção do carro
```
async function removerCarro(placa) {
    const response = await fetch(`http://localhost:3332/carros/remover/${placa}`, {
        method: 'DELETE'
    });

    const result = await response.json();
    if (result.success) {
        alert('Carro removido com sucesso!');
        carregarCarros(); // Recarrega a lista após a exclusão
    } else {
        alert(result.message || 'Erro ao remover o carro!');
    }
}
```

## Editar carro
```
async function editarCarro() {
    const placa = document.getElementById('placa').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const vaga = document.getElementById('vaga').value;

    console.log('Dados enviados:', { placa, marca, modelo, vaga });

    const response = await fetch(`http://localhost:3332/editar/${placaAntiga}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({placaAntiga, placa,marca, modelo, vaga })
    });

    const result = await response.json();
    if (result.success) {
        alert('Carro editado com sucesso!');
        carregarCarros(); // Recarrega a lista após a edição
        fecharModal(); // Fecha o modal
    } else {
        alert(result.message || 'Erro ao editar o carro!');
    }
}
```

## Abrir modal para editar o carro
```
function abrirModal(placa, marca, modelo, vaga, placaAntigaParam) {
    placaAntiga = placaAntigaParam; 
    document.getElementById('placa').value = placa;
    document.getElementById('marca').value = marca;
    document.getElementById('modelo').value = modelo;
    document.getElementById('vaga').value = vaga;

    // Exibir o modal
    document.getElementById('modal').style.display = 'block';

    
}
```

## Fechar modal
```

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}
```



# Configurando o servidor CRUD
```
require("dotenv").config();
const express = require('express')
const bodyParser = require("body-parser");
const cors = require('cors')

const porta = process.env.PORT || 3332
const app = express()


app.use(bodyParser.json()); // Permite receber JSON no body
app.use(cors())
app.use(express.json())

app.listen(porta, () => console.log(`HTTP is running on http://localhost:` + porta))

const connection = require('./db_config.js')
```

# Rotas

## Cadastro
```
app.post("/cadastro", (request, response) => {
    let params = Array(
        request.body.name,
        request.body.CPF
    );

    let query = "INSERT INTO cadastro(name, CPF) VALUES(?,?);"

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "sem sucesso",
                    data: err
                })
        };
    });
});
```

## login
```
app.post("/login", (request, response) => {
    let params = [request.body.CPF];
    let query = "SELECT name, CPF FROM cadastro WHERE CPF = ?;";

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar usuário",
                data: err
            });
        }

        if (results.length === 0) {
            return response.status(404).json({
                success: false,
                message: "Usuário não encontrado"
            });
        }

        response.status(200).json({
            success: true,
            message: "Login bem-sucedido",
            data: results[0] // Envia apenas o primeiro usuário encontrado
        });
    });
});
```

## Carros
```

app.post("/carros", (request, response) => {
    let params = Array(
        request.body.placa,
        request.body.marca,
        request.body.modelo,
        request.body.vagas
    );

    console.log(params);

    let query = "INSERT INTO carros(placa, marca, modelo, vaga) VALUES(?,?,?,?);"

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "sem sucesso",
                    data: err
                })
        };
    });
});
```

## Listar carros

```
app.get("/carros/listar", (request, response) => {
    let query = "SELECT placa, modelo FROM carros;";

    connection.query(query, (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar carros",
                data: err
            });
        } else {


            response.status(200).json({
                success: true,
                message: "Carros listados com sucesso",
                data: results
            });
        }
    });
});
```
## Editar carro
```
app.put('/carros/editar/:placa', (req, res) => {
    const placaAntiga = req.params.placa;
    const { placa, marca, modelo, vaga } = req.body;

    console.log('Recebendo requisição para editar:', { placaAntiga, placa, marca, modelo, vaga });

    const query = 'UPDATE carros SET placa=?, marca=?, modelo=?, vaga=? WHERE placa=?';
    connection.query(query, [placa, marca,modelo, vaga, placaAntiga], (err) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            return res.status(500).json({ success: false, message: 'Erro ao atualizar carro.' });
        }
        res.json({ success: true, message: 'Carro atualizado com sucesso!' });
    });
});
```

## Remover carro
```
app.delete("/carros/remover/:placa", (request, response) => {
    let query = "DELETE FROM carros WHERE placa = ? ;";

    connection.query(query, (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar carros",
                data: err
            });
        } else {

            response.status(200).json({
                success: true,
                message: "Carros listados com sucesso",
                data: results
            });
        }

    });
});
```
