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

function abrirModal(placa, marca, modelo, vaga, placaAntigaParam) {
    placaAntiga = placaAntigaParam; 
    document.getElementById('placa').value = placa;
    document.getElementById('marca').value = marca;
    document.getElementById('modelo').value = modelo;
    document.getElementById('vaga').value = vaga;

    // Exibir o modal
    document.getElementById('modal').style.display = 'block';

    
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

// Função para editar os dados do carro
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


// async function carregarCarros() {

//     const listaCarros = document.getElementById('carros-lista')

//     // Limpar a lista antes de atualizar
//     // listaCarros.innerHTML = ""

//     try {
//         // Fetch para listar os carros
//         const response = await fetch('http://localhost:3332/carros/listar', {
//             method: "GET",
//         });

//         // Verificar se a resposta foi bem-sucedida
//         if (!response.success) {
//             throw new Error('Erro ao carregar carros');
//         }

//         // Converter a resposta para JSON
//         const results = await response.json();

//         // Verificar se a resposta contém carros
//         if (results.success && Array.isArray(results.carros)) {
//             // Para cada carro na resposta, criar um item na lista
//             results.carros.forEach(carros => {
//                 const item = document.createElement('li');
//                 item.textContent = `Placa: ${carros.placa} - Modelo: ${carros.modelo}`;

//                 // Criar o botão de remover
//                 const btnRemover = document.createElement("button");
//                 btnRemover.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';
//                 btnRemover.style.border = "none";
//                 btnRemover.style.cursor = "pointer";
                
//                 // Função para remover o carro
//                 btnRemover.onclick = function () {
//                     removerCarro(carros.placa); // Função para excluir o carro
//                     item.remove(); // Remover o item da lista
//                 }

//                 // Adicionar o botão ao item
//                 item.appendChild(btnRemover);

//                 // Adicionar o item à lista
//                 listaCarros.appendChild(item);
//             });
//         } else {
//             alert('Nenhum carro encontrado');
//         }

//     } catch (error) {
//         console.error('Erro:', error);
//         alert('Ocorreu um erro ao carregar os carros');
//     }
// }

// Função para remover o carro (implementação fictícia de excluir carro)
async function removerCarro(placa) {
    try {
        const response = await fetch(`http://localhost:3332/carros/remover/${placa}`, {
            method: 'DELETE',
        });

        if (!response.success) {
            throw new Error('Erro ao remover o carro');
        }

        const result = await response.json();

        if (result.success) {
            alert('Carro removido com sucesso');
        } else {
            alert('Falha ao remover carro');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar remover o carro');
    }
}

// Chamada inicial
// window.onload = carregarCarros;


// criar a funcao
// criar uma varialvel para comeco
// pegaar os itens do bacno de dados
// adicionar na pagian de listagem
// atuaizar assim que um carro for cadastrado
// excluir carro da lista