export async function getRegions() {
    const res = await fetch('/api/regions/')
    return res.json()
}