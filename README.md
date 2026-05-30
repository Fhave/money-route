# Money-Route: Financial Ledger

Money-Route is a personal finance tracker built to help you understand and manage your money in a simple, private, and fast way.

It allows you to track income and expenses, manage multiple accounts (like bank accounts, savings, and cash), and view your overall financial position—all stored locally on your device.

---

## 1. Problem Statement

### The Problem

Most financial tracking apps require users to connect their bank accounts or store financial data on external servers. This introduces privacy concerns and reduces control over personal data.

### Why It Matters

Financial data is highly sensitive. Users should be able to track their money without handing control of their information to third-party platforms.

### Before Money-Route

- Spreadsheets that were difficult to update on mobile
- Banking apps that only show individual accounts
- No unified view of total financial position

Money-Route was built to solve this gap by keeping everything local and unified.

---

## 2. Framework Choice

This project was built using **Vue.js**.

### Why Vue.js

Vue was chosen because:

- It provides a clean and structured way to build UI components
- It is lightweight and fast for small-to-medium applications
- It reduces boilerplate compared to other frameworks

### Trade-offs

- React has a larger ecosystem and more job-market relevance
- Vue, however, allows faster development and simpler state handling for this type of personal tool

For this project, speed of development and simplicity were prioritized over ecosystem size.

---

## 3. Technical Decisions

### State Management

Instead of using complex global state systems, the app uses lightweight composables.

These composables act as small logic units responsible for specific concerns like:

- Transaction handling
- Account calculations

This keeps the codebase modular and easy to maintain.

---

### Data Storage

All data is stored in the browser using **Local Storage**.

This ensures:

- No external database is required
- User data remains private
- The app works offline
- Data persists between sessions

---

### Component Architecture

The UI is broken into reusable components such as:

- Account cards
- Balance summary cards
- Transaction items
- Forms and input components

Each component is isolated, making it easy to debug, update, and reuse across the application.

Error handling is also implemented at the component level to prevent small failures from crashing the entire application.

---

## 4. Features Overview

### Dashboard

- Displays total net balance
- Shows income and expenses summary
- Provides a quick financial overview

### Accounts

- Create multiple accounts (bank, cash, savings, etc.)
- Track balances per account
- View overall net worth

### Transactions

- Add income or expense entries
- Transfer money between accounts
- Automatic balance updates
- Validation to prevent invalid transactions

---

## 5. One Struggle

### The Challenge

The most difficult part of the project was handling transaction edits and maintaining accurate account balances.

When editing past transactions, the system would incorrectly calculate balances because it was still considering the previous transaction values.

### The Solution

A recalculation system was introduced:

- When a transaction is edited, the original value is temporarily removed
- The updated transaction is then applied
- All balances are recalculated from a clean state

This ensured consistency and prevented overdraft calculation errors.

---

## 6. How to Use

### Setup Instructions

```bash
git clone <repo-url>
cd money-route
npm install
npm run dev
