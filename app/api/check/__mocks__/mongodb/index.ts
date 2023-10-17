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
              findOne: jest.fn((q) => {
                if (q._id.toString() === "652eb26557e45bcc221d51d5")
                  return {
                    _id: new RealObjectId("652eb26557e45bcc221d51d5"),
                    user: new RealObjectId("652eb25c57e45bcc221d51d4"),
                    started: 1697559141835,
                    duration: 300000,
                  };
                if (q._id.toString() === "652eb26557e45bcc221d51d8")
                  return {
                    _id: new RealObjectId("652eb26557e45bcc221d51d8"),
                    user: new RealObjectId("652eb25c57e45bcc221d5000"),
                    started: 1697559141835,
                    duration: 300000,
                  };
                if (q._id.toString() === "652eb26557e45bcc221d51ff") throw Error("test error please ignore");

                return null;
              }),
            };
          case "users":
            return {
              findOne: jest.fn((q) => {
                if (q._id.toString() === "652eb25c57e45bcc221d51d4")
                  return {
                    _id: new RealObjectId("652eb25c57e45bcc221d51d4"),
                    email: "1p22geo@gmail.com",
                    name: "Bartosz Geodecki",
                    hash: "489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35",
                    added: 1697559132609,
                    type: "user",
                  };

                return null;
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
