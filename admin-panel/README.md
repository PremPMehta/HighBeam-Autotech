# Highbeam Autotech Admin Panel

A modern React-based admin panel for managing Highbeam Autotech website content and leads.

## 🚀 Features

- **Authentication**: Secure login with JWT tokens
- **Dashboard**: Overview of leads and statistics
- **Lead Management**: View, edit, and manage customer leads
- **Content Management**: Edit website content dynamically
- **Responsive Design**: Works on all devices
- **Real-time Updates**: Live data synchronization

## 🛠️ Technology Stack

- **Frontend**: React 18, Material-UI, React Router
- **State Management**: React Query for server state
- **Authentication**: JWT tokens with context API
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## 📦 Installation

1. **Install dependencies:**

```bash
cd admin-panel
npm install
```

2. **Start the development server:**

```bash
npm start
```

3. **Build for production:**

```bash
npm run build
```

## 🔧 Configuration

The admin panel connects to the backend API running on `http://localhost:5000` (configured in package.json proxy).

Make sure the backend server is running before starting the admin panel.

## 📱 Pages

### Login Page (`/login`)

- Secure authentication
- Email and password validation
- Automatic redirect after login

### Dashboard (`/dashboard`)

- Lead statistics overview
- Recent leads display
- Status breakdown charts
- Quick action buttons

### Leads Management (`/leads`)

- Complete lead listing with pagination
- Search and filter functionality
- Lead status and priority management
- Edit lead details and add notes
- Delete leads (admin only)

### Content Management (`/content`)

- Hero section management
- Dynamic content editing
- Active/inactive status toggle
- Rich text editing capabilities

## 🔐 Authentication

The admin panel uses JWT-based authentication:

1. **Login**: Users authenticate with email/password
2. **Token Storage**: JWT tokens stored in localStorage
3. **Auto-refresh**: Automatic token validation
4. **Protected Routes**: All admin routes require authentication

## 🎨 UI Components

- **Material-UI**: Modern, responsive components
- **Custom Layout**: Sidebar navigation with user profile
- **Data Tables**: Sortable, filterable lead tables
- **Dialogs**: Modal forms for editing content
- **Loading States**: Spinner components for better UX

## 📊 Data Management

- **React Query**: Server state management and caching
- **Optimistic Updates**: Immediate UI updates
- **Error Handling**: Comprehensive error boundaries
- **Loading States**: User-friendly loading indicators

## 🚀 Deployment

1. **Build the application:**

```bash
npm run build
```

2. **Deploy the `build` folder** to your hosting service:
   - Netlify
   - Vercel
   - AWS S3
   - Any static hosting service

## 🔧 Development

### Available Scripts

- `npm start`: Start development server
- `npm run build`: Build for production
- `npm test`: Run tests
- `npm run eject`: Eject from Create React App

### Project Structure

```
src/
├── components/          # Reusable components
├── contexts/           # React contexts (Auth)
├── pages/              # Page components
├── services/           # API services
└── utils/              # Utility functions
```

## 📞 Support

For technical support or questions, contact the development team.

## 🔄 Updates

The admin panel automatically syncs with the backend API for real-time data updates.
