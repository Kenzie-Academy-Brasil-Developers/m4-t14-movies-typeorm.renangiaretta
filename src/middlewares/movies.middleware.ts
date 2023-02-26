import { NextFunction, Request, Response } from "express"
import { ZodTypeAny } from "zod"
import { AppDataSource } from "../data-source"
import { Movie } from "../entities"
import { AppError } from "../errors"
import { iListMovie, iMovieRepo } from "../interfaces/movies.interface"
import { getMoviesService } from "../services/createMovie.service"



const verifyMovieIdMiddleware = async ( req: Request, res: Response, next: NextFunction ) => {
    const id: number = parseInt(req.params.id)
    const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)
    const foundMovie: Movie | null = await movieRepo.findOneBy({id})
    if (!foundMovie) {
        throw new AppError('Movie not found', 404)
    }
}

const verifyIfMovieExistsMiddleware = async ( req: Request, res: Response, next: NextFunction ) => {
    const movieName: string = (req.body.name)
    const moviesList: iListMovie = await getMoviesService()
    const filterMovieName = moviesList.some(el => el.name === movieName)
    if(filterMovieName) {
        throw new AppError('Movie already exists.', 409)
    }

    const movieData = req.body
    if( !movieData.name || !movieData.duration || !movieData.price  ) {
        throw new AppError('Required keys are name, duration and price')
    }
    return next()
}

const ensureDataIsValidMiddleware = ( schema: ZodTypeAny ) => ( req: Request, res: Response, next: NextFunction ) => {
    const validatedData = schema.parse(req.body)
    req.body = validatedData
    return next()
}

export {
    verifyIfMovieExistsMiddleware,
    ensureDataIsValidMiddleware,
    verifyMovieIdMiddleware
}