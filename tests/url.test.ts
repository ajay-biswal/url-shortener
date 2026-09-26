import request from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";
import { jest } from "@jest/globals";

describe("URL Shortener", () => {
  beforeEach(async () => {
    await prisma.url.deleteMany();
  });
  it("Should create a short url", async () => {
    const response = await request(app).post("/api/urls").send({
      url: "https://example.com/automated-test",
    });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("shortCode");
    expect(response.body).toHaveProperty("shortUrl");
  });

  it("Should return the same url for a duplicate url", async () => {
    const url = "https://example.com/duplicate-test";

    const firstResponse = await request(app).post("/api/urls").send({ url });

    const secondResponse = await request(app).post("/api/urls").send({ url });

    expect(firstResponse.status).toBe(201);
    expect(secondResponse.status).toBe(201);

    expect(secondResponse.body.shortCode).toBe(firstResponse.body.shortCode);
  });

  it("Should redirect to the original URL", async () => {
    const url = "https://example.com/redirect-test";

    const createResponse = await request(app).post("/api/urls").send({ url });

    const shortCode = createResponse.body.shortCode;

    const redirectResponse = await request(app)
      .get(`/${shortCode}`)
      .redirects(0);

    expect(redirectResponse.status).toBe(302);
    expect(redirectResponse.headers.location).toBe(url);
  });

  it("Should return 404 for an Invalid short code", async () => {
    const response = await request(app).get("/does-not-exist").redirects(0);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Short URL not found");
  });

  it("Should increment clicks when url is accessed", async () => {
    const url = "https://example.com/click-test";

    const createResponse = await request(app).post("/api/urls").send({ url });

    const shortCode = createResponse.body.shortCode;

    const before = await prisma.url.findUnique({
      where: { shortCode },
    });

    expect(before?.clicks).toBe(0);
    expect(before?.lastAccessedAt).toBeNull();

    await request(app).get(`/${shortCode}`).redirects(0);

    const after = await prisma.url.findUnique({
      where: { shortCode },
    });

    expect(after?.clicks).toBe(1);
    expect(after?.lastAccessedAt).not.toBeNull();
  });

  it("Should increment clicks for multiple accesses", async () => {
    const url = "https://example.com/multiple-clicks";

    const createResponse = await request(app).post("/api/urls").send({ url });

    const shortCode = createResponse.body.shortCode;

    await request(app).get(`/${shortCode}`).redirects(0);

    await request(app).get(`/${shortCode}`).redirects(0);

    await request(app).get(`/${shortCode}`).redirects(0);

    const result = await prisma.url.findUnique({
      where: { shortCode },
    });

    expect(result?.clicks).toBe(3);
    expect(result?.lastAccessedAt).not.toBeNull();
  });

  it("Should reject an invalid URL", async () => {
    const response = await request(app).post("/api/urls").send({
      url: "not-a-valid-url",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid Request");
    expect(response.body.errors).toBeDefined();
  });

  it("Should reject a request without a URL", async () => {
    const response = await request(app).post("/api/urls").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid Request");
    expect(response.body.errors).toBeDefined();
  });



  it("should create a URL with an expiration time", async () => {
  const response = await request(app)
    .post("/api/urls")
    .send({
      url: "https://example.com/expiration-test",
      expiresIn: 3600,
    });

  expect(response.status).toBe(201);
  expect(response.body.expiresAt).not.toBeNull();
});
 

  
});

 it("Should return 500 for an unexpected error", async () => {
  jest
    .spyOn(prisma.url, "findUnique")
    .mockRejectedValueOnce(new Error("Database failure"));

  const response = await request(app)
    .post("/api/urls")
    .send({
      url: "https://example.com/unexpected-error",
    });

  expect(response.status).toBe(500);
  expect(response.body.message).toBe("Internal Server Error");

  jest.restoreAllMocks();
});



afterAll(async () => {
  await prisma.$disconnect();
});
