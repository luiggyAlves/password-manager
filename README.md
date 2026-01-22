# 🔐 Password Manager (Node.js + MongoDB)

A **command-line password manager (CLI)** developed in **Node.js**, using **MongoDB** for data persistence and **bcrypt** for master password encryption.

This project has an educational focus, aimed at practicing **authentication**, **password hashing**, and **database integration**.

---

## 📌 Features

* 🔑 Master password creation
* 🔐 Authentication with encrypted password
* 📂 Storage of multiple passwords
* 👀 Viewing saved passwords
* ✏️ Creating and updating passwords
* 🗄️ Data persistence with MongoDB
* 💻 Terminal-based interface (CLI)

---

## 🛠️ Technologies Used

* Node.js
* MongoDB
* bcrypt
* prompt-sync
* ES Modules

---

## 📁 Database Structure

### 📂 Database

### 📄 Collections

#### auth

Stores the master password hash.

```json
{
  "type": "auth",
  "hash": "<encrypted_password>"
}
```

#### passwords

Stores service passwords.

```json
{
  "source": "github",
  "password": "myPassword123"
}
```

---

## 🚀 How to Run the Project

### 1️⃣ Prerequisites

* Node.js
* MongoDB running on localhost:27017

### 2️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repository.git
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Run the application

```bash
node index
```

---

## 🔄 Application Flow

1. Connects to MongoDB
2. Checks whether a master password already exists

### If it does not exist:

* Prompts the user to create a master password
* Encrypts the password using bcrypt
* Stores the hash in the database

### If it exists:

* Prompts for the master password
* Validates the password using `bcrypt.compare`
* Displays the main menu

---

## 📜 Menu Options

```text
1. View passwords
2. Manage new password
3. Verify password
4. Exit
```

---

## 👨‍💻 Author: Luiggy Alves

* Computer Science student at the Federal University of Amazonas
* Project developed as part of the challenges proposed in the book *"Learn Node.js with Real Projects"* by Jonathan Wexler
