import githubIcon from '../assets/github-icon.png'
import linkedinIcon from '../assets/linkedin-icon.png'


export default function Footer() {
    const currentYear = new Date().getFullYear()
    return (
        <footer>&copy; Dan Edmunds {currentYear}
                <a href="https://github.com/danedmunds1" target="_blank" rel="noopener noreferrer"><img src={githubIcon} className="footer-icon" alt="GitHub Link" /></a>
                <a href="https://www.linkedin.com/in/daniel-edmunds7/" target="_blank" rel="noopener noreferrer"><img src={linkedinIcon} className="footer-icon" alt="Linkedin Link" /></a>
        </footer>
    )
}