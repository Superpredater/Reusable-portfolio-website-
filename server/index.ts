import { createServer } from "node:http";

const port = Number(process.env.API_PORT || 4000);
const allowedOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

function respond(response: import("node:http").ServerResponse, status: number, body: unknown) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  response.end(JSON.stringify(body));
}

const server = createServer((request, response) => {
  if (request.method === "OPTIONS") return respond(response, 204, {});
  if (request.method === "GET" && request.url === "/api/health") {
    return respond(response, 200, { ok: true, service: "portfolio-api" });
  }
  if (request.method === "POST" && request.url === "/api/contact") {
    let raw = "";
    request.on("data", (chunk: Buffer) => {
      raw += chunk.toString();
      if (raw.length > 20_000) request.destroy();
    });
    request.on("end", () => {
      try {
        const body = JSON.parse(raw) as { name?: unknown; email?: unknown; message?: unknown };
        const name = typeof body.name === "string" ? body.name.trim() : "";
        const email = typeof body.email === "string" ? body.email.trim() : "";
        const message = typeof body.message === "string" ? body.message.trim() : "";
        if (!name || !email || !message) return respond(response, 400, { error: "Name, email, and message are required." });
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return respond(response, 400, { error: "Enter a valid email address." });
        // This starter API acknowledges valid submissions. Connect an email provider here to deliver them.
        console.info(`Contact form submission received from ${email}.`);
        return respond(response, 201, { ok: true, message: "Your message was received." });
      } catch {
        return respond(response, 400, { error: "Request body must be valid JSON." });
      }
    });
    return;
  }
  return respond(response, 404, { error: "Route not found." });
});

server.listen(port, () => console.info(`Portfolio API listening at http://localhost:${port}`));
