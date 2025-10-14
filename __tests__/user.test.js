const request = require("supertest");
const app = require("../app");

// Mock database layer
jest.mock("../server/db", () => ({
  query: jest.fn(),
  run: jest.fn(),
  get: jest.fn(),
  all: jest.fn(),
}));

const db = require("../server/db");

describe("User Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET / should render home with user list", async () => {
    db.query.mockResolvedValue([[{ id: 1, first_name: "John" }]]);

    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

  test("POST / should search users", async () => {
    db.query.mockResolvedValue([[{ id: 1, first_name: "Jane" }]]);
    const res = await request(app).post("/").send({ search: "Jane" });
    expect(res.statusCode).toBe(200);
  });

  test("GET /adduser should render add-user page", async () => {
    const res = await request(app).get("/adduser");
    expect(res.statusCode).toBe(200);
  });

  test("POST /adduser should validate missing fields", async () => {
    const res = await request(app).post("/adduser").send({});
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Please fill in all required fields");
  });

  test("POST /adduser should create user and redirect", async () => {
    db.query.mockResolvedValue([{}]);
    const res = await request(app).post("/adduser").send({
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      phone: "123",
      comments: "Test",
    });

    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toContain("/?alert=");
  });

  test("GET /edituser/:id should render edit page", async () => {
    db.query.mockResolvedValue([[{ id: 1, first_name: "John" }]]);
    const res = await request(app).get("/edituser/1");
    expect([200, 302]).toContain(res.statusCode);
  });

  test("POST /edituser/:id should update user and redirect", async () => {
    db.query.mockResolvedValue([{}]);
    const res = await request(app).post("/edituser/1").send({
      first_name: "Updated",
      last_name: "Doe",
      email: "john@example.com",
      phone: "123",
      comments: "Updated",
    });
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toContain("/?alert=");
  });

  test("GET /delete/:id should redirect after deleting", async () => {
    db.query.mockResolvedValue([{}]);
    const res = await request(app).get("/delete/1");
    expect(res.statusCode).toBe(302);
    expect(res.headers.location).toContain("/?alert=");
  });

  test("GET /viewuser/:id should render user details", async () => {
    db.query.mockResolvedValue([[{ id: 1, first_name: "John" }]]);
    const res = await request(app).get("/viewuser/1");
    expect([200, 302]).toContain(res.statusCode);
  });
});
