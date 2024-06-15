const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

router.get('/sections', async (req, res) => {
  try {
    const [results] = await db.promise().query('SELECT * FROM sections');
    res.json(results);
  } catch (err) {
    console.error('Error fetching sections:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/questions/:sectionId/:difficulty', async (req, res) => {
  const { sectionId, difficulty } = req.params;
  try {
    const [results] = await db.promise().query('SELECT * FROM questions WHERE section_id = ? AND difficulty = ?', [sectionId, difficulty]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/submit', async (req, res) => {
  const answers = req.body;
  const questionIds = Object.keys(answers).map(key => key.split('-')[1]);

  try {
    const [selectedQuestions] = await db.promise().query('SELECT * FROM questions WHERE id IN (?)', [questionIds]);

    let score = 0;
    selectedQuestions.forEach(question => {
      const userAnswer = answers[`question-${question.id}`];
      if (parseInt(userAnswer) === question.correct_option) {
        score += 1;
      }
    });

    const totalQuestions = selectedQuestions.length;
    res.json({ score: score, total: totalQuestions });
  } catch (err) {
    console.error('Error processing submission:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

router.post('/save-result', async (req, res) => {
  const { userName, sectionId, result } = req.body;

  try {
    const [resultInsert] = await db.promise().query('INSERT INTO results (user_name, section_id, score, total) VALUES (?, ?, ?, ?)', [userName, sectionId, result.score, result.total]);
    res.status(200).json({ message: 'Results saved successfully' });
  } catch (err) {
    console.error('Error saving results:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;