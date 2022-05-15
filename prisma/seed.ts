import { PrismaClient } from '@prisma/client';
import { products } from '../products';

const prisma = new PrismaClient();

async function main() {
  for (const product of products) {
    await prisma.product.create({ data: product });
  }
}

main()
  .catch((err) => {
    console.log(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
