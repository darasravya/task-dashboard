# Task Dashboard

## Overview
This is a Task management dashboard built using React, TailwindCSS, Express(mock server), and Context API for state management. It supports features such as task creation, deletion, lazy loading, filtering, and validation allowing users to view, add, mark tasks as completed, and delete tasks. The app also implements semantic HTML and ARIA roles for accessibility.

---

## Features
- **Task Listing:** Displays tasks in a tabular format with lazy loading to load tasks in batches of 10 for better performance.
- **Task Filtering:** Filter tasks based on completion status (all, completed, or incomplete).
- **Add Task:** Add a new task with fields for title, description, and due date.
- **Delete Task:** Delete an existing task from the list.
- **Validation:**
  - Due date must be today or a future date.
  - Required fields are validated before submission.
- **Accessibility:** Uses semantic HTML and ARIA roles for keyboard and screen reader accessibility.
- **Error Handling:** Displays appropriate error messages for invalid actions.
- **Responsive Design**: Mobile-friendly

---

## Tech Stack
### Frontend
- **React**: For building the user interface.
- **Tailwind CSS**: For styling the application.
- **Context API**: For state management.

### Backend
- **Express**: As the mock server for handling API requests.

---

## Installation
### Prerequisites
Ensure you have the following installed on your system:
- Node.js

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the mock server:
   ```bash
   node server.js
   ```

4. Start the React application:
   ```bash
   npm run dev
   ```

5. Open the app in your browser.

---

## Folder Structure
```
├── public
├── src
│   ├── api          # API functions for interacting with the backend
│   ├── components   # Reusable components like TaskCard, TaskForm
│   ├── context      # Context API for global state management
│   └── App.js       # Main application entry point
├── server.js        # Mock server for backend API
└── README.md        # Project documentation
```

---

## Accessibility
This project adheres to WCAG standards with features like:
- Semantic HTML (`<table>`, `<thead>`, `<tbody>`, `<button>`, etc.).
- ARIA roles (e.g., `role="row"`, `aria-label` for accessibility descriptions).
- Fully keyboard-navigable UI.

---

## Validation Rules
1. **Title**: Required.
2. **Description**: Required.
3. **Due Date**: Must be today or a future date. Past dates are disabled in the date picker and validated manually.

---

