import { useEffect, useState } from "react"

// eslint-disable-next-line react/prop-types
export default function Filters({ searchTrails, setFilteredSearchTrails }) {

  const [filters, setFilters] = useState({
    search: '',
    sortBy: ''
  })

  function handleChange(e) {
    const { name, value } = e.target
    const cleanSearch = value.replace(/[^\w\s'"]/gi, '')
    const newObj = {
      ...filters,
      [name]: cleanSearch
    }
    setFilters(newObj)
  }


  useEffect(() => {
    const pattern = new RegExp(filters.search, 'i')
    // eslint-disable-next-line react/prop-types
    const filteredArray = searchTrails.filter((trail) => pattern.test(trail.name))

    let sortedArray;
    switch (filters.sortBy) {
      case 'shortestToLongest':
        sortedArray = filteredArray.sort((a, b) => a.length - b.length)
        break
      case 'longestToShortest':
        sortedArray = filteredArray.sort((a, b) => b.length - a.length)
        break
      case 'easiestToHardest':
        sortedArray = filteredArray.sort((a, b) => a.difficulty - b.difficulty)
        break
      case 'hardestToEasiest':
        sortedArray = filteredArray.sort((a, b) => b.difficulty - a.difficulty)
        break
      default:
        sortedArray = filteredArray;
    }
    setFilteredSearchTrails(sortedArray)
  }, [filters, searchTrails, setFilteredSearchTrails])


  // // Display by...
  // // eslint-disable-next-line react/prop-types
  // const shortestToLongest = filteredSearchTrails.sort((a, b) => a.length - b.length)
  //  // eslint-disable-next-line react/prop-types
  // const longestToShortest = filteredSearchTrails.sort((a, b) => b.length - a.length)
  //  // eslint-disable-next-line react/prop-types
  // const easiestToHardest = filteredSearchTrails.sort((a, b) => a.difficulty - b.difficulty)
  //  // eslint-disable-next-line react/prop-types
  // const hardestToEasiest = filteredSearchTrails.sort((a, b) => b.difficulty - a.difficulty)



  return (
    <>
      <input className="searchbar" name="search" placeholder="Search..." value={filters.search} onChange={handleChange} />
      <select className="dropdown" name="sortBy" value={filters.sortBy} onChange={handleChange}>
        <option value=''>Display by...All</option>
        <option value='easiestToHardest'>Difficulty (easiest)</option>
        <option value='hardestToEasiest'>Difficulty (hardest)</option>
        <option value='shortestToLongest'>Distance (shortest)</option>
        <option value='longestToShortest'>Distance (longest)</option>
      </select>
    </>
  )
}