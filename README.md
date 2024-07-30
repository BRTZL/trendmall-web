# Trendmall Frontend

## Project Description

Trendmall is the frontend of a streamlined full-stack application focused on essential functionalities for an e-commerce system. This frontend service is built using Next.js, Shadcn, and Tailwind, providing functionalities such as product listing, user authentication, and order processing.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 18.X.X)
- Yarn (version 4.X.X)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/BRTZL/trendmall-web.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd trendmall-web
   ```

3. **Install the dependencies:**

   ```bash
   yarn install
   ```

4. **Set up the environment variables:**

   Create a `.env` file in the root directory and add the necessary environment variables as specified in the `.env.example` file.

## Usage

### Running the Development Server

To start the development server, run:

```bash
yarn dev
```

The server will start on `http://localhost:3000`.

### Building for Production

To build the project for production, run:

```bash
yarn build
```

### Generating API Types

To generate API types using `swagger-typescript-api`, run:

```bash
npx swagger-typescript-api -p http://localhost:3001/docs-yaml -o ./src/types -n api.ts --axios
```

## API Integration

We are using Axios for API integration with bearer authentication.

## Component Libraries

We are using Shadcn and Tailwind for UI components and styling.

## State Management

We are using React Query for state management and mutations.

## SSR Details

This project uses server-side rendering (SSR) with Next.js to optimize performance and SEO.

## Testing

To run the unit tests, use the following command:

```bash
yarn test
```

## Deployment

### Running with Docker

1. **Build the Docker image:**

   ```bash
   docker build -t trendmall-frontend .
   ```

2. **Run the Docker container:**

   ```bash
   docker run -p 3000:3000 trendmall-frontend
   ```

For detailed deployment guidelines, refer to the Docker documentation.

## Contributing

To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a Pull Request.
