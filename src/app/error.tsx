"use client"
//type:
interface ErrorPageProps {
    error: Error,
    reset:() => void,
}
export default function Error({error, reset}:ErrorPageProps) {
    return(
        <div>
            <h1>Error :( <br />
            Something went wrong</h1>
            <button className="btn btn-primary" onClick={reset}>Try again</button>
            </div>
    )
}