# REST API with Next.js and MongoDB

This project is a REST API developed using Next.js and MongoDB. It features routes for users, categories, and blogs, with middleware for authentication, logging, and error handling. The application leverages Next.js serverless API routes and MongoDB for scalable data storage.

## Features

- **User Management:** CRUD operations for user data.
- **Category Management:** CRUD operations for blog categories.
- **Blog Management:** CRUD operations for blog posts.
- **Sorting and Searching:** Backend support for sorting and searching data.
- **Pagination:** Backend support for paginating data.
- **Middleware:**
  - Authentication
  - Logging
  - Error Handling

## Technologies Used

- **Next.js:** Server-side rendering and serverless API routes.
- **MongoDB:** Scalable NoSQL database for data storage.
- **Middleware:** Custom middleware for authentication, logging, and error handling.

## Getting Started

### Prerequisites

- Node.js
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/kaspra/restapi-nextjs.git
   cd restapi-nextjs
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your MongoDB URI:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Run the development server:

   ```sh
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Routes

### Users

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `PATCH /api/users/:id` - Update a user by ID
- `DELETE /api/users/:id` - Delete a user by ID

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `PATCH /api/categories/:id` - Update a category by ID
- `DELETE /api/categories/:id` - Delete a category by ID

### Blogs

- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create a new blog
- `GET /api/blogs/:id` - Get a blog by ID
- `PATCH /api/blogs/:id` - Update a blog by ID
- `DELETE /api/blogs/:id` - Delete a blog by ID

## Sorting, Searching, and Pagination

### Sorting

You can sort the data by Date by adding a `startDate & endDate` query parameter to the request. For example:

- `GET /api/blogs?startDate=12-2-2024&endDate=12-2-2026` - Sort blogs by date

### Searching

You can search the data by adding a `keyword` query parameter to the request. For example:

- `GET /api/blogs?keyword=technology` - Search blogs by keyword

### Pagination

You can paginate the data by adding `page` and `limit` query parameters to the request. For example:

- `GET /api/blogs?page=1&limit=10` - Get the first 10 blogs

## Middleware

### Authentication

Authentication middleware to secure routes and ensure that users are authenticated before accessing certain endpoints.

### Logging

Logging middleware to log requests and responses for debugging and monitoring purposes.

### Error Handling

Error handling middleware to catch and handle errors gracefully, providing meaningful error messages to the client.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
