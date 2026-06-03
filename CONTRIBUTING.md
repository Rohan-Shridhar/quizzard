# Contributing to Quizzard

Thank you for your interest in contributing to Quizzard! We welcome contributions from everyone. To make the process smooth and easy, please follow these guidelines.

---

## 🚀 Getting Started

### 1. Fork & Clone
First, clone the repository to your local machine:
```bash
git clone https://github.com/sandipanxd/quizzard.git
cd quizzard
```

### 2. Set Up the Environment
Create a `.env` file in the root of the project:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password  # Use your local MySQL password
DB_NAME=quiz_app
PORT=3000
```

### 3. Install Dependencies & Fix Permissions
Install the project dependencies and ensure the test binaries are executable:
```bash
npm install
chmod +x node_modules/.bin/*
```

### 4. Setup and Seed the Database
Make sure MySQL is running on your machine. Then run the automated database setup and seeding script:
```bash
npm run db:setup
```
This script will automatically:
- Create the `quiz_app` database if it doesn't exist.
- Build the `sections`, `questions`, and `results` tables with the correct schema.
- Insert initial mock/seed data.

---

## 💻 Development Workflow

### Start the Development Server
Run the application with `nodemon` for automatic server reloads on file changes:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests
Before committing changes, make sure all tests pass:
```bash
npm test
```

---

## 🛠️ Contribution Rules & Best Practices

1. **Branching Model**: Create a new descriptive branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b bugfix/your-bugfix-name
   ```
2. **Code Style**:
   - Write clean, commented JavaScript code.
   - Do not commit `.env` or `node_modules/` files (verify with `.gitignore`).
3. **Database Changes**:
   - If you modify the database schema, make sure to update the setup script in `scripts/dbSetup.js` and document the changes.
4. **Writing Tests**:
   - If you introduce a new route or helper, add corresponding tests in the `tests/` directory using Jest and Supertest.

---

## 📬 Submitting a Pull Request

1. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Open a Pull Request (PR) against the `main` or `development` branch of the upstream repository.
3. Provide a clear description of the problem solved or the feature added in the PR description.

Happy hacking! 🚀
