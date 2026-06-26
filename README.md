# BloodBridge Client

BloodBridge Client is the frontend application for a blood donation management platform. It enables users to search for blood donors, browse donation requests, register as donors, manage donation requests, contribute through community funding, and access role-based dashboards for donors, volunteers, and administrators.

## Purpose

The client provides a responsive React application for users to:

- Search blood donors by blood group and location
- Register and log in securely
- Create and manage blood donation requests
- Track donation request status
- Contribute through the community funding system
- Access role-based dashboards for different users

---
## 🔗 Live URL

- **Frontend:** [https://bloodbridge-client.vercel.app](https://bloodbridge-client.vercel.app/)

---

## Features
- Modern responsive blood donation platform
- Hero banner with call-to-action
- Public donor search by blood group, district, and upazila
- Public donation requests page
- Donation request details page
- User registration with profile image upload
- Secure JWT-based authentication
- Role-based dashboard (Admin, Volunteer, Donor)
- Profile management
- Create, edit, and manage blood donation requests
- View and manage all donation requests (Admin & Volunteer)
- User management dashboard (Admin)
- Community funding with Stripe integration
- Dashboard statistics
- Animated counters and smooth scrolling
- Toast notifications
- Mobile, tablet, and desktop responsive layout
- Auto-generated avatar using DiceBear
- Image upload using ImgBB

---

## Technologies Used
- React
- Vite
- React Router DOM
- Axios
- Framer Motion
- Stripe React SDK
- Lucide React
- Recharts
- React Hot Toast
- React CountUp

## NPM Packages Used
- react
- react-dom
- react-router-dom
- axios
- framer-motion
- @stripe/react-stripe-js
- @stripe/stripe-js
- react-hot-toast
- react-countup
- recharts
- lucide-react
- react-icons
- animate.css
- vite

---

## Project Structure

```
src/
├── App.jsx                  # Root component with all routes
├── main.jsx                 # Entry point
├── styles.css               # Global styles and CSS variables
├── components/
│   ├── Navbar.jsx           # Sticky navbar with role-aware links
│   ├── Footer.jsx           # Footer with quick links and social icons
│   ├── ProtectedRoute.jsx   # Auth + role guard for private routes
│   ├── RequestTable.jsx     # Reusable donation request table
│   └── LocationFields.jsx   # District/upazila selector component
├── contexts/
│   └── AuthContext.jsx      # Global auth state (login, logout, user)
├── data/
│   └── locations.js         # Bangladesh districts and upazilas
├── services/
│   └── api.js               # Axios instance with JWT interceptor
└── pages/
    ├── Home.jsx             # Landing page (hero, stats, how it works, contact)
    ├── Login.jsx            # Login form
    ├── Register.jsx         # Donor registration form
    ├── Search.jsx           # Public donor search
    ├── PublicRequests.jsx   # Public donation requests list
    ├── RequestDetails.jsx   # Single request detail (protected)
    ├── Funding.jsx          # Funding page with Stripe (protected)
    ├── NotFound.jsx         # 404 page
    └── dashboard/
        ├── DashboardLayout.jsx   # Sidebar layout for dashboard
        ├── DashboardHome.jsx     # Stats overview
        ├── Profile.jsx           # Edit profile
        ├── MyRequests.jsx        # Donor's own requests / all requests (admin/volunteer)
        ├── RequestForm.jsx       # Create or edit donation request
        └── AllUsers.jsx          # User management (admin only)
```

---

## Pages & Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Home page with hero, stats, how it works, contact |
| `/login` | Public | Login form |
| `/register` | Public | Donor registration |
| `/search` | Public | Search donors by blood group and location |
| `/donation-requests` | Public | Browse all pending donation requests |
| `/requests/:id` | Protected | View single donation request details |
| `/funding` | Protected | Community funding with Stripe |
| `/dashboard` | Protected | Dashboard home with stats |
| `/dashboard/profile` | Protected | Edit profile |
| `/dashboard/my-donation-requests` | Donor | Manage own requests |
| `/dashboard/create-donation-request` | Donor | Create new request |
| `/dashboard/all-users` | Admin | Manage all users |
| `/dashboard/all-blood-donation-request` | Admin/Volunteer | Manage all requests |

---

### Local Installation
1. Clone the client repository.

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add the required environment variables.

4. Run the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

App runs at `http://localhost:5173`

---

## Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
```

---

## User Roles

| Role | What they can do |
|------|-----------------|
| `donor` | Register, create/manage own requests, fund, edit profile |
| `volunteer` | View and manage all donation requests |
| `admin` | Full access — manage users, roles, all requests |

---

## Author

Tasfia Islam Raisha