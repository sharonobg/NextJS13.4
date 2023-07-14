"use client"
import Image from 'next/image';
import { UnsplashImage } from '@/app/models/unsplash-image';
import {FormEvent, useState} from 'react';
import { Button, Form, Spinner }from 'react-bootstrap';
import {Alert} from '@/app/components/bootstrap';
import styles from './SearchPage.module.css';
export default function SearchPage(){
    //create some states with useState
    const [searchResults, setSearchResults]= useState<UnsplashImage[] | null>(null);//no img yet but expect an array
    const [searchResultsLoading,setSearchResultsLoading] = useState(false);//boolean spinner
    const [searchResultsLoadingIsError,setSearchResultsLoadingIsError] = useState(false);
    
//client-side fetching: //for production - SWR library handle this and more for client-side fetching
    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const query  = formData.get("query")?.toString().trim();
        if(query) {
            try{
            setSearchResults(null);
            setSearchResultsLoadingIsError(false);
            setSearchResultsLoading(true);
            const response = await fetch("/api/search?query=" + query);
            const images: UnsplashImage[] = await response.json();
            setSearchResults(images);
        } catch (error) {
            console.error(error);
            setSearchResultsLoadingIsError(true);
        } finally {
            setSearchResultsLoading(false);
        }

        }
    }

    return(
        <div>
            <Alert>Client-side Fetching. In order not to leak API creds using Routes.ts as route handler. This then fetches the data from Unsplash API and returns to client. BUT best to use SWR library for production -has more options for client-side fetching</Alert>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="search-input">
                    <Form.Label>Search query</Form.Label>
                    <Form.Control name="query" placeholder="E.g. cats,hotdogs. ..."
                />
                <Button type="submit" className="mb-3" disabled={searchResultsLoading}>Search</Button>
                </Form.Group>
            </Form>
            <div className="d-flex flex-column align-items-center">
                {searchResultsLoading && <Spinner animation="border" />}
                {searchResultsLoadingIsError && <p>Something in the search went wrong. Please try again.</p>}
                {searchResults?.length === 0 && <p>Nothing found. Try a different query!</p>}
            </div>
            
            {searchResults && 
                <>
                {searchResults.map(image => (
                   
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
            </>
            }
            </div>
    )
}