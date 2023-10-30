const route = require("express").Router();

route.get("/", (req, res) => {
  res.json({
    message: "Home Page",
  });
});

const userRoute = require('./userRoutes')
route.use('/user', userRoute)

const postRoute = require('./postRoutes');
route.use('/post', postRoute)


module.exports = route;