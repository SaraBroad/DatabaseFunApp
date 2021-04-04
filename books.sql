DROP DATABASE IF EXISTS books_db;

CREATE DATABASE books_db;

USE books_db;

CREATE TABLE booksReads (
    id int PRIMARY KEY,
    title varchar(80),
    author varchar(80),
    dateFinished date,
    pages int,
    rating int   
);

INSERT INTO booksRead VALUES (1, 'Heavy', 'Kiese Laymon', '2019-01-21', 256, 5);

INSERT INTO booksRead VALUES (2, 'Boy Swallows Universe', 'Trent Dalton', '2019-04-27', 464, 5);

INSERT INTO booksRead VALUES (3, 'The Buried', 'Peter Hessler', '2019-05-22', 480, 5);

INSERT INTO booksRead VALUES (4, 'The Body Papers', 'Grace Talusan', '2019-07-17', 256, 5);

INSERT INTO booksRead VALUES (5, 'Born a Crime', 'Trevor Noah', '2019-08-17', 304, 5);

INSERT INTO booksRead VALUES (6, 'Small Fry', 'Lisa Jobs', '2018-11-18', 383, 4);

INSERT INTO booksRead VALUES (7, 'Boom Town', 'Sam Anderson', '09-22-2018', 448, 5);

INSERT INTO booksRead VALUES (8, 'Flights', 'Olga Tokarczuk', '2018-10-18', 403, 3);

INSERT INTO booksRead VALUES (9, 'The Hearts Invisble Furies', 'John Boyne', '2019-08-18', 582, 5);

INSERT INTO booksRead VALUES (10, 'The Great Believers', 'Rebecca Mekkai', '01-01-2019', 421, 3);

SELECT * FROM booksRead;