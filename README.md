# 🍲 Serine POS

### Table of Contents
- [Demo Video](#demo-video)
- [Description](#description)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Installation](#installation)

### Demo Video
[![Serine POS Demo](https://img.youtube.com/vi/zU1e1jDeD38/0.jpg)](https://youtu.be/zU1e1jDeD38)

### Description
This is a Point of Sale (POS) system for a restaurant called Serine. It is a web application that allows users to

- CRUD ingredients
- CRUD dishes
- CRUD orders
- CRUD tables

> CRUD stands for Create, Read, Update, and Delete

### Tech Stack
Serine POS is built with the following technologies:
- MongoDB - A NoSQL database
- Express - A Node.js web application framework
- React - A JavaScript library for building user interfaces
- Node.js - A JavaScript runtime
- TypeScript - A typed superset of JavaScript
- Vite - A build tool that aims to provide a faster and leaner development experience for modern web projects

### Folder Structure
```
Hotel-POS
├── client
│   ├── public         // Contains the public assets
│   ├── src
│   │   ├── components // Contains the reusable components
│   │   ├── pages      // Contains the pages of the application
│   │   ├── App.tsx    // Handles the routing of the application
│   │   ├── index.css  // Global styles
│   │   ├── main.tsx   // Entry point for the client
│   ├── index.html     // HTML template
│   ├── package.json
│   ├── tsconfig.json
├── server
│   ├── controllers     // Contains the logic for handling requests
│   ├── models          // Contains the schema for the database
│   ├── routes          // Contains the routes for the API
│   ├── utils           // Contains utility functions
│   ├── package.json
│   ├── .env            // Contains environment variables
│   ├── server.js       // Entry point for the server
│   ├── README.md  
│   ├── vercel.json     // Vercel configuration file
├── .gitignore
├── README.md
``` 

### Installation
1. Clone the repository
    ```bash
    git clone https://github.com/MichaelGift/Hotel-POS.git
    ```
2. Install the dependencies
    ```bash
    cd Hotel-POS/server
    npm install
    cd ../client
    npm install
    ```
3. Start the server
    ```bash
    cd ../server
    npm run dev
    ```
4. Start the client
    ```bash
    cd ../client
    npm run dev
    ```



