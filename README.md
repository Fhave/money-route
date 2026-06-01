# Money-Route: Financial Ledger

Money-Route is a frontend-only personal finance tracker designed to help users manage their money across multiple accounts in one place.

The application allows users to:

- Manage multiple financial accounts
- Record income and expenses
- Transfer money between accounts
- Monitor overall net worth
- Analyze monthly income and spending trends
- Filter transaction history by date range

Unlike many modern finance applications, Money-Route does not require users to connect bank accounts or store financial data on external servers. All information is stored locally in the browser, giving users complete ownership and control of their financial data.

---

## 1. Problem Statement

### The Problem

Many people manage their finances across multiple places, such as bank accounts, savings accounts, and physical cash.

While banking applications provide visibility into individual accounts, they rarely offer a consolidated view of a person's overall financial position. As a result, users often need to switch between multiple apps or manually calculate balances to understand how much money they actually have.

Tracking spending presents an additional challenge. Without a dedicated system, it becomes difficult to answer questions such as:

- How much did I spend this month?
- Which account is most of my money in?
- How much income have I received recently?
- Can I afford this expense without overdrawing an account?

### Why It Matters

Good financial decisions depend on having accurate and accessible information.

Without a clear view of balances, expenses, and income, it becomes easy to overspend, lose track of transactions, or misjudge available funds.

I wanted a simple tool that would provide a complete picture of my finances while remaining fast, private, and easy to use.

### Before Money-Route

Before building Money-Route, I relied on a combination of:

- Banking applications
- Manual calculations
- Basic spreadsheets

This approach had several limitations:

- Financial information was scattered across multiple places
- There was no unified view of all account balances
- Tracking monthly spending required manual effort
- Spreadsheets were inconvenient to update regularly

Money-Route was built to solve these challenges by providing a single place to manage accounts, track transactions, monitor spending, and view overall net worth while keeping all data stored locally on the device.

---

## 2. Framework Choice

This project was built using **Vue.js**.

### Why Vue.js

Money-Route is a highly state-driven application where a single user action can affect multiple parts of the interface simultaneously.

For example, when a user records an expense:

- The account balance changes
- The total net balance updates
- Monthly expense statistics are recalculated
- Recent transactions are refreshed
- Dashboard summaries update automatically

Vue's reactivity system made it straightforward to keep all these parts synchronized without requiring complex state management.

Another reason Vue was chosen is the application's component-based structure. Money-Route is composed of reusable pieces such as:

- Dashboard cards
- Account cards
- Transaction forms
- Transaction lists
- Monthly expense charts
- Date filters

Vue's Single File Components made it easy to keep the template, logic, and styling for each feature organized in one place.

### Trade-offs

React was the primary alternative considered.

React provides:

- larger ecosystem
- Greater industry adoption
- More third-party libraries
- Strong support for large-scale applications

However, Money-Route is a frontend-only application that focuses primarily on financial calculations, account management, transaction tracking, and data visualization.

For this scope, Vue allowed the application to be built more quickly while keeping the codebase relatively small and easy to maintain.

If the project evolves into a larger platform with cloud synchronization, banking integrations, or a larger development team, React's ecosystem could become more advantageous. For the current scope, Vue provided the best balance between development speed, maintainability, and simplicity.

---

## 3. Technical Decisions

### State Management

Instead of introducing a dedicated state management library, the application uses lightweight Vue composables.

These composables are responsible for handling:

- Transaction management
- Account management
- Balance calculations

---

### Data Storage

All financial data is stored in the browser using Local Storage.

This ensures:

- No backend is required
- User data never leaves the device
- Data persists between sessions

---

### Component Architecture

The application is built using reusable components such as:

- Dashboard summary cards
- Account cards
- Transaction items
- Transaction forms
- Monthly expense charts
- Date range filters

Each component is responsible for a single feature, making the application easier to maintain, test, and extend.

---

## 4. Features Overview

### Dashboard

The dashboard provides a complete financial overview by displaying:

- Total net balance across all accounts
- Monthly income
- Monthly expenses
- Monthly expense chart
- Recent transactions

### Accounts

Users can manage multiple financial accounts such as:

- Bank Accounts
- Savings Accounts
- Cash Wallets

Features include:

- Create new accounts
- Edit existing accounts
- View individual account balances
- Transfer money between accounts

A default account is automatically created when the application is first used.

### Transactions

Users can:

- Record income
- Record expenses
- Transfer money between accounts
- View transactions sorted by date
- Filter transactions using custom date ranges

All account balances and dashboard analytics update automatically whenever transactions are added.

---

## 5. One Struggle

### The Challenge

One of the most challenging parts of the project was implementing overdraft prevention.

Money-Route allows users to record expenses and transfer money between accounts. A key requirement was ensuring that users could not spend or transfer more money than was available in an account.

While this sounds simple, the challenge became more complex when multiple accounts and account transfers were introduced.

In both situations, the transaction should be rejected because it would result in a negative balance.

### The Solution

To solve this, I implemented a validation layer that runs before any expense or transfer is saved.

The system:

- Calculates the current account balance.
- Simulates the transaction.
- Determines the resulting balance.
- Blocks the operation if the balance would fall below zero.

This validation is applied consistently across expenses and transfers, ensuring that account balances remain accurate and preventing users from accidentally overspending.

---

## 6. How to Use

### Setup Instructions

```bash
git clone <https://github.com/Fhave/money-route.git>
cd money-route
npm install
npm run dev
```

### Demo Link

<https://stirring-piroshki-a98863.netlify.app/>