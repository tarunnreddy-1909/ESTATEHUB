# EstateHub – Presentation 

## 1. Project explanation
EstateHub is a real estate property finder. Users can browse properties, filter them by
location, type, Buy/Rent and price, view details, save favorites and send an enquiry.
React shows the pages; Express supplies the data and receives enquiries.

## 2. Architecture
Browser (React, port 5173)  --fetch (JSON)-->  Express server (port 5000)  --> properties array (in memory)
- React Router changes pages without reloading the browser.
- App.jsx holds the favorites state and passes it down to pages.
- Pages fetch data from the API using useEffect + fetch.
- CORS is enabled in Express so the two ports can talk.

## 3. Pages
- Home: Hero with search, 3 featured properties (fetched from API).
- Properties: fetches all properties, filter bar, grid of cards.
- Property Details: route /property/:id, fetches one property, shows the enquiry form.
- About: class component with stats, services and a Mission toggle.
- Contact: office info and the enquiry form.
- Favorites: shows the properties the user hearted.

## 4. Components
- Navbar: links (NavLink), favorite count, mobile menu toggle (useState).
- Hero: heading + owns the search state, navigates to /properties.
- SearchBar: location input, Buy/Rent dropdown, Search button (props only).
- FilterBar: all filter inputs (props only).
- PropertyCard: one property card with View Details and heart button.
- ContactForm: controlled form with validation and POST to Express.
- Footer: links and copyright.

## 5. Where props are used
- Properties.jsx / Home.jsx / Favorites.jsx -> PropertyCard: id, name, price, location,
  bedrooms, bathrooms, area, image, isFavorite, onToggleFavorite.
- Hero -> SearchBar: location, purpose and the change/search functions.
- Properties -> FilterBar: filters, onFilterChange, onReset.
- Contact / PropertyDetails -> ContactForm: properties, defaultProperty.
- App -> Navbar: favoriteCount.  App -> pages: favorites, onToggleFavorite.

## 6. Parent–child communication
- Parent to child: Properties sends each property to PropertyCard as props.
- Child to parent: PropertyCard calls onToggleFavorite(id) (function prop) and the parent App
  updates the favorites state. FilterBar calls onFilterChange and the parent Properties updates filters.
- Hero owns the state and SearchBar only displays it and calls the functions given.

## 7. Where useState is used
- App.jsx: favorites
- Navbar.jsx: menuOpen
- Hero.jsx: location, purpose
- Properties.jsx: properties, loading, error, filters
- Home / Favorites / Contact: properties list
- PropertyDetails.jsx: property, error
- ContactForm.jsx: formData, errors, successMessage, serverError
- About.jsx (class): this.state with this.setState

## 8. Where useEffect is used
Always to fetch from Express when a page loads:
- Home.jsx (featured), Properties.jsx (all), Favorites.jsx (all), Contact.jsx (dropdown list)
- PropertyDetails.jsx: fetch one property; the [id] dependency refetches when the id changes.
(The class component uses componentDidMount instead.)

## 9. Event handling
- onClick: heart button, Search button, Reset, Sign In, menu button, Read Our Mission.
- onChange: filter inputs, search inputs, every form field.
- onSubmit: ContactForm (handleSubmit with e.preventDefault()).

## 10. Form handling
ContactForm: controlled inputs (value + onChange) tied to formData state, validate() checks
name, email format, 10-digit phone, property selected, message length. If valid it POSTs to
/api/enquiries and shows a success message; otherwise it shows error messages.

## 11. React Router
- main.jsx wraps the app in BrowserRouter.
- App.jsx has Routes: / , /properties , /property/:id , /about , /contact , /favorites.
- Navbar uses NavLink, cards use Link, Hero uses useNavigate, details page uses useParams,
  Properties uses useSearchParams to read the Home search.

## 12. Class component
pages/About.jsx: `class About extends React.Component` with constructor, this.state,
componentDidMount, toggleMore (this.setState) and render().

## 13. How React talks to Express
React calls fetch("http://localhost:5000/api/...") and gets JSON back. For enquiries it sends a
POST with JSON body and the header Content-Type: application/json. Express reads it with
express.json() and cors() allows the request from another port.

## 14. APIs
- GET /api/properties        -> array of all 8 properties (200)
- GET /api/properties/:id    -> one property (200) or {message} with 404 if not found
- POST /api/enquiries        -> body {name,email,phone,property,purpose,message};
                                201 on success, 400 if any field is missing
- GET /api/enquiries         -> (demo) list of saved enquiries

## 15. The two modifications
1. Buy/Rent/All filter (purpose dropdown).
2. Price range filter (Under ₹50 Lakhs, ₹50L–₹1Cr, ₹1Cr–₹2Cr, Above ₹2Cr).
Both are marked "Student Modification" in FilterBar.jsx and Properties.jsx.
Extra: location + type + keyword filters, favorites, enquiry validation.

## 16. Possible viva questions
Q: What is a component? A: A reusable function/class that returns UI (JSX).
Q: Functional vs class component? A: Functional uses hooks (useState); class uses this.state,
   this.setState and lifecycle methods. About.jsx is the class one.
Q: What are props? A: Read-only inputs passed from parent to child, e.g. name={property.name}.
Q: Props vs state? A: Props come from the parent and can't be changed by the child; state is owned
   by the component and changed with its setter.
Q: How does a child send data to its parent? A: The parent passes a function as a prop and the
   child calls it (onToggleFavorite, onFilterChange).
Q: Why is favorites state in App.jsx? A: Navbar, Properties, Home and Favorites all need it, so it is
   kept in their common parent ("lifting state up").
Q: What does useEffect do and why [] ? A: Runs code after render (here fetch). An empty array means once, on load.
Q: Why e.preventDefault()? A: To stop the browser from reloading the page when the form submits.
Q: What is a controlled input? A: An input whose value comes from state and is updated in onChange.
Q: Why use key in map()? A: Helps React track each list item (we use the property id).
Q: What is :id in the route? A: A URL parameter read with useParams().
Q: Why Link/NavLink instead of <a>? A: They change the page without a full reload.
Q: What is CORS? A: A browser rule that blocks calls between different origins; cors() allows it.
Q: Why express.json()? A: Lets Express read the JSON body of POST requests.
Q: What is REST? A: Using URLs and HTTP methods (GET, POST) to work with data.
Q: Is data saved permanently? A: No, it's in memory; a real project would use MongoDB/MySQL.
Q: How is it responsive? A: Flexbox, CSS Grid (auto-fill columns) and media queries at 900px and 700px.

## Presentation script (about 2 minutes)
"Good morning. My project is EstateHub, a real estate property finder built with React and Express.
On the Home page the user sees a hero section with a search bar and featured properties.
The Properties page loads all properties from my Express API using useEffect and fetch, and shows them as
PropertyCard components. The parent page passes data to each card using props. The user can filter by
location, type, Buy or Rent, and price range. The Buy/Rent filter and the price filter are my two student modifications.
Clicking the heart saves a property; the favorites list is stored with useState in App.jsx and shown on the Favorites page.
View Details opens /property/:id using React Router, where the data for one property is fetched from /api/properties/:id,
and the user can send an enquiry. The enquiry form is a controlled form with validation and sends a POST request
to /api/enquiries. The About page is written as a class component. On the backend, Express has two route files,
properties and enquiries, with CORS enabled and an in-memory array for data. The layout is responsive using
Flexbox, Grid and media queries. Thank you."
