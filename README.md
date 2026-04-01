# Finance Dashboard UI

A clean, interactive, and responsive finance dashboard built with React, Redux Toolkit, and Tailwind CSS.

##  Features

### 1. Dashboard Overview
- **Summary Cards:** Real-time tracking of Total Balance, Income, and Expenses.
- **Balance Trend:** Interactive Area Chart showing financial growth over time.
- **Spending Breakdown:** Pie Chart visualizing expenses by category.

### 2. Transactions Management
- **Search & Filter:** Quickly find transactions by description, category, or type (Income/Expense).
- **Admin Actions:** Add and Delete transactions (Admin role only).
- **Export:** Download transaction data as a JSON file.

### 3. Role-Based UI (RBAC)
- **Admin Role:** Full access to view, add, and delete transactions.
- **Viewer Role:** Read-only access to dashboard and transaction list.
- **Role Switcher:** Easily toggle roles from the sidebar for demonstration.

### 4. Insights & Analytics
- **Top Category:** Identifies the highest spending category.
- **Monthly Comparison:** Calculates spending trends compared to the previous month.
- **Health Score:** A visual indicator of financial wellness.

### 5. Advanced UX
- **Dark Mode:** Full support for dark/light themes with system preference detection.
- **Data Persistence:** Transactions and user settings are saved in `localStorage`.
- **Responsive Design:** Optimized for mobile, tablet, and desktop screens.

---

##  Tech Stack

- **Frontend:** React 19, Vite
- **State Management:** Redux Toolkit (Slices, Persistence)
- **Styling:** Tailwind CSS 4
- **Charts:** Recharts
- **Icons:** Lucide React
- **Utilities:** clsx, tailwind-merge

---

##  Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finance-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

##  Approach & Decisions

### Component Architecture
I followed a modular structure, separating concerns into `Dashboard`, `Transactions`, and `Insights` components. The `Layout` component wraps the application, providing consistent navigation and theme management.

### State Management
Redux Toolkit was chosen for its scalability and ease of use. 
- **Finance Slice:** Manages the global state for transactions, user roles, and UI filters.
- **Persistence:** I implemented a custom `loadState` logic in the slice to ensure user data survives page reloads using `localStorage`.

### Responsive Design
Using Tailwind CSS's utility-first approach, the dashboard uses a flexible grid system. The sidebar remains fixed on desktop while the main content area adjusts seamlessly to smaller viewports.

### Role-Based Access
UI elements like the "Add Transaction" button and "Delete" icons are conditionally rendered based on the `role` state in Redux, simulating a real-world permission system.
