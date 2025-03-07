# Faculty Management

## Overview
Faculty Management is a Next.js 15 application that allows users to manage a list of faculties. Users can create new faculties, edit existing ones, and delete entries.

## Features
- **View Faculty List**: Display a list of faculties.
- **Create Faculty**: Add a new faculty to the list.
- **Edit Faculty**: Update faculty details.
- **Delete Faculty**: Remove an existing faculty.
- **State Management**: Uses `useContext` and `useReducer` for managing faculty data efficiently.
- **Optimized Data Fetching**: Integrates `useSWR` to fetch and manage faculty data.
- **Error Handling**: Proper error handling ensures a smooth user experience.

## Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API with `useReducer`
- **Data Fetching**: [SWR](https://swr.vercel.app/) for efficient API requests
- **Linting & Formatting**: ESLint, TypeScript
- **Testing**: Jest & React Testing Library with MSW for API mocking

## Installation
### Prerequisites
Ensure you have **Node.js 18+** installed.

### Clone the Repository
```sh
git clone https://github.com/your-username/faculty-management.git
cd faculty-management
```

### Install Dependencies
```sh
npm install
```

### Run the Development Server
```sh
npm run dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).

## API Integration
The application uses **JSONPlaceholder API** for CRUD operations. Future enhancements may include backend integration for persistent data storage.