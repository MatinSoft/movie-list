import IMovie, { IPartialMovie } from '@/types/IMovie.interface';
import axios from 'axios';
import path from 'path';
import fs from 'fs/promises';
import IMoviePaginatedResult from '@/types/IPaginated.interface';

const BASE_URL = 'https://api.themoviedb.org/3/discover/movie?'
const API_KEY = process.env.API_KEY
const dataFilePath = path.join(process.cwd(), 'data', 'last_month_movies.json');

async function fetchLastMonthMovies(): Promise<IPartialMovie[]> {
    const today = new Date();
    const lastMonthEnd = new Date(today);
    lastMonthEnd.setDate(0); // Sets to the last day of the previous month
    const lastMonthStart = new Date(lastMonthEnd);
    lastMonthStart.setDate(1); // Sets to the first day of the previous month

    const formattedStartDate = lastMonthStart.toISOString().split('T')[0];
    const formattedEndDate = lastMonthEnd.toISOString().split('T')[0];

    try {
        const response = await axios.get(`${BASE_URL}primary_release_date.gte=${formattedStartDate}&primary_release_date.lte=${formattedEndDate}`
            ,
            {
                headers: {
                    Authorization: "Bearer " + API_KEY
                }
            }
        );
        return response.data.results.map((movie: IMovie) => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
        }));
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}

async function saveMoviesLocally(movies: IPartialMovie[]) {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(movies, null, 2), 'utf-8');
        console.log('Movies saved locally.');
    } catch (error) {
        console.error('Error saving movies locally:', error);
    }
}

async function getLocalMovies() {
    try {
        const rawData = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(rawData);
    } catch (error) {
        console.log('Local movies file not found or empty.');
        return [];
    }
}


export async function getPaginatedAndSearchedMovies(page: number, limit: number, searchTerm = ''): Promise<IMoviePaginatedResult> {
    const allMovies = await getLocalMovies();
    const filteredMovies = allMovies.filter((movie: IMovie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedMovies = filteredMovies.slice(startIndex, endIndex);

    return {
        movies: paginatedMovies,
        total: filteredMovies.length,
        totalPages: Math.ceil(filteredMovies.length / limit),
    };
}

export async function updateLocalMovieData() {
    const movies = await fetchLastMonthMovies();
    await saveMoviesLocally(movies);
}



export {
    fetchLastMonthMovies
}