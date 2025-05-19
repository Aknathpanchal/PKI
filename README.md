
Paykuber International Frontend

Welcome to the frontend repository for Paykuber International! This project is developed to provide a streamlined user experience for managing payments and financial transactions with real-time tracking, P2P features, and WebSocket integration for seamless updates.

Table of Contents

- Project Overview
- Features
- Technologies Used
- Getting Started
- Configuration
- Scripts
- Folder Structure
- Code Style
- Contributing
- License

Project Overview

The Paykuber International frontend project enables users to interact with payment services, monitor transaction statuses in real-time, and leverage P2P (peer-to-peer) interactions. It integrates WebSocket for instant updates and supports a robust dashboard experience for end-users.



Technologies Used

- React with Context API for state management
- Ant Design (antd) for UI components
- React-Router for navigation
- WebSocket for real-time updates
- Axios for API calls
- Chart.js for data visualization
- dotenv for environment variables

Getting Started

To set up this project locally, ensure you have Node.js and npm installed.

Installation Steps

1. Clone the repository:
   git clone https://github.com/Ocpltech/PKI.git

2. Navigate to the project folder:
   cd PKI-LIVE

3. Install dependencies:
   npm install

4. Set up environment variables:
   - Copy .env.example to .env and update with necessary keys.
   - Ensure your API keys are stored in .env (refer to Configuration section below).

Configuration

Update the .env file with your environment-specific details:
REACT_APP_API_URL=https://api.paykuber International.com
REACT_APP_WEBSOCKET_URL=wss://ws.paykuber International.com
REACT_APP_API_KEY=your_api_key

Note: Do not commit your .env file; ensure it is added to .gitignore.

Scripts

- Start the development server:
  npm start
- Run tests:
  npm test
- Build for production:
  npm run build
- Lint code:
  npm run lint

Folder Structure

Here's a high-level overview of the folder structure:

PKI-Live/
- public/                Public assets
- src/
  - assets/            Static assets like images and fonts
  - components/        Reusable components
  - context/           Context providers for global state
  - hooks/             Custom React hooks
  - pages/             Pages for each route
  - services/          API and WebSocket services
  - utils/             Utility functions and constants
  - App.js             Main app component
- .env                   Environment variables
- .gitignore
- README.md
- package.json

Code Style

This project follows ESLint and Prettier configurations for code formatting and linting. To ensure consistency:
- Run npm run lint before committing.
- Use VSCode extensions for ESLint and Prettier for auto-formatting.

Contributing

We welcome contributions to improve the project! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

Reporting Issues

Please report any issues through the Issues tab on GitHub, with details on how to reproduce the issue.

License

This project is licensed under the MIT License.

