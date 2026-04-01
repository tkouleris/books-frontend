# Books Frontend

A React-based frontend application for managing your personal book library and tracking your readings. This project connects to the [Books Backend](https://github.com/tkouleris/books-backend) to provide a complete book management experience.

## 🚀 Features

- **User Authentication:** Registration, login, password recovery, and account verification.
- **Book Management:** Add, view, and delete books from your collection.
- **Reading Progress Tracking:** Keep track of the books you are currently reading or have finished.
- **To-Read List:** Manage a prioritized "to-read" list with drag-and-drop reordering functionality.
- **Dashboard:** At-a-glance view of your library and reading stats.
- **Profile Management:** Update user information and settings.
- **Responsive Design:** Built with Bootstrap and AdminLTE for a consistent experience across devices.

## 🛠️ Built With

- **React 18**: Frontend library for building the user interface.
- **Vite**: Modern frontend build tool.
- **React Router 6**: For declarative routing.
- **Axios**: For making API requests to the backend.
- **@dnd-kit**: For drag-and-drop functionality in the To-Read list.
- **Bootstrap 4 & AdminLTE**: For the dashboard UI components and layout.
- **jQuery**: Used for some legacy UI components and plugins.

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- Running instance of the [Books Backend](https://github.com/tkouleris/books-backend)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tkouleris/books-frontend.git
   cd books-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the application:
   - Copy `config.example.jsx` to `config.jsx`.
   - Update the API URLs and methods to match your backend deployment.
   ```bash
   cp config.example.jsx src/config.jsx
   ```

### Running the Application

- **Development Mode:**
  ```bash
  npm run dev
  ```
  The app will be available at `http://localhost`.

- **Build for Production:**
  ```bash
  npm run build
  ```

- **Preview Production Build:**
  ```bash
  npm run preview
  ```

## 📂 Project Structure

- `src/components`: Reusable UI components (Header, SideNav, Footer, etc.).
- `src/pages`: Main application pages and route handlers.
- `src/utils`: Helper functions, API client (`http.jsx`), and validators.
- `public/`: Static assets, including AdminLTE plugins and styles.