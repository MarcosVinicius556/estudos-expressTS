//Iniciando projeto

// Tipando as tipagens de requisições e responstas
import express, { Request, Response } from 'express';

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
 * Outro recurso disponível em express, é "all" que aceita qualquer verbo http
 */
app.all('/api/product/check', (req, res) => {
    console.log('Checou aqui')
    if(req.method === 'POST') {
        return res.send('Inseriu algum registro!')
    } else if(req.method === 'GET') {
        return res.send('Leu algum registro!')
    } else {
        return res.send('Função não implementada!');
    }
})

/**
 * Agora estaremos tipando nossos argumentos da função,
 * desta forma o typescrit nos ajuda a identificar nossos retornos
 * e entradas de cada rota
 */
app.get('/api/interfaces', (req: Request, res: Response) => {
    return res.send('Utilizando interfaces com express')
});

/**
 * Realizando envio de JSON
 */

app.get('/api/json', (req: Request, res: Response) => {
    //Fazendo a conversão de um objeto direto para JSON
    return res.json({
        name: 'Shirt',
        price: 30.00,
        color: 'blue',
        sizes: ['P', 'M', 'G']
    })
});

/**
 * Recebendo parâmetros nas rotas (Router Parameters)
 */

app.get('/api/product/:id', (req: Request, res: Response) => {
    console.log(req.params);

    const id = req.params.id;
    if(id === '1') {
        const product = {
            name: 'Shirt',
            price: 30.00,
            color: 'blue',
            sizes: ['P', 'M', 'G']
        }
        return res.json(product);    
    } else {
        return res.send('Produto não encontrado');
    }
})

/**
 * Definindo a porta em que a aplicação estará rodando, e também, ao iniciar, ele irá exibir esta mensagem
 */
app.listen(3000, () => {
    console.log('Aplicação Express + TS rodando')
})