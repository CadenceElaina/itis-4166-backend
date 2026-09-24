import express from "express";
import { join } from "path";

const port = 8080;
const app = express();
app.use(express.json()); // JSON body parsing for req.body usage
const students = [
  {
    id: 1,
    name: "Amy",
  },
  {
    id: 2,
    name: "Cadence",
  },
  { id: 3, name: "Bob" },
];

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", (req, res) => {
  //res.write("hello!");
  //res.send("hello!");
  // straems the file while handling headers and closing the response automatically
  // calling res.end() after .sendFile immediately on the next line terminates the response before the line finishes sneding
  res.sendFile(join(import.meta.dirname, "src", "index.html")); // asynchronous

  //  res.end();
});

app.get("/about", (req, res) => {
  //res.send("About page");
  res.sendFile(join(import.meta.dirname, "src", "/about.html"));
});

app.get("/about-us", (req, res) => {
  res.redirect(301, "/about");
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.post("/students", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  /*
Why not students.length + 1?

It works until you delete someone. Walk through it:

Start with Amy (1), Cadence (2), Bob (3). Length is 3.
Delete Cadence. Now it's Amy (1) and Bob (3). Length is 2.
Add "Dana." length + 1 gives 3, so Dana gets id 3.
Now Bob and Dana share id 3, and clicking Remove on Dana could delete Bob instead.

students.map((s) => s.id) turns the array of objects into an array of just ids: [1,2,3]
... is the spread operator which is different from destructuring
Math.max([1,2,3]) -> NaN
Math.max(1,2,3) -> 3 
... makes the [1,2,3] -> 1,2,3
Math.max(...[1, 2, 3]) becomes Math.max(1, 2, 3), which returns 3.

Destructuring is the other direction: pulling values out of an object or array into variables const{name} = req.body - shorthand for const name = req.body which gets cumbersome when you need to do const name, const id, const email and so on.

students.splice(index, 1) starting at index REMOVE 1 item - changing the original array IN PLACE

splice ALWAYS returns an array of whatever it removed even if that is only 1 thing
Removing Bob returns [{id: 3, name: "Bob"}]
const [removed] = students.splice(index,1) is ARRAY DESTRUCTURING it takes the first item out of that array and names it removed its the same thing as doing const removed = students.splice(index,1)[0] 

filter would build a NEW ARRAY - students was declared with const could use let instead but splice lets us keep const and edit in place
*/
  const id = students.length ? Math.max(...students.map((s) => s.id)) + 1 : 1;
  const student = { id, name };
  students.push(student);
  res.status(201).json(student);
});

app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);
  if (index === -1)
    return res.status(404).json({ error: `Student ${id} was not found` });

  const [removed] = students.splice(index, 1);
  res.json(removed);
});

app.listen(port, () => console.log(`The server is running on ${port}`));
