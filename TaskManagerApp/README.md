# Task Manager App

A simple and modern Task Manager app built with React Native and Expo. This app allows users to add, complete, and delete tasks, with each task displaying its creation time. The UI is clean, intuitive, and responsive.

## Features

- **Add Task:** Enter a description and add a new task to your list.
- **Mark as Complete:** Tap a task to mark it as complete/incomplete. Completed tasks are visually distinguished.
- **Delete Task:** Remove tasks easily with a delete button.
- **Task List:** View all tasks, both complete and incomplete, in a scrollable list.
- **Timestamps:** Each task shows the date and time it was created.
- **Expiry Date (Optional):**
   - You can set an expiry date/time for any task (format: `YYYY-MM-DD HH:mm`).
   - If set, the task will be automatically removed after the expiry time.
   - If not set, the task will remain until deleted manually.
   - You cannot set an expiry date/time before the current time.
- **Modern UI:** Enhanced fonts, colors, and layout for a better user experience.

## Setup & Running the App

1. **Install Expo CLI (if not already installed):**
   ```sh
   npm install -g expo-cli
   ```
2. **Install dependencies:**
   Navigate to the `TaskManagerApp` directory and run:
   ```sh
   npm install
   ```
3. **Start the app:**
   ```sh
   expo start
   ```
   This will open Expo Dev Tools in your browser. You can run the app on an emulator or your mobile device using the Expo Go app.

## Third-Party Libraries Used

- **date-fns:** For formatting and comparing dates (task creation and expiry).

## Notes
- No external state management or persistent storage is used; all state is local to the app.
- The app uses only default React Native components and `date-fns` for date formatting.

## Screenshots

_Add screenshots here if desired._

## License

MIT License
