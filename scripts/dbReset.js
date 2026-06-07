const db = require('../db');

console.log('Resetting the local database file...');
try {
  db.reset();
  console.log('Database reset successfully!');
} catch (err) {
  console.error('Error resetting database:', err);
  process.exit(1);
}
