CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  username VARCHAR(25),
  email VARCHAR(200),
  password VARCHAR(255),
  photo VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
  event_id INT AUTO_INCREMENT PRIMARY KEY,
  event_name VARCHAR(100),
  description TEXT,
  event_date DATE,
  location VARCHAR(150),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
