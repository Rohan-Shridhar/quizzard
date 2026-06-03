const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || ''
};

const dbName = process.env.DB_NAME || 'quiz_app';

async function setup() {
  console.log('Starting database setup...');
  
  // Connect without database selected first
  const connection = await mysql.createConnection(dbConfig);
  
  console.log(`Creating database "${dbName}" if it doesn't exist...`);
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  await connection.end();
  
  // Reconnect with the database selected
  const db = await mysql.createConnection({
    ...dbConfig,
    database: dbName
  });
  
  console.log('Creating tables...');
  
  // Create sections table
  await db.query(`
    CREATE TABLE IF NOT EXISTS \`sections\` (
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`name\` VARCHAR(255) NOT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB;
  `);
  
  // Create questions table (ensure difficulty column is included)
  await db.query(`
    CREATE TABLE IF NOT EXISTS \`questions\` (
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`section_id\` INT NOT NULL,
      \`question\` TEXT NOT NULL,
      \`option1\` VARCHAR(255) NOT NULL,
      \`option2\` VARCHAR(255) NOT NULL,
      \`option3\` VARCHAR(255) NOT NULL,
      \`option4\` VARCHAR(255) NOT NULL,
      \`correct_option\` INT NOT NULL,
      \`difficulty\` VARCHAR(50) NOT NULL,
      PRIMARY KEY (\`id\`),
      FOREIGN KEY (\`section_id\`) REFERENCES \`sections\` (\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB;
  `);
  
  // Create results table
  await db.query(`
    CREATE TABLE IF NOT EXISTS \`results\` (
      \`id\` INT NOT NULL AUTO_INCREMENT,
      \`user_name\` VARCHAR(255) NOT NULL,
      \`section_id\` INT NOT NULL,
      \`score\` INT NOT NULL,
      \`total\` INT NOT NULL,
      PRIMARY KEY (\`id\`),
      FOREIGN KEY (\`section_id\`) REFERENCES \`sections\` (\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB;
  `);
  
  console.log('Seeding initial data...');
  
  // Check if sections already have data
  const [sections] = await db.query('SELECT COUNT(*) as count FROM `sections`');
  if (sections[0].count === 0) {
    await db.query(`
      INSERT INTO \`sections\` (\`id\`, \`name\`) VALUES 
      (1, 'General Knowledge'),
      (2, 'Science')
    `);
    console.log('Seeded sections.');
  } else {
    console.log('Sections table already has data, skipping seed.');
  }
  
  // Check if questions already have data
  const [questions] = await db.query('SELECT COUNT(*) as count FROM `questions`');
  if (questions[0].count === 0) {
    await db.query(`
      INSERT INTO \`questions\` (\`section_id\`, \`question\`, \`option1\`, \`option2\`, \`option3\`, \`option4\`, \`correct_option\`, \`difficulty\`) VALUES 
      (1, 'What is the capital of France?', 'London', 'Berlin', 'Paris', 'Rome', 3, 'easy'),
      (1, 'Which planet is known as the Red Planet?', 'Earth', 'Mars', 'Jupiter', 'Saturn', 2, 'easy'),
      (1, 'Who wrote "To Kill a Mockingbird"?', 'Harper Lee', 'F. Scott Fitzgerald', 'Ernest Hemingway', 'Mark Twain', 1, 'medium'),
      (1, 'What is the largest ocean on Earth?', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean', 4, 'medium'),
      (1, 'What is the speed of light in a vacuum (approx)?', '300,000 km/s', '150,000 km/s', '450,000 km/s', '100,000 km/s', 1, 'hard'),
      (2, 'What is the chemical symbol for water?', 'O2', 'H2O', 'CO2', 'NaCl', 2, 'easy'),
      (2, 'What gas do plants absorb during photosynthesis?', 'Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen', 3, 'easy'),
      (2, 'What is the power house of the cell?', 'Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus', 2, 'medium'),
      (2, 'Which element has the atomic number 1?', 'Helium', 'Oxygen', 'Hydrogen', 'Carbon', 3, 'medium'),
      (2, 'What is the only metal that is liquid at room temperature?', 'Mercury', 'Lead', 'Iron', 'Copper', 1, 'hard')
    `);
    console.log('Seeded questions.');
  } else {
    console.log('Questions table already has data, skipping seed.');
  }
  
  await db.end();
  console.log('Database setup completed successfully.');
}

setup().catch(err => {
  console.error('Error during database setup:', err);
  process.exit(1);
});
