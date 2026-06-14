const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg(new Pool({ connectionString }));

const prisma = new PrismaClient({ adapter });

module.exports = prisma;