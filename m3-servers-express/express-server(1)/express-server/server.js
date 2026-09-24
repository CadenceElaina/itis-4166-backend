import express from 'express';
import { join } from 'path';
const port = 8080;
const students = [
  { id: 1, name: 'Amy' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // false by default - true has more stuff attached

function myMiddleware(req, res, next) {
  console.log('This is my middleware fn!');
  next(); // lets req not get stuck waiting
}

function logger(req, res, next) {
  console.log(`${req.url} ${req.method}`);
  next();
}

//app.use('/about', myMiddleware);
app.use(logger, myMiddleware); // order matters - if you move this to the end below the routes it will not be executed on those routes

app.post('/', (req, res) => {
  const message = req.body;
  res.json(message);
});

app.get('/', (req, res) => {
  res.sendFile(join(import.meta.dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.send('About Us');
});

app.get('/about-us', (req, res) => {
  res.redirect(301, '/about');
});

app.get('/students', (req, res) => {
  let limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    res.json(students.slice(0, limit));
  } else {
    res.json(students);
  }
});

app.get('/students/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let student = students.filter((student) => student.id === id);
  if (student.length) {
    res.json(student);
  } else {
    res.status(404).json({ message: 'The student is not found' });
  }
});

app.listen(port, () => console.log(`The server is running on port ${port}`));
