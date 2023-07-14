import {UnsplashImage} from "@/app/models/unsplash-image";
import Image from 'next/image';
import Link from 'next/link';
import {Alert} from '@/app/components/bootstrap';
export const metadata = {
    title:"Static Fetching - NextJS 13.4 Image Gallery"
}
export default async function StaticPageUnsplash() {
    const response = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.NEXT_PUBLIC_ACCESS_KEY_IMAGES);
    const image: UnsplashImage = await response.json();

    const width = Math.min(500, image.width);
    const height = (width/image.width) * image.height;
    console.log(image);
    return(
        <div className="d-flex flex-column align-items-center">
            <Alert>
                This page <strong>fetches and caches data at build time</strong>
                Even though the Unsplash API always returns a new image, we see the same image when doing a simple refresh.
            </Alert>
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

