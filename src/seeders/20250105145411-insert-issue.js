"use strict";

export const up = async (queryInterface) => {
  await queryInterface.bulkInsert("issues", [
    {
      subject: "Tidak bisa akses internet",
      description: "Terhubung ke jaringan, tapi tidak bisa mengakses internet",
      status_id: 1,
      requester_id: 2,
      resolver_id: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      subject: "Tidak bisa login",
      description:
        "Aplikasi bisa diakses, tetapi muncul error saat mencoba login",
      status_id: 1,
      requester_id: 2,
      resolver_id: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      subject: "PC tidak hidup",
      description: "Kabel sudah dicolokkan semua, tapi ngga mau nyala",
      status_id: 1,
      requester_id: 3,
      resolver_id: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("issues", null, {});
};
