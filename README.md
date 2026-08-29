# MikeAI 🤖

<div align="center">

![MikeAI Banner](https://img.shields.io/badge/MikeAI-AI%20Chat%20Platform-blueviolet?style=for-the-badge&logo=openai&logoColor=white)

**A full-stack AI chat application with artifact rendering, conversation history, and integrated billing.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![AWS](https://img.shields.io/badge/AWS-ECS%20%7C%20S3%20%7C%20CloudFront-FF9900?style=flat-square&logo=amazonaws)](https://aws.amazon.com/)
[![Docker](https://img.shields.io/badge/Docker-Microservices-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)

</div>

---

## ✨ Features

- 🔐 **Google OAuth** — Secure, one-click sign-in via Firebase Authentication
- 💬 **AI Chat** — Streaming AI conversations with full message history
- 🖼️ **Artifact Panel** — Dedicated side panel to render code, HTML, and rich outputs
- 📜 **Conversation History** — Persistent conversations stored per user
- 💳 **Billing Integration** — Razorpay-powered plan upgrades (Free → Pro)
- 📱 **Responsive Design** — Mobile-friendly with collapsible sidebar
- 🚀 **CI/CD Pipeline** — Automated deployments via GitHub Actions to AWS

---

## 🏗️ Architecture

MikeAI uses a **microservices** architecture with an API Gateway pattern:

```
┌─────────────────────────────────────────────────────┐
│                    Frontend                         │
│            React + Vite  (AWS S3 + CloudFront)      │
└───────────────────────┬─────────────────────────────┘
                        │ HTTP
┌───────────────────────▼─────────────────────────────┐
│                  API Gateway                        │
│              Express.js  (AWS ECS)                  │
└──┬──────────────┬──────────────┬──────────────┬─────┘
   │              │              │              │
   ▼              ▼              ▼              ▼
┌──────┐     ┌────────┐    ┌─────────┐   ┌──────────┐
│ Auth │     │  Chat  │    │  Agent  │   │ Billing  │
│ Svc  │     │  Svc   │    │   Svc   │   │   Svc    │
│(ECS) │     │  (ECS) │    │  (ECS)  │   │  (ECS)   │
└──────┘     └────────┘    └─────────┘   └──────────┘
```

---

## 📁 Project Structure

```
MikeAI/
├── frontend/                   # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   │   ├── SideBar.jsx     # Collapsible conversation sidebar
│   │   │   ├── ChatArea.jsx    # Main chat container
│   │   │   ├── ChatInput.jsx   # Message input with file support
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── Artifact.jsx    # Code/HTML artifact panel
│   │   │   ├── BillingDrawer.jsx
│   │   │   └── LoadingAnimation.jsx
│   │   ├── features/           # API call functions
│   │   │   ├── getCurrentUser.js
│   │   │   ├── getConversations.js
│   │   │   ├── createConversation.js
│   │   │   ├── getMessages.js
│   │   │   ├── sendMessage.js
│   │   │   ├── updateConversation.js
│   │   │   ├── createOrder.js
│   │   │   ├── verifyPayment.js
│   │   │   └── logOut.js
│   │   ├── pages/
│   │   │   └── Home.jsx        # Main page with auth gate
│   │   ├── redux/              # Redux state management
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── utils/
│       ├── firebase.js
│       └── axios.js
│
├── backend/
│   ├── gateway/                # API Gateway (Express)
│   │   ├── controllers/
│   │   ├── middleware/         # JWT auth middleware
│   │   ├── utils/
│   │   ├── Dockerfile
│   │   └── index.js
│   ├── services/
│   │   ├── auth/               # Firebase token verification + user management
│   │   ├── chat/               # Conversation & message persistence
│   │   ├── agent/              # AI model integration
│   │   └── billing/            # Razorpay order + payment verification
│   └── shared/                 # Shared utilities
│
└── .github/
    └── workflows/
        └── deploy.yml          # CI/CD pipeline
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- Docker & Docker Compose
- Firebase project with Google Auth enabled

### 1. Clone the repo

```bash
git clone https://github.com/PankajSingh18/MikeAI.git
cd MikeAI
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

**`.env` variables required:**

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Backend (Docker Compose)

```bash
cd backend
docker-compose up --build
```

**Gateway `.env` variables:**

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
AUTH_SERVICE=http://auth:5001
CHAT_SERVICE=http://chat:5002
AGENT_SERVICE=http://agent:5003
BILLING_SERVICE=http://billing:5004
```

---

## ☁️ Deployment

| Layer       | AWS Service             |
|-------------|-------------------------|
| Frontend    | S3 + CloudFront         |
| API Gateway | ECS Fargate             |
| Auth        | ECS Fargate             |
| Chat        | ECS Fargate             |
| Agent       | ECS Fargate             |
| Billing     | ECS Fargate             |
| Images      | ECR                     |

### CI/CD Flow (GitHub Actions)

```
Push to main
  → Build Docker images
    → Push to AWS ECR
      → Force-deploy ECS services
        → Build frontend (npm run build)
          → Upload dist/ to S3
            → Invalidate CloudFront cache
```

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY` | AWS IAM access key |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret |
| `AWS_REGION` | e.g. `ap-south-1` |
| `AWS_ACCOUNT_ID` | Your AWS account ID |
| `ECS_CLUSTER` | ECS cluster name |
| `GATEWAY_SERVICE` | ECS gateway service name |
| `AUTH_SERVICE` | ECS auth service name |
| `CHAT_SERVICE` | ECS chat service name |
| `AGENT_SERVICE` | ECS agent service name |
| `BILLING_SERVICE` | ECS billing service name |
| `S3_BUCKET` | Frontend S3 bucket name |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID |

---

## 🛠️ Tech Stack

| Layer            | Technology                              |
|------------------|-----------------------------------------|
| Frontend         | React 18, Vite, Tailwind CSS            |
| State Management | Redux Toolkit                           |
| Auth             | Firebase Authentication (Google OAuth)  |
| API Gateway      | Express.js, express-http-proxy, Morgan  |
| Backend Services | Node.js (Express) microservices         |
| Payments         | Razorpay                                |
| Containers       | Docker, Docker Compose                  |
| Cloud            | AWS ECS, ECR, S3, CloudFront            |
| CI/CD            | GitHub Actions                          |

---

## 📄 License

MIT License


