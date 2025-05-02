import { IPartialMovie } from "@/types/IMovie.interface"
import Image from 'next/image';

interface IProps {
    movie: IPartialMovie
}

const MovieCard: React.FC<IProps> = ({ movie }) => {
    return (

        <div className="relative flex gap-2 justify-around items-center flex-col w-full md:w-[360px] m-2 rounded-4xl" >
            <Image
                unoptimized
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                width={360}
                height={300}
                style={{ width: '100%', height: '300px' }}
            />
            <h1 className="font-bold text-2xl">{movie.title}</h1>
            <p className="text-neutral-400">{movie.overview}</p>

            <div className="relative bottom-0 left-0 text-[15px] w-full">
                <span className="text-neutral-500">Release Date : </span>
                <span>{movie.release_date}</span>
            </div>
        </div>

    )
}

export default MovieCard