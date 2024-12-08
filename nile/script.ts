import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// retrieve all users
async function retrieve_all_users() {
 return await prisma.user.findMany()
}

// retrieve user by id
async function retrieve_user_by_id(id: number) {
  return await prisma.user.findUnique({
    where: {
      id: id
    }
  })
}

// create user
async function create_user(name: string, email: string) {
  return await prisma.user.create({
    data: {
      name: name,
      email: email
    }
  })
}

async function main() {
//   const user = await create_user('John Doe', 'john.doe@gmail.com')
  const user_by_id = await retrieve_user_by_id(2)
  console.log(user_by_id)
//   const users = await retrieve_all_users()
//   console.log(users)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })