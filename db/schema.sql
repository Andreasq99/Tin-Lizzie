DROP DATABASE IF EXISTS tinlizzie_db;

-- CREATE DATABASE
CREATE DATABASE tinlizzie_db;

use tinlizzie_db;

-- Create the User table
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  fullName VARCHAR(255) NOT NULL,
  street VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zip VARCHAR(10),
  phoneNumber VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the Vehicle table
-- Create the Vehicle table
CREATE TABLE IF NOT EXISTS Vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  make VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  mileage INT NOT NULL,
  color VARCHAR(255),
  condition ENUM('New', 'Used', 'Certified Pre-Owned') NOT NULL,
  description TEXT,
  -- Add the 'image' field to store the image data
  image BLOB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


