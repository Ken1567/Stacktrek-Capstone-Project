import  pg  from  "pg"
function  connectDatabase(){
	const  pool = new  pg.Pool ({

		user :  'postgres',
		password :  '1234',
		database :  'Users',
		host :  'localhost'

	})
		return  pool
	}
export { connectDatabase }