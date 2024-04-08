import axios from "axios";
import express from "express";
import bodyParser from "express";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "Kovacsde17",
    database: "booknotes"
});

db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", async (req, res) => {
    let sortby = req.query.sortby ?? "title";
    let orderAsc = req.query.order === "desc" ? false : true;

    bookReviews = await loadAllReviews(sortby, orderAsc);

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

app.post("/add", async (req, res) => {
    const review = {
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        read_date: req.body.read_date,
        notes: req.body.notes,
        rating: req.body.rating
    };

    await addReview(review);
    
    res.redirect("/");
});

app.post("/edit/:isbn", async (req, res) => {
    const review = {
        isbn: req.params.isbn,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        read_date: req.body.read_date,
        notes: req.body.notes,
        rating: req.body.rating
    };

    await updateReview(review);

    res.redirect("/");
});

app.post("/delete/:isbn", async (req, res) => {
    const isbn = req.params.isbn;
    await deleteReview(isbn);
    
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

async function loadAllReviews(orderby="title", asc = true){
    if(orderby != "title" && orderby != "rating" && orderby != "read_date"){
            orderby = "title";
        }

    let reviews = [];

    try {
        const result = await db.query(`SELECT * FROM bookreviews ORDER BY ${orderby} ${asc?"ASC":"DESC"}`);
        result.rows.forEach((review) => {
            let newDate = review.read_date.toISOString().slice(0, 10);
            review.read_date = newDate;
            reviews.push(review);
        });
    } catch (error) {
        console.error("Error executing query! ", error.stack);
    }

    return reviews;
}

async function addReview(review){
    
    try {
        const result = await db.query("INSERT INTO bookreviews (isbn, title, author, description, read_date, notes, rating) VALUES ($1, $2, $3, $4, $5, $6, $7);",
            [review.isbn, review.title, review.author, review.description, review.read_date, review.notes, review.rating[1]]);
    } catch (error) {
        console.error("Error executing query! ", error.stack);
    }
}

async function updateReview(review){
    try {
        const result = await db.query("UPDATE bookreviews SET title=$1, author=$2, description=$3, read_date=$4, notes=$5, rating=$6 WHERE isbn = $7;",
            [review.title, review.author, review.description, review.read_date, review.notes, review.rating[1], review.isbn]);
        console.log("Updated review! " + result.rows);
    } catch (error) {
        console.error("Error executing query! ", error.stack);
    }
}

async function deleteReview(isbn){
    try {
        const result = await db.query("DELETE FROM bookreviews WHERE isbn = $1", [isbn]);
    } catch (error) {
        console.error("Error executing query! ", error.stack);
    }
}

//Mock data
var bookReviews = [
    {
        isbn: 9780316452465,
        title: "Vaják I. - The Witcher - Az utolsó kívánság",
        author: "Andrzej Sapkowski",
        description: `Geralt a vajákok közé tartozik: mágikus képességeinek köszönhetően, amelyeket hosszan tartó kiképzése és egy rejtélyes elixír csak még tovább csiszolt, zseniális és könyörtelen harcos hírében áll. Ugyanakkor nem hétköznapi gyilkos: célpontjai vérszomjas szörnyetegek és aljas fenevadak, amelyek mindenütt hatalmas pusztítást végeznek, és megtámadják az ártatlanokat.
        Hiába tűnik azonban valami gonosznak vagy jónak, nem biztos, hogy valóban az - és minden mesében van egy csipetnyi igazság.
        
        Andrzej Sapkowski 1948-ban született Lengyelországban. Hazája egyik leghíresebb és legsikeresebb szerzőjének számít. A World Fantasy Életműdíjjal kitüntetett szerző Vaják-sorozatával nemzetközi sikert aratott, könyvei alapján képregények és számítógépes játékok is készültek, 2019-ben pedig a Netflix forgatott belőlük sorozatot Henry Cavill főszereplésével.`,
        read_date: "2022-01-01",
        notes: "Nincs véleményem.",
        rating: 8
    }
];