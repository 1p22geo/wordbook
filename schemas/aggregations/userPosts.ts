import { ObjectId } from "mongodb";

export const UserPostsAggregation = (user: ObjectId) => [
  {
    $match: {
      author: new ObjectId(user),
    },
  },
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
  {
    $sort: {
      posted: -1,
    },
  },
];
