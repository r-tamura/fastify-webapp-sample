import formbody from "@fastify/formbody";
import postgres from "@fastify/postgres";
import view from "@fastify/view";
import * as dotenv from "dotenv";
import ejs from "ejs";
import fastify from "fastify";
import authConfig from "./lib/authConfig.js";
import itemRoutes from "./routes/items.js";
import loginRoutes from "./routes/login.js";
import orderRoutes from "./routes/order.js";
import publicRoutes from "./routes/public.js";
import signUpRoutes from "./routes/signUp.js";
import usersRoute from "./routes/users.js";

dotenv.config()
const server = fastify();

server.register(view, {
  engine: {
    ejs: ejs
  }
})

server.register(formbody)

const connectionString = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}`;
server.register(postgres, {
  connectionString
})

const passport = await authConfig(server)

// Routes
server.register(loginRoutes, { passport })
server.register(itemRoutes, { passport })
server.register(orderRoutes, { passport })
server.register(signUpRoutes, { passport })
server.register(usersRoute, { passport })
server.register(publicRoutes, { passport })

server.get('/', (request, reply) => {
  reply.redirect(302, '/items')
})

server.setNotFoundHandler((request, reply) => {
  reply.view('src/views/404.ejs');
});

server.listen({ host: '0.0.0.0', port: process.env.PORT || 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
