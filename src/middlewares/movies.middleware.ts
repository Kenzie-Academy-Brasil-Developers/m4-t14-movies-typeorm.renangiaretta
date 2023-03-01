import { NextFunction, Request, Response } from 'express'
import { ZodTypeAny } from 'zod'
import { AppDataSource } from '../data-source'
import { Movie } from '../entities'
import { AppError } from '../errors'
import { iMovieRepo } from './../interfaces'


const verifyMovieIdMiddleware = async ( req: Request, res: Response, next: NextFunction ) => {
    const id: number               = parseInt(req.params.id)
    const movieRepo: iMovieRepo    = AppDataSource.getRepository(Movie)
    const foundMovie: Movie | null = await movieRepo.findOneBy({id})
    if (!foundMovie) {
        throw new AppError('Movie not found', 404)
    }
    return next()
}

const verifyIfMovieExistsMiddleware = async ( req: Request, res: Response, next: NextFunction ) => {
    if(!req.body.name) {
        return next()
    }
    const movieRepo: iMovieRepo     = AppDataSource.getRepository(Movie)
    const movieReturn: Movie | null = await movieRepo.findOneBy({name: req.body.name})
    if(movieReturn) {
        throw new AppError('Movie already exists.', 409)
    }
    return next()
}

const ensureDataIsValidMiddleware = ( schema: ZodTypeAny ) => ( req: Request, res: Response, next: NextFunction ) => {
    const validatedData = schema.parse(req.body)
        req.body      = validatedData
    return next()
}

export {
    verifyIfMovieExistsMiddleware,
    ensureDataIsValidMiddleware,
    verifyMovieIdMiddleware
}