# React App

Welcome to the React App project! This application demonstrates the development of a ReactJS application with pages for users, teams, and events. It is prepared for deployment in Kubernetes and also hosted on GitHub Pages.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Docker Setup](#docker-setup)
- [Kubernetes Preparation](#kubernetes-preparation)
- [Dependencies](#dependencies)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

## Introduction

This project is a ReactJS application designed with the following pages:
- Users
- Teams
- Events


The project is hosted on GitHub Pages: [GitHub Pages](https://edencoania.github.io/#/)

## Features

- **Docker Support**: Includes Dockerfile.
- **Environment Variables**: Uses `.env` for configuration settings.

## Installation

1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Run the Application**
   ```sh
   npm start
   ```

## Usage

To run the application in development mode, use:
```sh
npm start
```

To build the application for production, use:
```sh
npm run build
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
REACT_APP_BASE_URL=https://api.yourservice.com
```

### Best practices

This project follows git ignore best practices and docker best practices (dockerignore, multi-stage, smart cache use) 

## Docker Setup

1. **Build Docker Image**
   ```sh
   docker build -t react-app .
   ```

2. **Run Docker Container**
   ```sh
   docker run -p 3000:3000 react-app
   ```


## Kubernetes Preparation

To prepare your application for Kubernetes, you will need to create deployment and service YAML files.
the correspond kubernetes repo is - **https://github.com/edencoania/micro-service**


## Dependencies

- React
- React Router
- Axios
- Docker
- Kubernetes


## Examples

Here are some example commands and scenarios to help you get started:

- **Running Locally**: `npm start`
- **Building for Production**: `npm run build`
- **Running with Docker**: `docker run -p 3000:3000 edencoania/release:reactJS`

## Troubleshooting

- **Issue with npm install**: Make sure you have the latest version of Node.js and npm installed.
- **Docker Build Failures**: Check the Dockerfile for any syntax errors and ensure all necessary files are included.
- **Kubernetes Deployment Issues**: Verify your Kubernetes cluster is running and you have the correct context set - set env var REACT_APP_BASE_URL properly.

## Contributors

- [Eden Coania](https://github.com/edencoania)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to reach out for any questions or contributions!