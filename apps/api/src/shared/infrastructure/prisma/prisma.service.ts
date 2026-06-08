import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { RequestContextService } from '../request-context/request-context.service';

const auditModels = new Set(
  Prisma.dmmf.datamodel.models
    .filter((m) => m.fields.some((f) => f.name === 'createdBy'))
    .map((m) => m.name.toLowerCase()),
);

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;
  private extendedClient: any;

  constructor(
    configService: ConfigService,
    private readonly requestContext: RequestContextService,
  ) {
    const connectionString = configService.get<string>('DATABASE_URL');
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    super({ adapter });
    this.pool = pool;

    this.extendedClient = this.$extends({
      query: {
        $allModels: {
          async create({ model, args, query }) {
            if (auditModels.has(model.toLowerCase())) {
              const userId = requestContext.get('userId');
              const userIdVal =
                typeof userId === 'object' && userId && 'value' in userId
                  ? (userId as any).value
                  : userId;
              if (userIdVal) {
                (args as any).data = {
                  ...args.data,
                  createdBy: (args.data as any).createdBy || userIdVal,
                  updatedBy: (args.data as any).updatedBy || userIdVal,
                };
              }
            }
            return query(args);
          },
          async createMany({ model, args, query }) {
            if (auditModels.has(model.toLowerCase())) {
              const userId = requestContext.get('userId');
              const userIdVal =
                typeof userId === 'object' && userId && 'value' in userId
                  ? (userId as any).value
                  : userId;
              if (userIdVal && Array.isArray(args.data)) {
                (args as any).data = args.data.map((item: any) => ({
                  ...item,
                  createdBy: item.createdBy || userIdVal,
                  updatedBy: item.updatedBy || userIdVal,
                }));
              }
            }
            return query(args);
          },
          async update({ model, args, query }) {
            if (auditModels.has(model.toLowerCase())) {
              const userId = requestContext.get('userId');
              const userIdVal =
                typeof userId === 'object' && userId && 'value' in userId
                  ? (userId as any).value
                  : userId;
              if (userIdVal) {
                (args as any).data = {
                  ...args.data,
                  updatedBy: (args.data as any).updatedBy || userIdVal,
                };
              }
            }
            return query(args);
          },
          async updateMany({ model, args, query }) {
            if (auditModels.has(model.toLowerCase())) {
              const userId = requestContext.get('userId');
              const userIdVal =
                typeof userId === 'object' && userId && 'value' in userId
                  ? (userId as any).value
                  : userId;
              if (userIdVal) {
                (args as any).data = {
                  ...args.data,
                  updatedBy: (args.data as any).updatedBy || userIdVal,
                };
              }
            }
            return query(args);
          },
        },
      },
    });

    return new Proxy(this, {
      get(target, prop, receiver) {
        if (prop in target.extendedClient) {
          return Reflect.get(target.extendedClient, prop, receiver);
        }
        return Reflect.get(target, prop, receiver);
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
