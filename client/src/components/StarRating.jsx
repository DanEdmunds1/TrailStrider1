import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

export default function StarRating() {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1
                return (
                    <label key={index}>
                        <FaStar className="star" size={50} 
                        color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)} 
                        onClick={() => setRating(currentRating)} />
                    </label>
                )
            })}
        </div>
    )

}