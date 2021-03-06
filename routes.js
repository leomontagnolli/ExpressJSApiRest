const express = require('express');
const router = express.Router();
const fs = require ('fs');


let rawBooks = fs.readFileSync('book.json');
let books = JSON.parse(rawBooks);

router.post('/book', (req, res) => {
    const book = req.body;
    console.log(book);
    books.push(book);
    let jsonList = JSON.stringify(books);
    fs.writeFile('book.json', jsonList, 'utf8', () =>{ });
    res.send ("Livro adicionado ao banco de dados !");
})

router.get('/book', (req, res) => {
    res.json(books);
});

router.get('/book/:isbn', (req, res) => {
    //Forma de pegar o parametro
    //const { isbn} = req.params;
    const isbn = req.params.isbn;
    
    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }
    res.status(404).send('Book not found');

})

router.get('/', (req, res) => {
 res.send('Api de Livros');
});

router.delete('/book/:isbn', (req, res) => {
    const {isbn} = req.params;
    for (let book of books) {
        if (book.isbn === isbn){
            let index = books.indexOf(book,0);
            books.splice(index, 1);
            
        }
    }
    let jsonList = JSON.stringify(books);
    fs.writeFile('book.json', jsonList, 'utf8', () =>{});
    res.send ('Book is deleted');


});

module.exports = router;


