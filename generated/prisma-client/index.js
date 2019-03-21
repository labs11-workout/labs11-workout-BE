"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Schedule",
    embedded: false
  },
  {
    name: "Workout",
    embedded: false
  },
  {
    name: "SavedWorkout",
    embedded: false
  },
  {
    name: "Exercise",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Note",
    embedded: false
  },
  {
    name: "BodyMetric",
    embedded: false
  },
  {
    name: "BodyMeasurement",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`
});
exports.prisma = new exports.Prisma();
