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
    },
  },
];
