# Sembark E-Commerce

A modern e-commerce web application built with React and TypeScript.

Link: https://sembark.nishantgaharwar.com

## Tech Stack

- **React 18** — UI library
- **TypeScript** — Type safety
- **Vite** — Build tool and dev server
- **Tailwind CSS** — Utility-first styling
- **TanStack Query** — Server state management and data fetching
- **shadcn/ui** — Component library
- **React Router v6** — Client-side routing
- **Playwright** — End-to-end testing

## Features

- Product listing with category filter and pagination
- Filters and pagination persist in the URL — fully shareable links
- Product detail page with dynamic routing
- Cart with add/remove functionality
- Cart state persisted in localStorage
- Mobile responsive

## Prerequisites

- Node.js 18+
- npm

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd sembark
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project:

```env
VITE_BASE_URL=https://api.escuelajs.co/api/v1
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Running Tests

### Install Playwright browsers (first time only)

```bash
npx playwright install
```

### Run all tests

```bash
npx playwright test
```

### Run tests with UI mode

```bash
npx playwright test --ui
```

### Run a specific test file

```bash
npx playwright test tests/cart.spec.ts
```
