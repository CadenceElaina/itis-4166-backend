import express from 'express';
import ejs from 'ejs';
import { join } from 'path';
import morgan from 'morgan';
const port = 8081;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('tiny'));
app.set('view engine', 'ejs');

const students = [
  {
    id: 1,
    name: 'Alice',
    major: 'Computer Science',
    gpa: 3.2,
    profile: '/images/alice.jpg',
  },
  {
    id: 2,
    name: 'Bob',
    major: 'Biology',
    gpa: 3.0,
    profile: '/images/bob.jpg',
  },
  {
    id: 3,
    name: 'Charlie',
    major: 'Physics',
    gpa: 3.8,
    profile: '/images/charlie.jpg',
  },
];

app.get('/', (req, res) => {
  res.sendFile(join(import.meta.dirname, 'public', 'index.html'));
});

app.get('/students', (req, res) => {
  //res.sendFile(join(import.meta.dirname, 'public', 'students.html'));
  res.render('students', { students });
});

app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);
  if (student) {
    //res.render('student', { obj: student });
    res.status(200).render('student', { student });
  } else {
    res.status(404).render('errors', { message: 'Student not found.' });
  }
  // res.sendFile(join(import.meta.dirname, 'public', 'student.html'));
  // res.render('student');
});

app.listen(port, () => console.log('The server is running at port', port));
