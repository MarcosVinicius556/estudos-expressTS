//Iniciando projeto

// Tipando as tipagens de requisições e responstas
import express, { NextFunction, Request, Response } from 'express';

/**
 * Incializando a aplicação EXPRESS
 */
const app = express();

/**
 * Criando um middleware para todas as rotas
 * 
 * Para isso devemos:
 *  - Criar uma função (que será a nossa execução entre as rotas, middleware)
 *  - Chamar o método 'use' e passar nossa função
 * 
 * Desta forma, nosso middleware passará a ser executado em todas as rotas
 */
function showPath(req: Request, res: Response, next: NextFunction) {
    console.log(req.path);
    next();
}

app.use(showPath)

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
 * Exemplo de rota complexa
 * 
 * - Rotas com mais de 1 parâmetro
 */

app.get('/api/product/:id/review/:reviewId', (req: Request, res: Response) => {
    console.log(req.params);
    const id = req.params.id;
    const reviewId = req.params.reviewId;

    return res.send(`Acessando a review ${reviewId} do produto ${id}`);
});

/**
 * Router Handler
 * 
 * Externalizamos uma função anônima de uma rota, útil para deixar o código mais limpo
 */

function getUser(req: Request, res: Response) {
    console.log(`Resgatando o usuário com o ID ${req.params.id}`);

    return res.send('O usuário foi encontrado!');
}

app.get('/api/user/:id', getUser);

/**
 * Middlewares -> Executando entre a execução de uma rota, por exemplo, o "app.use" é um middleware que utilizamos
 * para que quando receba uma requisição, seja utilizado o padrão JSON
 */

/**
 * Aqui estamos definindo um middleware, onde além dos padrões normais de rota '(req, res)', também
 * teremos um parâmetro adicional, o 'next()' que é uma função que nos permite chamar uma próxima função,
 * sendo assim podendo definir o fluxo de uma aplicação
 */
function checkUser(req: Request, res: Response, next: NextFunction) {
    if(req.params.id === "1") {
        console.log('Pode continuar')
        next(); // Segue fluxo normal
    } else {
        console.log('Acesso negado!')
    }
}

app.get('/api/user/:id/access', checkUser, (req: Request, res: Response) => {
    return res.json({msg: "Bem vindo a área de acesso!"})
})

/**
 * Tipando os argumentos que vem e vão pelas requests
 */

app.get('/api/user/:id/details/:name', (req: Request<{id: string, name: string}>, res: Response<{status: boolean}>) => {
    console.log(`ID ${req.params.id}, Name: ${req.params.name}`);

    return res.json({status: true})
})

/**
 * Definindo a porta em que a aplicação estará rodando, e também, ao iniciar, ele irá exibir esta mensagem
 */
app.listen(3000, () => {
    console.log('Aplicação Express + TS rodando')
})