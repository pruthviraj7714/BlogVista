import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from '@pruthvidev10/medium-common';

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";

  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);

    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in",
      });
    }
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Internal server error during authentication",
    });
  }
});


blogRouter.post("/", async (c) => {
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  const body = await c.req.json();

  const { success }  = createBlogInput.safeParse(body);

  if(!success) {
    c.status(411);
    return c.json({
      msg : "Invalid inputs"
    })
  }

  try {
    const blog = await prisma.blog.create({
      data: {
        authorId: Number(authorId),
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while posting the blog",
    });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  const body = await c.req.json();
  const { success }  = updateBlogInput.safeParse(body);

  if(!success) {
    c.status(411);
    return c.json({
      msg : "Invalid inputs"
    })
  }

  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
      lastUpdated: new Date(),
    },
  });

  return c.json({
    id: blog.id,
  });
});


blogRouter.delete('/:id', async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
  try {
    await prisma.blog.delete({
      where: {
        id : Number(id),
      }
    });
  
    return c.json({
      msg : "Blog deleted succesfully!"
    });
    
  } catch (e) {
    c.status(411);
    return c.json({
      msg : "Blog is not found"
    })
  }
})


blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
    select: {
      id : true,
      title : true,
      content: true,
      createdAt: true,
      authorId: true,
      author : {
        select : {
          name : true
        }
      }
    }
  });

  return c.json({
    blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while fetching blog post",
    });
  }

  const blog = await prisma.blog.findFirst({
    where: {
      id: Number(id),
    },
    select : {
      id: true,
      title : true,
      content : true,
      createdAt: true,
      authorId: true,
      author : {
        select : {
          name : true
        }
      }
    }
  });

  return c.json({
    blog,
  });
});
