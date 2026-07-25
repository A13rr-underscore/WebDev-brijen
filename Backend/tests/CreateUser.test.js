jest.mock("../model/userModel", () => ({
    findUserByEmail: jest.fn(),
    findUserByUsername: jest.fn(),
    createUser: jest.fn(),
}));

jest.mock("bcrypt");

const request = require("supertest");
const app = require("../server");

const User = require("../model/userModel");
const bcrypt = require("bcrypt");

describe("POST /api/users/register", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should register a new user", async () => {

        User.findUserByEmail.mockResolvedValue(null);
        User.findUserByUsername.mockResolvedValue(null);

        bcrypt.hash.mockResolvedValue("hashedPassword");

        User.createUser.mockResolvedValue({
            user_id: 1,
            full_name: "ABC",
            username: "abc",
            email: "abc@gmail.com"
        });

        const res = await request(app)
            .post("/api/users/register")
            .send({
                full_name: "ABC",
                username: "abc",
                email: "abc@gmail.com",
                password: "12345"
            });

        expect(res.statusCode).toBe(201);
    });

});