# AssetSentry - Smart Maintenance Management System

## Overview

AssetSentry is a comprehensive asset and maintenance management application designed to help organizations monitor, track, and maintain their physical assets. The system provides real-time dashboards, maintenance scheduling, alert management, and analytics to optimize asset performance and reduce operational costs.

The application follows a modern full-stack architecture with a React frontend and Express backend, using PostgreSQL for data persistence and Drizzle ORM for database management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Custom component library built on Radix UI primitives with shadcn/ui styling
- **Styling**: Tailwind CSS with CSS variables for theming and a neutral color scheme
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod schema validation
- **Charts**: Recharts for data visualization and performance metrics

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API endpoints with standardized error handling
- **Validation**: Zod schemas shared between frontend and backend for type safety
- **Middleware**: Custom logging middleware for API request tracking
- **Development**: Hot reload with Vite integration for seamless development experience

### Data Layer
- **Database**: PostgreSQL with support for UUID primary keys and JSONB for flexible data storage
- **ORM**: Drizzle ORM with TypeScript-first approach and automatic migration generation
- **Schema Design**: 
  - Users table for authentication and role management
  - Assets table with comprehensive asset information and specifications
  - Maintenance tasks with scheduling, priority, and assignment tracking
  - Alerts system with severity levels and status management
  - Performance metrics for asset monitoring
- **Connection**: Neon serverless PostgreSQL for cloud deployment

### Key Features
- **Dashboard**: Real-time metrics, performance charts, and quick actions
- **Asset Management**: Complete CRUD operations with filtering, sorting, and detailed views
- **Maintenance Scheduling**: Task management with priority levels and assignment
- **Alert System**: Multi-level alerts with automatic notifications
- **Analytics**: Performance tracking and maintenance efficiency metrics
- **Team Management**: User roles and task assignments
- **Calendar Integration**: Maintenance scheduling and timeline views

### Design Patterns
- **Component Composition**: Reusable UI components with consistent styling
- **Custom Hooks**: Encapsulated data fetching and state management logic
- **Type Safety**: End-to-end TypeScript with shared schemas
- **Error Boundaries**: Graceful error handling with user feedback
- **Responsive Design**: Mobile-first approach with adaptive layouts

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: TypeScript ORM for database operations with PostgreSQL dialect
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing library for React

### UI and Styling
- **@radix-ui/***: Comprehensive collection of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant-based styling
- **lucide-react**: Icon library for consistent iconography

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Replit-specific development tools

### Forms and Validation
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Integration layer for validation libraries
- **zod**: TypeScript-first schema validation

### Data Visualization
- **recharts**: Chart library built on D3 for performance metrics and analytics
- **date-fns**: Date manipulation and formatting utilities

### Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions