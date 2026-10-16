# Node.js REST API Project

Simple CRUD REST API using:

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv

## 1. Install dependencies

```bash
npm install
```

## 2. Start MongoDB

Make sure MongoDB is running locally.

Default database:

`node_api_db`

## 3. Start project

For normal mode:

```bash
npm start
```

For development mode:

```bash
npm run dev
```

Server:

`http://localhost:3000`

## 4. API Endpoints

### Test API

GET `/`

### Get all products

GET `/api/products`

### Get one product

GET `/api/products/:id`

### Create product

POST `/api/products`

Example JSON:

```json
{
  "name": "Laptop",
  "price": 55000,
  "category": "Electronics",
  "description": "Demo laptop",
  "image": "https://example.com/laptop.jpg"
}
```

### Update product

PUT `/api/products/:id`

Example JSON:

```json
{
  "price": 50000
}
```

### Delete product

DELETE `/api/products/:id`

## 5. Recommended testing

Use Postman or Thunder Client.

Flow:

1. POST product
2. GET all products
3. GET one product
4. PUT product
5. DELETE product
