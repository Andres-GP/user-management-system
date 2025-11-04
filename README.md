# 👥 User Management System

A full-featured web app for managing users — create, view, edit, and delete user profiles.  
Built with **Node.js**, **Express**, **MySQL**, and **Handlebars**, this project demonstrates complete CRUD operations with a modern UI.

---

## 🚀 Live Demo

👉 [View Live App](https://user-management-system-8r1h.onrender.com/)

---

## ✨ Features

- 🧾 **Create, edit, delete, and view users** with validation.
- 🔍 **Search users** by first or last name.
- ⚠️ **Confirmation prompts** for deletions.
- 🔔 **Dynamic alerts** for CRUD operations.
- 📱 **Responsive UI** with Handlebars templates.

---

## 🧰 Tech Stack

| Category       | Technology               |
| -------------- | ------------------------ |
| **Backend**    | Node.js, Express         |
| **Frontend**   | Handlebars, HTML, CSS    |
| **Database**   | MySQL                    |
| **UI**         | Font Awesome, Handlebars |
| **Testing**    | Jest                     |
| **Deployment** | Render.com               |
| **Versioning** | Git + GitHub             |

---

## ⚙️ CI/CD & Automation

This project includes a full GitHub Actions workflow for continuous integration, testing, and deployment:

- **Continuous Integration (CI)**

  - Runs on `push` or `pull_request` events to `master`.
  - Lints code with **ESLint**.
  - Builds the project.
  - Runs **unit and integration tests** using **Jest**.

- **Continuous Deployment (CD)**

  - Automatic deployment to **Render** after CI succeeds.
  - Manual approval required for production deployment.
  - Discord notifications for successful production deployments.
  - [CI/CD Discord channel here!](https://discord.com/channels/1433886988158763124/1433886988980719819)

- **Performance & Quality Checks**

  - Weekly **Lighthouse audits** scheduled with GitHub Actions.
  - Dependabot keeps **npm dependencies** and **GitHub Actions** up-to-date weekly.

- **Reusable Workflows**
  - CI tasks are modularized in a **reusable workflow** for maintainability and consistency.
