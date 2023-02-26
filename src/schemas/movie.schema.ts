import { z } from "zod";



const movieSchema = z.object ({
    id: z.number(),
    name: z.string().max(50),
    description: z.string().nullish(),
    duration: z.number(),
    price: z.number()
})

const createMovieSchema = movieSchema.omit({
    id: true
})

const updateMovieSchema = movieSchema.omit({
    price: true
}).partial()

const listMovieSchema = z.array(movieSchema)


export {
    movieSchema,
    createMovieSchema,
    updateMovieSchema,
    listMovieSchema
}
