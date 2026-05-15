CREATE TABLE users 
(
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  username VARCHAR(25),
  email VARCHAR(200),
  password VARCHAR(255),
  photo VARCHAR(255),
  phone VARCHAR(25),
  birth_date DATE,
  address VARCHAR(200),
  city VARCHAR(100),
  state VARCHAR(100),
  zip VARCHAR(25),
  bio TEXT,
  verification_code VARCHAR(6),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events 
(
  event_id INT AUTO_INCREMENT PRIMARY KEY,
  event_name VARCHAR(100),
  description TEXT,
  event_date DATE,
  location VARCHAR(150),
  image VARCHAR(500),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE event_registrations 
(
  registration_id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  user_id INT NOT NULL,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_event_user (event_id, user_id),
  FOREIGN KEY (event_id) REFERENCES events(event_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);