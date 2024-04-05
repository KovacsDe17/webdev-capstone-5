-- Create tables --
CREATE TABLE bookreviews (
    isbn bigint NOT NULL PRIMARY KEY,
    title varchar(50) NOT NULL,
    author varchar(50) NOT NULL,
    description text NOT NULL,    
    read_date date NOT NULL,
    notes text NOT NULL,
    rating int NOT NULL
);

-- Create data --
INSERT INTO bookreviews (isbn, title, author, description, read_date, notes, rating) VALUES ($1, $2, $3, $4, $5, $6, $7);

-- Read data --
SELECT * FROM bookreviews ORDER BY read_date DESC;
SELECT * FROM bookreviews ORDER BY rating DESC;
SELECT * FROM bookreviews ORDER BY title ASC;

-- Update data --
UPDATE bookreviews SET title=$2, author=$3, description=$4, read_date=$5, notes=$6, rating=$7 WHERE isbn = $1;

-- Delete data --
DELETE FROM bookreviews WHERE isbn = $1;