
# Imagined-Assignment: E-Commerce API

A lightweight, production-grade REST API for managing users, products, and orders in an e-commerce platform. Built using **TypeScript**, **Express.js**, and **Prisma ORM**, the project is designed to handle core functionality like user management, product inventory, and order tracking.

---

## 🌟 Features

- **User Management**:
  - Create, update, and retrieve users.
- **Product Management**:
  - Manage product details, update stock, and calculate total stock quantity.
- **Order Management**:
  - Place, update, and retrieve orders.
  - Fetch orders by user, recent orders, or users by product.
- **Error Handling**:
  - Centralized error handling with detailed responses.
- **Validation**:
  - Input validation using `zod` for reliable data handling.

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js, TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Validation**: Zod
- **Testing**: Jest, Supertest

---

## 🚀 Setup and Installation

Follow these steps to set up the project locally:

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/) installed and running
- [Git](https://git-scm.com/) installed

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/ecommerce-api.git
   cd ecommerce-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up the Database**:
   - Create a PostgreSQL database.
   - Update the `.env` file with your database connection URL:
     ```
     DATABASE_URL=postgresql://username:password@localhost:5432/your-database
     ```

4. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

5. **Run Migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```

6. **Start the Server**:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000`.

---

## 🛠️ Environment Variables

The following environment variables must be set:

| Variable       | Description                          |
| -------------- | ------------------------------------ |
| `DATABASE_URL` | PostgreSQL database connection URL. |

---

## 📖 API Documentation

### **Users**
| Method | Endpoint         | Description               |
| ------ | ---------------- | ------------------------- |
| `POST` | `/users`         | Create a new user         |
| `GET`  | `/users/:id`     | Get user by ID            |
| `PUT`  | `/users/:id`     | Update an existing user   |

### **Products**
| Method | Endpoint         | Description                              |
| ------ | ---------------- | ---------------------------------------- |
| `POST` | `/products`      | Create a new product                    |
| `GET`  | `/products`      | Get all products                        |
| `PUT`  | `/products/:id`  | Update product details                  |
| `GET`  | `/products/stock/total` | Get total stock quantity for all products |

### **Orders**
| Method | Endpoint            | Description                             |
| ------ | ------------------- | --------------------------------------- |
| `POST` | `/orders`           | Place a new order                      |
| `GET`  | `/orders`           | Get all orders                         |
| `GET`  | `/orders/recent`    | Get orders placed in the last 7 days   |
| `GET`  | `/orders/user/:id`  | Get all orders placed by a specific user |
| `GET`  | `/orders/product/:id` | Get users who bought a specific product |
| `PUT`  | `/orders/:id`       | Update an existing order               |

---

## ✅ Testing

To run the tests, use:
```bash
npm test
```

- Integration tests are located in the `tests/` directory.
- Ensure the database is running before executing the tests.

---


