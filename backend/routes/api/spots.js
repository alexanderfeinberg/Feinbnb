const express = require("express");
const router = express.Router();
const {
  User,
  Spot,
  Review,
  SpotImage,
  ReviewImage,
  Booking,
  sequelize,
} = require("../../db/models");
const spot = require("../../db/models/spot");
const {
  validateSpotCreate,
  validateReview,
  validateBookings,
  validateDates,
} = require("../../utils/validate-body");
const { validateOwnership, validateExists } = require("../../utils/validation");

const setPreviewImage = async (obj) => {
  obj.dataValues.previewImage = await SpotImage.findOne({
    where: {
      spotId: obj.dataValues.id,
      preview: true,
    },
    attributes: ["url"],
  });
  console.log(obj.dataValues.previewImage.url);
  return obj.dataValues.previewImage.url;
};

router.get("/:spotId/reviews", async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    attributes: [],
    include: {
      model: Review,
      include: {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    },
  });

  validateExists("Spot", spot, next);

  res.json(spot);
});

router.post("/:spotId/reviews", validateReview, async (req, res, next) => {
  const { review, stars } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);
  validateExists("Spot", spot, next);

  const userReview = await Review.findOne({
    where: {
      userId: req.user.id,
      spotId: parseInt(req.params.spotId),
    },
  });

  if (userReview) {
    const err = Error("User already has a review for this spot");
    err.status = 403;
    return next(err);
  }

  const newReview = await Review.create({
    userId: req.user.id,
    spotId: req.params.spotId,
    review,
    stars,
  });

  res.json(newReview);
});

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

  //   if (!spot) {
  //     // const err = Error("Spot couldn't be found");
  //     // err.status = 404;
  //     // return next(err);
  //     return newErr("Spot couldn't be found", 404, next);
  //   }
  validateExists("Spot", spot, next);

  return res.json(spot);
});

router.post("/:spotId/images", async (req, res, next) => {
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);

  validateExists("Spot", spot, next);
  validateOwnership("Spot", spot, "ownerId", req.user, "id", next);

  const newImage = await spot.createSpotImage({ url: url, preview: preview });
  res.status(201);
  return res.json(newImage);
});

router.get("/:spotId/bookings", async (req, res, next) => {
  let spot = await Spot.findByPk(req.params.spotId);
  validateExists("Spot", spot, next, 404);

  if (spot.ownerId === req.user.id) {
    var bookings = await Booking.findAll({
      where: {
        spotId: spot.id,
      },
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    });
  } else if (spot.ownerId !== req.user.id) {
    var bookings = await Booking.findAll({
      attributes: ["spotId", "startDate", "endDate"],
      where: {
        spotId: spot.id,
      },
    });
  }

  return res.json({ Bookings: bookings });
});

router.post(
  "/:spotId/bookings",
  validateBookings,
  validateDates,
  async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    let { startDate, endDate } = req.body;
    validateExists("Spot", spot, next, 404);

    if (spot.ownerId === req.user.id) {
      const err = Error("Owner can not create a booking.");
      err.status = 400;
      next(err);
    }

    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const newBooking = await spot.createBooking({
      spotId: spot.id,
      userId: req.user.id,
      startDate: startDate,
      endDate: endDate,
    });

    res.json(newBooking);
  }
);

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
    await setPreviewImage(spot);
  }

  res.json({
    spots,
  });
});

router.put("/:spotId", validateSpotCreate, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  validateExists("Spot", spot, next);
  validateOwnership("Spot", spot, "ownerId", req.user, "id", next);

  for (let key of Object.keys(req.body)) {
    spot[key] = req.body[key];
  }

  const updated = await spot.save();
  return res.json(updated);
});

router.delete("/:spotId", async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  validateExists("Spot", spot, next);
  validateOwnership("Spot", spot, "ownerId", req.user, "id", next);

  await spot.destroy();

  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = { router, setPreviewImage };
