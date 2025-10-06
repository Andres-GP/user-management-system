const db = require("./server/db");
const isProd = process.env.NODE_ENV === "production";

const users = [
  {
    first_name: "Alice",
    last_name: "Johnson",
    email: "alice.johnson@example.com",
    phone: "555-1001",
    comments: "Loves coding and coffee.",
  },
  {
    first_name: "Bob",
    last_name: "Smith",
    email: "bob.smith@example.com",
    phone: "555-1002",
    comments: "Enjoys hiking and photography.",
  },
  {
    first_name: "Charlie",
    last_name: "Brown",
    email: "charlie.brown@example.com",
    phone: "555-1003",
    comments: "Fan of jazz music and chess.",
  },
  {
    first_name: "Diana",
    last_name: "Evans",
    email: "diana.evans@example.com",
    phone: "555-1004",
    comments: "Writer and avid traveler.",
  },
  {
    first_name: "Ethan",
    last_name: "White",
    email: "ethan.white@example.com",
    phone: "555-1005",
    comments: "Enjoys AI and robotics projects.",
  },
  {
    first_name: "Fiona",
    last_name: "Clark",
    email: "fiona.clark@example.com",
    phone: "555-1006",
    comments: "Coffee enthusiast and painter.",
  },
  {
    first_name: "George",
    last_name: "Lee",
    email: "george.lee@example.com",
    phone: "555-1007",
    comments: "Runner and chess player.",
  },
  {
    first_name: "Hannah",
    last_name: "King",
    email: "hannah.king@example.com",
    phone: "555-1008",
    comments: "Loves reading and baking.",
  },
  {
    first_name: "Ian",
    last_name: "Wright",
    email: "ian.wright@example.com",
    phone: "555-1009",
    comments: "Music producer and gamer.",
  },
  {
    first_name: "Jane",
    last_name: "Scott",
    email: "jane.scott@example.com",
    phone: "555-1010",
    comments: "Enjoys painting and yoga.",
  },
  {
    first_name: "Kevin",
    last_name: "Adams",
    email: "kevin.adams@example.com",
    phone: "555-1011",
    comments: "Tech blogger and cyclist.",
  },
  {
    first_name: "Laura",
    last_name: "Hall",
    email: "laura.hall@example.com",
    phone: "555-1012",
    comments: "Gardening enthusiast and chef.",
  },
  {
    first_name: "Mike",
    last_name: "Allen",
    email: "mike.allen@example.com",
    phone: "555-1013",
    comments: "Loves football and coding.",
  },
  {
    first_name: "Nina",
    last_name: "Young",
    email: "nina.young@example.com",
    phone: "555-1014",
    comments: "Travel blogger and photographer.",
  },
  {
    first_name: "Oscar",
    last_name: "Harris",
    email: "oscar.harris@example.com",
    phone: "555-1015",
    comments: "Runner and tech fan.",
  },
  {
    first_name: "Paula",
    last_name: "Martin",
    email: "paula.martin@example.com",
    phone: "555-1016",
    comments: "Yoga teacher and writer.",
  },
  {
    first_name: "Quentin",
    last_name: "Thompson",
    email: "quentin.thompson@example.com",
    phone: "555-1017",
    comments: "Gamer and software developer.",
  },
  {
    first_name: "Rachel",
    last_name: "Walker",
    email: "rachel.walker@example.com",
    phone: "555-1018",
    comments: "Photographer and blogger.",
  },
  {
    first_name: "Steve",
    last_name: "Roberts",
    email: "steve.roberts@example.com",
    phone: "555-1019",
    comments: "Chef and coffee lover.",
  },
  {
    first_name: "Tina",
    last_name: "Campbell",
    email: "tina.campbell@example.com",
    phone: "555-1020",
    comments: "Loves painting and running.",
  },
  {
    first_name: "Ulysses",
    last_name: "Perez",
    email: "ulysses.perez@example.com",
    phone: "555-1021",
    comments: "Writer and music fan.",
  },
  {
    first_name: "Victoria",
    last_name: "Cook",
    email: "victoria.cook@example.com",
    phone: "555-1022",
    comments: "Yoga lover and traveler.",
  },
  {
    first_name: "William",
    last_name: "Morgan",
    email: "william.morgan@example.com",
    phone: "555-1023",
    comments: "Tech enthusiast and gamer.",
  },
  {
    first_name: "Xena",
    last_name: "Bell",
    email: "xena.bell@example.com",
    phone: "555-1024",
    comments: "Photographer and painter.",
  },
  {
    first_name: "Yasmine",
    last_name: "Murphy",
    email: "yasmine.murphy@example.com",
    phone: "555-1025",
    comments: "Loves books and coffee.",
  },
  {
    first_name: "Zach",
    last_name: "Cooper",
    email: "zach.cooper@example.com",
    phone: "555-1026",
    comments: "Gamer and cyclist.",
  },
  {
    first_name: "Amber",
    last_name: "Reed",
    email: "amber.reed@example.com",
    phone: "555-1027",
    comments: "Yoga teacher and blogger.",
  },
  {
    first_name: "Brian",
    last_name: "Ward",
    email: "brian.ward@example.com",
    phone: "555-1028",
    comments: "Runner and photographer.",
  },
  {
    first_name: "Cynthia",
    last_name: "Gray",
    email: "cynthia.gray@example.com",
    phone: "555-1029",
    comments: "Writer and coffee lover.",
  },
  {
    first_name: "Daniel",
    last_name: "James",
    email: "daniel.james@example.com",
    phone: "555-1030",
    comments: "Tech fan and cyclist.",
  },
];

async function seed() {
  try {
    for (const user of users) {
      const query = isProd
        ? "INSERT INTO user (first_name, last_name, email, phone, comments) VALUES (?, ?, ?, ?, ?)"
        : "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?";

      const params = [
        user.first_name,
        user.last_name,
        user.email,
        user.phone,
        user.comments,
      ];

      if (isProd) {
        await db.runAsync(query, params);
      } else {
        await db.query(query, params);
      }
    }
    console.log("30 users seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding users:", err);
    process.exit(1);
  }
}

seed();
