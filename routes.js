const route = require("express").Router();

const {
  homeController,
  createPollGetController,
  createPollPostController,
  pollsGetController,
  viewPollGetController,
  viewPollPostController,
} = require("./controller");

route.get("/", homeController);
route.get("/create", createPollGetController);
route.post("/create", createPollPostController);
route.get("/polls", pollsGetController);
route.get("/polls/:id", viewPollGetController);
route.post("/polls/:id", viewPollPostController);

module.exports = route;
