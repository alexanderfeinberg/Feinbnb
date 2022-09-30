const express = require("express");
const { Op } = require("sequelize");
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
  validateQuery,
} = require("../../utils/validate-body");
const { validateOwnership, validateExists } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth.js");

const spotAddAvgPreview = async (spots, setPreview = true) => {
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
    if (setPreview) {
      spot.dataValues.previewImage = await setPreviewImage(spot);
    }
  }

  return spots;
};

const handleQuery = (req) => {
  const query = {};

  let { page, size } = req.query;
  if (!size || size >= 20 || size < 0) size = 20;
  if (!page || page < 0) page = 0;
  if (page > 10) page = 10;
  if (page >= 1 && size >= 1) {
    query.offset = size * (page - 1);
  }

  query.limit = size;

  return { query, page, size };
};

const handleWhere = (req) => {
  const where = {};
  if (req.query.minLat) {
    where.lat = {
      ...where.lat,
      [Op.gte]: req.query.minLat,
    };
  }
  if (req.query.maxLat) {
    where.lat = {
      ...where.lat,
      [Op.lte]: req.query.maxLat,
    };
  }
  if (req.query.minLng) {
    where.lng = {
      ...where.lng,
      [Op.gte]: req.query.minLng,
    };
  }
  if (req.query.maxLng) {
    where.lng = {
      ...where.lng,
      [Op.lte]: req.query.maxLng,
    };
  }
  if (req.query.maxPrice) {
    let val = req.query.maxPrice;
    if (val < 0) val = 0;
    where.price = {
      ...where.price,
      [Op.lte]: val,
    };
  }
  if (req.query.minPrice) {
    let val = req.query.minPrice;
    if (val < 0) val = 0;
    where.price = {
      ...where.price,
      [Op.gte]: val,
    };
  }

  return where;
};
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
      include: [
        { model: User, attributes: ["id", "firstName", "lastName"] },
        { model: ReviewImage, attributes: ["id", "url"] },
      ],
    },
  });

  validateExists("Spot", spot, next, 404);

  res.json(spot);
});

router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res, next) => {
    const { review, stars } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    validateExists("Spot", spot, next, 404);

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
  }
);

router.get("/current", requireAuth, async (req, res, next) => {
  console.log(req.user.id);
  let spots = await Spot.scope("getSpots").findAll({
    where: {
      ownerId: req.user.id,
    },
  });

  spots = await spotAddAvgPreview(spots);

  res.json(spots);
});

router.get("/:spotId", async (req, res, next) => {
  console.log(req.params.spotId);
  let spot = await Spot.scope("getSpots").findByPk(req.params.spotId, {
    include: [
      { model: SpotImage },
      { model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] },
    ],
  });

  //   if (!spot) {
  //     // const err = Error("Spot couldn't be found");
  //     // err.status = 404;
  //     // return next(err);
  //     return newErr("Spot couldn't be found", 404, next);
  //   }
  validateExists("Spot", spot, next, 404);
  spot = await spotAddAvgPreview([spot], false);
  spot = spot[0];

  return res.json(spot);
});

router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const { url, preview } = req.body;
  const spot = await Spot.findByPk(req.params.spotId);

  validateExists("Spot", spot, next, 404);
  validateOwnership("Spot", spot, "ownerId", req.user, "id", next);

  const newImage = await spot.createSpotImage({ url: url, preview: preview });
  res.status(201);
  return res.json({
    id: newImage.id,
    url: newImage.url,
    preview: newImage.preview,
  });
});

router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  let spot = await Spot.findByPk(req.params.spotId);
  let bookings;
  validateExists("Spot", spot, next, 404);

  if (spot.ownerId === req.user.id) {
    bookings = await Booking.findAll({
      where: {
        spotId: spot.id,
      },
      include: {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    });
  } else if (spot.ownerId !== req.user.id) {
    bookings = await Booking.findAll({
      attributes: ["spotId", "startDate", "endDate"],
      where: {
        spotId: spot.id,
      },
    });
  }
  for (let booking of bookings) {
    console.log(booking);
    booking.dataValues.startDate = booking.startDate
      .toISOString()
      .split("T")[0];
    booking.dataValues.endDate = booking.endDate.toISOString().split("T")[0];
  }
  return res.json({ Bookings: bookings });
});

router.post(
  "/:spotId/bookings",
  requireAuth,
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

router.post("/", requireAuth, validateSpotCreate, async (req, res, next) => {
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

router.get("/", validateQuery, async (req, res, next) => {
  let { query, page, size } = handleQuery(req);
  let spots = await Spot.scope("getSpots").findAll({
    include: [
      //   { model: SpotImage, attributes: ["preview"] },
      { model: Review, attributes: [] },
    ],
    where: handleWhere(req),
    ...query,
  });

  spots = await spotAddAvgPreview(spots);
  res.json({ Spots: spots, page: page, size: size });
});

router.put(
  "/:spotId",
  requireAuth,
  validateSpotCreate,
  async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    validateExists("Spot", spot, next);
    validateOwnership("Spot", spot, "ownerId", req.user, "id", next);

    for (let key of Object.keys(req.body)) {
      spot[key] = req.body[key];
    }

    const updated = await spot.save();
    const updatedCreatedAt = await Spot.scope("getSpots").findByPk(updated.id);
    return res.json(updatedCreatedAt);
  }
);

router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  validateExists("Spot", spot, next, 404);
  validateOwnership("Spot", spot, "ownerId", req.user, "id", next);
  console.log(spot);
  await spot.destroy();

  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = { router, setPreviewImage };
