const express = require("express");
const authJwt = require("../middleware/authJwt");
const signinRouter = require("./auth-route");
const managerMarketingRouter = require("./managers/marketing-manager");
const employMarketingRouter = require("./employes/marketing-employ");
// const managerReceptionRouter = require("./managers/reception-manager");
const employReceptionRouter = require("./employes/reception-employ");
const doctorOperatingRouter = require("./managers/operating-doctor");
const nursingOperatingRouter = require("./employes/operating-nursing");
const managerHRRouter = require("./managers/human-resource-manager");
// const employHRRouter = require("./employes/human-resource-employ");
const managerBusinessRouter = require('./managers/business-manager');
const employBusinessRouter = require('./employes/business-employ');
const rootRouter = require('./root');
const adminRouter = require("./admin");

function route(app) {
  // [authJwt.verifyToken, authJwt.isMarketingManager],
  // 
  app.use("/marketing/manager", managerMarketingRouter);
  app.use("/marketing/employ",[authJwt.verifyToken, authJwt.isMarketingEmploy], employMarketingRouter);
  // app.use("/reception/manager", managerReceptionRouter);
  app.use("/reception/employ", [authJwt.verifyToken, authJwt.isReceptionEmploy], employReceptionRouter);
  app.use("/operating-room/doctor",[authJwt.verifyToken, authJwt.isDoctor], doctorOperatingRouter);
  app.use("/operating-room/nursing",[authJwt.verifyToken, authJwt.isNursing], nursingOperatingRouter);
  app.use("/human-resources/manager", [authJwt.verifyToken, authJwt.isHRManager], managerHRRouter);
  // app.use("/human-resources/employ", [authJwt.verifyToken, authJwt.isHREmploy], employHRRouter);
  app.use("/business/manager", [authJwt.verifyToken, authJwt.isBusinessManager], managerBusinessRouter);
  app.use("/business/employ", [authJwt.verifyToken, authJwt.isBusinessEmploy], employBusinessRouter);
  app.use("/root", rootRouter);
  app.use("/administrator", adminRouter)
  app.use("/", signinRouter);
  app.all('*', (req, res) => {
    res.status(404).render('err/404');
  });
}

module.exports = route;
