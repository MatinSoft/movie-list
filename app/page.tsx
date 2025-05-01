import MovieGallery from "@/components/movieGallery/movieGallery";
import { updateLocalMovieData } from "@/utils/movieData";

export default async function Home() {

  await updateLocalMovieData()
  return (
    <MovieGallery />
  );
}
