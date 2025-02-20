export async function seed(knex) {
  await knex("cats").del();
  await knex("cats").insert([
    {
      id: 1,
      name: "Tomat",
      birth_date: "2024-09-10",
      gender: "Female",
      color: "grey",
      weight: 2,
      intro: "Tomat is a cute cat",
    },
    {
      id: 2,
      name: "Potat",
      birth_date: "2024-09-10",
      gender: "Female",
      color: "black",
      weight: 3,
      intro: "Potat is a huge cat",
    },
  ]);
}
