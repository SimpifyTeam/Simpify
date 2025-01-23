# Simplify - Development Readme

Simplify is an innovative application designed to enhance conversations with AI-powered features like clever pickup lines, interactive chat games, and much more. This document will guide developers through the setup and development process for Simplify.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Development Workflow](#development-workflow)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- AI-Powered Pickup Lines
- Interactive Chat Games
- Smart Conversation Boosters
- Privacy-Focused Chat Encryption
- Dynamic UI Components

---

## Technologies Used

- **React** - Frontend Framework
- **TypeScript** - Strongly typed programming language
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Lucide Icons** - Icon library for React

---

## Setup Instructions

### Prerequisites

- Node.js (v16.x or higher)
- npm or yarn package manager
- Code editor (e.g., Visual Studio Code)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/daniel-devi/Simpify.git
   cd Simpify
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the Development Server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open in Browser**
   Visit `http://localhost:5173` to view the application.

---

## Development Workflow

### Branching Strategy

- **main**: Production-ready code
- **dev**: Latest features under development
- Feature branches: `feature/<feature-name>`

### Commit Guidelines

- Use meaningful commit messages.
  - Example: `feat: add interactive chat games`
  - Prefix:
    - `feat` for new features
    - `fix` for bug fixes
    - `docs` for documentation updates
    - `style` for formatting changes

### Code Quality

- Follow best practices and linting rules.
- Run the following before committing:
  ```bash
  npm run lint
  npm run format
  ```

---

## Folder Structure

```plaintext
spark-ai/
├── public/        # Public assets
├── src/           # Source files
│   ├── components/    # Reusable React components
│   ├── pages/         # Application pages
│   ├── styles/        # Tailwind CSS custom styles
│   ├── utils/         # Utility functions
│   ├── App.tsx       # Main App component
│   └── index.tsx     # React entry point
├── package.json   # Project metadata
└── README.md      # Project documentation
```

---

## Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:5137](http://localhost:5173) to view it in the browser.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run lint`
Lints the project for code style issues.

### `npm run format`
Formats the code using Prettier.

---

## Contributing

We welcome contributions! Follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/<feature-name>`
3. Make your changes and commit them: `git commit -m "feat: add new feature"`
4. Push your branch: `git push origin feature/<feature-name>`
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Web App

Visit the production-ready version of Simplify at: [WEBSITE](https://simpify-six.vercel.app/)

---

Happy coding! 🚀
