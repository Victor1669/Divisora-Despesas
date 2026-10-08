import express from "express";
import { Server } from "node:http";
import { AddressInfo } from "node:net";

import requestLimiterMiddleware from "./rateLimit.middleware";

describe("requestLimiterMiddleware", () => {
  let server: Server;
  let url: string;

  beforeAll((done) => {
    const app = express();

    app.use(requestLimiterMiddleware);
    app.get("/", (req, res) => {
      res.status(200).json({ ok: true });
    });

    server = app.listen(0, () => {
      const { port } = server.address() as AddressInfo;
      url = `http://127.0.0.1:${port}/`;
      done();
    });
  });

  afterAll((done) => {
    server.closeAllConnections();
    server.close(done);
  });

  it("deve recusar requisições depois da 15ª com status 429", async () => {
    for (let index = 0; index < 15; index++) {
      const response = await fetch(url);
      expect(response.status).toBe(200);
    }

    const blocked = await fetch(url);

    expect(blocked.status).toBe(429);
    expect(await blocked.json()).toEqual({
      error: "Muitas tentativas, tente mais tarde.",
    });
  });
});
