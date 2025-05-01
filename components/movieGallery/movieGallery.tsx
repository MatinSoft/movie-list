"use client"
import { IPartialMovie } from "@/types/IMovie.interface";
import { fetchLastMonthMovies, getPaginatedAndSearchedMovies } from "@/utils/movieData"
import { ChangeEvent, useEffect, useState } from "react";
import CustomSpinner from "../Spinner/Spinner";
import Spinner from "../Spinner/Spinner";
import { ITEMS_PER_PAGE } from "@/constants/ItemPerPage";

const MovieGallery = () => {

    const [movies, setMovies] = useState<IPartialMovie[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { movies, total, totalPages } = await (await fetch(`/api/movies?currentPage=${currentPage}&searchTerm=${searchTerm}`)).json()
                setMovies(movies);
                setTotalPages(totalPages);


            } catch (err: any) {
                setError(err.message);

            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [currentPage, searchTerm]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    }

    return (
        <section className="w-full h-screen flex justify-start gap-10 flex-col">
            <Spinner loading={loading} />
            <h1 className="p-3.5 text-2xl font-bold text-center">Last month movies</h1>

            <input
                type="text"
                placeholder="Search by title"
                value={searchTerm}
                onChange={handleSearch}
            />

            <div className="flex justify-center items-center h-full">

                {movies.map((movie: IPartialMovie) => { return (<h1>{movie.title}</h1>) })}
            </div>

        </section>
    )
}

export default MovieGallery