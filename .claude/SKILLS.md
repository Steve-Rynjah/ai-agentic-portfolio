# SKILLS.md

## nextjs_app_router
- Build applications using Next.js App Router
- Use Server Components by default
- Implement layouts, nested routes, and loading states

---

## component_architecture
- Design small, reusable, and composable components
- Maintain separation of concerns (UI / logic / data)
- Organize code into: app/, components/, lib/, data/
- Structure components to support animations and interactive states cleanly

---

## tailwind_rich_ui
- Build modern, responsive, and visually engaging UI using Tailwind CSS
- Use Motion (Framer Motion) for animations and transitions
- Implement smooth, purposeful animations (hover, transitions, micro-interactions)
- Maintain visual hierarchy using spacing, typography, and subtle motion
- Ensure animations are performance-friendly and not excessive

---

## project_standards

### Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS

### API Patterns
- Use Route Handlers for backend logic
- Use async/await with proper error handling
- Keep API logic isolated in `/app/api`

### Environment Management
- Store secrets in `.env`
- Access via process.env
- Never expose API keys on client side

### Design System
- Background: White (#FFFFFF)
- Text: Black (#000000)
- Borders: Light Grey (#E5E5E5)
- Style: Minimal, clean, sharp edges
- Avoid unnecessary animations

---

## data_management_static
- Use local JSON files as mock database
- Store inside `/data`
- Keep schema structured for future DB/CMS migration

---

## openrouter_integration
- Integrate OpenRouter API using API routes
- Pass messages in structured format
- Handle errors and fallback responses
- Keep API key secure on server side

---

## ai_chat_interface
- Build chat UI with:
  - Message list
  - Input box
  - Loading state
- Maintain conversation state locally
- Ensure smooth UX (no flicker, clear responses)

---

## jira_mcp_execution
- Read and interpret tasks from Jira MCP server
- Break tasks into executable steps
- Follow PLAN.md strictly during execution

---

## seo_basics
- Add metadata (title, description)
- Use semantic HTML
- Prepare for future SEO scaling