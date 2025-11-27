import express from 'express'
import { prisma } from './db/prisma.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded())

//nossas rotas

app.use(express.static('views/html'))

app.use(express.static('views/assets'))

app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`))