"use strict";

export const up = async (queryInterface) => {
  await queryInterface.bulkInsert("comments", [
    {
      issue_id: 1,
      user_id: 1,
      comment: "Ini sudah coba buka link lain ?",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      issue_id: 1,
      user_id: 2,
      comment: "Sudah, ada yg bisa ada yg ngga",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      issue_id: 1,
      user_id: 1,
      comment: "Ok tunggu sebentar ya, kami cek dulu",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      issue_id: 1,
      user_id: 2,
      comment: "Ok",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      issue_id: 1,
      user_id: 1,
      comment: "Silahkan cek kembali",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("comments", null, {});
};
