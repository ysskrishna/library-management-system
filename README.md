# Library Management System

A full stack application for a library book vending application. It is designed to manage book inventories, and member management, ensuring a seamless experience for borrowing and returning books through automated vending machines.


## Features

- User Authentication
  - Admin and User login functionality
  - Secure credential management

- Book Management
  - Add, edit, and remove books from the library catalog
  - Track book availability and loan status

- User Management
  - Register new library members
  - Manage user accounts and permissions

- Loan Management
  - Check out and return books
  - Track due dates and overdue items


## Getting Started

### Prerequisites

- Docker

### Installation

1. Clone the repository
2. Start the database using Docker:
   ```
   docker compose -f docker-compose-local.yml up
   ```

## Usage

### Admin Access
- Email: admin@gmail.com
- Password: admin

### User Access
- Email: john@gmail.com
- Password: demo