/**
 * Controller: Travlr Getaways (Public Website)
 * MVC: routes -> controllers -> views
 */

const home = (req, res) => {
  res.render("index", {
    title: "Travlr Getaways",
    page: "home",
    hero: {
      heading: "Book your next getaway",
      subheading:
        "Search by location and price, then reserve your travel package in minutes.",
      ctaText: "Browse Packages",
      ctaLink: "/travel",
    },
    highlights: [
      {
        title: "Curated Packages",
        description: "Hand-picked destinations and bundles for every budget.",
      },
      {
        title: "Flexible Booking",
        description: "Easy reservations with clear itinerary details.",
      },
      {
        title: "Trip Itineraries",
        description:
          "Return anytime to review your itinerary before departure.",
      },
    ],
  });
};

const travel = (req, res) => {
  res.render("travel", {
    title: "Travel Packages",
    page: "travel",
    filters: {
      locations: ["Hawaii", "Florida", "New York", "California", "Colorado"],
      pricePoints: ["$", "$$", "$$$"],
    },
    packages: [
      {
        name: "Hawaii Escape",
        location: "Hawaii",
        pricePoint: "$$$",
        price: 1899,
        nights: 6,
        includes: ["Hotel", "Breakfast", "Airport Transfer"],
      },
      {
        name: "Florida Beach Week",
        location: "Florida",
        pricePoint: "$$",
        price: 999,
        nights: 5,
        includes: ["Resort", "Pool Access", "Welcome Dinner"],
      },
      {
        name: "NYC City Lights",
        location: "New York",
        pricePoint: "$$",
        price: 1299,
        nights: 4,
        includes: ["Hotel", "Broadway Credit", "Metro Pass"],
      },
    ],
  });
};

const about = (req, res) => {
  res.render("about", {
    title: "About Travlr Getaways",
    page: "about",
    mission:
      "Travlr Getaways helps customers find and book travel packages by location and price point, and review itineraries before their trip.",
    values: [
      "Customer-first planning",
      "Transparent pricing",
      "Reliable itineraries",
    ],
  });
};

const contact = (req, res) => {
  res.render("contact", {
    title: "Contact Us",
    page: "contact",
    contact: {
      phone: "(555) 555-5555",
      email: "support@travlrgetaways.com",
      hours: "Mon–Fri 9:00am–5:00pm",
    },
  });
};

module.exports = {
  home,
  travel,
  about,
  contact,
};
