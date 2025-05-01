import { ITEMS_PER_PAGE } from "@/constants/ItemPerPage";
import IMoviePaginatedResult from "@/types/IPaginated.interface";
import { getPaginatedAndSearchedMovies } from "@/utils/movieData";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {

    const { searchParams } = request.nextUrl;
    try {

        const currentPage = searchParams.get("currentPage");
        const searchTerm = searchParams.get("searchTerm");
        const moviesInfo: IMoviePaginatedResult = await getPaginatedAndSearchedMovies(
            +currentPage!,
            ITEMS_PER_PAGE,
            searchTerm! as string
        )
        return NextResponse.json(moviesInfo)
    }
    catch (error: any) {
        return NextResponse.json({ cause: error?.message }, { status: 401 })
    }
}