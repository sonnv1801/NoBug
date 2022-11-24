const authRouter = require("./auth");
const userRouter = require("./users");

function route(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);

//   app.use((err, req, res, next) => {
//     const errorStatus = 500;
//     const errorMessage = "Something went wrong";
//     res.status(errorStatus).json({
//       success: false,
//       status: errorStatus,
//       message: errorMessage,
//       stack: err.stack,
//     });
//   });
}

module.exports = route;
