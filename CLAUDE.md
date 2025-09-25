# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
The Candidate Compare Board is a React + TypeScript based candidate comparison dashboard application built with Vite. The project is implemented based on the Figma design (https://www.figma.com/design/XIpGhQua9c5Sae8Vkl1Sfq/Candidate-Compare-Board).

## Development Commands
```bash
# Install dependencies
npm i

# Start development server (port 3000, auto-open browser)
npm run dev

# Build for production
npm run build
```

## Tech Stack and Key Dependencies
- **React 18.3.1** - Main framework
- **TypeScript** - Type system
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework (v4.1.3)
- **Radix UI** - Complete UI component library (all components are @radix-ui/*)
- **Lucide React** - Icon library
- **Sonner** - Toast notification component
- **React Hook Form** - Form handling
- **Recharts** - Chart components
- **Next Themes** - Theme management

## Core Architecture

### Main Component Structure
```
src/
├── App.tsx                    # Main app component with all state management and layout
├── main.tsx                   # React app entry point
├── components/
│   ├── ui/                    # shadcn/ui style base UI components
│   ├── ComparisonTable.tsx    # Candidate comparison table component
│   ├── CandidateCard.tsx      # Candidate detail card component
│   ├── MainSidebar.tsx        # Main navigation sidebar
│   ├── DimensionFilterSidebar.tsx # Dimension filter sidebar
│   └── mockData.ts           # Mock data definitions
└── index.css                 # Tailwind CSS entry point
```

### Core Application Features
1. **Candidate List Display** - Grid layout showing candidate cards
2. **Search Filtering** - Multi-field search by name, school, company, skills, etc.
3. **Candidate Selection** - Select up to 5 candidates for comparison
4. **Compare Mode** - Switch to view only selected candidates
5. **Comparison Table** - Side-by-side comparison of candidates across dimensions
6. **Dimension Management** - Dynamically enable/disable comparison dimensions with drag & drop sorting
7. **Row Highlighting** - Click table rows to highlight candidates with strongest performance in that dimension

### State Management
All state is managed in `App.tsx`:
- `candidates` - Candidate data (from mockData)
- `searchQuery` - Search keyword
- `activeDimensions` - Currently enabled comparison dimensions
- `selectedCandidates` - List of candidate IDs selected for comparison
- `isCompareMode` - Whether in comparison mode
- `highlightedRow` - Currently highlighted dimension row

### UI Component System
Uses shadcn/ui component library, all UI components located in `src/components/ui/` directory, including:
- Base components (Button, Input, Badge, etc.)
- Layout components (Card, Tabs, Sheet, etc.)
- Data display components (Table, Progress, Chart, etc.)
- Interactive components (Dialog, Popover, Tooltip, etc.)

### Styling System
- Uses Tailwind CSS v4.1.3
- Supports dark/light theme switching (next-themes)
- CSS variables define design system colors and sizing

## Vite Configuration Features
- Uses SWC plugin for optimized React compilation
- Configured with extensive dependency alias mapping
- Build output to `build/` directory
- Dev server defaults to port 3000 with auto-open browser

## Development Notes
- All React components use functional components and Hooks
- TypeScript strict mode, requires type declarations
- Uses `useMemo` to optimize search and filter performance
- Toast notifications use sonner library via `toast.success()` / `toast.error()` calls
- Icons consistently use lucide-react
- Responsive design using Tailwind responsive class names

## Testing and Build
No test framework configured. Build uses `npm run build` command, outputs ES module format.