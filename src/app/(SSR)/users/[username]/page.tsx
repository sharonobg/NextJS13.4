import {UnsplashUser} from "@/app/models/unsplash-user";
import {notFound} from "next/navigation";
import {Metadata} from 'next';

interface PageProps {
    params: {username: string},
}
async function getUser(username: string): Promise<UnsplashUser>{
    const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.NEXT_PUBLIC_ACCESS_KEY_IMAGES}`);

    if(response.status === 404)notFound();
    //const user:UnsplashUser = await response.json();
    return await response.json();
}
export async function generateMetadata({params:{username}}:PageProps): Promise<Metadata> {
    const user = await getUser(username);
    return{
        //title:  user.first_name + " " + user.last_name;
        //in case there is only one name or none:
        title:([user.first_name,user.last_name].filter(Boolean).join(" ")
        || user.username) + " - Images",
    }
}
export default async function UserPage({params:{username}}:PageProps){
    const user = await getUser(username);
    return(
        <div>
            <h1>{user.username}</h1>
            <p>First name: {user.first_name}</p>
            <p>Last name: {user.last_name}</p>
            <a href={"https://unsplash.com/" + user.username}>Unsplash profile</a>
        </div>
    )
};