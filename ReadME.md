# Premium Thrifts

## 🛍️ About Premium Thrifts
Premium Thrifts is an e-commerce platform that specializes in selling high-quality, affordable thrifted clothing and footwear. Our goal is to provide trendy, sustainable fashion choices to our customers while ensuring a seamless online shopping experience.

## 🚀 Features
- **User Authentication:** Secure login and signup system.
- **Product Management:** Add, edit, and delete products via an admin panel.
- **Category & Subcategory Support:** Organize products efficiently.
- **Responsive Design:** Optimized for mobile and desktop viewing.
- **Secure Checkout:** Integration with popular payment gateways.
- **Wishlist & Cart:** Save favorite items and manage purchases easily.
- **Reviews & Ratings:** Customers can provide feedback on products.
- **Order Tracking:** Users can track their order status.

## 🏗️ Tech Stack
### Frontend
- **React.js** – for a dynamic and interactive UI
- **Recharts** – for visualizing analytics
- **Tailwind CSS** – for modern styling

### Backend
- **Laravel 10** – robust API and backend management
- **Spatie RSS Feed Package** – for generating RSS feeds
- **MySQL** – for database management
- **JWT Authentication** – for secure user authentication

### Other Integrations
- **Shopify API** – for e-commerce functionalities
- **TMDb API** (for potential media-related features)

## 🔧 Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **PHP 8.3**
- **Composer**
- **Node.js & npm**
- **MySQL**

### Backend Setup (Laravel)
```sh
cd premium_thrifts_v1_laravel
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Frontend Setup (React)
```sh
cd premium_thrifts_react
npm install
npm run dev
```

## 🚀 API Endpoints
### Authentication
- **POST** `/api/login` – Authenticate user
- **POST** `/api/register` – Register a new user

### Products
- **GET** `/api/products` – Fetch all products
- **POST** `/api/products` – Add a new product
- **PUT** `/api/products/{id}` – Update a product
- **DELETE** `/api/products/{id}` – Remove a product

## 🛠️ Troubleshooting
### Common Issues & Fixes
- **`ERR_CONNECTION_REFUSED`** – Ensure Laravel is running on `php artisan serve`.
- **SQLSTATE[42S22] Column Not Found** – Run migrations `php artisan migrate --seed`.
- **Foreign Key Constraint Errors** – Ensure the referenced tables exist and have matching data types.

## 📌 Contributing
We welcome contributions! Feel free to submit a pull request or report any issues.

## 📜 License
This project is licensed under the MIT License.

---

👕 **Happy Thrifting!** 🛒

