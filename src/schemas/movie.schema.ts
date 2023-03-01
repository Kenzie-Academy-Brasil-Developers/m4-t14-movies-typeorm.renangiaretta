import { z } from 'zod';



const movieSchema = z.object ({
    id         : z.number().int(),
    name       : z.string().max(50),
    description: z.string().nullish(),
    duration   : z.number().positive().int(),
    price      : z.number().int(),
})

const createMovieSchema = movieSchema.omit({
    id: true
})

const updateMovieSchema = movieSchema.omit({
    id: true,
}).partial({
    name       : true,
    description: true,
    duration   : true,
    price      : true,
})

const listMovieSchema = z.array(movieSchema)


export {
    movieSchema,
    createMovieSchema,
    updateMovieSchema,
    listMovieSchema
}
