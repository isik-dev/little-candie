let mongo = [
  {
    price: 999,
    desc: "kkk",
    user: "david",
    id: "88-oo-ii-gg",
  },
  {
    price: 999,
    desc: "kkk",
    user: "david",
    id: "88-oo-ii-gg",
  },
  {
    price: 999,
    desc: "kkk",
    user: "justin",
    id: "88-oo-ii-gg",
  },
];

const j = mongo.map((e) => {
  if (e.user === "justin") {
    return e;
  }
});

const d = mongo.map((e) => {
  if (e.user === "david") {
    return e;
  }
});

let o = {
  justinData: j,
  davidData: d,
};

let local = {
  justinData: [
    {
      price: 999,
      desc: "kkk",
      user: "justin",
      id: "88-oo-ii-gg",
    },
  ],
  davidData: [
    {
      price: 999,
      desc: "kkk",
      user: "david",
      id: "88-oo-ii-gg",
    },
    {
      price: 999,
      desc: "kkk",
      user: "david",
      id: "88-oo-ii-gg",
    },
  ],
};
