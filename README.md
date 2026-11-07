# StudioSpace

**Peer-to-Peer Creative Workspace & Production Studio Sharing Platform**

Live Site: [https://studio-space-client-omega.vercel.app/](https://studio-space-client-omega.vercel.app/)  


---

## About the Project

StudioSpace is a modern peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians. Studio owners can list their creative spaces — from photography cyc walls and cinema sound stages to podcast lounges and music recording suites. Fellow creators can discover, filter, check availability, and reserve studio slots with transparent pricing and real-time booking management.

### Key Features

- Interactive hero slider with high-quality visuals and clear call-to-actions
- Dynamic featured studios section fetched from MongoDB (top-rated / newest)
- Browse studios by categories (Photo Studio, Film Stage, Podcast Lounge, Music Suite, Art Workshop)
- Full CRUD operations for studio listings (Add, View, Update, Delete)
- Secure booking system with double-booking prevention
- User authentication (Email/Password + Social Login)
- Private routes: My Listings, My Bookings, Add Studio
- Light / Dark theme toggle across the entire application
- Toast notifications for all success and error feedback
- Wishlist functionality with heart icon on studio cards
- Fully responsive design for mobile, tablet, and desktop
- Custom 404 page and branded loading skeletons

---

## Tech Stack

| Layer                          | Technology                                      |
| ------------------------------ | ----------------------------------------------- |
| Frontend                       | Next.js 14 (App Router), Tailwind CSS, JavaScript |
| UI Components                  | Custom Shadcn-style components, Lucide Icons    |
| Authentication                 | JWT + HTTPOnly Cookies                          |
| Backend                        | Express.js                                      |
| Database                       | MongoDB (Native Driver)                         |
| Notifications                  | Sonner (Toast)                                  |
| Slider                         | Swiper.js                                       |
| Theme                          | next-themes                                     |

---

## Local Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd StudioSpace-Full-Project