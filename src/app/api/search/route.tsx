import {UnsplashSearch} from "@/app/models/unsplash-image";
import { NextResponse } from "next/server";
export async function GET(request: Request){
    const{searchParams} = new URL(request.url);
    const query = searchParams.get("query");
    if(!query){
        return NextResponse.json( {error: "no query provided"}, {status:400})
    }
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY_IMAGES}`);
    const {results}:UnsplashSearch = await response.json();
    return NextResponse.json(results);

}
//export async function POST(request: Request){
//    
//}
// GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS
//export async function DELETE(request: Request){
//    
//}