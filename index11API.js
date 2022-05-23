const mysql = require('mysql2');
const express = require('express');
const urlencodedParser = express.urlencoded({extended: false});

app = express();
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "MySQL",
    password: "",
    database: "master2022",
  });

  // Display all users
  app.get("/users", function(req, res){
      connection.query("SELECT * FROM user", function(err, data) {
        
        if (err) throw err;
        res.send(JSON.stringify(data))

      });
  });

  // Display a single user by ID
  app.get('/users/:id', (request, response) => {
    const name = request.params.id;
    connection.query('SELECT * FROM user WHERE id = ?', name, (error, data) => {
        
        if (error) throw error;
        response.send(JSON.stringify(data[0]))

    });
});
  
//   // Add a new user
  
  app.post('/users', (request, response) => {
      connection.query('INSERT INTO user SET ?', request.body, (error, result) => {
         
        if (error) throw error;
          response.send(`User added with ID: ${result.insertId}`);

      });
  });
  app.put('/users/:id', (request, response) => {
      const id = request.params.id;
      connection.query('UPDATE user SET ?  WHERE id = ?', [request.body, id], (error, result) => {
         
        if (error) throw error; 
          response.send('User updated successfully.');

      });
  });
      
 // Delete a user
app.delete('/users/:id', (request, response) => {
    const id = request.params.id;
    connection.query('DELETE FROM user WHERE id = ?', id, (error, result) => {
        
        if (error) throw error;
        response.send('User deleted.');

    });
}); 
app.listen(4050, ()=>console.log("Connected!"));