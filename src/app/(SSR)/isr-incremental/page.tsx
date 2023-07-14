import {UnsplashImage} from "@/app/models/unsplash-image";
import Image from 'next/image';
import Link from 'next/link';
import {Alert} from '@/app/components/bootstrap';
export const metadata = {
    title:"Incremental Fetching - NextJS 13.4 Image Gallery"
}
export const revalidate = 15;
export default async function DynamicPageUnsplash() {
    const response = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.NEXT_PUBLIC_ACCESS_KEY_IMAGES,{
        //cache: "no-cache"
        //next:{ revalidate: 15}//all 3 are equal
    });
    const image: UnsplashImage = await response.json();

    const width = Math.min(300, image.width);
    const height = (width/image.width) * image.height;
    console.log(image);
    return(
        <div className="d-flex flex-column align-items-center">
            <Alert>Incremental Revalidation - New Image will be available after refressing the page after 15 seconds</Alert>
            <Image 
                src={image.urls.raw}
                width= {width}
                height = {height}
                alt = {image.description}
                className="rounded shadow mw-100 h--100"
            />
            by <Link href={"/users/" + image.user.username }>{image.user.username}</Link>
        </div>
    )
}

