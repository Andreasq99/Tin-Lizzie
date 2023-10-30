DROP DATABASE IF EXISTS tinlizzie_db;

-- CREATE DATABASE
CREATE DATABASE tinlizzie_db;

use tinlizzie_db;
-- Create the 'buyer' table
CREATE TABLE buyer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    zip_code VARCHAR(10),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the 'seller' table
CREATE TABLE seller (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the 'vehicle' table
CREATE TABLE vehicle (
    id INT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    year INT,
    price DECIMAL(10, 2),
    description TEXT,
    imageUrl VARCHAR(255)
);

-- Create the 'carmetrics' table
CREATE TABLE carmetrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicleId INT NOT NULL,
    mileage INT,
    fuelEfficiency DECIMAL(5, 2),
    FOREIGN KEY (vehicleId) REFERENCES vehicle(id)
);

-- Create the 'customer' table
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    zip_code VARCHAR(10),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the 'buyerlikes' table
CREATE TABLE buyerlikes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    buyerId INT NOT NULL,
    vehicleId INT NOT NULL,
    liked BOOLEAN NOT NULL,
    FOREIGN KEY (buyerId) REFERENCES buyer(id),
    FOREIGN KEY (vehicleId) REFERENCES vehicle(id)
);
