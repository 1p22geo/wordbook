export const PostsAggregation = [
  {
    $lookup: {
      from: "users",
      localField: "author",
      foreignField: "_id",
      as: "user",
    },
  },
  {
    $project: {
      author: {
        $arrayElemAt: ["$user", 0],
      },
      posted: 1,
      content: 1,
      up: 1,
      down: 1,

      comments: 1,
    },
  },
  {
    $project: {
      author: {
        hash: 0,
      },
      comments: {
        author: {
          hash: 0,
        },
      },
    },
  },
  {
    $sort: {
      posted: -1,
    },
  },
];
