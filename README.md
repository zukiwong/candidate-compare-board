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


## Tech Stack

Frontend: React + Vite
Backend: Node.js + Express
AI Integration: Google Gemini API (Flash model)
Data Storage: Local JSON (for prototype demo)


## Setup Instructions

> The original project is available at https://www.figma.com/design/XIpGhQua9c5Sae8Vkl1Sfq/Candidate-Compare-Board

### Running the code
```bash
# Install dependencies
npm i
cd backend && npm i

# Start backend server (Terminal 1)
cd backend && npm start

# Start frontend server (Terminal 2)
npm run dev
```

After running locally, you can switch to view both employer and student interfaces.
The backend is integrated with **Gemini API** and can generate questions and matching results in real-time.

### API Key Instructions
This project provides a **demo API key** by default for short-term evaluation testing (valid for 1 week).
- If the demo key has expired, please go to [Google AI Studio](https://aistudio.google.com/) to apply for your own free key
- Configure in the `.env` file:
  ```
  GEMINI_API_KEY=your_api_key_here
  ```
⚠️ **Note**: For security reasons, the demo key will be disabled after one week.

## Known Limitations & Future Improvements

- Current resume data is based on local JSON files; future integration with databases and real-time CV parsing is planned
- Matching algorithm currently based on keywords and semantic analysis; future introduction of deep semantic matching models is planned
- Student-side questioning suggestions are not yet fully personalized; can be further optimized by combining historical application records

## Reflection

This project demonstrates a prototype that integrates **AI application design thinking + visual interaction + recruitment scenario innovation**.

The core objective is:
- Make **"AI"** a facilitator for identification and communication,
- Rather than a replacement for decision-making tools.


