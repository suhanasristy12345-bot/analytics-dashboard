# Analytica — Business Intelligence Dashboard

A responsive, interactive business analytics dashboard built with React and Vite. Analytica helps visualize sales performance, monitor key business metrics, explore transaction data, and discover useful business insights through a clean, modern interface.

## Features

- **Key Performance Indicators (KPIs):** View revenue, orders, and customer metrics with growth comparisons.
- **Interactive Charts:** Explore monthly revenue trends and sales across product categories.
- **Date Period Selection:** Switch between the available 30-day, 90-day, and 7-month views.
- **Business Insights:** View top-performing categories, pending orders, best revenue month, and average monthly revenue.
- **Business Recommendations:** Cycle through generated insights and suggested actions.
- **Transaction Search:** Find transactions by product name.
- **Category and Status Filters:** Narrow the transaction table to relevant results.
- **CSV Export:** Export transactions matching the selected search and filters.
- **Dark Mode:** Switch between light and dark themes.
- **Responsive Layout:** Adapt the dashboard to desktop, tablet, and mobile screens.

## Tech Stack

- React
- Vite
- JavaScript
- Chart.js
- react-chartjs-2
- Lucide React
- CSS

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm.

### Installation

Open a terminal in the project directory and install the dependencies:

```bash
npm install
```

### Run Locally

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal to view the dashboard.

### Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
analytics-dashboard/
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## Data

The dashboard currently uses sample data for demonstration. Its metrics, charts, and recommendations are based on the data included in the application and are not connected to a live business database.

## Future Improvements

- Integrate a real-world data source or API.
- Add customizable date ranges.
- Expand reporting and analytics capabilities.
- Add automated tests and further accessibility improvements.

## Author

Developed as a portfolio project to demonstrate React development, data visualization, and interactive dashboard design.
