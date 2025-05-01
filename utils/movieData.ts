import IMovie from '@/types/IMovie.interface';
import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/discover/movie?'
const API_KEY = process.env.API_KEY

async function fetchLastMonthMovies() {
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


export {
    fetchLastMonthMovies
}