import express from 'express'
//import { prisma } from './db/prisma.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded())

//nossas rotas

app.get('/e_lhota', (request, response) => {
    response.sendFile( 'index.html', { root: './views/html/' } )
} )

/*app.get('/api/pedras', async (request, response)=> {
    await prisma.product.createMany({
        data: [
            {name : 'produto teste 1',price: 10},
            {name : 'produto teste 2',price: 24},
            {name : 'produto teste 3',price: 300}
        ]
    })

    const pedras = await prisma.product.findMany({
        orderBy: { id: 'desc' }
    })
    response.json(pedras)
}) */


app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`))