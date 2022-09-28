import { Link } from "react-router-dom";
import '../styles/SemiGlobal.css';

const Contact = props => {
    return(
        <>
            <div className="container">
			    <h1 className="headings">CONTACT ME</h1>
			    <div className="row">
                    <Link to="https://github.com/">
                        <img src="Services/png4.png" alt=""></img>
                    </Link>
                    <Link to="https://www.facebook.com/">
				        <img src="Services/png5.png" alt=""></img>
                    </Link> 
                    <Link to="https://www.instagram.com/?hl=en">
				        <img src="Services/png6.png" alt=""></img>
                    </Link>  
			    </div>
                    <br />
                    <p><b>Email:</b> garrovillomanuelkennon@gmail.com <br /> <b>Phone:</b> 0945-629-2038</p>
			    <form action="" className="form">
				    <input type="text" name="name" className="input" placeholder="Enter Your Name"></input>
				    <input type="text" name="name" className="input" placeholder="Enter Your Email"></input>
				    <textarea name="msg" id="msg" cols="30" rows="10" placeholder="Enter Your Message"></textarea>
				    <input type="submit" value="SEND" id="send"></input>
			    </form>
		    </div>
        </>
    )
}

export default Contact