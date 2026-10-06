# EstateHub – Real Estate Property Finder (CIE-2 Mini Project)

React.js (Vite) frontend + Express.js backend. No database: properties are an in-memory array.

## How to run (two terminals)

Terminal 1 – backend (http://localhost:5000)
    cd backend
    npm install
    npm start

Terminal 2 – frontend (http://localhost:5173)
    cd frontend
    npm install
    npm run dev

Open http://localhost:5173 in the browser. Start the backend FIRST.
Needs Node.js 18 or newer.

## Packages
Backend : express, cors
Frontend: react, react-dom, react-router-dom, vite, @vitejs/plugin-react

## Folder structure
EstateHub/
├── backend/
│   ├── server.js                 starts Express, CORS, JSON, mounts routes
│   ├── routes/propertyRoutes.js  GET /api/properties, GET /api/properties/:id
│   ├── routes/enquiryRoutes.js   POST /api/enquiries (+ GET for demo)
│   └── data/properties.js        8 sample properties
└── frontend/
    ├── index.html, vite.config.js, package.json
    └── src/
        ├── main.jsx              BrowserRouter + renders App
        ├── App.jsx               routes + favorites state
        ├── index.css             all styles (media queries at the bottom)
        ├── components/  Navbar, Hero, SearchBar, FilterBar, PropertyCard, ContactForm, Footer
        └── pages/       Home, Properties, PropertyDetails, About (class), Contact, Favorites

## Property images
Images are loaded from Unsplash URLs (needs internet). To use your own photos,
put them in frontend/public/images/ and change the `image` field in
backend/data/properties.js to "/images/yourfile.jpg".

## Student Modifications
1. Buy / Rent / All filter   -> FilterBar.jsx + Properties.jsx (matchPurpose)
2. Price range filter        -> FilterBar.jsx + Properties.jsx (priceMatches)
(Location, type and keyword filters are extra.)
Rent properties store the monthly rent as price, so they fall under "Under ₹50 Lakhs".

## Quick test of the API (backend running)
    http://localhost:5000/api/properties
    http://localhost:5000/api/properties/2
    http://localhost:5000/api/enquiries      (shows saved enquiries)
