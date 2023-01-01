import Link from "next/link";

export default function FirstPost() {
    return (
        <>
            <h1>First Post</h1>
            <h2>
                <Link href="/">Back to homepage</Link>
            </h2>
            <a href="https://nextjs.org/learn/basics/assets-metadata-css">todo</a>
        </>
    )
}