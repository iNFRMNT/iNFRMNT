const router = require("express").Router();

const billRoutes = require("./bills");
const userRoutes = require("./users");
// const commentRoutes = require("./comments");

router.use("/users", userRoutes);
router.use("/bills", billRoutes);
// router.use("/comments", commentRoutes);

module.exports = router;
