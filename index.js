import express from "express";
import bodyParser from "express";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.ejs", {bookreviews: bookReviews});
});

app.get("/addreview", (req, res) => {
    res.render("form.ejs");
});

app.get("/book/:isbn/edit", (req, res) => {
    const isbn = req.params.isbn;
    const book = bookReviews.find((searchedBook) => searchedBook.isbn == isbn);

    res.render("form.ejs", {book: book});
});

app.get("/book/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const book = bookReviews.find((searchedBook) => searchedBook.isbn == isbn);

    res.render("book.ejs", {book: book});
});

app.post("/add", (req, res) => {
    try {
        const book = {
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            readDate: req.body.readDate,
            notes: req.body.notes,
            rating: req.body.rating
        };
    
        bookReviews.push(book);

        console.log("Book review created successfully!");
    } catch (error) {
        console.error("Error was caught during creation! " + error.stack);
    }

    res.redirect("/");
});

app.post("/edit/:isbn", (req, res) => {
    try {
        const book = {
            isbn: req.params.isbn,
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            readDate: req.body.readDate,
            notes: req.body.notes,
            rating: req.body.rating
        };

        const index = bookReviews.findIndex((searchedBook) => searchedBook.isbn == book.isbn);
        bookReviews[index] = book;
        console.log("Edited book review successfully!");
    } catch (error) {
        console.error("Error was caught during edit! " + error.stack);
    }

    res.redirect("/");
});

app.post("/delete/:isbn", (req, res) => {
    try {
        const isbn = req.params.isbn;
    
        const index = bookReviews.findIndex((searchedBook) => searchedBook.isbn == isbn);
        bookReviews.splice(index, 1);
        console.log("Deleted book review successfully!");
    } catch (error) {
        console.error("Error was caught during delete! " + error.stack);
    }

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

//Mock data
const bookReviews = [
    {
        isbn: 9780316452465,
        title: "Vaják I. - The Witcher - Az utolsó kívánság",
        author: "Andrzej Sapkowski",
        description: `Geralt a vajákok közé tartozik: mágikus képességeinek köszönhetően, amelyeket hosszan tartó kiképzése és egy rejtélyes elixír csak még tovább csiszolt, zseniális és könyörtelen harcos hírében áll. Ugyanakkor nem hétköznapi gyilkos: célpontjai vérszomjas szörnyetegek és aljas fenevadak, amelyek mindenütt hatalmas pusztítást végeznek, és megtámadják az ártatlanokat.
        Hiába tűnik azonban valami gonosznak vagy jónak, nem biztos, hogy valóban az - és minden mesében van egy csipetnyi igazság.
        
        Andrzej Sapkowski 1948-ban született Lengyelországban. Hazája egyik leghíresebb és legsikeresebb szerzőjének számít. A World Fantasy Életműdíjjal kitüntetett szerző Vaják-sorozatával nemzetközi sikert aratott, könyvei alapján képregények és számítógépes játékok is készültek, 2019-ben pedig a Netflix forgatott belőlük sorozatot Henry Cavill főszereplésével.`,
        readDate: "2022-01-01",
        notes: "Nincs véleményem.",
        rating: 8
    }
];