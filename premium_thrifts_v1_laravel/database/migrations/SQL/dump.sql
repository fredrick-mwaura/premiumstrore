-- Table: password_reset_tokens
CREATE TABLE password_reset_tokens (
    email VARCHAR(255) PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL
);

-- Table: failed_jobs
CREATE TABLE failed_jobs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(255) UNIQUE NOT NULL,
    connection TEXT NOT NULL,
    queue TEXT NOT NULL,
    payload LONGTEXT NOT NULL,
    exception LONGTEXT NOT NULL,
    failed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: personal_access_tokens
CREATE TABLE personal_access_tokens (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tokenable_type VARCHAR(255) NOT NULL,
    tokenable_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    token VARCHAR(64) UNIQUE NOT NULL,
    abilities TEXT,
    last_used_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    INDEX tokenable_type_tokenable_id (tokenable_type, tokenable_id)
);

-- Table: users
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    google_id VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    guest_token VARCHAR(255) UNIQUE,
    phone VARCHAR(255),
    is_subscribed BOOLEAN DEFAULT 0,
    role ENUM('customer', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    INDEX guest_token_index (guest_token)
);

-- Table: products
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 1,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(255),
    subCategory VARCHAR(255),
    brand VARCHAR(255),
    gender VARCHAR(255),
    imageLink VARCHAR(255),
    images JSON,
    color VARCHAR(255),
    size VARCHAR(255),
    material VARCHAR(255),
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

-- Table: categories
CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    parent_id BIGINT UNSIGNED DEFAULT 0,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

-- Table: orders
CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table: order_items
CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Table: carts
CREATE TABLE carts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_carts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_carts_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Table: payments
CREATE TABLE payments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    payment_method ENUM('credit_card', 'paypal', 'bank_transfer', 'm-pesa') NOT NULL,
    account_details VARCHAR(255),
    payment_date TIMESTAMP NULL,
    active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_payments_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Table: cart_items
CREATE TABLE cart_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cart_id BIGINT UNSIGNED NOT NULL,
    product_id BIGINT UNSIGNED NOT NULL,
    quantity INT DEFAULT 1,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY cart_product_unique (cart_id, product_id)
);

-- Table: addresses
CREATE TABLE addresses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    street VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    postal_code VARCHAR(255),
    phone_numbers VARCHAR(255),
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_addresses_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


-- insert
-- Users
INSERT INTO users (name, email, google_id, password, guest_token, phone, is_subscribed, role, created_at, updated_at)
VALUES 
('John Doe', 'john@example.com', NULL, 'password123', 'guest1234', '1234567890', 1, 'customer', NOW(), NOW()),
('Admin User', 'admin@example.com', NULL, 'adminpass', NULL, '9876543210', 0, 'admin', NOW(), NOW());

-- Categories
INSERT INTO categories (name, parent_id, created_at, updated_at)
VALUES 
('Clothing', 0, NOW(), NOW()),
('Shoes', 0, NOW(), NOW()),
('Men', 1, NOW(), NOW()),
('Women', 1, NOW(), NOW());

-- Products
INSERT INTO products (name, description, price, stock, slug, category, subCategory, brand, gender, imageLink, images, color, size, material, created_at, updated_at)
VALUES
('Running Shoes', 'Lightweight running shoes.', 59.99, 50, 'running-shoes', 'Shoes', 'Men', 'Nike', 'male', 'https://example.com/shoe.jpg', '["img1.jpg", "img2.jpg"]', 'Black', '10', 'Synthetic', NOW(), NOW()),
('Summer Dress', 'Floral summer dress.', 39.99, 20, 'summer-dress', 'Clothing', 'Women', 'Zara', 'female', 'https://example.com/dress.jpg', '["dress1.jpg", "dress2.jpg"]', 'Red', 'M', 'Cotton', NOW(), NOW());

-- Orders
INSERT INTO orders (user_id, total_price, status, created_at, updated_at)
VALUES 
(1, 99.98, 'pending', NOW(), NOW());

-- Order Items
INSERT INTO order_items (order_id, product_id, quantity, price, created_at, updated_at)
VALUES 
(1, 1, 1, 59.99, NOW(), NOW()),
(1, 2, 1, 39.99, NOW(), NOW());

-- Carts
INSERT INTO carts (user_id, product_id, quantity, created_at, updated_at)
VALUES 
(1, 1, 2, NOW(), NOW());

-- Cart Items
INSERT INTO cart_items (cart_id, product_id, quantity, created_at, updated_at)
VALUES 
(1, 1, 2, NOW(), NOW());

-- Payments
INSERT INTO payments (order_id, payment_method, account_details, payment_date, active, created_at, updated_at)
VALUES 
(1, 'credit_card', '1234-xxxx-xxxx-5678', NOW(), 1, NOW(), NOW());

-- Addresses
INSERT INTO addresses (user_id, street, city, state, postal_code, phone_numbers, created_at, updated_at)
VALUES 
(1, '123 Main St', 'Nairobi', 'Nairobi County', '00100', '0700123456', NOW(), NOW());

-- Personal Access Tokens
INSERT INTO personal_access_tokens (tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at)
VALUES 
('App\\Models\\User', 1, 'Login Token', 'abc123tokenxyz', '["*"]', NOW(), NULL, NOW(), NOW());

-- Failed Jobs
INSERT INTO failed_jobs (uuid, connection, queue, payload, exception, failed_at)
VALUES 
(UUID(), 'database', 'default', 'payload here', 'Sample exception message', NOW());

-- Password Reset Tokens
INSERT INTO password_reset_tokens (email, token, created_at)
VALUES 
('john@example.com', 'reset-token-123', NOW());
