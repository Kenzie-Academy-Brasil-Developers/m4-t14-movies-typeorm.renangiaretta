import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Movie } from '../entities'
import { 
    iMovieRepo,
    iListMovie
} from '../interfaces'
import { 
    movieSchema,
    listMovieSchema
} from '../schemas'


const createMovieService = async ( payload: any )=> {
    const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)
    const movie: Movie          = await movieRepo.save(payload)
    const validatedMovie        = movieSchema.parse(movie)
    return validatedMovie
}

const getMoviesService = async ( perPage: any, page: any, order: any, sort: any, id: any ): Promise<any> => {
    const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)
    const take: number          = (perPage === undefined || perPage > 5 || perPage <= 0 || isNaN(perPage) || Number.isInteger(perPage)) ? 5 : perPage

    let skip: number = (page === undefined || isNaN(page) || page <= 0 || page === null || Number.isInteger(page)) ? 1 : page
        skip         = ( take * skip ) - take
    if(page === undefined || isNaN(page) || page <= 0 || page === null || Number.isInteger(page)){
        page = 1
    } 

    const sortBy                    = ( sort !== 'price' && sort !== 'duration' ) ? 'id' : sort
    const orderBy                   = ( sort && order ) ? order : 'ASC'
    const allmovies: Array<Movie>   = await movieRepo.find()
    const movieReturn: Array<Movie> = await movieRepo.find({
        take : Number(take),
        skip : Number(skip),
        order: {
            [sortBy]: `${orderBy}`
        }
    })


    const list: iListMovie          = listMovieSchema.parse(movieReturn)
    let   previousPage              = ((Number(page) <= 1) ? null : Number(page) - 1)
    const nexterPage: string | null = (Number(page) + 1).toString()
    const pag                       = page < 1 ? 1 : page
    const counting                  = (allmovies.length - (pag * take))
    const pagination                = {
            prevPage: page > 1 ? `http://localhost:3000/movies?page=${previousPage}&perPage=${take}`: null,
            nextPage: counting < 5 && counting < 0 ? null                                           : `http://localhost:3000/movies?page=${nexterPage}&perPage=${take}`,
            count   : allmovies.length,
            data    : list
        }
        return pagination
    }

const updateMovieService = async ( id: number, payload: any ) => {
    const movieRepo: iMovieRepo    = AppDataSource.getRepository(Movie)
    const foundMovie: Movie | null = await movieRepo.findOneBy({id})
    const movieUpdate: Movie       = await movieRepo.save({
        ...foundMovie,
        ...payload
    })
    return movieUpdate
}

const deleteMovieService = async ( id: number ) => {
    const movieRepo: iMovieRepo    = AppDataSource.getRepository(Movie)
    const foundMovie: Movie | null = await movieRepo.findOneBy({id})
    await movieRepo.remove(foundMovie!)
}

export { createMovieService, getMoviesService, updateMovieService, deleteMovieService }