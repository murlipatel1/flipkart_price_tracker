# Product Scraper MERN Application

This is a simple product scraping application built using the MERN (MongoDB, Express, React, Node.js) stack. The application allows users to input a product URL (specifically for Flipkart), scrape product details such as title, description, price, reviews, and purchases, and store the information in a MongoDB database.

## Features

- **Frontend (React)**: A form that allows users to input a product URL.
- **Backend (Node.js + Express)**: API to handle product URL submission, scrape product data, and store the data in MongoDB.
- **Scraping Service**: Uses Puppeteer to scrape product details from Flipkart URLs.
- **Retry Logic**: Continuously retries to fetch product data until the product is added due to latency.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Web Scraping**: Puppeteer
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Styling**: CSS

---

## Project Structure

Here’s a breakdown of the project structure in points:

### Backend
- **controllers**
  - `productController.js`: Handles product-related API logic.
  
- **models**
  - `productModel.js`: MongoDB schema for product data.

- **routes**
  - `productRoutes.js`: Defines API endpoints for product operations.

- **services**
  - `productService.js`: Contains business logic for adding/rechecking products.
  - `scraperService.js`: Implements Puppeteer to scrape product details from the given URLs.

- **app.js**: Sets up the Express server and middleware.

- **.env**: Contains environment variables (e.g., MongoDB URI, port).

### Frontend
- **public**
  - `index.html`: Base HTML file for the React app.
  - 
- **src**
  - **components**
    - `ProductForm.js`: React component for submitting product URLs.
    - `PriceHistory.js`: React component to display product price history.
    - `SearchProduct.js`: React component for searching products by title.
  
  - `App.js`: Main React app component that manages routing and displays pages.

- **package.json**: Contains the frontend dependencies and scripts.

---

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB (either local or using MongoDB Atlas)
- npm or yarn

### Clone the repository

```bash
git clone https://github.com/yourusername/product-scraper-mern.git
cd product-scraper-mern
```

### Install dependencies for both frontend and backend
```bash
cd backend
npm install
```

```bash
cd ../frontend
npm install
```

If you're using MongoDB Atlas, replace the MONGO_URI with your connection string from MongoDB Atlas.

### Run the Application

```bash
cd backend
nodemon index.js
```

```bash
cd frontend
npm start
```

The backend server will be running on http://localhost:5000, and the frontend will be running on http://localhost:3000.


## API Endpoints

#### POST /api/products
Add a product by URL.

Request:
```json
{
  "url": "https://www.flipkart.com/product-page-url"
}
```

Response: 

![image](https://github.com/user-attachments/assets/cbb6e725-39e7-4833-8480-2024200ecf94)
--
![image](https://github.com/user-attachments/assets/f7884caa-b677-497a-b21b-eabbccf93089)

201: Product successfully added
500: Internal server error or scraping failure


#### GET /api/products/search
Search for products by title.

Request:

```json
{
  "query": "product name"
}
```
Response:
![image](https://github.com/user-attachments/assets/8f7e5bd9-cb67-47d1-9f59-7a795c78fdd5)


#### GET /api/products/:productId/recheck
Get product check price details by ID.

Response:
![image](https://github.com/user-attachments/assets/5d9abb0a-47f7-4930-8a25-4aef33cc242d)


#### GET /api/products/:productId/price-history
Fetch price history for a given product.

Response:
![image](https://github.com/user-attachments/assets/f8ee26b0-b8db-4f55-980e-aec95ebc7b42)


## Database

![image](https://github.com/user-attachments/assets/4c1b044a-0a2f-4796-91d9-1f05f6b8ae36)
--
![image](https://github.com/user-attachments/assets/04d30bce-3d5c-403b-8832-124109cfd239)
--
![image](https://github.com/user-attachments/assets/203b8059-7cd8-4290-a31e-8fd1204a6b9f)


