# BloodBridge Client

Frontend React application for **BloodBridge** — a blood donation platform connecting donors with urgent recipients across Bangladesh.

Built with **React 18**, **Vite**, and **React Router**.

---

## Features

- Public donor search by blood group, district, and upazila
- Browse open donation requests without an account
- Register as a donor with blood group and location info
- JWT-based login with role-aware navigation (admin, volunteer, donor)
- Dashboard with stats, profile management, and request tracking
- Create, edit, and track donation requests with status updates
- Community funding via Stripe payment integration
- Animated hero section, stats counter, and step-by-step guide
- Responsive design with smooth scroll navigation
- Avatar auto-generated via DiceBear API

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Animations | Framer Motion |
| Payments | Stripe (React Stripe.js) |
| Icons | Lucide React |
| Charts | Recharts |
| Toasts | React Hot Toast |
| Counter | React CountUp |

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

## Getting Started

### Prerequisites

- Node.js 18+
- BloodBridge backend server running (see [bloodbridge-server](https://github.com/your-username/bloodbridge-server))

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/bloodbridge-client.git
cd bloodbridge-client

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Fill in your values (see Environment Variables below)

# Start development server
npm run dev
```

App runs at `http://localhost:5173`

---

## Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for payment UI |
| `VITE_IMGBB_API_KEY` | ImgBB API key for avatar/image uploads |

---

## Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build locally
```

---

## User Roles

| Role | What they can do |
|------|-----------------|
| `donor` | Register, create/manage own requests, fund, edit profile |
| `volunteer` | View and manage all donation requests |
| `admin` | Full access — manage users, roles, all requests |

---

## Deployment (Vercel)

1. Push code to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel → Settings → Environment Variables:
   ```
   VITE_API_URL = https://your-backend.onrender.com/api
   VITE_STRIPE_PUBLISHABLE_KEY = pk_test_...
   VITE_IMGBB_API_KEY = ...
   ```
4. Add a `vercel.json` in the root for client-side routing:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```
5. Deploy — Vercel auto-builds on every push to `main`


---

## Author

Tasfia Islam Raisha
