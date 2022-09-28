import '../styles/SemiGlobal.css';

const About = props => {
    return(
        <>
            <div className = "container">
			    <h1 className="headings">ABOUT ME</h1>
			    <div id="pic">	
				    <img src="/Images/img3.jpg" alt=""></img>
				    <div id="intro">
					    <h2>MANUEL KENNON A. GARROVILLO</h2>
					    <p>I am a career shifter with a degree in Teacher Education. Currently, I am training under Stacktrek as a Full Time Bootcamper.
					    I am honing my skills in programming, particularly in using programming languages, as well as front-end and back-end development.
					    </p>
					    <br />
					    <h2>Strengths and Weaknesses</h2>
					    <p>When I focus at a certain work, I can and will get it done as soon as possible.
					    I have time-management and is not distracted easily. On the other hand, I get frustrated when something
					    I worked on for a long time doesn't work and I usually need a lot of encouragement for me to be able to
					    start and finish my work.</p>
				    </div>
			    </div>
		    </div>
        </>
    )
}

export default About