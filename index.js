const express = require('express');
const app = express();

const mysql = require("mysql");

const cors = require("cors");

const db = mysql.createPool({
    host : "localhost",
    user : "root",
    password : "",
    database : "my-sql-project"
});

app.use(cors());
app.use(express.json());

//-----------fetching the data--------
app.get("/api/get", (req,res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet , (error , result) => {
        res.send(result);
    })
})

//--------Add API-------------
app.post("/api/post", (req, res) => {
    const {name , email , contact} = req.body;
    const sqlInsert = "INSERT INTO contact_db (name , email, contact) VALUES (?, ?, ?)" ;
    db.query(sqlInsert, [name, email, contact] , (error, result) => {
        if(error) console.log(error);
    });
})
//----------Delete API-------
app.delete("/api/delete/:id", (req, res) => {
    const {id} = req.params;
    const sqlDelete = "DELETE FROM contact_db WHERE id = ?" ;
    db.query(sqlDelete, id , (error, result) => {
        if(error) console.log(error);
    });
})

//----------------UPDATE API-------

//-----1. get previous details------
app.get("/api/get/:id", (req,res) => {
    const {id} = req.params;

    const sqlGet = `SELECT * FROM contact_db where id = ?`;
    db.query(sqlGet ,id ,  (error , result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})

//-----2. update details------
app.put("/api/update/:id", (req,res) => {
    const {id} = req.params;
    const {name , email , contact} = req.body;

    const sqlUpdate = `UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ? `;
    db.query(sqlUpdate ,[name , email , contact , id],  (error , result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    })
})

app.get("/", (req,res) => {
    // const sqlInsert = "INSERT INTO contact_db (name, email , contact) VALUES ('john', 'john123@gmail.com' , 2315649875 )";
    // db.query(sqlInsert, (error,result) => {
    //     console.log("error", error);
    //     console.log("result" , result);
    //     res.send("Welcome...");
    // })
   
});

app.listen(5000,()=>{
    console.log("Server is connected...");
})