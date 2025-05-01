"use client"
import { IPartialMovie } from "@/types/IMovie.interface";
import { fetchLastMonthMovies } from "@/utils/movieData"
import { useState } from "react";
import CustomSpinner from "../Spinner/Spinner";
import Spinner from "../Spinner/Spinner";

const MovieGallery = () => {

    const [movies, setMovies] = useState<IPartialMovie[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);

    

    return (
        <section className="w-full h-screen flex justify-center">
            <Spinner loading={loading} />
            <h1 className="p-3.5 text-2xl font-bold">Last month movies</h1>
        </section>
    )
}

export default MovieGallery