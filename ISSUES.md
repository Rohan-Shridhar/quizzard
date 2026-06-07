# Good First Issues & Feature Roadmap 🚀

Welcome! If you are looking to contribute to **Quizzard**, here is a curated list of issues, feature requests, and enhancement suggestions.

We have categorized them by difficulty to help you find the perfect task to start with.

---

## 🟢 Easy (Good First Issues)

### 1. Confetti Animation on Perfect Score
* **Description**: We want to celebrate when a user gets a 100% score on a quiz by triggering a canvas confetti animation.
* **Component**: `views/result.ejs` (client-side script)
* **Goal**: 
  - Include the `canvas-confetti` script via CDN.
  - In `result.ejs`, check if the score equals the total questions, and trigger a confetti burst if it does.

### 2. Add New Quiz Categories & Questions
* **Description**: Expand the preset categories available to users (e.g., adding "Python Basics" or "Git Commands").
* **Component**: `db.js` (inside the `defaultData` object)
* **Goal**: Add a new section in the `sections` array and 5-10 related questions in the `questions` array. Make sure they include correct options and explanations.

### 3. Add Optional Sound Effects
* **Description**: Provide subtle audio feedback when a user selects an answer during the quiz.
* **Component**: `views/index.ejs`
* **Goal**: Add toggle settings for sound effects and play a soft chime or tick when selecting options.

---

## 🟡 Medium (Intermediate Tasks)

### 4. Countdown Timer per Question
* **Description**: Introduce pressure by giving users a set amount of time (e.g., 20 seconds) to answer each question.
* **Component**: `views/index.ejs`
* **Goal**:
  - Add a countdown progress bar at the top of the quiz card.
  - If the timer hits zero, highlight correct/incorrect options and lock the question or proceed to the next.

### 5. Social Share & Copy Results
* **Description**: Let users share their scores with friends.
* **Component**: `views/result.ejs`
* **Goal**: Add a "Share Score" button that copies a preformatted text block (e.g. *"I scored 5/5 on the Science quiz on Quizzard! Can you beat me?"*) to the clipboard.

### 6. Light / Cream Theme Option
* **Description**: Provide a toggle to switch from the default Warm Charcoal dark theme to a clean light/cream theme.
* **Component**: `views/welcome.ejs`, `views/index.ejs`, `views/result.ejs`
* **Goal**: Add a floating sun/moon toggle button in the header and toggle class-based color schemes on click.

---

## 🔴 Hard (Advanced Features)

### 7. Document File Upload for AI Quizzes
* **Description**: Instead of copy-pasting notes, let users upload PDF, TXT, or Markdown documents to feed into the Gemini quiz generator.
* **Component**: `views/welcome.ejs` (frontend form) and `routes/quizRoutes.js` (multer file parsing backend)
* **Goal**:
  - Add a file drag-and-drop zone to the AI tab.
  - Parse the file content on the server and pass the extracted text to the Gemini API.

### 8. Daily Study Streak Tracker
* **Description**: Gamify learning by tracking if a user completes at least one quiz every day.
* **Component**: `views/welcome.ejs` and `views/result.ejs`
* **Goal**: Use client-side `localStorage` to save completion timestamps, calculate the current consecutive day streak, and display a flame badge showing the streak in the header.

---

## How to Get Started 🛠️

1. **Pick an Issue**: Comment on the GitHub issue tracker (or choose one from this file) that you want to work on.
2. **Create a Branch**: Create a feature branch off of `development`:
   ```bash
   git checkout -b feature/your-feature-name development
   ```
3. **Write the Code**: Follow our [CONTRIBUTING.md](./CONTRIBUTING.md) guide.
4. **Push and PR**: Push your branch and open a PR targeting the `development` branch!
