# TicketFlow - Vue.js Version

A modern, responsive ticket management system built with Vue.js 3, TypeScript, Pinia, and Vite. This is the Vue.js implementation of the HNG Stage 2 Multi-Framework Ticket Web App.

## 🚀 Live Demo

**[🎫 TicketFlow Vue App](https://hng-ticketflow-vue-five.vercel.app)** - Live on Vercel

## ✨ Features

### 🎨 **Premium Design**
- **Baby Blue Theme** - Modern gradient color scheme
- **Glassmorphism Effects** - Beautiful translucent elements
- **Decorative Circles** - Animated floating elements
- **Wavy Hero Background** - Custom SVG wave transitions
- **Responsive Design** - Perfect on all devices

### 🔐 **Authentication System**
- **Modal-based Login/Signup** - No page redirects
- **Form Validation** - Real-time validation with Zod
- **Session Management** - localStorage-based authentication
- **Demo Credentials** - Ready-to-test user accounts
- **Protected Routes** - Secure dashboard and ticket pages via Vue Router guards

### 📊 **Dashboard**
- **Personalized Welcome** - Shows user's first name
- **Statistics Cards** - Total, Open, In Progress, Closed tickets
- **Activity Tab** - Recent tickets with full details
- **Quick Actions** - Create ticket modal, manage tickets
- **Real-time Updates** - Stats refresh after actions

### 🎫 **Ticket Management (Full CRUD)**
- **Create Tickets** - Modal form with validation
- **View Tickets** - Card-based layout with status badges
- **Edit Tickets** - In-place editing with form validation
- **Delete Tickets** - Confirmation modal for safety
- **Status Management** - Open, In Progress, Closed
- **Priority Levels** - Low, Medium, High
- **Search & Filter** - Find tickets quickly

### 🎯 **User Experience**
- **Toast Notifications** - Success/error feedback
- **Loading States** - Smooth loading indicators
- **Empty States** - Helpful messages when no data
- **Smooth Animations** - CSS transitions and hover effects
- **Keyboard Navigation** - Full accessibility support

## 🛠️ Tech Stack

### **Frontend Framework**
- **Vue.js 3** - Latest Vue with Composition API
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server

### **State Management**
- **Pinia** - Official Vue state management
- **Vuex Alternative** - Modern, lightweight, and TypeScript-friendly
- **Reactive Stores** - Auth and Tickets stores with reactive state

### **Routing**
- **Vue Router 4** - Client-side routing
- **Navigation Guards** - Protected routes with authentication checks
- **Dynamic Routes** - Flexible routing configuration

### **Styling & UI**
- **Custom CSS** - Tailwind-inspired design system
- **CSS Variables** - Consistent design tokens
- **Responsive Grid** - Mobile-first approach
- **CSS Animations** - Smooth transitions

### **Validation & Forms**
- **Zod** - Schema validation
- **Vue 3 Composition API** - Reactive form handling
- **Real-time Validation** - Instant feedback

### **Development Tools**
- **Vue TSC** - TypeScript type checking
- **Vite** - Fast HMR and build
- **TypeScript** - Static type checking

## 📦 Installation

### Prerequisites
- **Node.js** 20.19+ or 22.12+
- **npm** or **yarn**

### Setup
```bash
# Clone the repository
git clone https://github.com/Pearl-Ekeodu/hng-ticketflow-vue.git
cd vue-version

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 Usage

### **Demo Credentials**
```
Email: demo@ticketflow.com
Password: demo123
```

### **Getting Started**
1. **Visit Landing Page** - See the beautiful hero section
2. **Click Login** - Opens modal (no page redirect)
3. **Enter Demo Credentials** - Use the credentials above
4. **Explore Dashboard** - View stats and recent activity
5. **Create Tickets** - Use the "Create New Ticket" button
6. **Manage Tickets** - Edit, update, and delete tickets

### **Key Features**
- **Modal Authentication** - Login/Signup without page changes
- **Personalized Dashboard** - Welcome message with your name
- **Activity Tracking** - See recent ticket activity
- **Responsive Design** - Works perfectly on mobile
- **Real-time Updates** - Stats update after actions

## 🎨 Design System

### **Color Palette**
```css
/* Primary Colors */
--color-blue-500: #3b82f6
--color-cyan-500: #06b6d4
--color-blue-600: #2563eb

/* Status Colors */
--color-emerald-500: #10b981  /* Open */
--color-amber-500: #f59e0b   /* In Progress */
--color-gray-500: #6b7280    /* Closed */
```

### **Typography**
- **Font Family**: Inter (Google Fonts)
- **Hero Title**: 6rem (96px)
- **Page Title**: 3rem (48px)
- **Body Text**: 1rem (16px)

### **Spacing Scale**
- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **2XL**: 48px

## 📱 Responsive Design

### **Breakpoints**
- **Desktop**: ≥ 1024px (4-column grid)
- **Tablet**: 768px - 1023px (2-column grid)
- **Mobile**: < 768px (1-column stack)

### **Mobile Features**
- **Touch-friendly buttons** - Larger tap targets
- **Stacked layouts** - Vertical organization
- **Optimized typography** - Readable font sizes
- **Swipe gestures** - Natural mobile interactions

## 🔧 Configuration

### **Environment Variables**
```bash
# No environment variables required
# All configuration is built-in
```

### **Build Configuration**
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
```

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repo to Vercel dashboard
```

### **Netlify**
```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
```

### **Other Platforms**
- **Railway** - Full-stack deployment
- **Heroku** - Container deployment
- **AWS S3** - Static hosting

## 🧪 Testing

### **Manual Testing**
1. **Authentication Flow** - Login/logout functionality
2. **Ticket CRUD** - Create, read, update, delete
3. **Responsive Design** - Test on different screen sizes
4. **Form Validation** - Try invalid inputs
5. **Navigation** - Test all routes and links

### **Browser Support**
- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 📁 Project Structure

```
vue-version/
├── public/
│   └── vite.svg
├── src/
│   ├── components/          # Reusable Vue components
│   │   ├── Button.vue
│   │   ├── Input.vue
│   │   ├── Modal.vue
│   │   ├── Navbar.vue
│   │   ├── StatusBadge.vue
│   │   ├── Card.vue
│   │   └── Textarea.vue
│   ├── stores/              # Pinia stores
│   │   ├── auth.ts          # Authentication store
│   │   └── tickets.ts       # Ticket management store
│   ├── router/              # Vue Router configuration
│   │   └── index.ts
│   ├── views/               # Page components
│   │   ├── LandingPage.vue
│   │   ├── DashboardPage.vue
│   │   └── TicketsPage.vue
│   ├── assets/              # Static assets
│   │   └── shared/
│   │       ├── design-tokens.css
│   │       └── global.css
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── App.vue              # Root component
│   └── main.ts              # App entry point
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🎯 Key Components

### **LandingPage**
- Hero section with wavy background
- Feature cards with animations
- CTA section with gradient background
- Authentication modals

### **DashboardPage**
- Personalized welcome message
- Statistics cards with icons
- Activity tab with recent tickets
- Quick action buttons

### **TicketsPage**
- Ticket grid with card layout
- Create/edit/delete modals
- Status badges and priority indicators
- Empty state handling

## 🔄 State Management (Pinia)

### **Auth Store**
```typescript
// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isInitialized: false
  }),
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token
  },
  actions: {
    login(credentials) { /* ... */ },
    signup(credentials) { /* ... */ },
    logout() { /* ... */ }
  }
})
```

### **Tickets Store**
```typescript
// stores/tickets.ts
import { defineStore } from 'pinia'

export const useTicketsStore = defineStore('tickets', {
  state: () => ({
    tickets: [],
    isInitialized: false
  }),
  getters: {
    getAllTickets: (state) => state.tickets,
    getDashboardStats: (state) => { /* ... */ }
  },
  actions: {
    createTicket(data) { /* ... */ },
    updateTicket(id, data) { /* ... */ },
    deleteTicket(id) { /* ... */ }
  }
})
```

## 🔐 Security Features

- **Protected Routes** - Authentication required via Vue Router guards
- **Session Management** - Secure token handling with localStorage
- **Input Validation** - XSS protection with Zod schemas
- **CSRF Protection** - Built-in safeguards

## ♿ Accessibility

- **Semantic HTML** - Proper element usage
- **ARIA Labels** - Screen reader support
- **Keyboard Navigation** - Full keyboard access
- **Color Contrast** - WCAG compliant
- **Focus Management** - Visible focus states

## 🎓 Vue.js Best Practices

### **Composition API**
- Uses `<script setup>` syntax for cleaner code
- Reactive references with `ref()` and `reactive()`
- Computed properties with `computed()`
- Lifecycle hooks with `onMounted()`, `onUnmounted()`

### **Component Structure**
- Single File Components (SFC) with `.vue` extension
- Template, script, and style in one file
- Scoped styles for component isolation
- Props and emits for component communication

### **Pinia Patterns**
- Store composition with `defineStore()`
- Getters for computed state
- Actions for mutations
- State initialization on app mount

## 🐛 Known Issues

- None currently reported

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the HNG Stage 2 internship program.

## 🙏 Acknowledgments

- **HNG Internship** - For the amazing learning opportunity
- **Vue.js Team** - For the excellent framework
- **Pinia Team** - For the state management solution
- **Vite Team** - For the fast build tool
- **Design Inspiration** - Modern web design trends

---

**Built with ❤️ for HNG Stage 2**

*Vue.js Version - Part of Multi-Framework Ticket Web App*

