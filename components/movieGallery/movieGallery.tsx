import { fetchLastMonthMovies } from "@/utils/movieData"

const MovieGallery = async () => {
    const movies = await fetchLastMonthMovies()
    console.log(movies)

    return (
        <>HI</>
    )
}

export default MovieGallery