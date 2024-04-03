-- Create tables --
create table books (
    ISBN int not null primary key,
    title varchar(50) not null,
    author varchar(50) not null,
    description text not null
);

create table reviews (
    id serial not null primary key,
    book_isbn int not null references books(ISBN),
    read_date date not null,
    notes text not null,
    rating int not null,
);

-- Create data --

-- Read data --

-- Update data --

-- Delete data --