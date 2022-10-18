"use strict";

const { query } = require("express");

const images = [
  {
    spotId: 1,
    url: "url1.com",
    preview: true,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-46695796/original/a0965aa5-3907-466e-b727-0900e2a7e8c7.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/f58c28d5-52d5-4c58-928e-ef00bf7164a3.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/e24ae1d6-5bcb-4eaf-99b3-f8511084772f.jpg?im_w=720",
    preview: true,
  },
  {
    spotId: 1,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-46695796/original/38bc8081-9415-453a-b8bf-9f4aeb146819.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49514116/original/57609fbe-ecd3-4bec-9360-3c63697a84bc.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49514116/original/ac6b48fa-1f89-4603-b85b-7cee18f37880.jpeg?im_w=720",
    preview: true,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49514116/original/0d0006ac-d54f-4389-adee-7986fa5e2d52.jpeg?im_w=720",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49514116/original/6db58842-1ecd-4f54-ad9f-eaaea853dc70.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-41775366/original/cd68e6dc-6f4a-4d00-a5e1-cb4f08f22019.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/ee6ec761-3239-4084-9ada-2340b20a787b.jpg?im_w=720",
    preview: true,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-41775366/original/2e87aac6-8483-493d-bd9b-2bc7996a4e3d.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://a0.muscache.com/im/pictures/7e59bdd7-f126-4eca-9adb-70ddab2f0268.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/d90df29e-622b-45bc-bfdd-99f57daefd1a.jpg?im_w=1200",
    preview: true,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/64216047/74a5daa9_original.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/64217395/07c7f392_original.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://a0.muscache.com/im/pictures/64215782/9ec9e448_original.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-555043371840820278/original/76dac5d3-eafc-42ab-84a3-87e8ed506d0d.jpeg?im_w=1200",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/319fd9a6-8907-4059-bace-e5ff408b674f.jpg?im_w=720",
    preview: true,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/9373aa63-b9b2-4187-8006-30a2017e63e3.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://a0.muscache.com/im/pictures/f2c89d17-2a57-4d32-b564-8178c742a3e8.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/5b3872b7-fc85-4e67-bd3b-dc69e298dae3?im_w=1200",
    preview: true,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/296b8c63-89ef-41ca-872a-77e3d6fac19c?im_w=1200",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/dad5a7aa-cf35-44a6-9ef2-5f37d1ef7a6f?im_w=1200",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/1888a472-99d3-48b4-95f1-a8ae17c5f74e?im_w=1200",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/90de688e-3961-47da-b35d-8f4bc85210e4?im_w=720",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-570973165437649140/original/a75c5d44-4508-4538-a720-21dc0e1c56b8?im_w=720",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-570972357022815576/original/893222cb-b63e-46f3-bae2-bf89472601ea?im_w=1200",
    preview: true,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-570972357022815576/original/cb549654-747c-4b08-9569-c07ce435ff9b?im_w=720",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-570972357022815576/original/99638847-297d-47d3-bc79-329710c85adc?im_w=1200",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-570972357022815576/original/03f3df95-a262-46a0-8c51-12036388a6a4?im_w=1200",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-574610465319681634/original/fd5e0100-af46-42bc-bfd0-52bc31b83c87?im_w=1200",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-574610465319681634/original/1e568c39-bebe-4176-8db4-cd8140ff0a24?im_w=1200",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-574610465319681634/original/845a7fe3-1d8b-4bf9-9a34-c4ef0750a382?im_w=720",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://a0.muscache.com/im/pictures/monet/Luxury-574610465319681634/original/e5aea9bd-7ff6-45b7-b938-1f0095448501?im_w=720",
    preview: true,
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/decbffb9-a4d2-4a39-8c8c-69c681954491.jpg?im_w=1200",
    preview: false,
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/146e7bc7-6347-4520-8366-173b85074305.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/cecc8b4d-80ab-48e5-8069-9831797aaf00.jpg?im_w=720",
    preview: false,
  },
  {
    spotId: 9,
    url: "https://a0.muscache.com/im/pictures/116eaba2-61e2-4e3a-b4a3-95ea527b2b5e.jpg?im_w=720",
    preview: true,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("SpotImages", images, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete("SpotImages", {
      url: {
        [Op.in]: [
          "url1.com",
          "url2.com",
          "url3.com",
          "url4.com",
          "url5.com",
          "url6.com",
          "url7.com",
          "url8.com",
          "url9.com",
          "url10.com",
          "url11.com",
          "url12.com",
          "url13.com",
          "url14.com",
          "url15.com",
          "url16.com",
          "url17.com",
          "url18.com",
          "url19.com",
        ],
      },
    });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
