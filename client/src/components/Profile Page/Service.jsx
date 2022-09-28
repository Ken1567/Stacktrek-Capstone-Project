import '../styles/SemiGlobal.css';

const Service = props => {
    return(
        <>
            <div className="service">
                <h1 className="headings">SKILLS</h1>
			    <div className="row">
				    <div className="box">
                        <img src="Services/png1.png" alt=""></img>
                        <h1 className="headings">Website Design</h1>
                        <p>Designing engaging and responsive landing pages. 
                        Integrating client CMS programs and data feeds into websites. 
                        Optimising sites for maximum speed and scalability. 
                        Employing industry and design best practice through website build process. Conducting website testing.</p>
				    </div>
				<div className="box">
					<img src="Services/png2.png" alt=""></img>
					<h1 className="headings">UX/UI <br /> Design</h1>
					<p>Create user interface for an app, website, or other interactive media. 
					Includes collaborating with product managers and engineers to gather requirements from users before designing ideas
					that can be communicated using storyboards and process flows or sitemaps.</p>
				</div>
				    <div className="box">
					    <img src="Services/png3.png" alt=""></img>
					    <h1 className="headings">Web Application</h1>
					    <p>Designing, building, testing and deploying a web-based app. 
					    To create an online presence, create a custom web application. 
					    Web applications are interactive pages that enable user input and run on a web server. 
					    What makes a web application unique is that it is stored on the internet and can be accessed via a browser. 
					    Secure, easy to backup and affordable.</p>
				    </div>
			    </div>
		    </div>
        </>
    )
}

export default Service