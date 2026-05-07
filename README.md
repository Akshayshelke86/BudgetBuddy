<div align="center">
  <img src="https://via.placeholder.com/150x150.png?text=Budget+Buddy+Logo" alt="Budget Buddy Logo" width="120" />
  <h1>Budget Buddy 💸</h1>
  <p><strong>Your AI-Powered Personal Finance & Wealth Management Platform</strong></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
  [![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=flat&logo=clerk)](https://clerk.dev/)
  [![Gemini AI](https://img.shields.io/badge/Gemini_AI-2.0_Flash-4285F4?style=flat&logo=google)](https://ai.google.dev/)
</div>

<hr />

## 🌟 Project Overview

Budget Buddy is a modern AI-powered personal finance management platform designed to help users track expenses, manage budgets, analyze spending patterns, and improve financial planning. The application automates expense tracking using AI-powered receipt scanning, where users can upload receipts and extract transaction details instantly using Gemini AI. It also provides smart budget alerts, recurring transaction management, interactive analytics dashboards, and secure authentication for a seamless finance management experience.

The project is developed using Next.js 15, React 19, Tailwind CSS, Shadcn UI, Supabase PostgreSQL, Prisma ORM, Clerk Authentication, Google Gemini AI, Node.js, and Resend API. The platform delivers a premium startup-grade user experience with responsive dashboards, real-time analytics, and scalable cloud-based architecture.

**GitHub Repository Link:** [Budget Buddy GitHub Repository](https://github.com/Akshayshelke86/BudgetBuddy.git?utm_source=chatgpt.com)  
**Live Project Link:** [Budget Buddy Live Demo](https://budget-buddy-hazel-one.vercel.app/?utm_source=chatgpt.com)  
**Project Demo Video Drive Link:** [Budget Buddy Demo Video](https://drive.google.com/file/d/13rox6whyDbsZd_nDs6WCCNcL1FvicxXx/view?usp=sharing&utm_source=chatgpt.com)

---

## ✨ Key Features

- 📸 **AI-Powered Receipt Scanning**: Upload any receipt, and our Gemini AI integration will automatically parse the amount, date, merchant, and category.
- 🎯 **Smart Budget Alerts**: Set custom budgets for different categories and receive real-time notifications when you approach your limits.
- 📊 **Advanced Analytics & Insights**: Visualize your income, expenses, and cash flow with interactive, responsive charts.
- 🔒 **Bank-Grade Security**: Fully secured authentication powered by Clerk, ensuring your financial data remains private and protected.
- 🌍 **Localized for India**: Full support for Indian Rupees (₹) formatting across all dashboards and reports.
- 🔄 **Recurring Transactions**: Easily manage subscriptions and recurring bills with automated scheduling.

---

## 🛠️ Tech Stack

Built with modern, scalable, and highly performant technologies:

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Next.js Server Actions
- **Database**: PostgreSQL (hosted on Supabase), Prisma ORM
- **Authentication**: Clerk
- **AI Integration**: Google Generative AI (Gemini)
- **Email Notifications**: Resend

---

## 📸 Screenshots

> *Note: Add your actual project screenshots in a `/public/docs` folder and update these links.*

<details>
<summary><b>Click to expand screenshots</b></summary>
<br>

| Dashboard Overview | AI Receipt Scanner |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x350.png?text=Dashboard+UI" alt="Dashboard" /> | <img src="https://via.placeholder.com/600x350.png?text=Receipt+Scanner+UI" alt="Receipt Scanner" /> |

| Transaction Management | Budget Analytics |
| :---: | :---: |
| <img src="https://via.placeholder.com/600x350.png?text=Transactions+UI" alt="Transactions" /> | <img src="https://via.placeholder.com/600x350.png?text=Analytics+UI" alt="Analytics" /> |

</details>

---

## 🏗️ Architecture Diagram

```mermaid
graph TD;
    Client[Next.js Client Components] -->|Server Actions| Server[Next.js Server / API]
    Server -->|Auth Tokens| Clerk[Clerk Authentication]
    Server -->|Image Parsing| Gemini[Google Gemini AI]
    Server -->|Email Triggers| Resend[Resend API]
    Server -->|Prisma Client| Supabase[(Supabase PostgreSQL)]
    
    classDef primary fill:#4285F4,stroke:#fff,stroke-width:2px,color:#fff;
    classDef secondary fill:#34A853,stroke:#fff,stroke-width:2px,color:#fff;
    classDef dark fill:#000000,stroke:#fff,stroke-width:2px,color:#fff;
    
    class Client,Server primary;
    class Supabase secondary;
    class Clerk,Gemini,Resend dark;
```

---

## 🚀 Installation & Setup

Follow these steps to get Budget Buddy running on your local machine.

### 1. Prerequisites
- **Node.js** (v18 or higher)
- API Keys for **Supabase**, **Clerk**, **Google AI Studio**, and **Resend**.

### 2. Clone the Repository
```bash
git clone https://github.com/Akshayshelke86/BudgetBuddy.git
cd BudgetBuddy
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Variables
Create a `.env` file in the root directory and configure your keys:
```env
DATABASE_URL="postgresql://postgres.[PROJECT_ID]:[PASSWORD]@aws-0-region.pooler.supabase.com:5432/postgres"
DIRECT_URL="postgresql://postgres.[PROJECT_ID]:[PASSWORD]@aws-0-region.pooler.supabase.com:5432/postgres"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY=AIzaSy...
RESEND_API_KEY=re_...
```

### 5. Database Setup
Push the Prisma schema to your Supabase database:
```bash
npx prisma db push
```

### 6. Start the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🔮 Future Scope

- [ ] **Multi-Currency Support**: Dynamic currency conversion for international users.
- [ ] **Bank API Integration**: Plaid integration for automatic bank transaction syncing.
- [ ] **AI Financial Advisor**: A chat interface that analyzes your spending and offers personalized advice.
- [ ] **Export Reports**: Generate and download monthly PDF/CSV reports.
- [ ] **Investment Tracking**: Support for tracking stocks, crypto, and mutual funds.

---

<div align="center">
  <p>Built with ❤️ for better financial habits.</p>
</div>
