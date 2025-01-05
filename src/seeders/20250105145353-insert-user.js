"use strict";

export const up = async (queryInterface) => {
  await queryInterface.bulkInsert("users", [
    {
      name: "Admin",
      username: "admin",
      email: "admin@mail.com",
      password: "$2a$12$MuU/g5JqsOmGbloaKKLRGOEhtWR20QDYwfodwRtcvIwFWgMmd7x3y", // Admin123
      role_id: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Customer 1",
      username: "cs1",
      email: "cs1@mail.com",
      password: "$2a$12$.4KR9jTxcMERmN1uGsCgBeIq3UQUOfqdfANtve5PhCNiROT8sIFwW", // Cus12345
      role_id: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Customer 2",
      username: "cs2",
      email: "cs2@mail.com",
      password: "$2a$12$.4KR9jTxcMERmN1uGsCgBeIq3UQUOfqdfANtve5PhCNiROT8sIFwW", // Cus12345
      role_id: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("users", null, {});
};
