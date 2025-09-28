# Candidate Compare Board

## Project Overview

This project aims to provide the **Summer of Tech platform** with a more efficient, fair, and lightweight matching tool that comprehensively enhances the matching experience across three key stages: **"Identification"**, **"Communication"**, and **"Preparation"**.

This is not a traditional recruitment or ATS screening system, but rather a **"Matchmaking Platform"**.

In the current Summer of Tech process, the main pain points include: large numbers of students, similar resumes, low matching efficiency, and limited communication time. Therefore, we hope to help employers quickly understand candidates within limited time through **AI-assisted rapid identification and intelligent questioning mechanisms**, while helping students better showcase their fit for positions, thereby improving matching quality and meeting effectiveness.

## Pain Points & Insights

**Employer Perspective:**
- May need to face hundreds of candidates in each event, with low efficiency in manual screening and communication
- Difficult to grasp core highlights with just 10 seconds of resume browsing, and similar student backgrounds make it hard to form differentiated impressions

**Student Perspective:**
- Students typically can only upload one generic resume, making it difficult to showcase the most relevant skills and experience for different positions
- Limited communication time with employers during offline events (typically 5-10 minutes), making it hard to accurately express their strengths

**Platform/Organizer Perspective:**
- Hope to improve overall matching success rate and communication quality
- Hope to leverage AI as an auxiliary tool to enhance matchmaking success rate

## Solution Summary

This project is designed from two perspectives: **Employer** and **Student**:

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

## Core Logic (How It Works)

- Utilizes AI to analyze student resumes (or profile forms) and job description content, identifying keywords and skill associations
- Calculates matching degree and outputs brief highlight summaries and skill gaps
- Based on gaps, generates 3 questions employers can ask to assist conversations
- Student side generates corresponding "self-presentation Q&A suggestions" based on the same logic
- Through structured skill sorting and horizontal comparison, helps employers quickly identify the most suitable candidates

Unlike traditional ATS systems, this platform does not pursue "fully automated screening" but emphasizes **"AI as assistance"**, enabling people to identify, think, and communicate faster, thereby promoting higher quality matching.

## Prototype Features

- **Candidate Skill Matching Comparison Board** (Match Comparison Board)
- **AI Question Generation Module** (For Employers & Students)
- **Visual Comparison Functionality**
- **Customizable Structured Skill Fields and Sorting**
- **Student Access to AI Suggested Questions and Self-Presentation Tips**

**Demo is now complete** and can be run locally (integrated with Gemini API), supporting real data interaction.

## Business Value

**For Employers**: Save screening time, improve identification efficiency, enhance communication quality

**For Students**: Clarify gaps, prepare in advance, enhance presentation skills and confidence

**For Organizers**: Enhance platform intelligence, improve event experience, promote high-quality matching results

## Known Limitations & Future Improvements

- Current resume data is based on local JSON files; future integration with databases and real-time CV parsing is planned
- Matching algorithm currently based on keywords and semantic analysis; future introduction of deep semantic matching models is planned
- Student-side questioning suggestions are not yet fully personalized; can be further optimized by combining historical application records

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

## Reflection

This project demonstrates a prototype that integrates **AI application design thinking + visual interaction + recruitment scenario innovation**.

The core objective is:
- Make **"AI"** a facilitator for identification and communication,
- Rather than a replacement for decision-making tools.


