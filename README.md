# Create T3 App

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.

## Connect Your Database

Create a database - this assumes you're using PostgreSQL.

```
createdb mydb
```

Edit the .env file and change the DATABASE_URL config to suit your local setup.

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

I use PostgreSQL, and my hosting provider (understandably) limits my connection pool to around 30, so I add a _connection_limit_ parameter.

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public&connection_limit=25"
```

## Getting Started

First, install the requirements

```bash
npm install
```

Then migrate and seed the database

```
npx prisma migrate reset
```

Next, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about the stack, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [nextAuth Documentation](https://next-auth.js.org/getting-started/introduction)
- [Tailwind Documentation](https://tailwindcss.com/docs/installation)
- [trpc Documentation](https://trpc.io/docs)

## Note on Database seeding

The initial exercise and data seed files were adapted from work done on [the WGER project](https://github.com/wger-project/wger).
