import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});
	connection.end();
});

app.post('/api/getMovies', (req, res) => {
	const sql = `SELECT * FROM movies`;
	let userID = req.body.userID;
	let data = [userID];
	
	let connection = mysql.createConnection(config);
	connection.query(sql, data, (err, result) => {
	  if (err) {
		return res.status(500)
	  }

	  res.send(result);
	});
	connection.end();
  });

  app.post('/api/getWatchlist', (req, res) => {
	const sql = `SELECT DISTINCT movie FROM Watchlist`;
	let userID = req.body.userID;
	let data = [userID];
	
	let connection = mysql.createConnection(config);
	connection.query(sql, data, (err, result) => {
	  if (err) {
		return res.status(500)
	  }

	  res.send(result);
	});
	connection.end();
  });

  app.post('/api/addReview', (req, res) => {
	const sql = `INSERT INTO Review (userID, movieID, reviewTitle, reviewContent, reviewScore) VALUES (?, ?, ?, ?, ?)`
	let userID =  req.body.userID;
	let movieID = req.body.movieID;
	let reviewTitle = req.body.reviewTitle;
	let reviewContent = req.body.reviewContent;
	let reviewScore = req.body.reviewScore;
	let data = [userID, movieID, reviewTitle, reviewContent, reviewScore];

	let connection = mysql.createConnection(config);
	connection.query(sql, data, (err, result) => {
		if (err) {
		  throw err;
		}
	  });
	  connection.end();
  });

  app.post('/api/searchMovies', (req, res) => {
	let title = req.body.title;
	let actor = req.body.actor;
	let director = req.body.director;
	let data = [];
	let sql = `SELECT M.name,
	GROUP_CONCAT(DISTINCT CONCAT(' ', D.first_name, ' ', D.last_name)) AS directors,
	GROUP_CONCAT(DISTINCT R.reviewContent SEPARATOR '|') AS review_body,
	AVG(R.reviewScore) AS average_rating
	FROM movies M
	LEFT JOIN Review R ON R.movieID = M.id
	INNER JOIN roles RO ON RO.movie_id = M.id
	INNER JOIN actors A ON A.id = RO.actor_id
	INNER JOIN movies_directors MD ON MD.movie_id = M.id
	INNER JOIN directors D ON D.id = MD.director_id
	WHERE 1=1`;

	if (title.length > 0){
		data.push(`%${title}%`);
		sql = sql + " AND M.name LIKE ?"
	}

	if (actor.length > 0){
		let [actorFirstName, actorLastName] = actor.split(' ');

		if (actorLastName){
			data.push(`%${actorFirstName}%`);
			data.push(`%${actorLastName}%`);
			sql = sql + " AND (A.first_name LIKE ? AND A.last_name LIKE ?)"
		}
		else{
			data.push(`%${actorFirstName}%`);
			data.push(`%${actorFirstName}%`);
			sql = sql + " AND (A.first_name LIKE ? OR A.last_name LIKE ?)"
		}
	}

	if (director.length > 0){
		let [directorFirstName, directorLastName] = director.split(' ');
	
		if (directorLastName){
			data.push(`%${directorFirstName}%`);
			data.push(`%${directorLastName}%`);
			sql = sql + " AND (D.first_name LIKE ? AND D.last_name LIKE ?)"
		}
		else{
			data.push(`%${directorFirstName}%`);
			data.push(`%${directorFirstName}%`);
			sql = sql + " AND (D.first_name LIKE ? OR D.last_name LIKE ?)"
		}
	}
	sql = sql + " GROUP BY M.name"
	let connection = mysql.createConnection(config);
	connection.query(sql, data, (err, result) => {
		if (err) {
		  throw err;
		}
		res.json(result);
	  });
	  connection.end();
  });


  app.post('/api/getRec', (req, res) => {
	let genres = req.body.genre;
	let director = req.body.director;
	let data = [];
	let sql = `SELECT M.name, AVG(R.reviewScore) AS average_rating, GROUP_CONCAT(DISTINCT MG.genre SEPARATOR ', ') AS genres
	  FROM movies M
	  LEFT JOIN Review R ON R.movieID = M.id
	  INNER JOIN roles RO ON RO.movie_id = M.id
	  INNER JOIN actors A ON A.id = RO.actor_id
	  INNER JOIN movies_directors MD ON MD.movie_id = M.id
	  INNER JOIN directors D ON D.id = MD.director_id
	  INNER JOIN movies_genres MG ON M.id = MG.movie_id
	  WHERE 1=1`;
  
	if (genres.length > 0) {
	  let genreArr = genres.split(',').map(genre => genre.trim());
	  genreArr.forEach(genre => {
		data.push(`%${genre}%`);
		sql += " AND M.id IN (SELECT movie_id FROM movies_genres WHERE genre LIKE ?)";
	  });
	}
  
	if (director.length > 0) {
	  let [directorFirstName, directorLastName] = director.split(' ');
  
	  if (directorLastName) {
		data.push(`%${directorFirstName}%`);
		data.push(`%${directorLastName}%`);
		sql += " AND (D.first_name LIKE ? AND D.last_name LIKE ?)";
	  } else {
		data.push(`%${directorFirstName}%`);
		data.push(`%${directorFirstName}%`);
		sql += " AND (D.first_name LIKE ? OR D.last_name LIKE ?)";
	  }
	}
  
	sql += ` GROUP BY M.name ORDER BY average_rating desc;`;
  
	let connection = mysql.createConnection(config);
	connection.query(sql, data, (err, result) => {
	  if (err) {
		throw err;
	  }
	  res.json(result);
	});
	connection.end();
  });

  app.post('/api/addFav', (req, res) => {
	let title = req.body.title;
	let data = [title];
	let sql = `INSERT INTO Watchlist (movie) VALUES (?)`


	let connection = mysql.createConnection(config);
	connection.query(sql, data, (err, result) => {
		if (err) {
		  throw err;
		}
	  });
	  connection.end();
  });

  app.post('/api/emptyList', (req, res) => {
	let userID = req.body.userID;
	let data = [userID];
	let sql = `DELETE FROM Watchlist`

	let connection = mysql.createConnection(config);
	connection.query(sql, data, (err, result) => {
		if (err) {
		  throw err;
		}
	  });
	  connection.end();
  });
  
  

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server