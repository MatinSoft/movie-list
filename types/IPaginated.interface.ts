import { IPartialMovie } from "./IMovie.interface";

export default interface IMoviePaginatedResult {
    movies: IPartialMovie[]
    total: number
    totalPages: number
}