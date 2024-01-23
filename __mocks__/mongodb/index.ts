const { ObjectId: RealObjectId } = jest.requireActual("mongodb");

class MongoClient {
  close: () => void;
  connect: () => void;
  create: (_str: string) => void;
  constructor(str: string) {
    this.create = jest.fn();
    this.close = jest.fn();
    this.connect = jest.fn();
    this.create(str);
    console.info(str);
  }
  db() {
    return {
      collection(coll: string) {
        switch (coll) {
          case "sessions":
            return {
              insertOne: jest.fn(() => {
                return { insertedId: new RealObjectId("652eb26557e45bcc221d51d5") };
              }),
              findOne: jest.fn((q) => {
                if (q._id && q._id.toString() === "652eb26557e45bcc221d51d5")
                  return {
                    _id: new RealObjectId("652eb26557e45bcc221d51d5"),
                    user: new RealObjectId("652eb25c57e45bcc221d51d4"),
                    started: 1,
                    duration: 300000,
                  };
                if (q._id && q._id.toString() === "652eb26557e45bcc221d51d8")
                  return {
                    _id: new RealObjectId("652eb26557e45bcc221d51d8"),
                    user: new RealObjectId("652eb25c57e45bcc221d5000"),
                    started: 1697559141835,
                    duration: 300000,
                  };
                if (q._id && q._id.toString() === "652eb26557e45bcc221d51ff") throw Error("test error please ignore");

                return null;
              }),
            };
          case "userdata":
            return {
              insertOne: jest.fn((doc) => {
                return { insertedId: new RealObjectId("653cdb40477ebd1fd477c81d") };
              }),
              findOne: jest.fn((doc) => {
                if (doc.user && doc.user.toString() == "652eb25c57e45bcc221d51d4")
                  return {
                    _id: new RealObjectId("653cd10d7d62fb1be31824f7"),
                    user: new RealObjectId("652eb25c57e45bcc221d51d4"),
                    desc: "## No description yet.  \nBut there will be,  \nand it will be glorious.",
                  };
              }),
            };
          case "users":
            return {
              insertOne: jest.fn((doc) => {
                if (doc.email && doc.email === "1p22error@gmail.com") throw Error("test error please ignore");
                return { insertedId: new RealObjectId("652eb25c57e45bcc221d5234") };
              }),
              findOne: jest.fn((q) => {
                if (q.email == "exists@gmail.com") {
                  return {
                    _id: new RealObjectId("652eb25c57e45bcc221d51d4"),
                    email: "exists@gmail.com",
                    name: "Bartosz Geodecki",
                    hash: "489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35",
                    added: 1697559132609,
                    type: "user",
                  };
                }
                if (
                  q.email === "1p22geo@gmail.com" &&
                  q.hash === "489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35"
                ) {
                  return {
                    _id: new RealObjectId("652eb25c57e45bcc221d51d4"),
                    email: "1p22geo@gmail.com",
                    name: "Bartosz Geodecki",
                    hash: "489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35",
                    added: 1697559132609,
                    type: "user",
                  };
                }
                if (q._id && q._id.toString() === "652eb25c57e45bcc221d51d4")
                  return {
                    _id: new RealObjectId("652eb25c57e45bcc221d51d4"),
                    email: "1p22geo@gmail.com",
                    name: "Bartosz Geodecki",
                    hash: "489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35",
                    added: 1697559132609,
                    type: "user",
                  };
                if (q._id && q._id.toString() === "653cdf77477ebd1fd477c821")
                  return {
                    _id: new RealObjectId("653cdf77477ebd1fd477c821"),
                    email: "1p22test@gmail.com",
                    name: "Batestrtosz test test",
                    hash: "489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35",
                    added: 1697559132609,
                    type: "user",
                  };
                if (q._id && q._id.toString() === "653cdf77477ebd1fd477ffff") throw Error("test error please ignore");
                if (
                  q.email === "1p22error@gmail.com" &&
                  q.hash === "489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35"
                )
                  throw Error("test error please ignore");

                return null;
              }),
            };
          case "posts":
            return {
              aggregate: jest.fn(() => {
                return {
                  skip: jest.fn(() => {
                    return {
                      limit: jest.fn(() => {
                        return {
                          toArray: jest.fn(() => {
                            return ["post 1", "post 2"];
                          }),
                        };
                      }),
                    };
                  }),
                };
              }),
              insertOne: jest.fn(() => {
                return { insertedId: new RealObjectId("652eb25c57e45bcc221d5188") };
              }),
            };
        }
      },
    };
  }
}

module.exports = {
  MongoClient: MongoClient,
  ObjectId: RealObjectId,
};
