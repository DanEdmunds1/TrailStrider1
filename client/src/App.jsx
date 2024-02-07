import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import { useState, useEffect } from 'react'


function App() {

  const [altStyle, setAltStyle] = useState(() => {
    // Retrieve the style from localStorage or set a default
    return localStorage.getItem('color-scheme') || 'main';
  });



  function colorScheme(style) {
    localStorage.setItem('color-scheme', style);
    setAltStyle(style);
  }

  useEffect(() => {
    reload()

  }, [altStyle]);

  async function reload() {
    const currentStyle = localStorage.getItem('color-scheme')
    import(`./styles/${currentStyle}.scss`);
  }

   const toggleStyle = () => {
    // Toggle the style between 'main' and 'main2'
    const newStyle = altStyle === 'main' ? 'main2' : 'main';
    colorScheme(newStyle);
  };



  return (
    <>
      <NavBar toggleStyle={toggleStyle} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
