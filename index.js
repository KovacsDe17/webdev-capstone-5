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

app.get("/book/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const book = {isbn: isbn};

    //TOOD: get book data from database

    res.render("book.ejs", {book});
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

//Mock data
const bookReviews = [
    {
        isbn: 9789635667024,
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