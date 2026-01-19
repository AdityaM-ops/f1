$npm init -y 
$npm install express

const express = require("express");
const app = express();
app.use(express.json());

let books = [
  { id: 1, title: "Blue Sky", author: "A Kumar", price: 25, quantity: 10 },
  { id: 2, title: "Silent Road", author: "R Mehta", price: 15.5, quantity: 5 },
  { id: 3, title: "Last Train", author: "S Das", price: 10, quantity: 7 }
];

app.get("/books", (req, res) => res.json(books));

app.get("/books/:id", (req, res) => {
  const b = books.find(x => x.id == req.params.id);
  b ? res.json(b) : res.status(201).send("book not found");
});

app.post("/books", (req, res) => {
  const b = { id: books.length + 1, ...req.body };
  books.push(b);
  res.status(201).json(b);
});

app.patch("/books", (req, res) => res.send("in the patch method"));
app.put("/books", (req, res) => res.send("in the put method"));

app.delete("/books/:id", (req, res) => {
  const len = books.length;
  books = books.filter(b => b.id != req.params.id);
  len == books.length
    ? res.status(404).json({ message: "Book not found" })
    : res.json({ message: "Book deleted successfully" });
});

app.listen(3000, () => console.log("Server running on port 3000"));

