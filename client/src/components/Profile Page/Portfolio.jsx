import { Link } from "react-router-dom";
import '../styles/SemiGlobal.css';

const Portfolio = props => {
    return (
        <>
            <div className="container">
			    <h1 className="headings">PROJECTS</h1>
			    <div className="gallery">
				    <Link to="https://github.com/Ken1567/Hangman.git">
					    <img src="/Images/img1.jpg" alt=""></img>
				    </Link>
				    <Link to="https://github.com/Ken1567/Text-Based_Adventure_Game.git">
					    <img src="/Images/img2.jpg" alt=""></img>
				    </Link>
				    <Link to="https://github.com/Ken1567/Quiz.git">
					    <img src="/Images/img4.jpg" alt=""></img>
				    </Link>
					    <img src="/Images/img5.jpg" alt=""></img>
					    <img src="/Images/img6.jpg" alt=""></img>
					    <img src="/Images/img7.jpg" alt=""></img>
			    </div>
		    </div>
        </>
    )
}

export default Portfolio