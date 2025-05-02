"use client"
import { IPartialMovie } from "@/types/IMovie.interface";
import { fetchLastMonthMovies, getPaginatedAndSearchedMovies } from "@/utils/movieData"
import { ChangeEvent, useEffect, useState } from "react";
import CustomSpinner from "../Spinner/Spinner";
import Spinner from "../Spinner/Spinner";
import { ITEMS_PER_PAGE } from "@/constants/ItemPerPage";
import MovieCard from "../MovieCard/MovieCard";

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

    const onPageChanged = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, action: "nxt" | "prv") => {

        if (action == "nxt") {

            if (currentPage + 1 <= totalPages) {

                setCurrentPage(currentPage + 1)
            }

        } else {

            if (currentPage - 1 >= 1) {
                setCurrentPage(currentPage - 1)
            }
        }

    }

    return (
        <section className="w-full h-screen flex justify-start gap-2 flex-col">
            <Spinner loading={loading} />
            <h1 className="p-3.5 text-2xl font-bold text-center">Last month movies</h1>

            <input
                type="text"
                placeholder="Search by title"
                value={searchTerm}
                onChange={handleSearch}
                className="border-1 border-amber-50 w-64 p-2 rounded-2xl ml-2.5"
            />

            <div className="flex justify-start h-auto gap-0 items-center border-1 border-amber-50 flex-wrap overflow-x-hidden overflow-y-auto">

                {movies.map((movie: IPartialMovie, index: number) => { return (<MovieCard key={index + movie.id} movie={movie} />) })}
            </div>
            <div className="space-x-4 w-full flex justify-center items-center mb-1">
                <button className="px-6 text-lg font-bold text-white uppercase border-2 border-yellow-400 
                       bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg shadow-lg 
                       transition-transform transform hover:scale-110 hover:shadow-2xl 
                       focus:ring focus:ring-yellow-300 h-[45px]  text-[15px] cursor-pointer"
                    onClick={(e) => { onPageChanged(e, 'prv') }}>← PRV </button>

                <span className="mr-2">{currentPage}</span>
                of
                <span className="ml-2"> {totalPages}</span>

                <button className="px-6 text-lg font-bold text-white uppercase border-2 border-yellow-400 
                       bg-gradient-to-r from-purple-700 to-blue-500 rounded-lg shadow-lg 
                       transition-transform transform hover:scale-110 hover:shadow-2xl 
                       focus:ring focus:ring-yellow-300 h-[45px] text-[15px] cursor-pointer"
                    onClick={(e) => { onPageChanged(e, 'nxt') }}>NXT →</button>
            </div>
        </section>
    )
}

export default MovieGallery