const express = require('express');
const bodyparser = require('body-parser');
const app=express();
const cors = require ('cors');

const port = 7860;

let books =[];
app.use(cors());

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.post('/book',(req,res)=>{
  const books = req.body;

  console.log(books);
  books.push(books);

  res.send(`book added successfully to the database`)
}); 

app.get('/books',(req,res,next)=>{
    res.json(books);
})

app.get('/book/:isbn', (req, res) => {
    // Reading isbn from the URL
    const isbn = req.params.isbn;
});
app.get('/book/:isbn', (req, res) => {
    // Reading isbn from the URL
    const isbn = req.params.isbn;

    // Searching books for the isbn
    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send('Book not found');
});

app.delete('/book/:isbn', (req, res) => {
    // Reading isbn from the URL
    const isbn = req.params.isbn;

    // Remove item from the books array
    books = books.filter(i => {
        if (i.isbn !== isbn) {
            return true;
        }
        return false;
    });

    res.send('Book is deleted');
});
app.listen(port, ()=>console.log(`the server is listening on port ${port}!`))