import { connectDatabase } from "./pool.js";
import bodyParser from "body-parser";
import express from "express";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { generateJWT } from "./jwt/jwtGenerator.js";
import { auth } from "./middleware/auth.js";
import cors from "cors";
import multer from "multer";

const pool = connectDatabase();
const app = express();
const PORT = 8000;
// const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static route
app.use("/img", express.static("public/uploads"));

//multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },

  filename: (req, file, cb) => {
    const uniquePrefix = Date.now();
    cb(null, uniquePrefix + file.fieldname + ".png");
  },
});

//routes
app.post("/register", async (req, res) => {
  try {
    //take the username and password from the req.body
    const { firstname, lastname, username, password, birthdate, emailAdd } =
      req.body;

    //Check if the user and if email is already existing or valid
    const user = await pool.query(
      `SELECT * FROM users WHERE
        username = $1`,
      [username]
    );

    if (user.rows.length > 0) {
      res.status(401).send("User already exists");
    }

    const email = await pool.query(
      `SELECT * from users WHERE 
        email = $1`,
      [emailAdd]
    );

    if (email.rows.length > 0) {
      res.status(401).send("Email has been used");
    }

    // const validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if (email.value.match(validateEmail)) {
    //     alert("Valid email address!");
    //     return true
    // } else {
    //     alert("Invalid email address!");
    //     return false
    // }
    // }
    // const validatePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    // if (password.value.match(validatePassword)) {
    //     alert("Valid Password")
    // } else {
    //     alert("Invalid Password! Password should be 8-16 characters long and should contain \
    //     at least one numeric digit, one uppercase and one lowercase letter")
    // }

    // validate password
    // if (password.length < 8 && password.length > 16) {
    //     alert("Password should be 8-16 characters long")
    // }

    //Setup Bcrypt for password hashing

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    //Add the new user into the database
    //generate the uuid using the uuidv4() function
    const newUser = await pool.query(
      `
        INSERT INTO users (uuid, firstname, lastname, username, password, birthDate, emailAdd)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
        `,
      [
        uuidv4(),
        firstname,
        lastname,
        username,
        bcryptPassword,
        birthdate,
        emailAdd,
      ]
    );
    //add default picture
    console.dir(newUser);
    await pool.query(
      `
            INSERT INTO pictures (filename, uuid)
            VALUES ($1, $2) RETURNING *
        `,
      ["abstract-user-flat-4.png", newUser.rows[0].uuid]
    );

    //generate and return the JWT token
    const token = generateJWT(newUser.rows[0]);

    res.json({
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    //take the username and password from the req.body
    const { username, password } = req.body;

    //Check if the user is not existing
    const user = await pool.query(
      `SELECT * FROM users WHERE
        username = $1`,
      [username]
    );

    if (user.rows.length < 0) {
      res.status(401).send("User does not exists");
    }

    //Check if the password matches using bcrypt
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }

    //generate and return the JWT
    const token = generateJWT(user.rows[0]);
    const uuid = user.rows[0].uuid;
    res.json({
      token: token,
      uuid: uuid,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      msg: "Unauthenticated",
    });
  }
});

// provide the auth middleware
app.get("/profile", auth, async (req, res) => {
  try {
    //return the user object
    res.json(req.user);
  } catch (error) {
    console.error(err.message);
    res.status(500).send({
      msg: "Unauthenticated",
    });
  }
});

app.get("/post", auth, async (req, res) => {
  try {
    const uuid = req.user.uuid;
    const post = await pool.query(
      `
        SELECT * 
        FROM post 
        INNER JOIN users ON post.uuid = users.uuid 
        WHERE users.uuid = $1
        `,
      [uuid]
    );
    res.json(post.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/post", auth, async (req, res) => {
  try {
    const uuid = req.user.uuid;
    const username = req.user.username;
    const time_stamp = new Date();
    const { message, privacy } = req.body;
    // console.log(time_stamp)
    const newPost = await pool.query(
      `
        INSERT INTO post (username, time_stamp, message, privacy, uuid)
        VALUES ($1, $2, $3, $4, $5) RETURNING *
        `,
      [username, time_stamp, message, privacy, uuid]
    );
    // console.log(newPost)
    res.json("Posted");
  } catch (error) {
    console.log(error);
  }
});

app.post("/comment", auth, async (req, res) => {
  try {
    const uuid = req.user.uuid;
    const { message, post_id } = req.body;
    const newComment = await pool.query(
      `
        INSERT INTO comment (message, time_stamp, uuid, post_id) 
        VALUES ($1, NOW(), $2, $3)
        RETURNING *
        `,
      [message, uuid, post_id]
    );
    // console.log(uuid, message, post_id)
    res.json(newComment);
  } catch (error) {
    console.log(error);
  }
});

app.get("/comment/:post_id", auth, async (req, res) => {
  try {
    const { post_id } = req.params;
    const comments = await pool.query(
      `
        SELECT * 
        FROM comment
        INNER JOIN users
        ON users.uuid = comment.uuid
        INNER JOIN pictures
        ON pictures.uuid = comment.uuid
        WHERE post_id = $1
        `,
      [post_id]
    );
    res.json(comments.rows);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/comment/:comment_id", auth, async (req, res) => {
  try {
    const comment_id = req.params.comment_id;
    console.log(req.url);
    const result = await pool.query(
      `
        DELETE FROM comment
        WHERE comment_id = $1
        AND uuid = $2
        `,
      [req.params.comment_id, req.user.uuid]
    );
    if (result.rowCount === 0) {
      return res.status(400).send("Invalid Action");
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete("/post/:post_id", auth, async (req, res) => {
  try {
    const post_id = req.params.post_id;
    await pool.query(
      `
        DELETE FROM comment
        WHERE post_id = $1
        `,
      [req.params.post_id]
    );
    await pool.query(
      `
        DELETE FROM post
        WHERE id = $1
        `,
      [req.params.post_id]
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("/newsfeed", auth, async (req, res) => {
  try {
    const post = await pool.query(`
        SELECT * 
        FROM post 
        INNER JOIN pictures
        ON pictures.uuid = post.uuid
        `);
    res.json(post.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//multer middleware
const upload = multer({ storage: storage });

app.post("/upload", upload.single("my-image"), auth, async (req, res) => {
  try {
    const uuid = req.user.uuid;
    const { filename } = req.file;
    console.log(filename, uuid);
    const newPicture = await pool.query(
      `
        UPDATE pictures
        SET filename = $1
        WHERE uuid = $2
        `,
      [filename, uuid]
    );
    res.json({ msg: "Image uploaded" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/photos", auth, async (req, res) => {
  try {
    const uuid = req.user.uuid;
    const response = await pool.query(
      `
        SELECT * FROM pictures
        WHERE uuid = $1
        `,
      [uuid]
    );
    res.json(response.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/userinfo", auth, async (req, res, next) => {
  try {
    res.json({ uuid: req.user.uuid });
  } catch (error) {
    next(error);
  }
});

app.get("/ping", async (req, res) => {
  res.send("Received");
});

pool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server has started on http://localhost:${PORT}`);
    });
  }
});
