const express = require('express');
const bodyParser = require('body-parser');
const quizRoutes = require('./routes/quizRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/quiz', quizRoutes);

app.get('/', (req, res) => {
  res.render('welcome');
});

app.get('/quiz', (req, res) => {
  res.render('index');
});

app.get('/result', (req, res) => {
  const { score, total } = req.query;
  let message = 'Better luck next time!';
  if (score >= 1 && score <= 2) {
    message = 'Way to go!';
  } else if (score >= 3 && score <= 4) {
    message = 'Good job!';
  } else if (score == 5) {
    message = 'Excellent!';
  }
  res.render('result', { score, total, message });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});