//Iniciando projeto
import express from 'express';

/**
 * Incializando a aplicação EXPRESS
 */
const app = express();

/**
 * Aqui estamos definindo uma rota, que por padrão no express, sempre virá com 2 parâmetros,
 * onde uma será a "req" de onde tiramos valores vindos da requisição, e o outro o "res" que seria nossa resposta (caso seja necessário devolver algo)
 * 
 */
app.get('/', (req, res) => {
    return res.send("HELLO EXPRESS!");
})

/**
 * Criando uma rota com o verbo HTTP -> POST, além disso, também definindo um middleware para
 * ser capaz de se comunicar utilizando JSON
 */

app.use(express.json())

app.post('/api/product', (req, res) => {    
    console.log(req.body)

    return res.send("PRODUTO ADICIONADO!");
})

/**
 * Definindo a porta em que a aplicação estará rodando, e também, ao iniciar, ele irá exibir esta mensagem
 */
app.listen(3000, () => {
    console.log('Aplicação Express + TS rodando')
})