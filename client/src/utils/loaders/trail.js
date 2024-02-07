export async function trailLoader() {
    const res = await fetch(`/api/trails/`)
    const trails = await res.json()

    const res2 = await fetch('/api/hikers/')
    const hikers = await res2.json()

    return { trails, hikers }
}

export async function singleTrailLoader(trailId) {
    const res = await fetch(`/api/trails/${trailId}/`)
    const trail = await res.json()

    const res2 = await fetch('/api/hikers/')
    const hikers = await res2.json()

    const res3 = await fetch('/api/reviews/')
    const reviews = await res3.json()

    return { trail, hikers, reviews }
}