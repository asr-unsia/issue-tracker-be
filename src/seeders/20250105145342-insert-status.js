"use strict";

export const up = async (queryInterface) => {
  await queryInterface.bulkInsert("statuses", [
    { name: "new", created_at: new Date(), updated_at: new Date() },
    { name: "in progress", created_at: new Date(), updated_at: new Date() },
    { name: "resolved", created_at: new Date(), updated_at: new Date() },
    { name: "closed", created_at: new Date(), updated_at: new Date() },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("statuses", null, {});
};
