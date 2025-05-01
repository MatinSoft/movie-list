import { fetchLastMonthMovies } from "@/utils/movieData"

const MovieGallery = async () => {
    const movies = await fetchLastMonthMovies()
    console.log(movies)

    return (
        <section className="w-full h-screen flex justify-center">
            <h1 className="p-3.5 text-2xl font-bold">Last month movies</h1>
        </section>
    )
}

export default MovieGallery