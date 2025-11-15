# AI Career Guru

AI Career Guru is an AI-powered career guidance platform designed to help students and professionals get personalized career insights. It provides expert-like mentorship by analyzing resumes, generating personalized roadmaps, and answering career-related questions through an AI chat interface.

---

## 🚀 Features

### **1. AI Career Q&A Chat**

Ask any career-related questions — skill guidance, role comparison, job advice, or learning resources. The AI provides context-aware responses.

### **2. Resume Analyzer**

Upload your resume and get:

* Skill extraction
* Career role matching
* Weakness/improvement suggestions
* ATS readiness insights
* Missing skill recommendations

### **3. Personalized Roadmap Generator**

Based on your resume and chosen career path, AI generates a customized, step-by-step roadmap that includes:

* Skills to learn
* Tools/frameworks
* Project ideas
* Learning sequence

---

## 🛠️ Tech Stack

### **Frontend**

* **React.js** – component-based UI
* **Tailwind CSS** – fast styling and responsiveness

### **Backend**

* **Next.js** – server-side rendering + backend API routes

### **Database Layer**

* **PostgreSQL (NeonDB)** – scalable relational database
* **Drizzle ORM** – type-safe SQL queries and easy migrations

### **Authentication**

* **Clerk** – secure and modern user auth with JWT-based sessions

### **Background Job Processing**

* **Inngest** – handles long-running AI tasks asynchronously

### **AI Integration**

* **OpenAI API** – powers Q&A, resume analysis, and roadmap generation

---

## 📁 Project Structure (High-Level)

```
root
├── app/
│   ├── api/                # Backend routes
│   ├── dashboard/          # User dashboard pages
│   ├── chat/               # AI chat interface
│   └── analyze/            # Resume analyzer
├── inngest/                # Event handlers and background jobs
├── db/                     # Drizzle schemas and migrations
├── components/             # Reusable UI components
└── utils/                  # Helpers and prompt templates
```

---

## ⚙️ How It Works

### **1. User Authentication**

Clerk handles sign-up, login, JWT session validation, and user management.

### **2. AI Interactions**

When a user asks a question or uploads a resume:

* Frontend sends data to a **Next.js API route**
* API triggers an **Inngest background job**
* Inngest processes the request using **OpenAI API**
* Result is stored in **PostgreSQL** via **Drizzle**
* Dashboard fetches and displays results

This ensures a smooth UX even for heavy tasks.

---

## 📦 Installation

### **1. Clone the Repository**

```bash
git clone <repo-url>
cd ai-career-guru
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Setup Environment Variables**

Create a `.env.local` file with:

```
DATABASE_URL=your_neon_db_url
OPENAI_API_KEY=your_openai_key
CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

### **4. Run the Development Server**

```bash
npm run dev
```

---

## 🧪 Key Highlights

* Fully asynchronous AI processing
* Scalable serverless architecture
* Clean and type-safe database layer
* Modern authentication with Clerk
* User-specific dashboards and history

---

## 💡 Future Improvements

* Add real-time AI chat using WebSockets
* Integrate LinkedIn job APIs
* Add vector-embedding based recommendations
* Build analytics dashboard for user progress

---

## 🧑‍💻 Author

**Ramling Huling**
B.Tech CSE, MNNIT Allahabad
Passionate about AI + Web Development

---

## 📜 License

This project is for educational and personal portfolio use.
