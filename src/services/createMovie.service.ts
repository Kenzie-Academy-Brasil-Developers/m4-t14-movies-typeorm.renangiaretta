import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Movie } from "../entities"
import { AppError } from "../errors"
import { iMovieRepo, iListMovie } from "../interfaces/movies.interface"
import { movieSchema, listMovieSchema, updateMovieSchema } from "../schemas"




const createMovieService = async ( payload: any )=> {
    const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)
    const movie: Movie = await movieRepo.save(payload)
    const validatedMovie =  movieSchema.parse(movie)
    return validatedMovie
}

const getMoviesService = async ( ): Promise<iListMovie> => {
    const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)
    const movieReturn: Array<Movie> = await movieRepo.find()
    return listMovieSchema.parse(movieReturn)


}

const updateMovieService = async ( id: number, payload: any ) => {
    const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)
    const foundMovie: Movie | null = await movieRepo.findOneBy({id})
    const movieUpdate: Movie = await movieRepo.save({
        ...foundMovie,
        ...payload
    })
    const validatedSchema = updateMovieSchema.parse(movieUpdate)
    return validatedSchema
}

const deleteMovieService = async ( id: number ) => {
    const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)
    const foundMovie: Movie | null = await movieRepo.findOneBy({id})
    await movieRepo.remove(foundMovie!)
}

export { createMovieService, getMoviesService, updateMovieService, deleteMovieService }