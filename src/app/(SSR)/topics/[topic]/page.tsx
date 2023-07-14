import {UnsplashImage} from "@/app/models/unsplash-image";
import Image from 'next/image';
import styles from './TopicPage.module.css';
import {Alert} from '@/app/components/bootstrap';
import {Metadata} from 'next';

//export const dynamicParams = false;
interface PageProps {
    //must be exactly for NextJS:
    params: { topic: string },
    //searchParams: { [key: string]:string|string[]|undefined}
}
export function generateMetadata({params:{topic}}:PageProps):Metadata {
    return{
        title: topic + " - Images"
    }
}
export function generateStaticParams(){
    return ["health","fitness","apples"].map(topic => ({topic}));
}
//export const revalidate = 0;
export default async function DynamicUrls({params:{topic}}:PageProps) {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=10&client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY_IMAGES}`)
    const images:UnsplashImage[] = await response.json();
    return(  //some UI
        <div>
            <Alert>
                This page generates pages by topics - if you don&#39;t want to cache images, set export const revalidate to 0. if you want ONLY the topics listed in the generateStaticParams, set export const dynamicParams to false.
            </Alert>
            <h1>{topic}</h1>
            {
                images.map(image => (
                    <Image 
                        src={image.urls.raw}
                        width={250}
                        height={250}
                        alt={image.description}
                        key={image.urls.raw}
                        className={styles.image}

                        />
                    ))
                }
            </div>
        
          
)
            }
