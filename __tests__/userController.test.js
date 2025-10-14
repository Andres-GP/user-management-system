const userController = require("../server/controllers/userController");
const db = require("../server/db");

jest.mock("../server/db");

describe("User Controller", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      params: {},
      body: {},
      query: {},
    };
    res = {
      render: jest.fn(),
      redirect: jest.fn(),
    };
  });

  // ---------- view ----------
  test("view() should render home with users", async () => {
    const mockRows = [{ id: 1, first_name: "John" }];
    db.query.mockResolvedValueOnce([mockRows]);
    await userController.view(req, res);
    expect(db.query).toHaveBeenCalledWith("SELECT * FROM user");
    expect(res.render).toHaveBeenCalledWith("home", {
      rows: mockRows,
      removedUser: undefined,
      alert: undefined,
    });
  });

  test("view() should handle DB error", async () => {
    db.query.mockRejectedValueOnce(new Error("DB error"));
    await userController.view(req, res);
    expect(console.error).toBeDefined();
  });

  // ---------- find ----------
  test("find() should render users based on search term", async () => {
    req.body.search = "John";
    const mockRows = [{ id: 1, first_name: "John" }];
    db.query.mockResolvedValueOnce([mockRows]);
    await userController.find(req, res);
    expect(db.query).toHaveBeenCalled();
    expect(res.render).toHaveBeenCalledWith("home", { rows: mockRows });
  });
});
