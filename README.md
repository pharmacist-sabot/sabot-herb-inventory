<div align="center">

# **Herbal Purchase Value Dashboard**

### _A data visualization dashboard for tracking and analyzing the procurement value of herbal medicines at Sabot Hospital._

<br>

<p>
  <a href="https://github.com/pharmacist-sabot/sabot-herb-inventory/commits/main">
    <img src="https://img.shields.io/github/last-commit/pharmacist-sabot/sabot-herb-inventory?style=for-the-badge&color=blue&logo=github" alt="Last Commit">
  </a>
  <a href="https://github.com/pharmacist-sabot/sabot-herb-inventory">
    <img src="https://img.shields.io/github/languages/top/pharmacist-sabot/sabot-herb-inventory?style=for-the-badge&color=yellow&logo=javascript" alt="Top Language">
  </a>
  <a href="https://github.com/pharmacist-sabot/sabot-herb-inventory">
    <img src="https://img.shields.io/github/languages/count/pharmacist-sabot/sabot-herb-inventory?style=for-the-badge&color=informational" alt="Language Count">
  </a>
</p>

</div>

---

This repository contains the source code for a web-based dashboard designed to provide insights into the purchasing trends of herbal medicines. The application fetches data from a **Google Apps Script** backend (powered by a Google Sheet) and presents it in an easy-to-understand visual format.

The primary goal is to help hospital staff or administrators quickly grasp key metrics, such as the total annual purchase value and identify the most frequently ordered herbal products.

## ✨ Features

-   **Data Visualization:** Utilizes **Chart.js** to render a bar chart displaying the top 10 herbal medicines by total purchase value.
-   **Dynamic Summaries:** Features summary cards that show high-level metrics, like the total purchase value for the selected year.
-   **Yearly Data Filtering:** Allows users to easily switch between different fiscal years to analyze historical data.
-   **Google Sheets Backend:** Employs a lightweight and maintainable backend using Google Apps Script, which serves data directly from a Google Sheet.
-   **Centralized State Management:** Manages application state, including data fetching and filtering logic, with **Pinia**.
-   **Responsive Interface:** A clean and simple UI that focuses on data presentation.

## 🛠️ Built With the Tools and Technologies:

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D" alt="Vue.js">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Pinia-FFD859?style=for-the-badge&logo=pinia&logoColor=black" alt="Pinia">
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white" alt="Chart.js">
  <img src="https://img.shields.io/badge/Google_Apps_Script-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Apps Script">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
</p>

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or higher)
-   npm (or any other package manager)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/pharmacist-sabot/sabot-herb-inventory.git
    cd sabot-herb-inventory
    ```

2.  **Install NPM packages:**
    ```sh
    bun install
    ```

3.  **Run the development server:**
    ```sh
    bun dev
    ```
    The application will be available at `http://localhost:5173`. No environment variables are required as the Google Apps Script API endpoint is public.

## 📜 Available Scripts

-   `bun dev`: Starts the development server.
-   `bun build`: Builds the app for production.
-   `bun preview`: Previews the production build locally.
