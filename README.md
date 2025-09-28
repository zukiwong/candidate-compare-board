# Candidate Compare Board

## Project Overview

This project aims to provide the Summer of Tech platform with a more efficient, fair, and lightweight AI-powered matching tool that enhances the overall experience across three key stages:
 Identification, Communication, and Preparation.
Unlike traditional ATS screening systems, this project is positioned as an AI-assisted Matchmaking Platform — helping both employers and students quickly find their best fit during short in-person meetings.


## Pain Points & Insights

In the current Summer of Tech recruitment process, both students and employers face low matching efficiency:

- **Employers** need to browse large volumes of resumes in short timeframes, making it difficult to quickly identify key capabilities
- **Students** can only upload one generic resume, making it hard to highlight the most relevant experience for different positions
- **Limited communication time** during in-person events, with both parties lacking structured guidance for expression and questioning

This project aims to improve employer identification efficiency, help students precisely showcase their strengths, and optimize the overall event experience through AI-driven matching and preparation tools.

## Solution Summary

###  Employer Dashboard
- Automatically identifies candidate skills and matches them with job descriptions (JD)
- Outputs matching scores calculated by weighted algorithm (Skills Match 45%, Experience Match 30%, Project Experience 20%, Education Match 5%)
- Visualizes candidate skill maps and highlights
- AI generates questioning suggestions based on candidate gaps and potential, helping employers guide conversations and discover potential strengths within short time
- Supports horizontal candidate comparison functionality to quickly determine who is most suitable for the position

###  Student Dashboard
- For the 15 positions applied to, the system automatically analyzes differences between student resumes and JDs
- Provides AI-generated **personalized Q&A preparation** to help students prepare in advance
- **Elevator Pitch generation** allows students to quickly sell themselves and showcase highlights when facing different employers
- Also helps students recognize gaps with positions and improvement directions


## 🚀 Live Demo

- **Frontend**: [https://candidate-compare-board.vercel.app](https://candidate-compare-board.vercel.app)
- **Backend API**: [https://candidate-compare-board-production.up.railway.app](https://candidate-compare-board-production.up.railway.app)

## Tech Stack

**Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
**Backend**: Node.js + Express + CORS
**AI Integration**: Google Gemini 2.5 Flash API
**Deployment**: Vercel (Frontend) + Railway (Backend)
**Data Storage**: In-memory JSON (for prototype demo)


## Setup Instructions

> **🌐 Live Demo Available**: You can directly access the deployed application at the links above!

> **🎨 Original Design**: Available at https://www.figma.com/design/XIpGhQua9c5Sae8Vkl1Sfq/Candidate-Compare-Board

### Local Development Setup

```bash
# Install dependencies
npm i
cd backend && npm i

# Configure backend environment
cd backend
cp .env.example .env
# Add your Gemini API key to .env

# Start backend server (Terminal 1)
npm start

# Start frontend server (Terminal 2 - from root directory)
npm run dev
```

### Deployment Architecture

- **Frontend**: Deployed on Vercel with automatic deployments from GitHub
- **Backend**: Deployed on Railway with environment variables configured
- **API Integration**: Cross-origin requests configured with CORS
- **Environment Variables**: Securely managed in deployment platforms

### API Key Configuration
- **Demo**: The live demo includes a configured API key for immediate testing
- **Local Development**: Get your free API key from [Google AI Studio](https://aistudio.google.com/)
- **Configuration**: Add `GEMINI_API_KEY=your_key` to `backend/.env`

## Known Limitations & Future Improvements

- Current resume data is based on local JSON files; future integration with databases and real-time CV parsing is planned
- Matching algorithm currently based on keywords and semantic analysis; future introduction of deep semantic matching models is planned
- Student-side questioning suggestions are not yet fully personalized; can be further optimized by combining historical application records

## Reflection

This project demonstrates a prototype that integrates **AI application design thinking + visual interaction + recruitment scenario innovation**.

The core objective is:
- Make **"AI"** a facilitator for identification and communication,
- Rather than a replacement for decision-making tools.


