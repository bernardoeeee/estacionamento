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
