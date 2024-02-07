import { Link } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import { useLoaderData } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Home() {

    let int = 7000

    const data = useLoaderData()
    const { trails } = data


    const [selectedTrails, setSelectedTrails] = useState([]);

    useEffect(() => {
        const getRandomTrails = () => {
            const randomTrails = [];
            while (randomTrails.length < 7) {
                const randomNumber = Math.floor(Math.random() * trails.length);
                if (!randomTrails.includes(randomNumber)) {
                    randomTrails.push(randomNumber);
                }
            }
            return randomTrails;
        };

        const randomTrailIndices = getRandomTrails();
        const selectedTrailData = randomTrailIndices.map((index) => trails[index]);
        setSelectedTrails(selectedTrailData);

    }, [trails])

    return (
        <>
            {/* Hero */}
            <section className="hero">
                <div className="hero-text">
                    <h1>TRAILSTRIDER</h1>
                    <h3>Your Hiking Trail Guide</h3>
                    <Link to="/trails"><i>Trails</i></Link>
                </div>
            </section>

            {/* Carousel */}
            <Carousel className="carousel">
                {selectedTrails.map((trail, index) => (
                    <Carousel.Item key={index} className="carousel-item" interval={int}>
                        {/* <img className="carousel-image" src={trail.image} alt={`slide ${index + 1}`} /> */}
                        <div className="carousel-img" style={{backgroundImage: `url(${trail.image})`}}></div>
                        <Carousel.Caption>
                            <div className="carousel-text-box">
                                <Link to={`/trails/${trail.id}`}><h3>{trail.name}</h3></Link>
                                <p>{trail.description}</p>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    )
}