# Edu-TASK

Edu-TASK is a simple web-based task management application designed to help you manage your tasks efficiently. This application allows users to add, view, and manage tasks with ease.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Demo

You can view a live demo of Edu-TASK [here](https://phase-1-project-amber.vercel.app/).

## Features

- **Add Task**: Add a new task with a title and completion status.
- **View Tasks**: View a list of all tasks.
- **Manage Tasks**: Mark tasks as completed or incomplete.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/edu-task.git
   cd edu-task
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the JSON server:

   ```sh
   npm run server
   ```

4. Open `index.html` in your web browser.

## Usage

1. **Add a Task**: Click on the "Add Task" button and fill out the form to add a new task.
2. **View Tasks**: All tasks are displayed in the "All Tasks" section.
3. **Manage Tasks**: Mark tasks as completed or incomplete using the checkboxes provided.

## File Structure

```
edu-task/
│
├── index.html         # Main HTML file
├── script.js          # JavaScript file for handling tasks
├── style.css          # CSS file for styling
├── db.json            # JSON file to simulate a database
└── package.json       # npm configuration file
```

### index.html

The main HTML file contains the structure of the application, including the task list and the modal for adding new tasks.

### script.js

The JavaScript file contains the logic for adding tasks, displaying tasks, and managing the task list.

### style.css

The CSS file contains styles for the application, making it visually appealing and user-friendly.

### db.json

The JSON file acts as a mock database, storing the tasks with their titles and completion status.

### package.json

The npm configuration file, specifying the devDependencies and scripts for running the JSON server.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Manage your tasks efficiently with Edu-TASK!
