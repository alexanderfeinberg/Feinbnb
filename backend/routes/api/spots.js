const express = require("express");
const router = express.Router();
const { Spot, Review, SpotImage, sequelize } = require("../../db/models");
const spot = require("../../db/models/spot");
const { validateSpotCreate } = require("../../utils/validate-body");
const { newErr } = require("../../utils/validation");

router.get("/current", async (req, res, next) => {
  console.log(req.user.id);
  const spots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
  });

  res.json(spots);
});

router.get("/:spotId", async (req, res, next) => {
  console.log(req.params.spotId);
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    // const err = Error("Spot couldn't be found");
    // err.status = 404;
    // return next(err);
    return newErr("Spot couldn't be found", 404, next);
  }

  return res.json(spot);
});

router.post("/:spotId/images", async (req, res, next) => {
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    // const err = Error("Spot couldn't be found");
    // err.status = 404;
    // return next(err);
    return newErr("Spot couldn't be found", 404, next);
  } else if (spot.ownerId !== req.user.id) {
    // const err = Error("Spot must be owned by current user");
    // err.status = 401;
    // return next(err);
    return newErr("Spot must be owned by current user", 401, next);
  }

  const newImage = await spot.createSpotImage({ url: url, preview: preview });
  res.status(201);
  return res.json(newImage);
});

router.post("/", validateSpotCreate, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  res.status(201);
  res.json(newSpot);
});

router.get("/", async (req, res, next) => {
  const spots = await Spot.scope("getSpots").findAll({
    include: [
      //   { model: SpotImage, attributes: ["preview"] },
      { model: Review, attributes: [] },
    ],
  });

  for (let i = 0; i < spots.length; i++) {
    let spot = spots[i];
    let count = await Review.sum("stars", {
      where: {
        spotId: spot.id,
      },
    });
    let total = await Review.count({
      where: {
        spotId: spot.id,
      },
    });
    spot.dataValues.avgRating = count / total;
    spot.dataValues.previewImage = await SpotImage.findOne({
      where: {
        spotId: spot.id,
        preview: true,
      },
      attributes: ["url"],
    });
  }

  console.log(spots);

  res.json({
    spots,
  });
});

router.put("/:spotId", validateSpotCreate, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    // const err = Error("Spot does not exist");
    // err.status = 400;
    // return next(err);
    return newErr("Spot does not exist", 400, next);
  } else if (spot.ownerId !== req.user.id) {
    // const err = Error("Spot must be owned by current user");
    // err.status = 401;
    // return next(err);
    return newErr("Spot must be owned by current user", 401, next);
  }

  for (let key of Object.keys(req.body)) {
    spot[key] = req.body[key];
  }

  const updated = await spot.save();
  return res.json(updated);
});

router.delete("/:spotId", async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (!spot) {
    return newErr("Spot does not exist", 400, next);
  } else if (spot.ownerId !== req.user.id) {
    return newErr("Spot must be owned by current user", 401, next);
  }

  await spot.destroy();

  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
