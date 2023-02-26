import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors"
import { iListMovie } from "../interfaces/movies.interface"
import { getMoviesService } from "../services/createMovie.service"




const verifyIfNameAlreadyExists = async  ( req: Request, res: Response, next: NextFunction ) => {
    const movieName: string = (req.body.name)
    const moviesList: iListMovie = await getMoviesService()
    const filterMovieName = moviesList.some(el => el.name === movieName)
    if(filterMovieName) {
        throw new AppError('Movie already registered', 409)
    }
    return next()
}




export {
    verifyIfNameAlreadyExists
}