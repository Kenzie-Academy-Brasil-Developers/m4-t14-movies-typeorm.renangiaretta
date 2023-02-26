import express, { Application } from 'express'
import { handleErrors } from './errors'
import { movieRoutes } from './routers/movie.routes'
import 'express-async-errors'

const app: Application = express()

app.use(express.json())
app.use('/movies', movieRoutes)
app.use(handleErrors)


export { app }