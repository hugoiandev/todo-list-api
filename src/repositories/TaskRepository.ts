import { Prisma, PrismaClient } from "@prisma/client";
import { TaskRepositoryEnum } from "../enums/TaskRepositoryEnum";

class TaskRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAllById(auth0Id: string) {
    try {
      const tasks = this.prisma.list.findMany({
        where: { auth0Id },
        select: { id: true, title: true, completed: true },
      });

      return await tasks;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(TaskRepositoryEnum.QueryError);
      }

      throw err;
    }
  }

  async save(title: string, auth0Id: string) {
    try {
      return this.prisma.list.create({
        data: { title, auth0Id },
        select: { title: true, completed: true, id: true },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new Error(TaskRepositoryEnum.DuplicateId);
        }
        if (err.code === "P2006") {
          throw new Error(TaskRepositoryEnum.ValidationError);
        }
      }

      throw err;
    }
  }

  async update({
    id,
    auth0Id,
    title,
    completed,
  }: {
    id: number;
    auth0Id: string;
    title: string;
    completed: boolean;
  }) {
    try {
      return this.prisma.list.update({
        where: { id, auth0Id },
        data: { id, auth0Id, title, completed },
        select: { id: true, title: true, completed: true },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2006") {
          throw new Error(TaskRepositoryEnum.ValidationError);
        }
      }

      throw err;
    }
  }

  async delete({ id, auth0Id }: { id: number; auth0Id: string }) {
    try {
      return this.prisma.list.delete({ where: { id, auth0Id } });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        throw err;
      }

      throw err;
    }
  }
}

export default TaskRepository;
