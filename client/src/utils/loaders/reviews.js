export async function getAllReviews() {
    const res = await fetch('/api/reviews/')
    const reviews = await res.json()

    const res2 = await fetch('/api/hikers/')
    const hikers = await res2.json()

    const res3 = await fetch(`/api/trails/`)
    const trails = await res3.json()
    
    return { reviews, hikers, trails }
}
