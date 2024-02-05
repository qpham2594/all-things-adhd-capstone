// Omiting NEXT_PUBLIC will only allow server-side to access the api key. Since both server and client side (React) need to access the key, NEXT_PUBLIC is needed
// https://developer.edamam.com/edamam-docs-recipe-api#/
// return props: data as NEXTJS convention
export async function getServerSideProps() {
    const apiKey = process.env.NEXT_PUBLIC_EDAMAM_API_KEY 
    const res = await fetch (`https://api.edamam.com/api/recipes/v2?type=user&app_id=7b2b1fdd&app_key=${apiKey}&imageSize=LARGE`)
    const data = await res.json()
    return {props: {data}}
}

