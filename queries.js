//Task 2

//Finding books in a specific Genre
db.books.find({ genre: "Fiction" })


//Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } })


//Find books by a specific author
db.books.find({ author: "George Orwell" })


//Update the price of a specific book
db.books.updateOne(
  { title: "1984" },  
  { $set: { price: 12.99 } }  
)

//Delete a book by its title
db.books.deleteOne({ title: "Moby-Dick" })


//Task 3

//Books in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})


//Using projection to return title author and price
db.books.find(
  {},
  { _id: 0, title: 1, author: 1, price: 1 }
)


//Sorting by price
db.books.find().sort({ price: 1 }) //Ascending
db.books.find().sort({ price: -1 }) //descending

//First 5 books
db.books.find().sort({ price: -1 })


//Task 4


//Average price of book by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" },
      count: { $sum: 1 }
    }
  },
  {
    $sort: { averagePrice: -1 }  // Optional: sort by highest average price
  }
])


//Author with most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { totalBooks: -1 }
  },
  {
    $limit: 1
  }
])

//Books by aggregation decade and their count
db.books.aggregate([
  {
    $project: {
      decade: { $concat: [
        { $toString: { $subtract: [ { $divide: [ "$published_year", 10 ] }, { $mod: [ { $divide: [ "$published_year", 10 ] }, 1 ] } ] } },
        "s"
      ]}
    }
  },
  {
    $group: {
      _id: "$decade",
      bookCount: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }  
  }
])


//Task 5

//Index on title field
db.books.createIndex({ title: 1 })


//Index on author and published year
db.books.createIndex({ author: 1, published_year: -1 })


//Using explain to see performance 
db.books.find({ title: "1984" }).explain("executionStats")


