"use strict";

export const up = async (queryInterface) => {
  await queryInterface.bulkInsert("roles", [
    { name: "admin", created_at: new Date(), updated_at: new Date() },
    { name: "customer", created_at: new Date(), updated_at: new Date() },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("roles", null, {});
};
