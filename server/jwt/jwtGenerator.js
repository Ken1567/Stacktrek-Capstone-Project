import  jwt  from  "jsonwebtoken"
import  dotenv  from  "dotenv"
dotenv.config();

const  generateJWT = (user) => {
	return  jwt.sign(user, process.env.jwtSecret, { expiresIn:  '720h' })
}
export { generateJWT }