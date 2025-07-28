# AI Study Flashcards

**🌐 Live Demo:** [Try the App](https://ai-study-flashcards.vercel.app/)

An intelligent flashcard generator designed to help students and professionals study industrial instrumentation and control systems. The app uses AI to create personalized multiple-choice questions based on selected topics and difficulty levels.

## 🎯 Features

- **AI-Powered Generation**: Creates unique flashcards using OpenAI's GPT-4 model
- **Topic Selection**: Choose from 9 specialized industrial instrumentation topics:
  - Fundamentals (units, process variables, safety, drawings, loop diagrams)
  - Pressure & Level
  - Flow Measurement
  - Temperature Measurement
  - Analytical (pH, conductivity, gas analyzers)
  - Control Systems (control strategies, feedback/feedforward)
  - Final Control Elements (valves, actuators, I/P converters)
  - Calibration & Maintenance (standards, procedures, error checking)
  - Safety Systems (alarms, interlocks, SIL)

- **Difficulty Levels**: Three difficulty options (Easy, Medium, Hard)
- **Interactive Learning**: Multiple-choice format with immediate feedback
- **Modern UI**: Clean, responsive interface built with Material-UI
- **Real-time Generation**: Generate new flashcards on-demand

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Framework**: Material-UI (MUI) v7
- **AI Integration**: OpenAI GPT-4 with structured output parsing
- **Styling**: Emotion (CSS-in-JS)
- **Validation**: Zod schema validation
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### For Users

Simply visit the deployed app and start generating flashcards! No setup required.

### For Developers

If you want to run this locally or contribute:

**Prerequisites:**
- Node.js 18+ 
- OpenAI API key

**Quick Setup:**
```bash
git clone <your-repo-url>
cd ai-study-flashcards
npm install
```

Create a `.env.local` file:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

Run locally:
```bash
npm run dev
```

## 🌐 Deployment

This app is deployed on Vercel and ready to use! The deployment is fully automated and optimized for performance.

## 📁 Project Structure

```
ai-study-flashcards/
├── app/
│   ├── api/generate/[topic]/[difficulty]/
│   │   └── route.ts          # AI flashcard generation API
│   ├── lib/
│   │   └── types.ts          # TypeScript interfaces
│   ├── page.tsx              # Main application component
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── public/                   # Static assets
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 🔧 Configuration

### OpenAI API Setup

The app uses OpenAI's GPT-4 model with structured output parsing. Make sure your OpenAI API key has access to the required models.

### Customization

You can easily customize:
- **Topics**: Modify the `topics` array in `app/page.tsx`
- **Difficulty levels**: Update the `difficulties` array
- **UI styling**: Customize Material-UI theme in `app/providers.tsx`
- **AI prompts**: Modify the prompt in the API route

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Material-UI](https://mui.com/)
- AI powered by [OpenAI](https://openai.com/)
- Deployed on [Vercel](https://vercel.com/)

---

**Note**: This app requires an active OpenAI API key to function. Make sure to set up your API key before deployment. 