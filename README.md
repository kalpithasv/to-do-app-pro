# To-Do App Pro

A high-end task and project management application built with Next.js, TypeScript, and Tailwind CSS. This app features a beautiful, modern UI matching the provided design with comprehensive task management capabilities.

## Features

### Core Functionality
- ✅ **Task Management**: Create, edit, and organize tasks with status tracking (To Do, In Progress, Done)
- 📁 **Project Organization**: Group tasks into projects with progress tracking
- 👥 **Team Collaboration**: Assign tasks to team members with avatar displays
- 📅 **Due Dates & Time Tracking**: Set due dates and estimated hours for tasks
- 📊 **Progress Tracking**: Visual progress indicators for tasks and projects

### Advanced Features
- 📎 **File Attachments**: Upload images and PDFs to tasks
- 📝 **Notes & Ideas**: Add notes to tasks for tracking ideas and progress
- 📄 **PDF Processing**: Upload PDFs and automatically extract summaries
- 🔍 **Search**: Search across tasks and projects
- 📜 **History**: View completed tasks organized by date
- 👤 **Profile**: View statistics and manage settings

### UI/UX
- 🎨 **Modern Design**: Clean, rounded UI with vibrant color palette
- 📱 **Mobile-First**: Responsive design optimized for mobile devices
- 🎯 **Intuitive Navigation**: Bottom navigation bar for easy access
- ✨ **Smooth Animations**: Transitions and hover effects throughout

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **PDF Processing**: pdf-parse

## 📱 Progressive Web App (PWA)

This app can be installed as a desktop app! When users visit your deployed site, they can:
- **Install on Desktop**: Click the install button or browser prompt
- **Install on Mobile**: Add to home screen from browser menu
- **Offline Support**: Works offline (data stored locally)

### Setting Up Icons

1. Place your logo in the `/public` folder
2. Generate icons using the tool at `/scripts/generate-icons.html` (open in browser)
3. Or use online tools like [RealFaviconGenerator](https://realfavicongenerator.net/)
4. Required sizes: 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512, and 180x180 (apple-touch-icon)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd to-do-app-pro
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
to-do-app-pro/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── upload/        # File upload endpoint
│   │   └── pdf/           # PDF processing endpoints
│   ├── projects/          # Project pages
│   ├── tasks/             # Task pages
│   ├── history/           # History page
│   ├── profile/           # Profile page
│   ├── search/            # Search page
│   └── page.tsx           # Home/Dashboard page
├── components/            # React components
│   ├── Navigation.tsx     # Bottom navigation
│   ├── TaskCard.tsx       # Task card component
│   ├── ProjectCard.tsx    # Project card component
│   ├── ProgressCircle.tsx # Progress indicator
│   └── ...
├── lib/                   # Utilities and store
│   ├── store.ts           # Zustand state management
│   ├── utils.ts           # Utility functions
│   ├── pdf-utils.ts       # PDF processing utilities
│   └── sample-data.ts     # Sample data initialization
├── types/                 # TypeScript type definitions
│   └── index.ts          # Type definitions
└── public/                # Static assets
```

## Color Palette

The app uses a vibrant color palette:
- **Primary Purple**: `#5f33e1`
- **Yellow**: `#ffe5a4`
- **Pink**: `#f778ba`
- **Lavender**: `#ebe4ff`

## Usage

### Creating a Task

1. Navigate to the Home page or a Project page
2. Click "New task" button
3. Fill in task details (title, description, due date, etc.)
4. Select status and assignees
5. Click "Create Task"

### Adding Attachments

1. Open a task detail page
2. Go to the "Attachments" tab
3. Click "Add Attachment"
4. Select an image or PDF file
5. For PDFs, a summary will be automatically generated and added as a note

### Adding Notes

1. Open a task detail page
2. Go to the "Notes" tab
3. Click "Add Note"
4. Write your note or idea
5. Click "Save"

### Creating a Project

1. Navigate to the Projects page
2. Click "Create Project"
3. Enter project name and description
4. Select a color
5. Click "Create Project"

## API Routes

### `/api/upload`
Upload files (images, PDFs) and get a data URL.

### `/api/pdf/extract`
Extract text from a PDF file.

### `/api/pdf/summarize`
Generate a summary from extracted PDF text.

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Future Enhancements

- [ ] Database integration (PostgreSQL, MongoDB)
- [ ] User authentication
- [ ] Real-time collaboration
- [ ] Cloud storage for files
- [ ] AI-powered task suggestions
- [ ] Calendar view
- [ ] Recurring tasks
- [ ] Task templates
- [ ] Export/Import functionality
- [ ] Dark mode

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
