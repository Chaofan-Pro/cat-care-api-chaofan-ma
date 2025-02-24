export async function seed(knex) {
  await knex("cats").del();
  await knex("cats").insert([
    {
      id: 1,
      name: "Tomat",
      photo:
        "https://res.cloudinary.com/dzhnttkky/image/upload/v1740339711/cat-care-app/yt4dicitulxvbrg9huix.jpg",
      birth_date: "2024-09-10",
      gender: "Female",
      color: "grey",
      weight: 2,
      intro:
        "Tomat is a cute and gentle cat. Tomat likes to play a lot. Tomat like to sleep near the end of the bed. Tomat eats food slowly",
    },
    {
      id: 2,
      name: "Potat",
      photo:
        "https://res.cloudinary.com/dzhnttkky/image/upload/v1740339733/cat-care-app/wtep24numt2uypc6qbu2.jpg",
      birth_date: "2024-09-10",
      gender: "Female",
      color: "black",
      weight: 3,
      intro:
        "Potat is a huge and brutal cat. Potat only plays when the toy is moving fast. Potat would come to the bed for pet in the morning. Potat eats a lot and eats fast",
    },
  ]);
}
