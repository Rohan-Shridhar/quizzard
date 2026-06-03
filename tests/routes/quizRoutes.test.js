const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const quizRoutes = require('../../routes/quizRoutes');
const mysql = require('mysql2');

jest.mock('mysql2', () => {
  const mClient = {
    promise: jest.fn().mockReturnThis(),
    query: jest.fn()
  };
  return {
    createConnection: jest.fn(() => mClient)
  };
});

const app = express();
app.use(bodyParser.json());
app.use('/api/quiz', quizRoutes);

describe('Quiz Routes', () => {
  let db;

  beforeAll(() => {
    db = mysql.createConnection();
  });

  test('GET /api/quiz/sections should return sections', async () => {
    db.query.mockResolvedValueOnce([[
      { id: 1, name: 'Math' },
      { id: 2, name: 'Science' }
    ]]);

    const response = await request(app).get('/api/quiz/sections');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, name: 'Math' },
      { id: 2, name: 'Science' }
    ]);
  });

  test('GET /api/quiz/sections/:sectionId should return the section if it exists', async () => {
    db.query.mockResolvedValueOnce([[{ id: 1, name: 'Math' }]]);

    const response = await request(app).get('/api/quiz/sections/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: 'Math' });
  });

  test('GET /api/quiz/sections/:sectionId should return 404 if it does not exist', async () => {
    db.query.mockResolvedValueOnce([[]]);

    const response = await request(app).get('/api/quiz/sections/999');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Section not found' });
  });

  test('GET /api/quiz/questions/:sectionId/:difficulty should return questions', async () => {
    const sectionId = 1;
    const difficulty = 'easy';

    db.query.mockResolvedValueOnce([[
      { id: 1, question: 'What is 2+2?', option1: '3', option2: '4', option3: '5', option4: '6', correct_option: 2 },
      { id: 2, question: 'What is 3+3?', option1: '5', option2: '6', option3: '7', option4: '8', correct_option: 2 }
    ]]);

    const response = await request(app).get(`/api/quiz/questions/${sectionId}/${difficulty}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, question: 'What is 2+2?', option1: '3', option2: '4', option3: '5', option4: '6', correct_option: 2 },
      { id: 2, question: 'What is 3+3?', option1: '5', option2: '6', option3: '7', option4: '8', correct_option: 2 }
    ]);
  });

  test('POST /api/quiz/submit should calculate and return the score', async () => {
    const answers = {
      'question-1': '2',
      'question-2': '3'
    };

    db.query.mockResolvedValueOnce([[
      { id: 1, correct_option: 2 },
      { id: 2, correct_option: 3 }
    ]]);

    const response = await request(app)
      .post('/api/quiz/submit')
      .send(answers)
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ score: 2, total: 2 });
  });

  test('POST /api/quiz/save-result should save the result', async () => {
    const resultData = {
      userName: 'Test User',
      sectionId: 1,
      result: { score: 3, total: 5 }
    };

    db.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

    const response = await request(app)
      .post('/api/quiz/save-result')
      .send(resultData)
      .set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Results saved successfully' });
  });
});