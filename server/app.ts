// import { Module } from "@nestjs/common";
// import { GraphQLModule } from "@nestjs/graphql";

// @Module({
//   imports: [GraphQLModule.forRoot({})],
// })
// export class AppModule {}

import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Test res");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
