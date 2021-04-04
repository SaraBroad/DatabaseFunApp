const {
    Pool,
    Client
} = require('pg')
const inquirer = require('inquirer')
const perf = require('execution-time')();
require('dotenv').config()

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5433
})

pool.query('SELECT NOW()', (err, res) => {
    if (err) throw err;
    pool.end()
})

const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5433
})

client.connect(function (err, res) {
    if (err) throw err;
    loadBooks()
    // topBooks(5)
    updateRating(3, 'Born a Crime')
    // addBook(14, 'The Body Papers', 'Grace Talusan', '2019-07-19', 250, 5)
    // removeBook(12)
    // checkDelete(12)
})


function loadBooks() {
    client.query("SELECT * FROM booksreads", function (err, res) {
        if (err) throw err;
        // const resResult = res.rows
        console.log('first load', res.rows)
        //   for (var i = 0; i < resResult.length; i++) {
        //     var obj = resResult[i];
        //     console.log(obj);
        //     }
    });
}

// execution time logger
perf.start()
const results = perf.stop()
console.log('time: ', results.time)

function reloadBooks() {
    client.query("SELECT * FROM booksreads", function (err, res) {
        if (err) throw err;
        console.log('Reloaded Books: ', res.rows)
        client.end()
    });
}

function topBooks(rating) {
    // console.log('rating', rating)
    client.query("SELECT * FROM booksreads WHERE rating=$1",
        [rating],
        function (err, res) {
            // console.log('res', res.rows)
            const topBooksResult = res.rows
            topBooksResult.forEach(element => console.log(`${element.title} is rated a ${rating}`))
        }
    )
}

function updateRating(rating, title) {
    const bookRating = rating;
    const bookTitle = title;
    client.query("SELECT * FROM booksreads WHERE title=$1", 
    [title],
    function (err, res) {
        const resResults = res.rows
        resResults.forEach((element) => {
            // console.log(element.rating)
            if (element.rating == bookRating) {
                console.log('This is the same rating.')
                throw err
            } else {
                client.query(
                    "UPDATE booksreads SET rating=$1 WHERE title=$2",
                    [rating, title],
                    function (err, res) {
                        console.log(`Updated the book ${title} with a rating of ${rating}`)
                           reloadBooks();
                    }
                );
            }
        })
    })
}

function addBook(id, title, author, dateFinished, pages, rating) {
    const addBookRating = rating;
    console.log(addBookRating)
    function checkError(err, callback) {
        if (addBookRating > 5) {
            console.log('Please choose a rating between 1 and 5')
            throw err
        } else {
            client.query(
                "INSERT INTO booksreads(id, title, author, dateFinished, pages, rating) VALUES ($1, $2, $3, $4, $5, $6)",
                [id, title, author, dateFinished, pages, rating],
                function (err, res) {
                    console.log(`${title} was added`)
                    // reloadBooks()
                }
            )
        }
    }
    checkError()
}

function checkDelete(id) {
    const bookId = id;
    console.log('bookId', bookId)
    client.query("SELECT * FROM booksreads", function (err, res) {
        const resResults = res.rows
        const arrayCheck = resResults.some(resResult => resResult.id === bookId)
        console.log(arrayCheck)
        if (arrayCheck && arrayCheck.length >= 1) {
            console.log('This book is not on your list.')
        } else {
            client.query("DELETE FROM booksreads WHERE id=$1",
                [id],
                function (err, res) {
                    console.log(res)
                    console.log('Deleted')
                }
            )
        }
    });
}

function highestToLowest() {
    client.query("SELECT title, rating FROM booksreads ORDER BY rating DESC", function (err, res) {
        if (err) throw err;
        console.log('Highest to lowest rated books:', res.rows)
    })
}

function lowestToHighest() {
    client.query("SELECT title, rating FROM booksRead ORDER BY rating ASC", function (err, res) {
        if (err) throw err;
        console.log('Lowest to highest rated books:', res.rows)
    })
}

// function loadOptions(books) {
//   console.log(books)
//   // console.log(books)
//     inquirer
//      .prompt([{
//             type: 'list',
//             name: 'choice',
//             message: 'What do you want to do?',
//             choices: [
//                 'View the book list',
//                 'View books from highest to lowest rating',
//                 'View books from lowest to highest rating',
//                 'Change book rating',
//                 'Remove a book',
//                 'Add a new book'
//             ]
//         }])
//         .then(answers => {
//             // console.log(JSON.stringify(answers, null, ''))
//             switch (answers.choice) {
//                 case 'View the book list':
//                     console.table(books)
//                     loadBooks()
//                     break;
//                 case 'View books from highest to lowest rating':
//                     // do something
//                     break;
//                 case 'View books from lowest to highest rating':
//                     // do something
//                     break;
//                 case 'Change book rating':
//                     // do something
//                     // changeBookRating(books)
//                     changeBookRating(books)
//                     break;
//                 case 'Remove a book':
//                     // do something
//                     break;
//                 case 'Add a new book':
//                     // do something 
//                     break;
//                 default:
//                     text = "Happy reading!";
//             }
//         })
//     }

//   function changeBookRating(book) {
//     inquirer
//       .prompt([
//         //   {
//         //       type: "input",
//         //       name: "title",
//         //       message: "Title for rating change?"
//         //   },
//           {
//               type: "input",
//               name: "rating",
//               message: "What is the new rating?",
//               validate: function(val) {
//                   return val > 0 && val < 5
//               }
//           }
//       ]).then(function(val) {
//         console.log('input val', val)
//         var ratingInt = parseInt(val.rating)
//         console.log('ratingInt', ratingInt)
//         changeRating(val)
//         // shining()

//       }) 
// }