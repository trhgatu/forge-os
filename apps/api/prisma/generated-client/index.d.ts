
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserConnection
 * 
 */
export type UserConnection = $Result.DefaultSelection<Prisma.$UserConnectionPayload>
/**
 * Model UserStats
 * 
 */
export type UserStats = $Result.DefaultSelection<Prisma.$UserStatsPayload>
/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model Permission
 * 
 */
export type Permission = $Result.DefaultSelection<Prisma.$PermissionPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Journal
 * 
 */
export type Journal = $Result.DefaultSelection<Prisma.$JournalPayload>
/**
 * Model Memory
 * 
 */
export type Memory = $Result.DefaultSelection<Prisma.$MemoryPayload>
/**
 * Model Mood
 * 
 */
export type Mood = $Result.DefaultSelection<Prisma.$MoodPayload>
/**
 * Model Quote
 * 
 */
export type Quote = $Result.DefaultSelection<Prisma.$QuotePayload>
/**
 * Model DailyQuote
 * 
 */
export type DailyQuote = $Result.DefaultSelection<Prisma.$DailyQuotePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userConnection`: Exposes CRUD operations for the **UserConnection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserConnections
    * const userConnections = await prisma.userConnection.findMany()
    * ```
    */
  get userConnection(): Prisma.UserConnectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userStats`: Exposes CRUD operations for the **UserStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserStats
    * const userStats = await prisma.userStats.findMany()
    * ```
    */
  get userStats(): Prisma.UserStatsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.permission`: Exposes CRUD operations for the **Permission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Permissions
    * const permissions = await prisma.permission.findMany()
    * ```
    */
  get permission(): Prisma.PermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.journal`: Exposes CRUD operations for the **Journal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Journals
    * const journals = await prisma.journal.findMany()
    * ```
    */
  get journal(): Prisma.JournalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.memory`: Exposes CRUD operations for the **Memory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Memories
    * const memories = await prisma.memory.findMany()
    * ```
    */
  get memory(): Prisma.MemoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mood`: Exposes CRUD operations for the **Mood** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Moods
    * const moods = await prisma.mood.findMany()
    * ```
    */
  get mood(): Prisma.MoodDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quote`: Exposes CRUD operations for the **Quote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Quotes
    * const quotes = await prisma.quote.findMany()
    * ```
    */
  get quote(): Prisma.QuoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dailyQuote`: Exposes CRUD operations for the **DailyQuote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyQuotes
    * const dailyQuotes = await prisma.dailyQuote.findMany()
    * ```
    */
  get dailyQuote(): Prisma.DailyQuoteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UserConnection: 'UserConnection',
    UserStats: 'UserStats',
    Role: 'Role',
    Permission: 'Permission',
    AuditLog: 'AuditLog',
    Project: 'Project',
    Journal: 'Journal',
    Memory: 'Memory',
    Mood: 'Mood',
    Quote: 'Quote',
    DailyQuote: 'DailyQuote'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userConnection" | "userStats" | "role" | "permission" | "auditLog" | "project" | "journal" | "memory" | "mood" | "quote" | "dailyQuote"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserConnection: {
        payload: Prisma.$UserConnectionPayload<ExtArgs>
        fields: Prisma.UserConnectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserConnectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserConnectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserConnectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserConnectionPayload>
          }
          findFirst: {
            args: Prisma.UserConnectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserConnectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserConnectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserConnectionPayload>
          }
          findMany: {
            args: Prisma.UserConnectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserConnectionPayload>[]
          }
          create: {
            args: Prisma.UserConnectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserConnectionPayload>
          }
          createMany: {
            args: Prisma.UserConnectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserConnectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserConnectionPayload>[]
          }
          delete: {
            args: Prisma.UserConnectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserConnectionPayload>
          }
          update: {
            args: Prisma.UserConnectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserConnectionPayload>
          }
          deleteMany: {
            args: Prisma.UserConnectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserConnectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserConnectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserConnectionPayload>[]
          }
          upsert: {
            args: Prisma.UserConnectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserConnectionPayload>
          }
          aggregate: {
            args: Prisma.UserConnectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserConnection>
          }
          groupBy: {
            args: Prisma.UserConnectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserConnectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserConnectionCountArgs<ExtArgs>
            result: $Utils.Optional<UserConnectionCountAggregateOutputType> | number
          }
        }
      }
      UserStats: {
        payload: Prisma.$UserStatsPayload<ExtArgs>
        fields: Prisma.UserStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          findFirst: {
            args: Prisma.UserStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          findMany: {
            args: Prisma.UserStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>[]
          }
          create: {
            args: Prisma.UserStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          createMany: {
            args: Prisma.UserStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>[]
          }
          delete: {
            args: Prisma.UserStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          update: {
            args: Prisma.UserStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          deleteMany: {
            args: Prisma.UserStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>[]
          }
          upsert: {
            args: Prisma.UserStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserStatsPayload>
          }
          aggregate: {
            args: Prisma.UserStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserStats>
          }
          groupBy: {
            args: Prisma.UserStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserStatsCountArgs<ExtArgs>
            result: $Utils.Optional<UserStatsCountAggregateOutputType> | number
          }
        }
      }
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      Permission: {
        payload: Prisma.$PermissionPayload<ExtArgs>
        fields: Prisma.PermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          findFirst: {
            args: Prisma.PermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          findMany: {
            args: Prisma.PermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          create: {
            args: Prisma.PermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          createMany: {
            args: Prisma.PermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          delete: {
            args: Prisma.PermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          update: {
            args: Prisma.PermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          deleteMany: {
            args: Prisma.PermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          upsert: {
            args: Prisma.PermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          aggregate: {
            args: Prisma.PermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermission>
          }
          groupBy: {
            args: Prisma.PermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermissionCountArgs<ExtArgs>
            result: $Utils.Optional<PermissionCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Journal: {
        payload: Prisma.$JournalPayload<ExtArgs>
        fields: Prisma.JournalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JournalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JournalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalPayload>
          }
          findFirst: {
            args: Prisma.JournalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JournalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalPayload>
          }
          findMany: {
            args: Prisma.JournalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalPayload>[]
          }
          create: {
            args: Prisma.JournalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalPayload>
          }
          createMany: {
            args: Prisma.JournalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JournalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalPayload>[]
          }
          delete: {
            args: Prisma.JournalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalPayload>
          }
          update: {
            args: Prisma.JournalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalPayload>
          }
          deleteMany: {
            args: Prisma.JournalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JournalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JournalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalPayload>[]
          }
          upsert: {
            args: Prisma.JournalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalPayload>
          }
          aggregate: {
            args: Prisma.JournalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJournal>
          }
          groupBy: {
            args: Prisma.JournalGroupByArgs<ExtArgs>
            result: $Utils.Optional<JournalGroupByOutputType>[]
          }
          count: {
            args: Prisma.JournalCountArgs<ExtArgs>
            result: $Utils.Optional<JournalCountAggregateOutputType> | number
          }
        }
      }
      Memory: {
        payload: Prisma.$MemoryPayload<ExtArgs>
        fields: Prisma.MemoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoryPayload>
          }
          findFirst: {
            args: Prisma.MemoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoryPayload>
          }
          findMany: {
            args: Prisma.MemoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoryPayload>[]
          }
          create: {
            args: Prisma.MemoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoryPayload>
          }
          createMany: {
            args: Prisma.MemoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoryPayload>[]
          }
          delete: {
            args: Prisma.MemoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoryPayload>
          }
          update: {
            args: Prisma.MemoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoryPayload>
          }
          deleteMany: {
            args: Prisma.MemoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoryPayload>[]
          }
          upsert: {
            args: Prisma.MemoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemoryPayload>
          }
          aggregate: {
            args: Prisma.MemoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemory>
          }
          groupBy: {
            args: Prisma.MemoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemoryCountArgs<ExtArgs>
            result: $Utils.Optional<MemoryCountAggregateOutputType> | number
          }
        }
      }
      Mood: {
        payload: Prisma.$MoodPayload<ExtArgs>
        fields: Prisma.MoodFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MoodFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MoodFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>
          }
          findFirst: {
            args: Prisma.MoodFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MoodFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>
          }
          findMany: {
            args: Prisma.MoodFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>[]
          }
          create: {
            args: Prisma.MoodCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>
          }
          createMany: {
            args: Prisma.MoodCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MoodCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>[]
          }
          delete: {
            args: Prisma.MoodDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>
          }
          update: {
            args: Prisma.MoodUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>
          }
          deleteMany: {
            args: Prisma.MoodDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MoodUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MoodUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>[]
          }
          upsert: {
            args: Prisma.MoodUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodPayload>
          }
          aggregate: {
            args: Prisma.MoodAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMood>
          }
          groupBy: {
            args: Prisma.MoodGroupByArgs<ExtArgs>
            result: $Utils.Optional<MoodGroupByOutputType>[]
          }
          count: {
            args: Prisma.MoodCountArgs<ExtArgs>
            result: $Utils.Optional<MoodCountAggregateOutputType> | number
          }
        }
      }
      Quote: {
        payload: Prisma.$QuotePayload<ExtArgs>
        fields: Prisma.QuoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          findFirst: {
            args: Prisma.QuoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          findMany: {
            args: Prisma.QuoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>[]
          }
          create: {
            args: Prisma.QuoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          createMany: {
            args: Prisma.QuoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>[]
          }
          delete: {
            args: Prisma.QuoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          update: {
            args: Prisma.QuoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          deleteMany: {
            args: Prisma.QuoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>[]
          }
          upsert: {
            args: Prisma.QuoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuotePayload>
          }
          aggregate: {
            args: Prisma.QuoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuote>
          }
          groupBy: {
            args: Prisma.QuoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuoteCountArgs<ExtArgs>
            result: $Utils.Optional<QuoteCountAggregateOutputType> | number
          }
        }
      }
      DailyQuote: {
        payload: Prisma.$DailyQuotePayload<ExtArgs>
        fields: Prisma.DailyQuoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyQuoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyQuotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyQuoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyQuotePayload>
          }
          findFirst: {
            args: Prisma.DailyQuoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyQuotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyQuoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyQuotePayload>
          }
          findMany: {
            args: Prisma.DailyQuoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyQuotePayload>[]
          }
          create: {
            args: Prisma.DailyQuoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyQuotePayload>
          }
          createMany: {
            args: Prisma.DailyQuoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyQuoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyQuotePayload>[]
          }
          delete: {
            args: Prisma.DailyQuoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyQuotePayload>
          }
          update: {
            args: Prisma.DailyQuoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyQuotePayload>
          }
          deleteMany: {
            args: Prisma.DailyQuoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyQuoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DailyQuoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyQuotePayload>[]
          }
          upsert: {
            args: Prisma.DailyQuoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyQuotePayload>
          }
          aggregate: {
            args: Prisma.DailyQuoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyQuote>
          }
          groupBy: {
            args: Prisma.DailyQuoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyQuoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyQuoteCountArgs<ExtArgs>
            result: $Utils.Optional<DailyQuoteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    userConnection?: UserConnectionOmit
    userStats?: UserStatsOmit
    role?: RoleOmit
    permission?: PermissionOmit
    auditLog?: AuditLogOmit
    project?: ProjectOmit
    journal?: JournalOmit
    memory?: MemoryOmit
    mood?: MoodOmit
    quote?: QuoteOmit
    dailyQuote?: DailyQuoteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    connections: number
    journals: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    connections?: boolean | UserCountOutputTypeCountConnectionsArgs
    journals?: boolean | UserCountOutputTypeCountJournalsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConnectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserConnectionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountJournalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JournalWhereInput
  }


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    users: number
    permissions: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | RoleCountOutputTypeCountUsersArgs
    permissions?: boolean | RoleCountOutputTypeCountPermissionsArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionWhereInput
  }


  /**
   * Count Type PermissionCountOutputType
   */

  export type PermissionCountOutputType = {
    roles: number
  }

  export type PermissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | PermissionCountOutputTypeCountRolesArgs
  }

  // Custom InputTypes
  /**
   * PermissionCountOutputType without action
   */
  export type PermissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionCountOutputType
     */
    select?: PermissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PermissionCountOutputType without action
   */
  export type PermissionCountOutputTypeCountRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
  }


  /**
   * Count Type QuoteCountOutputType
   */

  export type QuoteCountOutputType = {
    dailyQuotes: number
  }

  export type QuoteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dailyQuotes?: boolean | QuoteCountOutputTypeCountDailyQuotesArgs
  }

  // Custom InputTypes
  /**
   * QuoteCountOutputType without action
   */
  export type QuoteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuoteCountOutputType
     */
    select?: QuoteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuoteCountOutputType without action
   */
  export type QuoteCountOutputTypeCountDailyQuotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyQuoteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    refreshToken: string | null
    roleId: string | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    refreshToken: string | null
    roleId: string | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    refreshToken: number
    roleId: number
    isDeleted: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    refreshToken?: true
    roleId?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    refreshToken?: true
    roleId?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    refreshToken?: true
    roleId?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    password: string
    refreshToken: string | null
    roleId: string | null
    isDeleted: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    refreshToken?: boolean
    roleId?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean | User$roleArgs<ExtArgs>
    stats?: boolean | User$statsArgs<ExtArgs>
    connections?: boolean | User$connectionsArgs<ExtArgs>
    journals?: boolean | User$journalsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    refreshToken?: boolean
    roleId?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean | User$roleArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    refreshToken?: boolean
    roleId?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean | User$roleArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    refreshToken?: boolean
    roleId?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "refreshToken" | "roleId" | "isDeleted" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | User$roleArgs<ExtArgs>
    stats?: boolean | User$statsArgs<ExtArgs>
    connections?: boolean | User$connectionsArgs<ExtArgs>
    journals?: boolean | User$journalsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | User$roleArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | User$roleArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      role: Prisma.$RolePayload<ExtArgs> | null
      stats: Prisma.$UserStatsPayload<ExtArgs> | null
      connections: Prisma.$UserConnectionPayload<ExtArgs>[]
      journals: Prisma.$JournalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      password: string
      refreshToken: string | null
      roleId: string | null
      isDeleted: boolean
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends User$roleArgs<ExtArgs> = {}>(args?: Subset<T, User$roleArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    stats<T extends User$statsArgs<ExtArgs> = {}>(args?: Subset<T, User$statsArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    connections<T extends User$connectionsArgs<ExtArgs> = {}>(args?: Subset<T, User$connectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    journals<T extends User$journalsArgs<ExtArgs> = {}>(args?: Subset<T, User$journalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JournalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly refreshToken: FieldRef<"User", 'String'>
    readonly roleId: FieldRef<"User", 'String'>
    readonly isDeleted: FieldRef<"User", 'Boolean'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.role
   */
  export type User$roleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    where?: RoleWhereInput
  }

  /**
   * User.stats
   */
  export type User$statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    where?: UserStatsWhereInput
  }

  /**
   * User.connections
   */
  export type User$connectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserConnection
     */
    select?: UserConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserConnection
     */
    omit?: UserConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserConnectionInclude<ExtArgs> | null
    where?: UserConnectionWhereInput
    orderBy?: UserConnectionOrderByWithRelationInput | UserConnectionOrderByWithRelationInput[]
    cursor?: UserConnectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserConnectionScalarFieldEnum | UserConnectionScalarFieldEnum[]
  }

  /**
   * User.journals
   */
  export type User$journalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Journal
     */
    select?: JournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Journal
     */
    omit?: JournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalInclude<ExtArgs> | null
    where?: JournalWhereInput
    orderBy?: JournalOrderByWithRelationInput | JournalOrderByWithRelationInput[]
    cursor?: JournalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JournalScalarFieldEnum | JournalScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserConnection
   */

  export type AggregateUserConnection = {
    _count: UserConnectionCountAggregateOutputType | null
    _min: UserConnectionMinAggregateOutputType | null
    _max: UserConnectionMaxAggregateOutputType | null
  }

  export type UserConnectionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    identifier: string | null
    connectedAt: Date | null
  }

  export type UserConnectionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: string | null
    identifier: string | null
    connectedAt: Date | null
  }

  export type UserConnectionCountAggregateOutputType = {
    id: number
    userId: number
    provider: number
    identifier: number
    metadata: number
    connectedAt: number
    _all: number
  }


  export type UserConnectionMinAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    identifier?: true
    connectedAt?: true
  }

  export type UserConnectionMaxAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    identifier?: true
    connectedAt?: true
  }

  export type UserConnectionCountAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    identifier?: true
    metadata?: true
    connectedAt?: true
    _all?: true
  }

  export type UserConnectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserConnection to aggregate.
     */
    where?: UserConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserConnections to fetch.
     */
    orderBy?: UserConnectionOrderByWithRelationInput | UserConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserConnections
    **/
    _count?: true | UserConnectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserConnectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserConnectionMaxAggregateInputType
  }

  export type GetUserConnectionAggregateType<T extends UserConnectionAggregateArgs> = {
        [P in keyof T & keyof AggregateUserConnection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserConnection[P]>
      : GetScalarType<T[P], AggregateUserConnection[P]>
  }




  export type UserConnectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserConnectionWhereInput
    orderBy?: UserConnectionOrderByWithAggregationInput | UserConnectionOrderByWithAggregationInput[]
    by: UserConnectionScalarFieldEnum[] | UserConnectionScalarFieldEnum
    having?: UserConnectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserConnectionCountAggregateInputType | true
    _min?: UserConnectionMinAggregateInputType
    _max?: UserConnectionMaxAggregateInputType
  }

  export type UserConnectionGroupByOutputType = {
    id: string
    userId: string
    provider: string
    identifier: string
    metadata: JsonValue | null
    connectedAt: Date
    _count: UserConnectionCountAggregateOutputType | null
    _min: UserConnectionMinAggregateOutputType | null
    _max: UserConnectionMaxAggregateOutputType | null
  }

  type GetUserConnectionGroupByPayload<T extends UserConnectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserConnectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserConnectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserConnectionGroupByOutputType[P]>
            : GetScalarType<T[P], UserConnectionGroupByOutputType[P]>
        }
      >
    >


  export type UserConnectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    identifier?: boolean
    metadata?: boolean
    connectedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userConnection"]>

  export type UserConnectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    identifier?: boolean
    metadata?: boolean
    connectedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userConnection"]>

  export type UserConnectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    identifier?: boolean
    metadata?: boolean
    connectedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userConnection"]>

  export type UserConnectionSelectScalar = {
    id?: boolean
    userId?: boolean
    provider?: boolean
    identifier?: boolean
    metadata?: boolean
    connectedAt?: boolean
  }

  export type UserConnectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "provider" | "identifier" | "metadata" | "connectedAt", ExtArgs["result"]["userConnection"]>
  export type UserConnectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserConnectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserConnectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserConnectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserConnection"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      provider: string
      identifier: string
      metadata: Prisma.JsonValue | null
      connectedAt: Date
    }, ExtArgs["result"]["userConnection"]>
    composites: {}
  }

  type UserConnectionGetPayload<S extends boolean | null | undefined | UserConnectionDefaultArgs> = $Result.GetResult<Prisma.$UserConnectionPayload, S>

  type UserConnectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserConnectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserConnectionCountAggregateInputType | true
    }

  export interface UserConnectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserConnection'], meta: { name: 'UserConnection' } }
    /**
     * Find zero or one UserConnection that matches the filter.
     * @param {UserConnectionFindUniqueArgs} args - Arguments to find a UserConnection
     * @example
     * // Get one UserConnection
     * const userConnection = await prisma.userConnection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserConnectionFindUniqueArgs>(args: SelectSubset<T, UserConnectionFindUniqueArgs<ExtArgs>>): Prisma__UserConnectionClient<$Result.GetResult<Prisma.$UserConnectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserConnection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserConnectionFindUniqueOrThrowArgs} args - Arguments to find a UserConnection
     * @example
     * // Get one UserConnection
     * const userConnection = await prisma.userConnection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserConnectionFindUniqueOrThrowArgs>(args: SelectSubset<T, UserConnectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserConnectionClient<$Result.GetResult<Prisma.$UserConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserConnection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserConnectionFindFirstArgs} args - Arguments to find a UserConnection
     * @example
     * // Get one UserConnection
     * const userConnection = await prisma.userConnection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserConnectionFindFirstArgs>(args?: SelectSubset<T, UserConnectionFindFirstArgs<ExtArgs>>): Prisma__UserConnectionClient<$Result.GetResult<Prisma.$UserConnectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserConnection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserConnectionFindFirstOrThrowArgs} args - Arguments to find a UserConnection
     * @example
     * // Get one UserConnection
     * const userConnection = await prisma.userConnection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserConnectionFindFirstOrThrowArgs>(args?: SelectSubset<T, UserConnectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserConnectionClient<$Result.GetResult<Prisma.$UserConnectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserConnections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserConnectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserConnections
     * const userConnections = await prisma.userConnection.findMany()
     * 
     * // Get first 10 UserConnections
     * const userConnections = await prisma.userConnection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userConnectionWithIdOnly = await prisma.userConnection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserConnectionFindManyArgs>(args?: SelectSubset<T, UserConnectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserConnection.
     * @param {UserConnectionCreateArgs} args - Arguments to create a UserConnection.
     * @example
     * // Create one UserConnection
     * const UserConnection = await prisma.userConnection.create({
     *   data: {
     *     // ... data to create a UserConnection
     *   }
     * })
     * 
     */
    create<T extends UserConnectionCreateArgs>(args: SelectSubset<T, UserConnectionCreateArgs<ExtArgs>>): Prisma__UserConnectionClient<$Result.GetResult<Prisma.$UserConnectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserConnections.
     * @param {UserConnectionCreateManyArgs} args - Arguments to create many UserConnections.
     * @example
     * // Create many UserConnections
     * const userConnection = await prisma.userConnection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserConnectionCreateManyArgs>(args?: SelectSubset<T, UserConnectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserConnections and returns the data saved in the database.
     * @param {UserConnectionCreateManyAndReturnArgs} args - Arguments to create many UserConnections.
     * @example
     * // Create many UserConnections
     * const userConnection = await prisma.userConnection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserConnections and only return the `id`
     * const userConnectionWithIdOnly = await prisma.userConnection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserConnectionCreateManyAndReturnArgs>(args?: SelectSubset<T, UserConnectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserConnectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserConnection.
     * @param {UserConnectionDeleteArgs} args - Arguments to delete one UserConnection.
     * @example
     * // Delete one UserConnection
     * const UserConnection = await prisma.userConnection.delete({
     *   where: {
     *     // ... filter to delete one UserConnection
     *   }
     * })
     * 
     */
    delete<T extends UserConnectionDeleteArgs>(args: SelectSubset<T, UserConnectionDeleteArgs<ExtArgs>>): Prisma__UserConnectionClient<$Result.GetResult<Prisma.$UserConnectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserConnection.
     * @param {UserConnectionUpdateArgs} args - Arguments to update one UserConnection.
     * @example
     * // Update one UserConnection
     * const userConnection = await prisma.userConnection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserConnectionUpdateArgs>(args: SelectSubset<T, UserConnectionUpdateArgs<ExtArgs>>): Prisma__UserConnectionClient<$Result.GetResult<Prisma.$UserConnectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserConnections.
     * @param {UserConnectionDeleteManyArgs} args - Arguments to filter UserConnections to delete.
     * @example
     * // Delete a few UserConnections
     * const { count } = await prisma.userConnection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserConnectionDeleteManyArgs>(args?: SelectSubset<T, UserConnectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserConnectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserConnections
     * const userConnection = await prisma.userConnection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserConnectionUpdateManyArgs>(args: SelectSubset<T, UserConnectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserConnections and returns the data updated in the database.
     * @param {UserConnectionUpdateManyAndReturnArgs} args - Arguments to update many UserConnections.
     * @example
     * // Update many UserConnections
     * const userConnection = await prisma.userConnection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserConnections and only return the `id`
     * const userConnectionWithIdOnly = await prisma.userConnection.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserConnectionUpdateManyAndReturnArgs>(args: SelectSubset<T, UserConnectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserConnectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserConnection.
     * @param {UserConnectionUpsertArgs} args - Arguments to update or create a UserConnection.
     * @example
     * // Update or create a UserConnection
     * const userConnection = await prisma.userConnection.upsert({
     *   create: {
     *     // ... data to create a UserConnection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserConnection we want to update
     *   }
     * })
     */
    upsert<T extends UserConnectionUpsertArgs>(args: SelectSubset<T, UserConnectionUpsertArgs<ExtArgs>>): Prisma__UserConnectionClient<$Result.GetResult<Prisma.$UserConnectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserConnectionCountArgs} args - Arguments to filter UserConnections to count.
     * @example
     * // Count the number of UserConnections
     * const count = await prisma.userConnection.count({
     *   where: {
     *     // ... the filter for the UserConnections we want to count
     *   }
     * })
    **/
    count<T extends UserConnectionCountArgs>(
      args?: Subset<T, UserConnectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserConnectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserConnectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserConnectionAggregateArgs>(args: Subset<T, UserConnectionAggregateArgs>): Prisma.PrismaPromise<GetUserConnectionAggregateType<T>>

    /**
     * Group by UserConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserConnectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserConnectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserConnectionGroupByArgs['orderBy'] }
        : { orderBy?: UserConnectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserConnectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserConnectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserConnection model
   */
  readonly fields: UserConnectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserConnection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserConnectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserConnection model
   */
  interface UserConnectionFieldRefs {
    readonly id: FieldRef<"UserConnection", 'String'>
    readonly userId: FieldRef<"UserConnection", 'String'>
    readonly provider: FieldRef<"UserConnection", 'String'>
    readonly identifier: FieldRef<"UserConnection", 'String'>
    readonly metadata: FieldRef<"UserConnection", 'Json'>
    readonly connectedAt: FieldRef<"UserConnection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserConnection findUnique
   */
  export type UserConnectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserConnection
     */
    select?: UserConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserConnection
     */
    omit?: UserConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserConnectionInclude<ExtArgs> | null
    /**
     * Filter, which UserConnection to fetch.
     */
    where: UserConnectionWhereUniqueInput
  }

  /**
   * UserConnection findUniqueOrThrow
   */
  export type UserConnectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserConnection
     */
    select?: UserConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserConnection
     */
    omit?: UserConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserConnectionInclude<ExtArgs> | null
    /**
     * Filter, which UserConnection to fetch.
     */
    where: UserConnectionWhereUniqueInput
  }

  /**
   * UserConnection findFirst
   */
  export type UserConnectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserConnection
     */
    select?: UserConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserConnection
     */
    omit?: UserConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserConnectionInclude<ExtArgs> | null
    /**
     * Filter, which UserConnection to fetch.
     */
    where?: UserConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserConnections to fetch.
     */
    orderBy?: UserConnectionOrderByWithRelationInput | UserConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserConnections.
     */
    cursor?: UserConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserConnections.
     */
    distinct?: UserConnectionScalarFieldEnum | UserConnectionScalarFieldEnum[]
  }

  /**
   * UserConnection findFirstOrThrow
   */
  export type UserConnectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserConnection
     */
    select?: UserConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserConnection
     */
    omit?: UserConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserConnectionInclude<ExtArgs> | null
    /**
     * Filter, which UserConnection to fetch.
     */
    where?: UserConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserConnections to fetch.
     */
    orderBy?: UserConnectionOrderByWithRelationInput | UserConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserConnections.
     */
    cursor?: UserConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserConnections.
     */
    distinct?: UserConnectionScalarFieldEnum | UserConnectionScalarFieldEnum[]
  }

  /**
   * UserConnection findMany
   */
  export type UserConnectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserConnection
     */
    select?: UserConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserConnection
     */
    omit?: UserConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserConnectionInclude<ExtArgs> | null
    /**
     * Filter, which UserConnections to fetch.
     */
    where?: UserConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserConnections to fetch.
     */
    orderBy?: UserConnectionOrderByWithRelationInput | UserConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserConnections.
     */
    cursor?: UserConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserConnections.
     */
    distinct?: UserConnectionScalarFieldEnum | UserConnectionScalarFieldEnum[]
  }

  /**
   * UserConnection create
   */
  export type UserConnectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserConnection
     */
    select?: UserConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserConnection
     */
    omit?: UserConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserConnectionInclude<ExtArgs> | null
    /**
     * The data needed to create a UserConnection.
     */
    data: XOR<UserConnectionCreateInput, UserConnectionUncheckedCreateInput>
  }

  /**
   * UserConnection createMany
   */
  export type UserConnectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserConnections.
     */
    data: UserConnectionCreateManyInput | UserConnectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserConnection createManyAndReturn
   */
  export type UserConnectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserConnection
     */
    select?: UserConnectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserConnection
     */
    omit?: UserConnectionOmit<ExtArgs> | null
    /**
     * The data used to create many UserConnections.
     */
    data: UserConnectionCreateManyInput | UserConnectionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserConnectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserConnection update
   */
  export type UserConnectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserConnection
     */
    select?: UserConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserConnection
     */
    omit?: UserConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserConnectionInclude<ExtArgs> | null
    /**
     * The data needed to update a UserConnection.
     */
    data: XOR<UserConnectionUpdateInput, UserConnectionUncheckedUpdateInput>
    /**
     * Choose, which UserConnection to update.
     */
    where: UserConnectionWhereUniqueInput
  }

  /**
   * UserConnection updateMany
   */
  export type UserConnectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserConnections.
     */
    data: XOR<UserConnectionUpdateManyMutationInput, UserConnectionUncheckedUpdateManyInput>
    /**
     * Filter which UserConnections to update
     */
    where?: UserConnectionWhereInput
    /**
     * Limit how many UserConnections to update.
     */
    limit?: number
  }

  /**
   * UserConnection updateManyAndReturn
   */
  export type UserConnectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserConnection
     */
    select?: UserConnectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserConnection
     */
    omit?: UserConnectionOmit<ExtArgs> | null
    /**
     * The data used to update UserConnections.
     */
    data: XOR<UserConnectionUpdateManyMutationInput, UserConnectionUncheckedUpdateManyInput>
    /**
     * Filter which UserConnections to update
     */
    where?: UserConnectionWhereInput
    /**
     * Limit how many UserConnections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserConnectionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserConnection upsert
   */
  export type UserConnectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserConnection
     */
    select?: UserConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserConnection
     */
    omit?: UserConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserConnectionInclude<ExtArgs> | null
    /**
     * The filter to search for the UserConnection to update in case it exists.
     */
    where: UserConnectionWhereUniqueInput
    /**
     * In case the UserConnection found by the `where` argument doesn't exist, create a new UserConnection with this data.
     */
    create: XOR<UserConnectionCreateInput, UserConnectionUncheckedCreateInput>
    /**
     * In case the UserConnection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserConnectionUpdateInput, UserConnectionUncheckedUpdateInput>
  }

  /**
   * UserConnection delete
   */
  export type UserConnectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserConnection
     */
    select?: UserConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserConnection
     */
    omit?: UserConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserConnectionInclude<ExtArgs> | null
    /**
     * Filter which UserConnection to delete.
     */
    where: UserConnectionWhereUniqueInput
  }

  /**
   * UserConnection deleteMany
   */
  export type UserConnectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserConnections to delete
     */
    where?: UserConnectionWhereInput
    /**
     * Limit how many UserConnections to delete.
     */
    limit?: number
  }

  /**
   * UserConnection without action
   */
  export type UserConnectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserConnection
     */
    select?: UserConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserConnection
     */
    omit?: UserConnectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserConnectionInclude<ExtArgs> | null
  }


  /**
   * Model UserStats
   */

  export type AggregateUserStats = {
    _count: UserStatsCountAggregateOutputType | null
    _avg: UserStatsAvgAggregateOutputType | null
    _sum: UserStatsSumAggregateOutputType | null
    _min: UserStatsMinAggregateOutputType | null
    _max: UserStatsMaxAggregateOutputType | null
  }

  export type UserStatsAvgAggregateOutputType = {
    xp: number | null
    level: number | null
    streak: number | null
  }

  export type UserStatsSumAggregateOutputType = {
    xp: number | null
    level: number | null
    streak: number | null
  }

  export type UserStatsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    xp: number | null
    level: number | null
    title: string | null
    streak: number | null
    lastActivityDate: Date | null
  }

  export type UserStatsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    xp: number | null
    level: number | null
    title: string | null
    streak: number | null
    lastActivityDate: Date | null
  }

  export type UserStatsCountAggregateOutputType = {
    id: number
    userId: number
    xp: number
    level: number
    title: number
    streak: number
    lastActivityDate: number
    achievements: number
    _all: number
  }


  export type UserStatsAvgAggregateInputType = {
    xp?: true
    level?: true
    streak?: true
  }

  export type UserStatsSumAggregateInputType = {
    xp?: true
    level?: true
    streak?: true
  }

  export type UserStatsMinAggregateInputType = {
    id?: true
    userId?: true
    xp?: true
    level?: true
    title?: true
    streak?: true
    lastActivityDate?: true
  }

  export type UserStatsMaxAggregateInputType = {
    id?: true
    userId?: true
    xp?: true
    level?: true
    title?: true
    streak?: true
    lastActivityDate?: true
  }

  export type UserStatsCountAggregateInputType = {
    id?: true
    userId?: true
    xp?: true
    level?: true
    title?: true
    streak?: true
    lastActivityDate?: true
    achievements?: true
    _all?: true
  }

  export type UserStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserStats to aggregate.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserStats
    **/
    _count?: true | UserStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserStatsMaxAggregateInputType
  }

  export type GetUserStatsAggregateType<T extends UserStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateUserStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserStats[P]>
      : GetScalarType<T[P], AggregateUserStats[P]>
  }




  export type UserStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserStatsWhereInput
    orderBy?: UserStatsOrderByWithAggregationInput | UserStatsOrderByWithAggregationInput[]
    by: UserStatsScalarFieldEnum[] | UserStatsScalarFieldEnum
    having?: UserStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserStatsCountAggregateInputType | true
    _avg?: UserStatsAvgAggregateInputType
    _sum?: UserStatsSumAggregateInputType
    _min?: UserStatsMinAggregateInputType
    _max?: UserStatsMaxAggregateInputType
  }

  export type UserStatsGroupByOutputType = {
    id: string
    userId: string
    xp: number
    level: number
    title: string
    streak: number
    lastActivityDate: Date
    achievements: string[]
    _count: UserStatsCountAggregateOutputType | null
    _avg: UserStatsAvgAggregateOutputType | null
    _sum: UserStatsSumAggregateOutputType | null
    _min: UserStatsMinAggregateOutputType | null
    _max: UserStatsMaxAggregateOutputType | null
  }

  type GetUserStatsGroupByPayload<T extends UserStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserStatsGroupByOutputType[P]>
            : GetScalarType<T[P], UserStatsGroupByOutputType[P]>
        }
      >
    >


  export type UserStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    xp?: boolean
    level?: boolean
    title?: boolean
    streak?: boolean
    lastActivityDate?: boolean
    achievements?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStats"]>

  export type UserStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    xp?: boolean
    level?: boolean
    title?: boolean
    streak?: boolean
    lastActivityDate?: boolean
    achievements?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStats"]>

  export type UserStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    xp?: boolean
    level?: boolean
    title?: boolean
    streak?: boolean
    lastActivityDate?: boolean
    achievements?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userStats"]>

  export type UserStatsSelectScalar = {
    id?: boolean
    userId?: boolean
    xp?: boolean
    level?: boolean
    title?: boolean
    streak?: boolean
    lastActivityDate?: boolean
    achievements?: boolean
  }

  export type UserStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "xp" | "level" | "title" | "streak" | "lastActivityDate" | "achievements", ExtArgs["result"]["userStats"]>
  export type UserStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserStatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserStats"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      xp: number
      level: number
      title: string
      streak: number
      lastActivityDate: Date
      achievements: string[]
    }, ExtArgs["result"]["userStats"]>
    composites: {}
  }

  type UserStatsGetPayload<S extends boolean | null | undefined | UserStatsDefaultArgs> = $Result.GetResult<Prisma.$UserStatsPayload, S>

  type UserStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserStatsCountAggregateInputType | true
    }

  export interface UserStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserStats'], meta: { name: 'UserStats' } }
    /**
     * Find zero or one UserStats that matches the filter.
     * @param {UserStatsFindUniqueArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserStatsFindUniqueArgs>(args: SelectSubset<T, UserStatsFindUniqueArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserStatsFindUniqueOrThrowArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, UserStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsFindFirstArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserStatsFindFirstArgs>(args?: SelectSubset<T, UserStatsFindFirstArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsFindFirstOrThrowArgs} args - Arguments to find a UserStats
     * @example
     * // Get one UserStats
     * const userStats = await prisma.userStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, UserStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserStats
     * const userStats = await prisma.userStats.findMany()
     * 
     * // Get first 10 UserStats
     * const userStats = await prisma.userStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userStatsWithIdOnly = await prisma.userStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserStatsFindManyArgs>(args?: SelectSubset<T, UserStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserStats.
     * @param {UserStatsCreateArgs} args - Arguments to create a UserStats.
     * @example
     * // Create one UserStats
     * const UserStats = await prisma.userStats.create({
     *   data: {
     *     // ... data to create a UserStats
     *   }
     * })
     * 
     */
    create<T extends UserStatsCreateArgs>(args: SelectSubset<T, UserStatsCreateArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserStats.
     * @param {UserStatsCreateManyArgs} args - Arguments to create many UserStats.
     * @example
     * // Create many UserStats
     * const userStats = await prisma.userStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserStatsCreateManyArgs>(args?: SelectSubset<T, UserStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserStats and returns the data saved in the database.
     * @param {UserStatsCreateManyAndReturnArgs} args - Arguments to create many UserStats.
     * @example
     * // Create many UserStats
     * const userStats = await prisma.userStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserStats and only return the `id`
     * const userStatsWithIdOnly = await prisma.userStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, UserStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserStats.
     * @param {UserStatsDeleteArgs} args - Arguments to delete one UserStats.
     * @example
     * // Delete one UserStats
     * const UserStats = await prisma.userStats.delete({
     *   where: {
     *     // ... filter to delete one UserStats
     *   }
     * })
     * 
     */
    delete<T extends UserStatsDeleteArgs>(args: SelectSubset<T, UserStatsDeleteArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserStats.
     * @param {UserStatsUpdateArgs} args - Arguments to update one UserStats.
     * @example
     * // Update one UserStats
     * const userStats = await prisma.userStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserStatsUpdateArgs>(args: SelectSubset<T, UserStatsUpdateArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserStats.
     * @param {UserStatsDeleteManyArgs} args - Arguments to filter UserStats to delete.
     * @example
     * // Delete a few UserStats
     * const { count } = await prisma.userStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserStatsDeleteManyArgs>(args?: SelectSubset<T, UserStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserStats
     * const userStats = await prisma.userStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserStatsUpdateManyArgs>(args: SelectSubset<T, UserStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserStats and returns the data updated in the database.
     * @param {UserStatsUpdateManyAndReturnArgs} args - Arguments to update many UserStats.
     * @example
     * // Update many UserStats
     * const userStats = await prisma.userStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserStats and only return the `id`
     * const userStatsWithIdOnly = await prisma.userStats.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, UserStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserStats.
     * @param {UserStatsUpsertArgs} args - Arguments to update or create a UserStats.
     * @example
     * // Update or create a UserStats
     * const userStats = await prisma.userStats.upsert({
     *   create: {
     *     // ... data to create a UserStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserStats we want to update
     *   }
     * })
     */
    upsert<T extends UserStatsUpsertArgs>(args: SelectSubset<T, UserStatsUpsertArgs<ExtArgs>>): Prisma__UserStatsClient<$Result.GetResult<Prisma.$UserStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsCountArgs} args - Arguments to filter UserStats to count.
     * @example
     * // Count the number of UserStats
     * const count = await prisma.userStats.count({
     *   where: {
     *     // ... the filter for the UserStats we want to count
     *   }
     * })
    **/
    count<T extends UserStatsCountArgs>(
      args?: Subset<T, UserStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserStatsAggregateArgs>(args: Subset<T, UserStatsAggregateArgs>): Prisma.PrismaPromise<GetUserStatsAggregateType<T>>

    /**
     * Group by UserStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserStatsGroupByArgs['orderBy'] }
        : { orderBy?: UserStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserStats model
   */
  readonly fields: UserStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserStats model
   */
  interface UserStatsFieldRefs {
    readonly id: FieldRef<"UserStats", 'String'>
    readonly userId: FieldRef<"UserStats", 'String'>
    readonly xp: FieldRef<"UserStats", 'Int'>
    readonly level: FieldRef<"UserStats", 'Int'>
    readonly title: FieldRef<"UserStats", 'String'>
    readonly streak: FieldRef<"UserStats", 'Int'>
    readonly lastActivityDate: FieldRef<"UserStats", 'DateTime'>
    readonly achievements: FieldRef<"UserStats", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * UserStats findUnique
   */
  export type UserStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats findUniqueOrThrow
   */
  export type UserStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats findFirst
   */
  export type UserStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserStats.
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserStats.
     */
    distinct?: UserStatsScalarFieldEnum | UserStatsScalarFieldEnum[]
  }

  /**
   * UserStats findFirstOrThrow
   */
  export type UserStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserStats.
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserStats.
     */
    distinct?: UserStatsScalarFieldEnum | UserStatsScalarFieldEnum[]
  }

  /**
   * UserStats findMany
   */
  export type UserStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter, which UserStats to fetch.
     */
    where?: UserStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserStats to fetch.
     */
    orderBy?: UserStatsOrderByWithRelationInput | UserStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserStats.
     */
    cursor?: UserStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserStats.
     */
    distinct?: UserStatsScalarFieldEnum | UserStatsScalarFieldEnum[]
  }

  /**
   * UserStats create
   */
  export type UserStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a UserStats.
     */
    data: XOR<UserStatsCreateInput, UserStatsUncheckedCreateInput>
  }

  /**
   * UserStats createMany
   */
  export type UserStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserStats.
     */
    data: UserStatsCreateManyInput | UserStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserStats createManyAndReturn
   */
  export type UserStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * The data used to create many UserStats.
     */
    data: UserStatsCreateManyInput | UserStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserStats update
   */
  export type UserStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a UserStats.
     */
    data: XOR<UserStatsUpdateInput, UserStatsUncheckedUpdateInput>
    /**
     * Choose, which UserStats to update.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats updateMany
   */
  export type UserStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserStats.
     */
    data: XOR<UserStatsUpdateManyMutationInput, UserStatsUncheckedUpdateManyInput>
    /**
     * Filter which UserStats to update
     */
    where?: UserStatsWhereInput
    /**
     * Limit how many UserStats to update.
     */
    limit?: number
  }

  /**
   * UserStats updateManyAndReturn
   */
  export type UserStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * The data used to update UserStats.
     */
    data: XOR<UserStatsUpdateManyMutationInput, UserStatsUncheckedUpdateManyInput>
    /**
     * Filter which UserStats to update
     */
    where?: UserStatsWhereInput
    /**
     * Limit how many UserStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserStats upsert
   */
  export type UserStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the UserStats to update in case it exists.
     */
    where: UserStatsWhereUniqueInput
    /**
     * In case the UserStats found by the `where` argument doesn't exist, create a new UserStats with this data.
     */
    create: XOR<UserStatsCreateInput, UserStatsUncheckedCreateInput>
    /**
     * In case the UserStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserStatsUpdateInput, UserStatsUncheckedUpdateInput>
  }

  /**
   * UserStats delete
   */
  export type UserStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
    /**
     * Filter which UserStats to delete.
     */
    where: UserStatsWhereUniqueInput
  }

  /**
   * UserStats deleteMany
   */
  export type UserStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserStats to delete
     */
    where?: UserStatsWhereInput
    /**
     * Limit how many UserStats to delete.
     */
    limit?: number
  }

  /**
   * UserStats without action
   */
  export type UserStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserStats
     */
    select?: UserStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserStats
     */
    omit?: UserStatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserStatsInclude<ExtArgs> | null
  }


  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isSystem: boolean | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    isSystem: boolean | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    name: number
    description: number
    isSystem: number
    isDeleted: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoleMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isSystem?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isSystem?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    isSystem?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: string
    name: string
    description: string | null
    isSystem: boolean
    isDeleted: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isSystem?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Role$usersArgs<ExtArgs>
    permissions?: boolean | Role$permissionsArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isSystem?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    isSystem?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    isSystem?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "isSystem" | "isDeleted" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["role"]>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Role$usersArgs<ExtArgs>
    permissions?: boolean | Role$permissionsArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      permissions: Prisma.$PermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      isSystem: boolean
      isDeleted: boolean
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {RoleCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {RoleUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoleUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Role$usersArgs<ExtArgs> = {}>(args?: Subset<T, Role$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    permissions<T extends Role$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, Role$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'String'>
    readonly name: FieldRef<"Role", 'String'>
    readonly description: FieldRef<"Role", 'String'>
    readonly isSystem: FieldRef<"Role", 'Boolean'>
    readonly isDeleted: FieldRef<"Role", 'Boolean'>
    readonly deletedAt: FieldRef<"Role", 'DateTime'>
    readonly createdAt: FieldRef<"Role", 'DateTime'>
    readonly updatedAt: FieldRef<"Role", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role createManyAndReturn
   */
  export type RoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role updateManyAndReturn
   */
  export type RoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Role.users
   */
  export type Role$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Role.permissions
   */
  export type Role$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    where?: PermissionWhereInput
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    cursor?: PermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model Permission
   */

  export type AggregatePermission = {
    _count: PermissionCountAggregateOutputType | null
    _min: PermissionMinAggregateOutputType | null
    _max: PermissionMaxAggregateOutputType | null
  }

  export type PermissionMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    resource: string | null
    action: string | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PermissionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    resource: string | null
    action: string | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PermissionCountAggregateOutputType = {
    id: number
    name: number
    description: number
    resource: number
    action: number
    isDeleted: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PermissionMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    resource?: true
    action?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PermissionMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    resource?: true
    action?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PermissionCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    resource?: true
    action?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permission to aggregate.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Permissions
    **/
    _count?: true | PermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermissionMaxAggregateInputType
  }

  export type GetPermissionAggregateType<T extends PermissionAggregateArgs> = {
        [P in keyof T & keyof AggregatePermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermission[P]>
      : GetScalarType<T[P], AggregatePermission[P]>
  }




  export type PermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionWhereInput
    orderBy?: PermissionOrderByWithAggregationInput | PermissionOrderByWithAggregationInput[]
    by: PermissionScalarFieldEnum[] | PermissionScalarFieldEnum
    having?: PermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermissionCountAggregateInputType | true
    _min?: PermissionMinAggregateInputType
    _max?: PermissionMaxAggregateInputType
  }

  export type PermissionGroupByOutputType = {
    id: string
    name: string
    description: string | null
    resource: string
    action: string
    isDeleted: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PermissionCountAggregateOutputType | null
    _min: PermissionMinAggregateOutputType | null
    _max: PermissionMaxAggregateOutputType | null
  }

  type GetPermissionGroupByPayload<T extends PermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermissionGroupByOutputType[P]>
            : GetScalarType<T[P], PermissionGroupByOutputType[P]>
        }
      >
    >


  export type PermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    resource?: boolean
    action?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roles?: boolean | Permission$rolesArgs<ExtArgs>
    _count?: boolean | PermissionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    resource?: boolean
    action?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    resource?: boolean
    action?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    resource?: boolean
    action?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "resource" | "action" | "isDeleted" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["permission"]>
  export type PermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | Permission$rolesArgs<ExtArgs>
    _count?: boolean | PermissionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Permission"
    objects: {
      roles: Prisma.$RolePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      resource: string
      action: string
      isDeleted: boolean
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["permission"]>
    composites: {}
  }

  type PermissionGetPayload<S extends boolean | null | undefined | PermissionDefaultArgs> = $Result.GetResult<Prisma.$PermissionPayload, S>

  type PermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PermissionCountAggregateInputType | true
    }

  export interface PermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Permission'], meta: { name: 'Permission' } }
    /**
     * Find zero or one Permission that matches the filter.
     * @param {PermissionFindUniqueArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermissionFindUniqueArgs>(args: SelectSubset<T, PermissionFindUniqueArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Permission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PermissionFindUniqueOrThrowArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, PermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindFirstArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermissionFindFirstArgs>(args?: SelectSubset<T, PermissionFindFirstArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindFirstOrThrowArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, PermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Permissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Permissions
     * const permissions = await prisma.permission.findMany()
     * 
     * // Get first 10 Permissions
     * const permissions = await prisma.permission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const permissionWithIdOnly = await prisma.permission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PermissionFindManyArgs>(args?: SelectSubset<T, PermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Permission.
     * @param {PermissionCreateArgs} args - Arguments to create a Permission.
     * @example
     * // Create one Permission
     * const Permission = await prisma.permission.create({
     *   data: {
     *     // ... data to create a Permission
     *   }
     * })
     * 
     */
    create<T extends PermissionCreateArgs>(args: SelectSubset<T, PermissionCreateArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Permissions.
     * @param {PermissionCreateManyArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permission = await prisma.permission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermissionCreateManyArgs>(args?: SelectSubset<T, PermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Permissions and returns the data saved in the database.
     * @param {PermissionCreateManyAndReturnArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permission = await prisma.permission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Permissions and only return the `id`
     * const permissionWithIdOnly = await prisma.permission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, PermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Permission.
     * @param {PermissionDeleteArgs} args - Arguments to delete one Permission.
     * @example
     * // Delete one Permission
     * const Permission = await prisma.permission.delete({
     *   where: {
     *     // ... filter to delete one Permission
     *   }
     * })
     * 
     */
    delete<T extends PermissionDeleteArgs>(args: SelectSubset<T, PermissionDeleteArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Permission.
     * @param {PermissionUpdateArgs} args - Arguments to update one Permission.
     * @example
     * // Update one Permission
     * const permission = await prisma.permission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermissionUpdateArgs>(args: SelectSubset<T, PermissionUpdateArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Permissions.
     * @param {PermissionDeleteManyArgs} args - Arguments to filter Permissions to delete.
     * @example
     * // Delete a few Permissions
     * const { count } = await prisma.permission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermissionDeleteManyArgs>(args?: SelectSubset<T, PermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Permissions
     * const permission = await prisma.permission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermissionUpdateManyArgs>(args: SelectSubset<T, PermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissions and returns the data updated in the database.
     * @param {PermissionUpdateManyAndReturnArgs} args - Arguments to update many Permissions.
     * @example
     * // Update many Permissions
     * const permission = await prisma.permission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Permissions and only return the `id`
     * const permissionWithIdOnly = await prisma.permission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, PermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Permission.
     * @param {PermissionUpsertArgs} args - Arguments to update or create a Permission.
     * @example
     * // Update or create a Permission
     * const permission = await prisma.permission.upsert({
     *   create: {
     *     // ... data to create a Permission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Permission we want to update
     *   }
     * })
     */
    upsert<T extends PermissionUpsertArgs>(args: SelectSubset<T, PermissionUpsertArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionCountArgs} args - Arguments to filter Permissions to count.
     * @example
     * // Count the number of Permissions
     * const count = await prisma.permission.count({
     *   where: {
     *     // ... the filter for the Permissions we want to count
     *   }
     * })
    **/
    count<T extends PermissionCountArgs>(
      args?: Subset<T, PermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Permission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PermissionAggregateArgs>(args: Subset<T, PermissionAggregateArgs>): Prisma.PrismaPromise<GetPermissionAggregateType<T>>

    /**
     * Group by Permission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermissionGroupByArgs['orderBy'] }
        : { orderBy?: PermissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Permission model
   */
  readonly fields: PermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Permission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roles<T extends Permission$rolesArgs<ExtArgs> = {}>(args?: Subset<T, Permission$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Permission model
   */
  interface PermissionFieldRefs {
    readonly id: FieldRef<"Permission", 'String'>
    readonly name: FieldRef<"Permission", 'String'>
    readonly description: FieldRef<"Permission", 'String'>
    readonly resource: FieldRef<"Permission", 'String'>
    readonly action: FieldRef<"Permission", 'String'>
    readonly isDeleted: FieldRef<"Permission", 'Boolean'>
    readonly deletedAt: FieldRef<"Permission", 'DateTime'>
    readonly createdAt: FieldRef<"Permission", 'DateTime'>
    readonly updatedAt: FieldRef<"Permission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Permission findUnique
   */
  export type PermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission findUniqueOrThrow
   */
  export type PermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission findFirst
   */
  export type PermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission findFirstOrThrow
   */
  export type PermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission findMany
   */
  export type PermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permissions to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission create
   */
  export type PermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Permission.
     */
    data: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
  }

  /**
   * Permission createMany
   */
  export type PermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Permissions.
     */
    data: PermissionCreateManyInput | PermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Permission createManyAndReturn
   */
  export type PermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data used to create many Permissions.
     */
    data: PermissionCreateManyInput | PermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Permission update
   */
  export type PermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Permission.
     */
    data: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
    /**
     * Choose, which Permission to update.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission updateMany
   */
  export type PermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Permissions.
     */
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyInput>
    /**
     * Filter which Permissions to update
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to update.
     */
    limit?: number
  }

  /**
   * Permission updateManyAndReturn
   */
  export type PermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data used to update Permissions.
     */
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyInput>
    /**
     * Filter which Permissions to update
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to update.
     */
    limit?: number
  }

  /**
   * Permission upsert
   */
  export type PermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Permission to update in case it exists.
     */
    where: PermissionWhereUniqueInput
    /**
     * In case the Permission found by the `where` argument doesn't exist, create a new Permission with this data.
     */
    create: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
    /**
     * In case the Permission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
  }

  /**
   * Permission delete
   */
  export type PermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter which Permission to delete.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission deleteMany
   */
  export type PermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permissions to delete
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to delete.
     */
    limit?: number
  }

  /**
   * Permission.roles
   */
  export type Permission$rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    cursor?: RoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Permission without action
   */
  export type PermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogAvgAggregateOutputType = {
    statusCode: number | null
  }

  export type AuditLogSumAggregateOutputType = {
    statusCode: number | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    method: string | null
    statusCode: number | null
    path: string | null
    ip: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    method: string | null
    statusCode: number | null
    path: string | null
    ip: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    method: number
    statusCode: number
    path: number
    params: number
    query: number
    body: number
    ip: number
    userAgent: number
    createdAt: number
    _all: number
  }


  export type AuditLogAvgAggregateInputType = {
    statusCode?: true
  }

  export type AuditLogSumAggregateInputType = {
    statusCode?: true
  }

  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    method?: true
    statusCode?: true
    path?: true
    ip?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    method?: true
    statusCode?: true
    path?: true
    ip?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    method?: true
    statusCode?: true
    path?: true
    params?: true
    query?: true
    body?: true
    ip?: true
    userAgent?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _avg?: AuditLogAvgAggregateInputType
    _sum?: AuditLogSumAggregateInputType
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    userId: string | null
    action: string
    method: string | null
    statusCode: number | null
    path: string | null
    params: JsonValue | null
    query: JsonValue | null
    body: JsonValue | null
    ip: string | null
    userAgent: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    method?: boolean
    statusCode?: boolean
    path?: boolean
    params?: boolean
    query?: boolean
    body?: boolean
    ip?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    method?: boolean
    statusCode?: boolean
    path?: boolean
    params?: boolean
    query?: boolean
    body?: boolean
    ip?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    method?: boolean
    statusCode?: boolean
    path?: boolean
    params?: boolean
    query?: boolean
    body?: boolean
    ip?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    method?: boolean
    statusCode?: boolean
    path?: boolean
    params?: boolean
    query?: boolean
    body?: boolean
    ip?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "action" | "method" | "statusCode" | "path" | "params" | "query" | "body" | "ip" | "userAgent" | "createdAt", ExtArgs["result"]["auditLog"]>

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      action: string
      method: string | null
      statusCode: number | null
      path: string | null
      params: Prisma.JsonValue | null
      query: Prisma.JsonValue | null
      body: Prisma.JsonValue | null
      ip: string | null
      userAgent: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly method: FieldRef<"AuditLog", 'String'>
    readonly statusCode: FieldRef<"AuditLog", 'Int'>
    readonly path: FieldRef<"AuditLog", 'String'>
    readonly params: FieldRef<"AuditLog", 'Json'>
    readonly query: FieldRef<"AuditLog", 'Json'>
    readonly body: FieldRef<"AuditLog", 'Json'>
    readonly ip: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    progress: number | null
  }

  export type ProjectSumAggregateOutputType = {
    progress: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: string | null
    isPinned: boolean | null
    progress: number | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    status: string | null
    isPinned: boolean | null
    progress: number | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    title: number
    description: number
    status: number
    tags: number
    isPinned: number
    progress: number
    githubStats: number
    taskBoard: number
    links: number
    logs: number
    metadata: number
    isDeleted: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    progress?: true
  }

  export type ProjectSumAggregateInputType = {
    progress?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    isPinned?: true
    progress?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    isPinned?: true
    progress?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    status?: true
    tags?: true
    isPinned?: true
    progress?: true
    githubStats?: true
    taskBoard?: true
    links?: true
    logs?: true
    metadata?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    title: string
    description: string | null
    status: string
    tags: string[]
    isPinned: boolean
    progress: number
    githubStats: JsonValue | null
    taskBoard: JsonValue | null
    links: JsonValue | null
    logs: JsonValue | null
    metadata: JsonValue | null
    isDeleted: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    tags?: boolean
    isPinned?: boolean
    progress?: boolean
    githubStats?: boolean
    taskBoard?: boolean
    links?: boolean
    logs?: boolean
    metadata?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    tags?: boolean
    isPinned?: boolean
    progress?: boolean
    githubStats?: boolean
    taskBoard?: boolean
    links?: boolean
    logs?: boolean
    metadata?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    tags?: boolean
    isPinned?: boolean
    progress?: boolean
    githubStats?: boolean
    taskBoard?: boolean
    links?: boolean
    logs?: boolean
    metadata?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    tags?: boolean
    isPinned?: boolean
    progress?: boolean
    githubStats?: boolean
    taskBoard?: boolean
    links?: boolean
    logs?: boolean
    metadata?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "status" | "tags" | "isPinned" | "progress" | "githubStats" | "taskBoard" | "links" | "logs" | "metadata" | "isDeleted" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      status: string
      tags: string[]
      isPinned: boolean
      progress: number
      githubStats: Prisma.JsonValue | null
      taskBoard: Prisma.JsonValue | null
      links: Prisma.JsonValue | null
      logs: Prisma.JsonValue | null
      metadata: Prisma.JsonValue | null
      isDeleted: boolean
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly title: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly status: FieldRef<"Project", 'String'>
    readonly tags: FieldRef<"Project", 'String[]'>
    readonly isPinned: FieldRef<"Project", 'Boolean'>
    readonly progress: FieldRef<"Project", 'Int'>
    readonly githubStats: FieldRef<"Project", 'Json'>
    readonly taskBoard: FieldRef<"Project", 'Json'>
    readonly links: FieldRef<"Project", 'Json'>
    readonly logs: FieldRef<"Project", 'Json'>
    readonly metadata: FieldRef<"Project", 'Json'>
    readonly isDeleted: FieldRef<"Project", 'Boolean'>
    readonly deletedAt: FieldRef<"Project", 'DateTime'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
  }


  /**
   * Model Journal
   */

  export type AggregateJournal = {
    _count: JournalCountAggregateOutputType | null
    _min: JournalMinAggregateOutputType | null
    _max: JournalMaxAggregateOutputType | null
  }

  export type JournalMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    mood: string | null
    type: string | null
    status: string | null
    source: string | null
    userId: string | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JournalMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    mood: string | null
    type: string | null
    status: string | null
    source: string | null
    userId: string | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JournalCountAggregateOutputType = {
    id: number
    title: number
    content: number
    mood: number
    tags: number
    type: number
    status: number
    source: number
    relations: number
    analysis: number
    userId: number
    isDeleted: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JournalMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    mood?: true
    type?: true
    status?: true
    source?: true
    userId?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JournalMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    mood?: true
    type?: true
    status?: true
    source?: true
    userId?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JournalCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    mood?: true
    tags?: true
    type?: true
    status?: true
    source?: true
    relations?: true
    analysis?: true
    userId?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JournalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Journal to aggregate.
     */
    where?: JournalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Journals to fetch.
     */
    orderBy?: JournalOrderByWithRelationInput | JournalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JournalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Journals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Journals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Journals
    **/
    _count?: true | JournalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JournalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JournalMaxAggregateInputType
  }

  export type GetJournalAggregateType<T extends JournalAggregateArgs> = {
        [P in keyof T & keyof AggregateJournal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJournal[P]>
      : GetScalarType<T[P], AggregateJournal[P]>
  }




  export type JournalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JournalWhereInput
    orderBy?: JournalOrderByWithAggregationInput | JournalOrderByWithAggregationInput[]
    by: JournalScalarFieldEnum[] | JournalScalarFieldEnum
    having?: JournalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JournalCountAggregateInputType | true
    _min?: JournalMinAggregateInputType
    _max?: JournalMaxAggregateInputType
  }

  export type JournalGroupByOutputType = {
    id: string
    title: string | null
    content: string
    mood: string | null
    tags: string[]
    type: string
    status: string
    source: string
    relations: JsonValue | null
    analysis: JsonValue | null
    userId: string | null
    isDeleted: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: JournalCountAggregateOutputType | null
    _min: JournalMinAggregateOutputType | null
    _max: JournalMaxAggregateOutputType | null
  }

  type GetJournalGroupByPayload<T extends JournalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JournalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JournalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JournalGroupByOutputType[P]>
            : GetScalarType<T[P], JournalGroupByOutputType[P]>
        }
      >
    >


  export type JournalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    mood?: boolean
    tags?: boolean
    type?: boolean
    status?: boolean
    source?: boolean
    relations?: boolean
    analysis?: boolean
    userId?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Journal$userArgs<ExtArgs>
  }, ExtArgs["result"]["journal"]>

  export type JournalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    mood?: boolean
    tags?: boolean
    type?: boolean
    status?: boolean
    source?: boolean
    relations?: boolean
    analysis?: boolean
    userId?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Journal$userArgs<ExtArgs>
  }, ExtArgs["result"]["journal"]>

  export type JournalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    mood?: boolean
    tags?: boolean
    type?: boolean
    status?: boolean
    source?: boolean
    relations?: boolean
    analysis?: boolean
    userId?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Journal$userArgs<ExtArgs>
  }, ExtArgs["result"]["journal"]>

  export type JournalSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    mood?: boolean
    tags?: boolean
    type?: boolean
    status?: boolean
    source?: boolean
    relations?: boolean
    analysis?: boolean
    userId?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JournalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "mood" | "tags" | "type" | "status" | "source" | "relations" | "analysis" | "userId" | "isDeleted" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["journal"]>
  export type JournalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Journal$userArgs<ExtArgs>
  }
  export type JournalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Journal$userArgs<ExtArgs>
  }
  export type JournalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Journal$userArgs<ExtArgs>
  }

  export type $JournalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Journal"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string | null
      content: string
      mood: string | null
      tags: string[]
      type: string
      status: string
      source: string
      relations: Prisma.JsonValue | null
      analysis: Prisma.JsonValue | null
      userId: string | null
      isDeleted: boolean
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["journal"]>
    composites: {}
  }

  type JournalGetPayload<S extends boolean | null | undefined | JournalDefaultArgs> = $Result.GetResult<Prisma.$JournalPayload, S>

  type JournalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JournalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JournalCountAggregateInputType | true
    }

  export interface JournalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Journal'], meta: { name: 'Journal' } }
    /**
     * Find zero or one Journal that matches the filter.
     * @param {JournalFindUniqueArgs} args - Arguments to find a Journal
     * @example
     * // Get one Journal
     * const journal = await prisma.journal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JournalFindUniqueArgs>(args: SelectSubset<T, JournalFindUniqueArgs<ExtArgs>>): Prisma__JournalClient<$Result.GetResult<Prisma.$JournalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Journal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JournalFindUniqueOrThrowArgs} args - Arguments to find a Journal
     * @example
     * // Get one Journal
     * const journal = await prisma.journal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JournalFindUniqueOrThrowArgs>(args: SelectSubset<T, JournalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JournalClient<$Result.GetResult<Prisma.$JournalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Journal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalFindFirstArgs} args - Arguments to find a Journal
     * @example
     * // Get one Journal
     * const journal = await prisma.journal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JournalFindFirstArgs>(args?: SelectSubset<T, JournalFindFirstArgs<ExtArgs>>): Prisma__JournalClient<$Result.GetResult<Prisma.$JournalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Journal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalFindFirstOrThrowArgs} args - Arguments to find a Journal
     * @example
     * // Get one Journal
     * const journal = await prisma.journal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JournalFindFirstOrThrowArgs>(args?: SelectSubset<T, JournalFindFirstOrThrowArgs<ExtArgs>>): Prisma__JournalClient<$Result.GetResult<Prisma.$JournalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Journals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Journals
     * const journals = await prisma.journal.findMany()
     * 
     * // Get first 10 Journals
     * const journals = await prisma.journal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const journalWithIdOnly = await prisma.journal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JournalFindManyArgs>(args?: SelectSubset<T, JournalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JournalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Journal.
     * @param {JournalCreateArgs} args - Arguments to create a Journal.
     * @example
     * // Create one Journal
     * const Journal = await prisma.journal.create({
     *   data: {
     *     // ... data to create a Journal
     *   }
     * })
     * 
     */
    create<T extends JournalCreateArgs>(args: SelectSubset<T, JournalCreateArgs<ExtArgs>>): Prisma__JournalClient<$Result.GetResult<Prisma.$JournalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Journals.
     * @param {JournalCreateManyArgs} args - Arguments to create many Journals.
     * @example
     * // Create many Journals
     * const journal = await prisma.journal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JournalCreateManyArgs>(args?: SelectSubset<T, JournalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Journals and returns the data saved in the database.
     * @param {JournalCreateManyAndReturnArgs} args - Arguments to create many Journals.
     * @example
     * // Create many Journals
     * const journal = await prisma.journal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Journals and only return the `id`
     * const journalWithIdOnly = await prisma.journal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JournalCreateManyAndReturnArgs>(args?: SelectSubset<T, JournalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JournalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Journal.
     * @param {JournalDeleteArgs} args - Arguments to delete one Journal.
     * @example
     * // Delete one Journal
     * const Journal = await prisma.journal.delete({
     *   where: {
     *     // ... filter to delete one Journal
     *   }
     * })
     * 
     */
    delete<T extends JournalDeleteArgs>(args: SelectSubset<T, JournalDeleteArgs<ExtArgs>>): Prisma__JournalClient<$Result.GetResult<Prisma.$JournalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Journal.
     * @param {JournalUpdateArgs} args - Arguments to update one Journal.
     * @example
     * // Update one Journal
     * const journal = await prisma.journal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JournalUpdateArgs>(args: SelectSubset<T, JournalUpdateArgs<ExtArgs>>): Prisma__JournalClient<$Result.GetResult<Prisma.$JournalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Journals.
     * @param {JournalDeleteManyArgs} args - Arguments to filter Journals to delete.
     * @example
     * // Delete a few Journals
     * const { count } = await prisma.journal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JournalDeleteManyArgs>(args?: SelectSubset<T, JournalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Journals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Journals
     * const journal = await prisma.journal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JournalUpdateManyArgs>(args: SelectSubset<T, JournalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Journals and returns the data updated in the database.
     * @param {JournalUpdateManyAndReturnArgs} args - Arguments to update many Journals.
     * @example
     * // Update many Journals
     * const journal = await prisma.journal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Journals and only return the `id`
     * const journalWithIdOnly = await prisma.journal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JournalUpdateManyAndReturnArgs>(args: SelectSubset<T, JournalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JournalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Journal.
     * @param {JournalUpsertArgs} args - Arguments to update or create a Journal.
     * @example
     * // Update or create a Journal
     * const journal = await prisma.journal.upsert({
     *   create: {
     *     // ... data to create a Journal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Journal we want to update
     *   }
     * })
     */
    upsert<T extends JournalUpsertArgs>(args: SelectSubset<T, JournalUpsertArgs<ExtArgs>>): Prisma__JournalClient<$Result.GetResult<Prisma.$JournalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Journals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalCountArgs} args - Arguments to filter Journals to count.
     * @example
     * // Count the number of Journals
     * const count = await prisma.journal.count({
     *   where: {
     *     // ... the filter for the Journals we want to count
     *   }
     * })
    **/
    count<T extends JournalCountArgs>(
      args?: Subset<T, JournalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JournalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Journal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JournalAggregateArgs>(args: Subset<T, JournalAggregateArgs>): Prisma.PrismaPromise<GetJournalAggregateType<T>>

    /**
     * Group by Journal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JournalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JournalGroupByArgs['orderBy'] }
        : { orderBy?: JournalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JournalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJournalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Journal model
   */
  readonly fields: JournalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Journal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JournalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Journal$userArgs<ExtArgs> = {}>(args?: Subset<T, Journal$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Journal model
   */
  interface JournalFieldRefs {
    readonly id: FieldRef<"Journal", 'String'>
    readonly title: FieldRef<"Journal", 'String'>
    readonly content: FieldRef<"Journal", 'String'>
    readonly mood: FieldRef<"Journal", 'String'>
    readonly tags: FieldRef<"Journal", 'String[]'>
    readonly type: FieldRef<"Journal", 'String'>
    readonly status: FieldRef<"Journal", 'String'>
    readonly source: FieldRef<"Journal", 'String'>
    readonly relations: FieldRef<"Journal", 'Json'>
    readonly analysis: FieldRef<"Journal", 'Json'>
    readonly userId: FieldRef<"Journal", 'String'>
    readonly isDeleted: FieldRef<"Journal", 'Boolean'>
    readonly deletedAt: FieldRef<"Journal", 'DateTime'>
    readonly createdAt: FieldRef<"Journal", 'DateTime'>
    readonly updatedAt: FieldRef<"Journal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Journal findUnique
   */
  export type JournalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Journal
     */
    select?: JournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Journal
     */
    omit?: JournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalInclude<ExtArgs> | null
    /**
     * Filter, which Journal to fetch.
     */
    where: JournalWhereUniqueInput
  }

  /**
   * Journal findUniqueOrThrow
   */
  export type JournalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Journal
     */
    select?: JournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Journal
     */
    omit?: JournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalInclude<ExtArgs> | null
    /**
     * Filter, which Journal to fetch.
     */
    where: JournalWhereUniqueInput
  }

  /**
   * Journal findFirst
   */
  export type JournalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Journal
     */
    select?: JournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Journal
     */
    omit?: JournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalInclude<ExtArgs> | null
    /**
     * Filter, which Journal to fetch.
     */
    where?: JournalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Journals to fetch.
     */
    orderBy?: JournalOrderByWithRelationInput | JournalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Journals.
     */
    cursor?: JournalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Journals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Journals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Journals.
     */
    distinct?: JournalScalarFieldEnum | JournalScalarFieldEnum[]
  }

  /**
   * Journal findFirstOrThrow
   */
  export type JournalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Journal
     */
    select?: JournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Journal
     */
    omit?: JournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalInclude<ExtArgs> | null
    /**
     * Filter, which Journal to fetch.
     */
    where?: JournalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Journals to fetch.
     */
    orderBy?: JournalOrderByWithRelationInput | JournalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Journals.
     */
    cursor?: JournalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Journals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Journals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Journals.
     */
    distinct?: JournalScalarFieldEnum | JournalScalarFieldEnum[]
  }

  /**
   * Journal findMany
   */
  export type JournalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Journal
     */
    select?: JournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Journal
     */
    omit?: JournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalInclude<ExtArgs> | null
    /**
     * Filter, which Journals to fetch.
     */
    where?: JournalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Journals to fetch.
     */
    orderBy?: JournalOrderByWithRelationInput | JournalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Journals.
     */
    cursor?: JournalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Journals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Journals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Journals.
     */
    distinct?: JournalScalarFieldEnum | JournalScalarFieldEnum[]
  }

  /**
   * Journal create
   */
  export type JournalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Journal
     */
    select?: JournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Journal
     */
    omit?: JournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalInclude<ExtArgs> | null
    /**
     * The data needed to create a Journal.
     */
    data: XOR<JournalCreateInput, JournalUncheckedCreateInput>
  }

  /**
   * Journal createMany
   */
  export type JournalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Journals.
     */
    data: JournalCreateManyInput | JournalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Journal createManyAndReturn
   */
  export type JournalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Journal
     */
    select?: JournalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Journal
     */
    omit?: JournalOmit<ExtArgs> | null
    /**
     * The data used to create many Journals.
     */
    data: JournalCreateManyInput | JournalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Journal update
   */
  export type JournalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Journal
     */
    select?: JournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Journal
     */
    omit?: JournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalInclude<ExtArgs> | null
    /**
     * The data needed to update a Journal.
     */
    data: XOR<JournalUpdateInput, JournalUncheckedUpdateInput>
    /**
     * Choose, which Journal to update.
     */
    where: JournalWhereUniqueInput
  }

  /**
   * Journal updateMany
   */
  export type JournalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Journals.
     */
    data: XOR<JournalUpdateManyMutationInput, JournalUncheckedUpdateManyInput>
    /**
     * Filter which Journals to update
     */
    where?: JournalWhereInput
    /**
     * Limit how many Journals to update.
     */
    limit?: number
  }

  /**
   * Journal updateManyAndReturn
   */
  export type JournalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Journal
     */
    select?: JournalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Journal
     */
    omit?: JournalOmit<ExtArgs> | null
    /**
     * The data used to update Journals.
     */
    data: XOR<JournalUpdateManyMutationInput, JournalUncheckedUpdateManyInput>
    /**
     * Filter which Journals to update
     */
    where?: JournalWhereInput
    /**
     * Limit how many Journals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Journal upsert
   */
  export type JournalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Journal
     */
    select?: JournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Journal
     */
    omit?: JournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalInclude<ExtArgs> | null
    /**
     * The filter to search for the Journal to update in case it exists.
     */
    where: JournalWhereUniqueInput
    /**
     * In case the Journal found by the `where` argument doesn't exist, create a new Journal with this data.
     */
    create: XOR<JournalCreateInput, JournalUncheckedCreateInput>
    /**
     * In case the Journal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JournalUpdateInput, JournalUncheckedUpdateInput>
  }

  /**
   * Journal delete
   */
  export type JournalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Journal
     */
    select?: JournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Journal
     */
    omit?: JournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalInclude<ExtArgs> | null
    /**
     * Filter which Journal to delete.
     */
    where: JournalWhereUniqueInput
  }

  /**
   * Journal deleteMany
   */
  export type JournalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Journals to delete
     */
    where?: JournalWhereInput
    /**
     * Limit how many Journals to delete.
     */
    limit?: number
  }

  /**
   * Journal.user
   */
  export type Journal$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Journal without action
   */
  export type JournalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Journal
     */
    select?: JournalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Journal
     */
    omit?: JournalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalInclude<ExtArgs> | null
  }


  /**
   * Model Memory
   */

  export type AggregateMemory = {
    _count: MemoryCountAggregateOutputType | null
    _min: MemoryMinAggregateOutputType | null
    _max: MemoryMaxAggregateOutputType | null
  }

  export type MemoryMinAggregateOutputType = {
    id: string | null
    mood: string | null
    status: string | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemoryMaxAggregateOutputType = {
    id: string | null
    mood: string | null
    status: string | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemoryCountAggregateOutputType = {
    id: number
    title: number
    content: number
    mood: number
    tags: number
    status: number
    isDeleted: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MemoryMinAggregateInputType = {
    id?: true
    mood?: true
    status?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemoryMaxAggregateInputType = {
    id?: true
    mood?: true
    status?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemoryCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    mood?: true
    tags?: true
    status?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MemoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Memory to aggregate.
     */
    where?: MemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memories to fetch.
     */
    orderBy?: MemoryOrderByWithRelationInput | MemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Memories
    **/
    _count?: true | MemoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemoryMaxAggregateInputType
  }

  export type GetMemoryAggregateType<T extends MemoryAggregateArgs> = {
        [P in keyof T & keyof AggregateMemory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemory[P]>
      : GetScalarType<T[P], AggregateMemory[P]>
  }




  export type MemoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemoryWhereInput
    orderBy?: MemoryOrderByWithAggregationInput | MemoryOrderByWithAggregationInput[]
    by: MemoryScalarFieldEnum[] | MemoryScalarFieldEnum
    having?: MemoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemoryCountAggregateInputType | true
    _min?: MemoryMinAggregateInputType
    _max?: MemoryMaxAggregateInputType
  }

  export type MemoryGroupByOutputType = {
    id: string
    title: JsonValue
    content: JsonValue
    mood: string | null
    tags: string[]
    status: string
    isDeleted: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: MemoryCountAggregateOutputType | null
    _min: MemoryMinAggregateOutputType | null
    _max: MemoryMaxAggregateOutputType | null
  }

  type GetMemoryGroupByPayload<T extends MemoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemoryGroupByOutputType[P]>
            : GetScalarType<T[P], MemoryGroupByOutputType[P]>
        }
      >
    >


  export type MemorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    mood?: boolean
    tags?: boolean
    status?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["memory"]>

  export type MemorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    mood?: boolean
    tags?: boolean
    status?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["memory"]>

  export type MemorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    mood?: boolean
    tags?: boolean
    status?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["memory"]>

  export type MemorySelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    mood?: boolean
    tags?: boolean
    status?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MemoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "mood" | "tags" | "status" | "isDeleted" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["memory"]>

  export type $MemoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Memory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: Prisma.JsonValue
      content: Prisma.JsonValue
      mood: string | null
      tags: string[]
      status: string
      isDeleted: boolean
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["memory"]>
    composites: {}
  }

  type MemoryGetPayload<S extends boolean | null | undefined | MemoryDefaultArgs> = $Result.GetResult<Prisma.$MemoryPayload, S>

  type MemoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemoryCountAggregateInputType | true
    }

  export interface MemoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Memory'], meta: { name: 'Memory' } }
    /**
     * Find zero or one Memory that matches the filter.
     * @param {MemoryFindUniqueArgs} args - Arguments to find a Memory
     * @example
     * // Get one Memory
     * const memory = await prisma.memory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemoryFindUniqueArgs>(args: SelectSubset<T, MemoryFindUniqueArgs<ExtArgs>>): Prisma__MemoryClient<$Result.GetResult<Prisma.$MemoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Memory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemoryFindUniqueOrThrowArgs} args - Arguments to find a Memory
     * @example
     * // Get one Memory
     * const memory = await prisma.memory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemoryFindUniqueOrThrowArgs>(args: SelectSubset<T, MemoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemoryClient<$Result.GetResult<Prisma.$MemoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Memory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoryFindFirstArgs} args - Arguments to find a Memory
     * @example
     * // Get one Memory
     * const memory = await prisma.memory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemoryFindFirstArgs>(args?: SelectSubset<T, MemoryFindFirstArgs<ExtArgs>>): Prisma__MemoryClient<$Result.GetResult<Prisma.$MemoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Memory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoryFindFirstOrThrowArgs} args - Arguments to find a Memory
     * @example
     * // Get one Memory
     * const memory = await prisma.memory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemoryFindFirstOrThrowArgs>(args?: SelectSubset<T, MemoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemoryClient<$Result.GetResult<Prisma.$MemoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Memories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Memories
     * const memories = await prisma.memory.findMany()
     * 
     * // Get first 10 Memories
     * const memories = await prisma.memory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memoryWithIdOnly = await prisma.memory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemoryFindManyArgs>(args?: SelectSubset<T, MemoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Memory.
     * @param {MemoryCreateArgs} args - Arguments to create a Memory.
     * @example
     * // Create one Memory
     * const Memory = await prisma.memory.create({
     *   data: {
     *     // ... data to create a Memory
     *   }
     * })
     * 
     */
    create<T extends MemoryCreateArgs>(args: SelectSubset<T, MemoryCreateArgs<ExtArgs>>): Prisma__MemoryClient<$Result.GetResult<Prisma.$MemoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Memories.
     * @param {MemoryCreateManyArgs} args - Arguments to create many Memories.
     * @example
     * // Create many Memories
     * const memory = await prisma.memory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemoryCreateManyArgs>(args?: SelectSubset<T, MemoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Memories and returns the data saved in the database.
     * @param {MemoryCreateManyAndReturnArgs} args - Arguments to create many Memories.
     * @example
     * // Create many Memories
     * const memory = await prisma.memory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Memories and only return the `id`
     * const memoryWithIdOnly = await prisma.memory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemoryCreateManyAndReturnArgs>(args?: SelectSubset<T, MemoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Memory.
     * @param {MemoryDeleteArgs} args - Arguments to delete one Memory.
     * @example
     * // Delete one Memory
     * const Memory = await prisma.memory.delete({
     *   where: {
     *     // ... filter to delete one Memory
     *   }
     * })
     * 
     */
    delete<T extends MemoryDeleteArgs>(args: SelectSubset<T, MemoryDeleteArgs<ExtArgs>>): Prisma__MemoryClient<$Result.GetResult<Prisma.$MemoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Memory.
     * @param {MemoryUpdateArgs} args - Arguments to update one Memory.
     * @example
     * // Update one Memory
     * const memory = await prisma.memory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemoryUpdateArgs>(args: SelectSubset<T, MemoryUpdateArgs<ExtArgs>>): Prisma__MemoryClient<$Result.GetResult<Prisma.$MemoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Memories.
     * @param {MemoryDeleteManyArgs} args - Arguments to filter Memories to delete.
     * @example
     * // Delete a few Memories
     * const { count } = await prisma.memory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemoryDeleteManyArgs>(args?: SelectSubset<T, MemoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Memories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Memories
     * const memory = await prisma.memory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemoryUpdateManyArgs>(args: SelectSubset<T, MemoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Memories and returns the data updated in the database.
     * @param {MemoryUpdateManyAndReturnArgs} args - Arguments to update many Memories.
     * @example
     * // Update many Memories
     * const memory = await prisma.memory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Memories and only return the `id`
     * const memoryWithIdOnly = await prisma.memory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MemoryUpdateManyAndReturnArgs>(args: SelectSubset<T, MemoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Memory.
     * @param {MemoryUpsertArgs} args - Arguments to update or create a Memory.
     * @example
     * // Update or create a Memory
     * const memory = await prisma.memory.upsert({
     *   create: {
     *     // ... data to create a Memory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Memory we want to update
     *   }
     * })
     */
    upsert<T extends MemoryUpsertArgs>(args: SelectSubset<T, MemoryUpsertArgs<ExtArgs>>): Prisma__MemoryClient<$Result.GetResult<Prisma.$MemoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Memories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoryCountArgs} args - Arguments to filter Memories to count.
     * @example
     * // Count the number of Memories
     * const count = await prisma.memory.count({
     *   where: {
     *     // ... the filter for the Memories we want to count
     *   }
     * })
    **/
    count<T extends MemoryCountArgs>(
      args?: Subset<T, MemoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Memory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemoryAggregateArgs>(args: Subset<T, MemoryAggregateArgs>): Prisma.PrismaPromise<GetMemoryAggregateType<T>>

    /**
     * Group by Memory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemoryGroupByArgs['orderBy'] }
        : { orderBy?: MemoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Memory model
   */
  readonly fields: MemoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Memory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Memory model
   */
  interface MemoryFieldRefs {
    readonly id: FieldRef<"Memory", 'String'>
    readonly title: FieldRef<"Memory", 'Json'>
    readonly content: FieldRef<"Memory", 'Json'>
    readonly mood: FieldRef<"Memory", 'String'>
    readonly tags: FieldRef<"Memory", 'String[]'>
    readonly status: FieldRef<"Memory", 'String'>
    readonly isDeleted: FieldRef<"Memory", 'Boolean'>
    readonly deletedAt: FieldRef<"Memory", 'DateTime'>
    readonly createdAt: FieldRef<"Memory", 'DateTime'>
    readonly updatedAt: FieldRef<"Memory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Memory findUnique
   */
  export type MemoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memory
     */
    select?: MemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memory
     */
    omit?: MemoryOmit<ExtArgs> | null
    /**
     * Filter, which Memory to fetch.
     */
    where: MemoryWhereUniqueInput
  }

  /**
   * Memory findUniqueOrThrow
   */
  export type MemoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memory
     */
    select?: MemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memory
     */
    omit?: MemoryOmit<ExtArgs> | null
    /**
     * Filter, which Memory to fetch.
     */
    where: MemoryWhereUniqueInput
  }

  /**
   * Memory findFirst
   */
  export type MemoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memory
     */
    select?: MemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memory
     */
    omit?: MemoryOmit<ExtArgs> | null
    /**
     * Filter, which Memory to fetch.
     */
    where?: MemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memories to fetch.
     */
    orderBy?: MemoryOrderByWithRelationInput | MemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memories.
     */
    cursor?: MemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memories.
     */
    distinct?: MemoryScalarFieldEnum | MemoryScalarFieldEnum[]
  }

  /**
   * Memory findFirstOrThrow
   */
  export type MemoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memory
     */
    select?: MemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memory
     */
    omit?: MemoryOmit<ExtArgs> | null
    /**
     * Filter, which Memory to fetch.
     */
    where?: MemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memories to fetch.
     */
    orderBy?: MemoryOrderByWithRelationInput | MemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Memories.
     */
    cursor?: MemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memories.
     */
    distinct?: MemoryScalarFieldEnum | MemoryScalarFieldEnum[]
  }

  /**
   * Memory findMany
   */
  export type MemoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memory
     */
    select?: MemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memory
     */
    omit?: MemoryOmit<ExtArgs> | null
    /**
     * Filter, which Memories to fetch.
     */
    where?: MemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Memories to fetch.
     */
    orderBy?: MemoryOrderByWithRelationInput | MemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Memories.
     */
    cursor?: MemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Memories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Memories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Memories.
     */
    distinct?: MemoryScalarFieldEnum | MemoryScalarFieldEnum[]
  }

  /**
   * Memory create
   */
  export type MemoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memory
     */
    select?: MemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memory
     */
    omit?: MemoryOmit<ExtArgs> | null
    /**
     * The data needed to create a Memory.
     */
    data: XOR<MemoryCreateInput, MemoryUncheckedCreateInput>
  }

  /**
   * Memory createMany
   */
  export type MemoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Memories.
     */
    data: MemoryCreateManyInput | MemoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Memory createManyAndReturn
   */
  export type MemoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memory
     */
    select?: MemorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Memory
     */
    omit?: MemoryOmit<ExtArgs> | null
    /**
     * The data used to create many Memories.
     */
    data: MemoryCreateManyInput | MemoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Memory update
   */
  export type MemoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memory
     */
    select?: MemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memory
     */
    omit?: MemoryOmit<ExtArgs> | null
    /**
     * The data needed to update a Memory.
     */
    data: XOR<MemoryUpdateInput, MemoryUncheckedUpdateInput>
    /**
     * Choose, which Memory to update.
     */
    where: MemoryWhereUniqueInput
  }

  /**
   * Memory updateMany
   */
  export type MemoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Memories.
     */
    data: XOR<MemoryUpdateManyMutationInput, MemoryUncheckedUpdateManyInput>
    /**
     * Filter which Memories to update
     */
    where?: MemoryWhereInput
    /**
     * Limit how many Memories to update.
     */
    limit?: number
  }

  /**
   * Memory updateManyAndReturn
   */
  export type MemoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memory
     */
    select?: MemorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Memory
     */
    omit?: MemoryOmit<ExtArgs> | null
    /**
     * The data used to update Memories.
     */
    data: XOR<MemoryUpdateManyMutationInput, MemoryUncheckedUpdateManyInput>
    /**
     * Filter which Memories to update
     */
    where?: MemoryWhereInput
    /**
     * Limit how many Memories to update.
     */
    limit?: number
  }

  /**
   * Memory upsert
   */
  export type MemoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memory
     */
    select?: MemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memory
     */
    omit?: MemoryOmit<ExtArgs> | null
    /**
     * The filter to search for the Memory to update in case it exists.
     */
    where: MemoryWhereUniqueInput
    /**
     * In case the Memory found by the `where` argument doesn't exist, create a new Memory with this data.
     */
    create: XOR<MemoryCreateInput, MemoryUncheckedCreateInput>
    /**
     * In case the Memory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemoryUpdateInput, MemoryUncheckedUpdateInput>
  }

  /**
   * Memory delete
   */
  export type MemoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memory
     */
    select?: MemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memory
     */
    omit?: MemoryOmit<ExtArgs> | null
    /**
     * Filter which Memory to delete.
     */
    where: MemoryWhereUniqueInput
  }

  /**
   * Memory deleteMany
   */
  export type MemoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Memories to delete
     */
    where?: MemoryWhereInput
    /**
     * Limit how many Memories to delete.
     */
    limit?: number
  }

  /**
   * Memory without action
   */
  export type MemoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Memory
     */
    select?: MemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Memory
     */
    omit?: MemoryOmit<ExtArgs> | null
  }


  /**
   * Model Mood
   */

  export type AggregateMood = {
    _count: MoodCountAggregateOutputType | null
    _avg: MoodAvgAggregateOutputType | null
    _sum: MoodSumAggregateOutputType | null
    _min: MoodMinAggregateOutputType | null
    _max: MoodMaxAggregateOutputType | null
  }

  export type MoodAvgAggregateOutputType = {
    intensity: number | null
  }

  export type MoodSumAggregateOutputType = {
    intensity: number | null
  }

  export type MoodMinAggregateOutputType = {
    id: string | null
    mood: string | null
    note: string | null
    intensity: number | null
    loggedAt: Date | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MoodMaxAggregateOutputType = {
    id: string | null
    mood: string | null
    note: string | null
    intensity: number | null
    loggedAt: Date | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MoodCountAggregateOutputType = {
    id: number
    mood: number
    note: number
    intensity: number
    tags: number
    loggedAt: number
    isDeleted: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MoodAvgAggregateInputType = {
    intensity?: true
  }

  export type MoodSumAggregateInputType = {
    intensity?: true
  }

  export type MoodMinAggregateInputType = {
    id?: true
    mood?: true
    note?: true
    intensity?: true
    loggedAt?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MoodMaxAggregateInputType = {
    id?: true
    mood?: true
    note?: true
    intensity?: true
    loggedAt?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MoodCountAggregateInputType = {
    id?: true
    mood?: true
    note?: true
    intensity?: true
    tags?: true
    loggedAt?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MoodAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mood to aggregate.
     */
    where?: MoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Moods to fetch.
     */
    orderBy?: MoodOrderByWithRelationInput | MoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Moods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Moods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Moods
    **/
    _count?: true | MoodCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MoodAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MoodSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MoodMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MoodMaxAggregateInputType
  }

  export type GetMoodAggregateType<T extends MoodAggregateArgs> = {
        [P in keyof T & keyof AggregateMood]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMood[P]>
      : GetScalarType<T[P], AggregateMood[P]>
  }




  export type MoodGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoodWhereInput
    orderBy?: MoodOrderByWithAggregationInput | MoodOrderByWithAggregationInput[]
    by: MoodScalarFieldEnum[] | MoodScalarFieldEnum
    having?: MoodScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MoodCountAggregateInputType | true
    _avg?: MoodAvgAggregateInputType
    _sum?: MoodSumAggregateInputType
    _min?: MoodMinAggregateInputType
    _max?: MoodMaxAggregateInputType
  }

  export type MoodGroupByOutputType = {
    id: string
    mood: string
    note: string | null
    intensity: number | null
    tags: string[]
    loggedAt: Date
    isDeleted: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: MoodCountAggregateOutputType | null
    _avg: MoodAvgAggregateOutputType | null
    _sum: MoodSumAggregateOutputType | null
    _min: MoodMinAggregateOutputType | null
    _max: MoodMaxAggregateOutputType | null
  }

  type GetMoodGroupByPayload<T extends MoodGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MoodGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MoodGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MoodGroupByOutputType[P]>
            : GetScalarType<T[P], MoodGroupByOutputType[P]>
        }
      >
    >


  export type MoodSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mood?: boolean
    note?: boolean
    intensity?: boolean
    tags?: boolean
    loggedAt?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mood"]>

  export type MoodSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mood?: boolean
    note?: boolean
    intensity?: boolean
    tags?: boolean
    loggedAt?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mood"]>

  export type MoodSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mood?: boolean
    note?: boolean
    intensity?: boolean
    tags?: boolean
    loggedAt?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mood"]>

  export type MoodSelectScalar = {
    id?: boolean
    mood?: boolean
    note?: boolean
    intensity?: boolean
    tags?: boolean
    loggedAt?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MoodOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mood" | "note" | "intensity" | "tags" | "loggedAt" | "isDeleted" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["mood"]>

  export type $MoodPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mood"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      mood: string
      note: string | null
      intensity: number | null
      tags: string[]
      loggedAt: Date
      isDeleted: boolean
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mood"]>
    composites: {}
  }

  type MoodGetPayload<S extends boolean | null | undefined | MoodDefaultArgs> = $Result.GetResult<Prisma.$MoodPayload, S>

  type MoodCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MoodFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MoodCountAggregateInputType | true
    }

  export interface MoodDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mood'], meta: { name: 'Mood' } }
    /**
     * Find zero or one Mood that matches the filter.
     * @param {MoodFindUniqueArgs} args - Arguments to find a Mood
     * @example
     * // Get one Mood
     * const mood = await prisma.mood.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MoodFindUniqueArgs>(args: SelectSubset<T, MoodFindUniqueArgs<ExtArgs>>): Prisma__MoodClient<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mood that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MoodFindUniqueOrThrowArgs} args - Arguments to find a Mood
     * @example
     * // Get one Mood
     * const mood = await prisma.mood.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MoodFindUniqueOrThrowArgs>(args: SelectSubset<T, MoodFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MoodClient<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mood that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodFindFirstArgs} args - Arguments to find a Mood
     * @example
     * // Get one Mood
     * const mood = await prisma.mood.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MoodFindFirstArgs>(args?: SelectSubset<T, MoodFindFirstArgs<ExtArgs>>): Prisma__MoodClient<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mood that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodFindFirstOrThrowArgs} args - Arguments to find a Mood
     * @example
     * // Get one Mood
     * const mood = await prisma.mood.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MoodFindFirstOrThrowArgs>(args?: SelectSubset<T, MoodFindFirstOrThrowArgs<ExtArgs>>): Prisma__MoodClient<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Moods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Moods
     * const moods = await prisma.mood.findMany()
     * 
     * // Get first 10 Moods
     * const moods = await prisma.mood.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moodWithIdOnly = await prisma.mood.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MoodFindManyArgs>(args?: SelectSubset<T, MoodFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mood.
     * @param {MoodCreateArgs} args - Arguments to create a Mood.
     * @example
     * // Create one Mood
     * const Mood = await prisma.mood.create({
     *   data: {
     *     // ... data to create a Mood
     *   }
     * })
     * 
     */
    create<T extends MoodCreateArgs>(args: SelectSubset<T, MoodCreateArgs<ExtArgs>>): Prisma__MoodClient<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Moods.
     * @param {MoodCreateManyArgs} args - Arguments to create many Moods.
     * @example
     * // Create many Moods
     * const mood = await prisma.mood.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MoodCreateManyArgs>(args?: SelectSubset<T, MoodCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Moods and returns the data saved in the database.
     * @param {MoodCreateManyAndReturnArgs} args - Arguments to create many Moods.
     * @example
     * // Create many Moods
     * const mood = await prisma.mood.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Moods and only return the `id`
     * const moodWithIdOnly = await prisma.mood.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MoodCreateManyAndReturnArgs>(args?: SelectSubset<T, MoodCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mood.
     * @param {MoodDeleteArgs} args - Arguments to delete one Mood.
     * @example
     * // Delete one Mood
     * const Mood = await prisma.mood.delete({
     *   where: {
     *     // ... filter to delete one Mood
     *   }
     * })
     * 
     */
    delete<T extends MoodDeleteArgs>(args: SelectSubset<T, MoodDeleteArgs<ExtArgs>>): Prisma__MoodClient<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mood.
     * @param {MoodUpdateArgs} args - Arguments to update one Mood.
     * @example
     * // Update one Mood
     * const mood = await prisma.mood.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MoodUpdateArgs>(args: SelectSubset<T, MoodUpdateArgs<ExtArgs>>): Prisma__MoodClient<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Moods.
     * @param {MoodDeleteManyArgs} args - Arguments to filter Moods to delete.
     * @example
     * // Delete a few Moods
     * const { count } = await prisma.mood.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MoodDeleteManyArgs>(args?: SelectSubset<T, MoodDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Moods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Moods
     * const mood = await prisma.mood.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MoodUpdateManyArgs>(args: SelectSubset<T, MoodUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Moods and returns the data updated in the database.
     * @param {MoodUpdateManyAndReturnArgs} args - Arguments to update many Moods.
     * @example
     * // Update many Moods
     * const mood = await prisma.mood.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Moods and only return the `id`
     * const moodWithIdOnly = await prisma.mood.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MoodUpdateManyAndReturnArgs>(args: SelectSubset<T, MoodUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mood.
     * @param {MoodUpsertArgs} args - Arguments to update or create a Mood.
     * @example
     * // Update or create a Mood
     * const mood = await prisma.mood.upsert({
     *   create: {
     *     // ... data to create a Mood
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mood we want to update
     *   }
     * })
     */
    upsert<T extends MoodUpsertArgs>(args: SelectSubset<T, MoodUpsertArgs<ExtArgs>>): Prisma__MoodClient<$Result.GetResult<Prisma.$MoodPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Moods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodCountArgs} args - Arguments to filter Moods to count.
     * @example
     * // Count the number of Moods
     * const count = await prisma.mood.count({
     *   where: {
     *     // ... the filter for the Moods we want to count
     *   }
     * })
    **/
    count<T extends MoodCountArgs>(
      args?: Subset<T, MoodCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MoodCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mood.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MoodAggregateArgs>(args: Subset<T, MoodAggregateArgs>): Prisma.PrismaPromise<GetMoodAggregateType<T>>

    /**
     * Group by Mood.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MoodGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MoodGroupByArgs['orderBy'] }
        : { orderBy?: MoodGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MoodGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMoodGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mood model
   */
  readonly fields: MoodFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mood.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MoodClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Mood model
   */
  interface MoodFieldRefs {
    readonly id: FieldRef<"Mood", 'String'>
    readonly mood: FieldRef<"Mood", 'String'>
    readonly note: FieldRef<"Mood", 'String'>
    readonly intensity: FieldRef<"Mood", 'Int'>
    readonly tags: FieldRef<"Mood", 'String[]'>
    readonly loggedAt: FieldRef<"Mood", 'DateTime'>
    readonly isDeleted: FieldRef<"Mood", 'Boolean'>
    readonly deletedAt: FieldRef<"Mood", 'DateTime'>
    readonly createdAt: FieldRef<"Mood", 'DateTime'>
    readonly updatedAt: FieldRef<"Mood", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Mood findUnique
   */
  export type MoodFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * Filter, which Mood to fetch.
     */
    where: MoodWhereUniqueInput
  }

  /**
   * Mood findUniqueOrThrow
   */
  export type MoodFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * Filter, which Mood to fetch.
     */
    where: MoodWhereUniqueInput
  }

  /**
   * Mood findFirst
   */
  export type MoodFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * Filter, which Mood to fetch.
     */
    where?: MoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Moods to fetch.
     */
    orderBy?: MoodOrderByWithRelationInput | MoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Moods.
     */
    cursor?: MoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Moods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Moods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Moods.
     */
    distinct?: MoodScalarFieldEnum | MoodScalarFieldEnum[]
  }

  /**
   * Mood findFirstOrThrow
   */
  export type MoodFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * Filter, which Mood to fetch.
     */
    where?: MoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Moods to fetch.
     */
    orderBy?: MoodOrderByWithRelationInput | MoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Moods.
     */
    cursor?: MoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Moods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Moods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Moods.
     */
    distinct?: MoodScalarFieldEnum | MoodScalarFieldEnum[]
  }

  /**
   * Mood findMany
   */
  export type MoodFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * Filter, which Moods to fetch.
     */
    where?: MoodWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Moods to fetch.
     */
    orderBy?: MoodOrderByWithRelationInput | MoodOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Moods.
     */
    cursor?: MoodWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Moods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Moods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Moods.
     */
    distinct?: MoodScalarFieldEnum | MoodScalarFieldEnum[]
  }

  /**
   * Mood create
   */
  export type MoodCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * The data needed to create a Mood.
     */
    data: XOR<MoodCreateInput, MoodUncheckedCreateInput>
  }

  /**
   * Mood createMany
   */
  export type MoodCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Moods.
     */
    data: MoodCreateManyInput | MoodCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mood createManyAndReturn
   */
  export type MoodCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * The data used to create many Moods.
     */
    data: MoodCreateManyInput | MoodCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mood update
   */
  export type MoodUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * The data needed to update a Mood.
     */
    data: XOR<MoodUpdateInput, MoodUncheckedUpdateInput>
    /**
     * Choose, which Mood to update.
     */
    where: MoodWhereUniqueInput
  }

  /**
   * Mood updateMany
   */
  export type MoodUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Moods.
     */
    data: XOR<MoodUpdateManyMutationInput, MoodUncheckedUpdateManyInput>
    /**
     * Filter which Moods to update
     */
    where?: MoodWhereInput
    /**
     * Limit how many Moods to update.
     */
    limit?: number
  }

  /**
   * Mood updateManyAndReturn
   */
  export type MoodUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * The data used to update Moods.
     */
    data: XOR<MoodUpdateManyMutationInput, MoodUncheckedUpdateManyInput>
    /**
     * Filter which Moods to update
     */
    where?: MoodWhereInput
    /**
     * Limit how many Moods to update.
     */
    limit?: number
  }

  /**
   * Mood upsert
   */
  export type MoodUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * The filter to search for the Mood to update in case it exists.
     */
    where: MoodWhereUniqueInput
    /**
     * In case the Mood found by the `where` argument doesn't exist, create a new Mood with this data.
     */
    create: XOR<MoodCreateInput, MoodUncheckedCreateInput>
    /**
     * In case the Mood was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MoodUpdateInput, MoodUncheckedUpdateInput>
  }

  /**
   * Mood delete
   */
  export type MoodDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
    /**
     * Filter which Mood to delete.
     */
    where: MoodWhereUniqueInput
  }

  /**
   * Mood deleteMany
   */
  export type MoodDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Moods to delete
     */
    where?: MoodWhereInput
    /**
     * Limit how many Moods to delete.
     */
    limit?: number
  }

  /**
   * Mood without action
   */
  export type MoodDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mood
     */
    select?: MoodSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mood
     */
    omit?: MoodOmit<ExtArgs> | null
  }


  /**
   * Model Quote
   */

  export type AggregateQuote = {
    _count: QuoteCountAggregateOutputType | null
    _min: QuoteMinAggregateOutputType | null
    _max: QuoteMaxAggregateOutputType | null
  }

  export type QuoteMinAggregateOutputType = {
    id: string | null
    author: string | null
    source: string | null
    mood: string | null
    status: string | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuoteMaxAggregateOutputType = {
    id: string | null
    author: string | null
    source: string | null
    mood: string | null
    status: string | null
    isDeleted: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuoteCountAggregateOutputType = {
    id: number
    content: number
    author: number
    source: number
    tags: number
    mood: number
    status: number
    isDeleted: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type QuoteMinAggregateInputType = {
    id?: true
    author?: true
    source?: true
    mood?: true
    status?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuoteMaxAggregateInputType = {
    id?: true
    author?: true
    source?: true
    mood?: true
    status?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuoteCountAggregateInputType = {
    id?: true
    content?: true
    author?: true
    source?: true
    tags?: true
    mood?: true
    status?: true
    isDeleted?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type QuoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quote to aggregate.
     */
    where?: QuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotes to fetch.
     */
    orderBy?: QuoteOrderByWithRelationInput | QuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Quotes
    **/
    _count?: true | QuoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuoteMaxAggregateInputType
  }

  export type GetQuoteAggregateType<T extends QuoteAggregateArgs> = {
        [P in keyof T & keyof AggregateQuote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuote[P]>
      : GetScalarType<T[P], AggregateQuote[P]>
  }




  export type QuoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuoteWhereInput
    orderBy?: QuoteOrderByWithAggregationInput | QuoteOrderByWithAggregationInput[]
    by: QuoteScalarFieldEnum[] | QuoteScalarFieldEnum
    having?: QuoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuoteCountAggregateInputType | true
    _min?: QuoteMinAggregateInputType
    _max?: QuoteMaxAggregateInputType
  }

  export type QuoteGroupByOutputType = {
    id: string
    content: JsonValue
    author: string | null
    source: string | null
    tags: string[]
    mood: string | null
    status: string
    isDeleted: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: QuoteCountAggregateOutputType | null
    _min: QuoteMinAggregateOutputType | null
    _max: QuoteMaxAggregateOutputType | null
  }

  type GetQuoteGroupByPayload<T extends QuoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuoteGroupByOutputType[P]>
            : GetScalarType<T[P], QuoteGroupByOutputType[P]>
        }
      >
    >


  export type QuoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    author?: boolean
    source?: boolean
    tags?: boolean
    mood?: boolean
    status?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dailyQuotes?: boolean | Quote$dailyQuotesArgs<ExtArgs>
    _count?: boolean | QuoteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quote"]>

  export type QuoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    author?: boolean
    source?: boolean
    tags?: boolean
    mood?: boolean
    status?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["quote"]>

  export type QuoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    author?: boolean
    source?: boolean
    tags?: boolean
    mood?: boolean
    status?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["quote"]>

  export type QuoteSelectScalar = {
    id?: boolean
    content?: boolean
    author?: boolean
    source?: boolean
    tags?: boolean
    mood?: boolean
    status?: boolean
    isDeleted?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type QuoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "author" | "source" | "tags" | "mood" | "status" | "isDeleted" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["quote"]>
  export type QuoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dailyQuotes?: boolean | Quote$dailyQuotesArgs<ExtArgs>
    _count?: boolean | QuoteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type QuoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $QuotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Quote"
    objects: {
      dailyQuotes: Prisma.$DailyQuotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: Prisma.JsonValue
      author: string | null
      source: string | null
      tags: string[]
      mood: string | null
      status: string
      isDeleted: boolean
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["quote"]>
    composites: {}
  }

  type QuoteGetPayload<S extends boolean | null | undefined | QuoteDefaultArgs> = $Result.GetResult<Prisma.$QuotePayload, S>

  type QuoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuoteCountAggregateInputType | true
    }

  export interface QuoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Quote'], meta: { name: 'Quote' } }
    /**
     * Find zero or one Quote that matches the filter.
     * @param {QuoteFindUniqueArgs} args - Arguments to find a Quote
     * @example
     * // Get one Quote
     * const quote = await prisma.quote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuoteFindUniqueArgs>(args: SelectSubset<T, QuoteFindUniqueArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Quote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuoteFindUniqueOrThrowArgs} args - Arguments to find a Quote
     * @example
     * // Get one Quote
     * const quote = await prisma.quote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuoteFindUniqueOrThrowArgs>(args: SelectSubset<T, QuoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteFindFirstArgs} args - Arguments to find a Quote
     * @example
     * // Get one Quote
     * const quote = await prisma.quote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuoteFindFirstArgs>(args?: SelectSubset<T, QuoteFindFirstArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Quote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteFindFirstOrThrowArgs} args - Arguments to find a Quote
     * @example
     * // Get one Quote
     * const quote = await prisma.quote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuoteFindFirstOrThrowArgs>(args?: SelectSubset<T, QuoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Quotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Quotes
     * const quotes = await prisma.quote.findMany()
     * 
     * // Get first 10 Quotes
     * const quotes = await prisma.quote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quoteWithIdOnly = await prisma.quote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuoteFindManyArgs>(args?: SelectSubset<T, QuoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Quote.
     * @param {QuoteCreateArgs} args - Arguments to create a Quote.
     * @example
     * // Create one Quote
     * const Quote = await prisma.quote.create({
     *   data: {
     *     // ... data to create a Quote
     *   }
     * })
     * 
     */
    create<T extends QuoteCreateArgs>(args: SelectSubset<T, QuoteCreateArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Quotes.
     * @param {QuoteCreateManyArgs} args - Arguments to create many Quotes.
     * @example
     * // Create many Quotes
     * const quote = await prisma.quote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuoteCreateManyArgs>(args?: SelectSubset<T, QuoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Quotes and returns the data saved in the database.
     * @param {QuoteCreateManyAndReturnArgs} args - Arguments to create many Quotes.
     * @example
     * // Create many Quotes
     * const quote = await prisma.quote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Quotes and only return the `id`
     * const quoteWithIdOnly = await prisma.quote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuoteCreateManyAndReturnArgs>(args?: SelectSubset<T, QuoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Quote.
     * @param {QuoteDeleteArgs} args - Arguments to delete one Quote.
     * @example
     * // Delete one Quote
     * const Quote = await prisma.quote.delete({
     *   where: {
     *     // ... filter to delete one Quote
     *   }
     * })
     * 
     */
    delete<T extends QuoteDeleteArgs>(args: SelectSubset<T, QuoteDeleteArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Quote.
     * @param {QuoteUpdateArgs} args - Arguments to update one Quote.
     * @example
     * // Update one Quote
     * const quote = await prisma.quote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuoteUpdateArgs>(args: SelectSubset<T, QuoteUpdateArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Quotes.
     * @param {QuoteDeleteManyArgs} args - Arguments to filter Quotes to delete.
     * @example
     * // Delete a few Quotes
     * const { count } = await prisma.quote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuoteDeleteManyArgs>(args?: SelectSubset<T, QuoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Quotes
     * const quote = await prisma.quote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuoteUpdateManyArgs>(args: SelectSubset<T, QuoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Quotes and returns the data updated in the database.
     * @param {QuoteUpdateManyAndReturnArgs} args - Arguments to update many Quotes.
     * @example
     * // Update many Quotes
     * const quote = await prisma.quote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Quotes and only return the `id`
     * const quoteWithIdOnly = await prisma.quote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuoteUpdateManyAndReturnArgs>(args: SelectSubset<T, QuoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Quote.
     * @param {QuoteUpsertArgs} args - Arguments to update or create a Quote.
     * @example
     * // Update or create a Quote
     * const quote = await prisma.quote.upsert({
     *   create: {
     *     // ... data to create a Quote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Quote we want to update
     *   }
     * })
     */
    upsert<T extends QuoteUpsertArgs>(args: SelectSubset<T, QuoteUpsertArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Quotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteCountArgs} args - Arguments to filter Quotes to count.
     * @example
     * // Count the number of Quotes
     * const count = await prisma.quote.count({
     *   where: {
     *     // ... the filter for the Quotes we want to count
     *   }
     * })
    **/
    count<T extends QuoteCountArgs>(
      args?: Subset<T, QuoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Quote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuoteAggregateArgs>(args: Subset<T, QuoteAggregateArgs>): Prisma.PrismaPromise<GetQuoteAggregateType<T>>

    /**
     * Group by Quote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuoteGroupByArgs['orderBy'] }
        : { orderBy?: QuoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Quote model
   */
  readonly fields: QuoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Quote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dailyQuotes<T extends Quote$dailyQuotesArgs<ExtArgs> = {}>(args?: Subset<T, Quote$dailyQuotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyQuotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Quote model
   */
  interface QuoteFieldRefs {
    readonly id: FieldRef<"Quote", 'String'>
    readonly content: FieldRef<"Quote", 'Json'>
    readonly author: FieldRef<"Quote", 'String'>
    readonly source: FieldRef<"Quote", 'String'>
    readonly tags: FieldRef<"Quote", 'String[]'>
    readonly mood: FieldRef<"Quote", 'String'>
    readonly status: FieldRef<"Quote", 'String'>
    readonly isDeleted: FieldRef<"Quote", 'Boolean'>
    readonly deletedAt: FieldRef<"Quote", 'DateTime'>
    readonly createdAt: FieldRef<"Quote", 'DateTime'>
    readonly updatedAt: FieldRef<"Quote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Quote findUnique
   */
  export type QuoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter, which Quote to fetch.
     */
    where: QuoteWhereUniqueInput
  }

  /**
   * Quote findUniqueOrThrow
   */
  export type QuoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter, which Quote to fetch.
     */
    where: QuoteWhereUniqueInput
  }

  /**
   * Quote findFirst
   */
  export type QuoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter, which Quote to fetch.
     */
    where?: QuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotes to fetch.
     */
    orderBy?: QuoteOrderByWithRelationInput | QuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quotes.
     */
    cursor?: QuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quotes.
     */
    distinct?: QuoteScalarFieldEnum | QuoteScalarFieldEnum[]
  }

  /**
   * Quote findFirstOrThrow
   */
  export type QuoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter, which Quote to fetch.
     */
    where?: QuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotes to fetch.
     */
    orderBy?: QuoteOrderByWithRelationInput | QuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Quotes.
     */
    cursor?: QuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quotes.
     */
    distinct?: QuoteScalarFieldEnum | QuoteScalarFieldEnum[]
  }

  /**
   * Quote findMany
   */
  export type QuoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter, which Quotes to fetch.
     */
    where?: QuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Quotes to fetch.
     */
    orderBy?: QuoteOrderByWithRelationInput | QuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Quotes.
     */
    cursor?: QuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Quotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Quotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Quotes.
     */
    distinct?: QuoteScalarFieldEnum | QuoteScalarFieldEnum[]
  }

  /**
   * Quote create
   */
  export type QuoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Quote.
     */
    data: XOR<QuoteCreateInput, QuoteUncheckedCreateInput>
  }

  /**
   * Quote createMany
   */
  export type QuoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Quotes.
     */
    data: QuoteCreateManyInput | QuoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Quote createManyAndReturn
   */
  export type QuoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * The data used to create many Quotes.
     */
    data: QuoteCreateManyInput | QuoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Quote update
   */
  export type QuoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Quote.
     */
    data: XOR<QuoteUpdateInput, QuoteUncheckedUpdateInput>
    /**
     * Choose, which Quote to update.
     */
    where: QuoteWhereUniqueInput
  }

  /**
   * Quote updateMany
   */
  export type QuoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Quotes.
     */
    data: XOR<QuoteUpdateManyMutationInput, QuoteUncheckedUpdateManyInput>
    /**
     * Filter which Quotes to update
     */
    where?: QuoteWhereInput
    /**
     * Limit how many Quotes to update.
     */
    limit?: number
  }

  /**
   * Quote updateManyAndReturn
   */
  export type QuoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * The data used to update Quotes.
     */
    data: XOR<QuoteUpdateManyMutationInput, QuoteUncheckedUpdateManyInput>
    /**
     * Filter which Quotes to update
     */
    where?: QuoteWhereInput
    /**
     * Limit how many Quotes to update.
     */
    limit?: number
  }

  /**
   * Quote upsert
   */
  export type QuoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Quote to update in case it exists.
     */
    where: QuoteWhereUniqueInput
    /**
     * In case the Quote found by the `where` argument doesn't exist, create a new Quote with this data.
     */
    create: XOR<QuoteCreateInput, QuoteUncheckedCreateInput>
    /**
     * In case the Quote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuoteUpdateInput, QuoteUncheckedUpdateInput>
  }

  /**
   * Quote delete
   */
  export type QuoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
    /**
     * Filter which Quote to delete.
     */
    where: QuoteWhereUniqueInput
  }

  /**
   * Quote deleteMany
   */
  export type QuoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Quotes to delete
     */
    where?: QuoteWhereInput
    /**
     * Limit how many Quotes to delete.
     */
    limit?: number
  }

  /**
   * Quote.dailyQuotes
   */
  export type Quote$dailyQuotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyQuote
     */
    select?: DailyQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyQuote
     */
    omit?: DailyQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyQuoteInclude<ExtArgs> | null
    where?: DailyQuoteWhereInput
    orderBy?: DailyQuoteOrderByWithRelationInput | DailyQuoteOrderByWithRelationInput[]
    cursor?: DailyQuoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyQuoteScalarFieldEnum | DailyQuoteScalarFieldEnum[]
  }

  /**
   * Quote without action
   */
  export type QuoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Quote
     */
    select?: QuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Quote
     */
    omit?: QuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuoteInclude<ExtArgs> | null
  }


  /**
   * Model DailyQuote
   */

  export type AggregateDailyQuote = {
    _count: DailyQuoteCountAggregateOutputType | null
    _min: DailyQuoteMinAggregateOutputType | null
    _max: DailyQuoteMaxAggregateOutputType | null
  }

  export type DailyQuoteMinAggregateOutputType = {
    id: string | null
    date: string | null
    quoteId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyQuoteMaxAggregateOutputType = {
    id: string | null
    date: string | null
    quoteId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyQuoteCountAggregateOutputType = {
    id: number
    date: number
    quoteId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DailyQuoteMinAggregateInputType = {
    id?: true
    date?: true
    quoteId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyQuoteMaxAggregateInputType = {
    id?: true
    date?: true
    quoteId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyQuoteCountAggregateInputType = {
    id?: true
    date?: true
    quoteId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DailyQuoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyQuote to aggregate.
     */
    where?: DailyQuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyQuotes to fetch.
     */
    orderBy?: DailyQuoteOrderByWithRelationInput | DailyQuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyQuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyQuotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyQuotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyQuotes
    **/
    _count?: true | DailyQuoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyQuoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyQuoteMaxAggregateInputType
  }

  export type GetDailyQuoteAggregateType<T extends DailyQuoteAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyQuote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyQuote[P]>
      : GetScalarType<T[P], AggregateDailyQuote[P]>
  }




  export type DailyQuoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyQuoteWhereInput
    orderBy?: DailyQuoteOrderByWithAggregationInput | DailyQuoteOrderByWithAggregationInput[]
    by: DailyQuoteScalarFieldEnum[] | DailyQuoteScalarFieldEnum
    having?: DailyQuoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyQuoteCountAggregateInputType | true
    _min?: DailyQuoteMinAggregateInputType
    _max?: DailyQuoteMaxAggregateInputType
  }

  export type DailyQuoteGroupByOutputType = {
    id: string
    date: string
    quoteId: string
    createdAt: Date
    updatedAt: Date
    _count: DailyQuoteCountAggregateOutputType | null
    _min: DailyQuoteMinAggregateOutputType | null
    _max: DailyQuoteMaxAggregateOutputType | null
  }

  type GetDailyQuoteGroupByPayload<T extends DailyQuoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyQuoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyQuoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyQuoteGroupByOutputType[P]>
            : GetScalarType<T[P], DailyQuoteGroupByOutputType[P]>
        }
      >
    >


  export type DailyQuoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    quoteId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    quote?: boolean | QuoteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyQuote"]>

  export type DailyQuoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    quoteId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    quote?: boolean | QuoteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyQuote"]>

  export type DailyQuoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    quoteId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    quote?: boolean | QuoteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyQuote"]>

  export type DailyQuoteSelectScalar = {
    id?: boolean
    date?: boolean
    quoteId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DailyQuoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "quoteId" | "createdAt" | "updatedAt", ExtArgs["result"]["dailyQuote"]>
  export type DailyQuoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quote?: boolean | QuoteDefaultArgs<ExtArgs>
  }
  export type DailyQuoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quote?: boolean | QuoteDefaultArgs<ExtArgs>
  }
  export type DailyQuoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quote?: boolean | QuoteDefaultArgs<ExtArgs>
  }

  export type $DailyQuotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyQuote"
    objects: {
      quote: Prisma.$QuotePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: string
      quoteId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dailyQuote"]>
    composites: {}
  }

  type DailyQuoteGetPayload<S extends boolean | null | undefined | DailyQuoteDefaultArgs> = $Result.GetResult<Prisma.$DailyQuotePayload, S>

  type DailyQuoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DailyQuoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DailyQuoteCountAggregateInputType | true
    }

  export interface DailyQuoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyQuote'], meta: { name: 'DailyQuote' } }
    /**
     * Find zero or one DailyQuote that matches the filter.
     * @param {DailyQuoteFindUniqueArgs} args - Arguments to find a DailyQuote
     * @example
     * // Get one DailyQuote
     * const dailyQuote = await prisma.dailyQuote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyQuoteFindUniqueArgs>(args: SelectSubset<T, DailyQuoteFindUniqueArgs<ExtArgs>>): Prisma__DailyQuoteClient<$Result.GetResult<Prisma.$DailyQuotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DailyQuote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DailyQuoteFindUniqueOrThrowArgs} args - Arguments to find a DailyQuote
     * @example
     * // Get one DailyQuote
     * const dailyQuote = await prisma.dailyQuote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyQuoteFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyQuoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyQuoteClient<$Result.GetResult<Prisma.$DailyQuotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyQuote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyQuoteFindFirstArgs} args - Arguments to find a DailyQuote
     * @example
     * // Get one DailyQuote
     * const dailyQuote = await prisma.dailyQuote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyQuoteFindFirstArgs>(args?: SelectSubset<T, DailyQuoteFindFirstArgs<ExtArgs>>): Prisma__DailyQuoteClient<$Result.GetResult<Prisma.$DailyQuotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyQuote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyQuoteFindFirstOrThrowArgs} args - Arguments to find a DailyQuote
     * @example
     * // Get one DailyQuote
     * const dailyQuote = await prisma.dailyQuote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyQuoteFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyQuoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyQuoteClient<$Result.GetResult<Prisma.$DailyQuotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DailyQuotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyQuoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyQuotes
     * const dailyQuotes = await prisma.dailyQuote.findMany()
     * 
     * // Get first 10 DailyQuotes
     * const dailyQuotes = await prisma.dailyQuote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyQuoteWithIdOnly = await prisma.dailyQuote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyQuoteFindManyArgs>(args?: SelectSubset<T, DailyQuoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyQuotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DailyQuote.
     * @param {DailyQuoteCreateArgs} args - Arguments to create a DailyQuote.
     * @example
     * // Create one DailyQuote
     * const DailyQuote = await prisma.dailyQuote.create({
     *   data: {
     *     // ... data to create a DailyQuote
     *   }
     * })
     * 
     */
    create<T extends DailyQuoteCreateArgs>(args: SelectSubset<T, DailyQuoteCreateArgs<ExtArgs>>): Prisma__DailyQuoteClient<$Result.GetResult<Prisma.$DailyQuotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DailyQuotes.
     * @param {DailyQuoteCreateManyArgs} args - Arguments to create many DailyQuotes.
     * @example
     * // Create many DailyQuotes
     * const dailyQuote = await prisma.dailyQuote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyQuoteCreateManyArgs>(args?: SelectSubset<T, DailyQuoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyQuotes and returns the data saved in the database.
     * @param {DailyQuoteCreateManyAndReturnArgs} args - Arguments to create many DailyQuotes.
     * @example
     * // Create many DailyQuotes
     * const dailyQuote = await prisma.dailyQuote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyQuotes and only return the `id`
     * const dailyQuoteWithIdOnly = await prisma.dailyQuote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyQuoteCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyQuoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyQuotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DailyQuote.
     * @param {DailyQuoteDeleteArgs} args - Arguments to delete one DailyQuote.
     * @example
     * // Delete one DailyQuote
     * const DailyQuote = await prisma.dailyQuote.delete({
     *   where: {
     *     // ... filter to delete one DailyQuote
     *   }
     * })
     * 
     */
    delete<T extends DailyQuoteDeleteArgs>(args: SelectSubset<T, DailyQuoteDeleteArgs<ExtArgs>>): Prisma__DailyQuoteClient<$Result.GetResult<Prisma.$DailyQuotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DailyQuote.
     * @param {DailyQuoteUpdateArgs} args - Arguments to update one DailyQuote.
     * @example
     * // Update one DailyQuote
     * const dailyQuote = await prisma.dailyQuote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyQuoteUpdateArgs>(args: SelectSubset<T, DailyQuoteUpdateArgs<ExtArgs>>): Prisma__DailyQuoteClient<$Result.GetResult<Prisma.$DailyQuotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DailyQuotes.
     * @param {DailyQuoteDeleteManyArgs} args - Arguments to filter DailyQuotes to delete.
     * @example
     * // Delete a few DailyQuotes
     * const { count } = await prisma.dailyQuote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyQuoteDeleteManyArgs>(args?: SelectSubset<T, DailyQuoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyQuotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyQuoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyQuotes
     * const dailyQuote = await prisma.dailyQuote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyQuoteUpdateManyArgs>(args: SelectSubset<T, DailyQuoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyQuotes and returns the data updated in the database.
     * @param {DailyQuoteUpdateManyAndReturnArgs} args - Arguments to update many DailyQuotes.
     * @example
     * // Update many DailyQuotes
     * const dailyQuote = await prisma.dailyQuote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DailyQuotes and only return the `id`
     * const dailyQuoteWithIdOnly = await prisma.dailyQuote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DailyQuoteUpdateManyAndReturnArgs>(args: SelectSubset<T, DailyQuoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyQuotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DailyQuote.
     * @param {DailyQuoteUpsertArgs} args - Arguments to update or create a DailyQuote.
     * @example
     * // Update or create a DailyQuote
     * const dailyQuote = await prisma.dailyQuote.upsert({
     *   create: {
     *     // ... data to create a DailyQuote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyQuote we want to update
     *   }
     * })
     */
    upsert<T extends DailyQuoteUpsertArgs>(args: SelectSubset<T, DailyQuoteUpsertArgs<ExtArgs>>): Prisma__DailyQuoteClient<$Result.GetResult<Prisma.$DailyQuotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DailyQuotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyQuoteCountArgs} args - Arguments to filter DailyQuotes to count.
     * @example
     * // Count the number of DailyQuotes
     * const count = await prisma.dailyQuote.count({
     *   where: {
     *     // ... the filter for the DailyQuotes we want to count
     *   }
     * })
    **/
    count<T extends DailyQuoteCountArgs>(
      args?: Subset<T, DailyQuoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyQuoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyQuote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyQuoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailyQuoteAggregateArgs>(args: Subset<T, DailyQuoteAggregateArgs>): Prisma.PrismaPromise<GetDailyQuoteAggregateType<T>>

    /**
     * Group by DailyQuote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyQuoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DailyQuoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyQuoteGroupByArgs['orderBy'] }
        : { orderBy?: DailyQuoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyQuoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyQuoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyQuote model
   */
  readonly fields: DailyQuoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyQuote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyQuoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quote<T extends QuoteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuoteDefaultArgs<ExtArgs>>): Prisma__QuoteClient<$Result.GetResult<Prisma.$QuotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyQuote model
   */
  interface DailyQuoteFieldRefs {
    readonly id: FieldRef<"DailyQuote", 'String'>
    readonly date: FieldRef<"DailyQuote", 'String'>
    readonly quoteId: FieldRef<"DailyQuote", 'String'>
    readonly createdAt: FieldRef<"DailyQuote", 'DateTime'>
    readonly updatedAt: FieldRef<"DailyQuote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailyQuote findUnique
   */
  export type DailyQuoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyQuote
     */
    select?: DailyQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyQuote
     */
    omit?: DailyQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyQuoteInclude<ExtArgs> | null
    /**
     * Filter, which DailyQuote to fetch.
     */
    where: DailyQuoteWhereUniqueInput
  }

  /**
   * DailyQuote findUniqueOrThrow
   */
  export type DailyQuoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyQuote
     */
    select?: DailyQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyQuote
     */
    omit?: DailyQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyQuoteInclude<ExtArgs> | null
    /**
     * Filter, which DailyQuote to fetch.
     */
    where: DailyQuoteWhereUniqueInput
  }

  /**
   * DailyQuote findFirst
   */
  export type DailyQuoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyQuote
     */
    select?: DailyQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyQuote
     */
    omit?: DailyQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyQuoteInclude<ExtArgs> | null
    /**
     * Filter, which DailyQuote to fetch.
     */
    where?: DailyQuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyQuotes to fetch.
     */
    orderBy?: DailyQuoteOrderByWithRelationInput | DailyQuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyQuotes.
     */
    cursor?: DailyQuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyQuotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyQuotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyQuotes.
     */
    distinct?: DailyQuoteScalarFieldEnum | DailyQuoteScalarFieldEnum[]
  }

  /**
   * DailyQuote findFirstOrThrow
   */
  export type DailyQuoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyQuote
     */
    select?: DailyQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyQuote
     */
    omit?: DailyQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyQuoteInclude<ExtArgs> | null
    /**
     * Filter, which DailyQuote to fetch.
     */
    where?: DailyQuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyQuotes to fetch.
     */
    orderBy?: DailyQuoteOrderByWithRelationInput | DailyQuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyQuotes.
     */
    cursor?: DailyQuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyQuotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyQuotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyQuotes.
     */
    distinct?: DailyQuoteScalarFieldEnum | DailyQuoteScalarFieldEnum[]
  }

  /**
   * DailyQuote findMany
   */
  export type DailyQuoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyQuote
     */
    select?: DailyQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyQuote
     */
    omit?: DailyQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyQuoteInclude<ExtArgs> | null
    /**
     * Filter, which DailyQuotes to fetch.
     */
    where?: DailyQuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyQuotes to fetch.
     */
    orderBy?: DailyQuoteOrderByWithRelationInput | DailyQuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyQuotes.
     */
    cursor?: DailyQuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyQuotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyQuotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyQuotes.
     */
    distinct?: DailyQuoteScalarFieldEnum | DailyQuoteScalarFieldEnum[]
  }

  /**
   * DailyQuote create
   */
  export type DailyQuoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyQuote
     */
    select?: DailyQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyQuote
     */
    omit?: DailyQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyQuoteInclude<ExtArgs> | null
    /**
     * The data needed to create a DailyQuote.
     */
    data: XOR<DailyQuoteCreateInput, DailyQuoteUncheckedCreateInput>
  }

  /**
   * DailyQuote createMany
   */
  export type DailyQuoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyQuotes.
     */
    data: DailyQuoteCreateManyInput | DailyQuoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyQuote createManyAndReturn
   */
  export type DailyQuoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyQuote
     */
    select?: DailyQuoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyQuote
     */
    omit?: DailyQuoteOmit<ExtArgs> | null
    /**
     * The data used to create many DailyQuotes.
     */
    data: DailyQuoteCreateManyInput | DailyQuoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyQuoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyQuote update
   */
  export type DailyQuoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyQuote
     */
    select?: DailyQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyQuote
     */
    omit?: DailyQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyQuoteInclude<ExtArgs> | null
    /**
     * The data needed to update a DailyQuote.
     */
    data: XOR<DailyQuoteUpdateInput, DailyQuoteUncheckedUpdateInput>
    /**
     * Choose, which DailyQuote to update.
     */
    where: DailyQuoteWhereUniqueInput
  }

  /**
   * DailyQuote updateMany
   */
  export type DailyQuoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyQuotes.
     */
    data: XOR<DailyQuoteUpdateManyMutationInput, DailyQuoteUncheckedUpdateManyInput>
    /**
     * Filter which DailyQuotes to update
     */
    where?: DailyQuoteWhereInput
    /**
     * Limit how many DailyQuotes to update.
     */
    limit?: number
  }

  /**
   * DailyQuote updateManyAndReturn
   */
  export type DailyQuoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyQuote
     */
    select?: DailyQuoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyQuote
     */
    omit?: DailyQuoteOmit<ExtArgs> | null
    /**
     * The data used to update DailyQuotes.
     */
    data: XOR<DailyQuoteUpdateManyMutationInput, DailyQuoteUncheckedUpdateManyInput>
    /**
     * Filter which DailyQuotes to update
     */
    where?: DailyQuoteWhereInput
    /**
     * Limit how many DailyQuotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyQuoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyQuote upsert
   */
  export type DailyQuoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyQuote
     */
    select?: DailyQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyQuote
     */
    omit?: DailyQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyQuoteInclude<ExtArgs> | null
    /**
     * The filter to search for the DailyQuote to update in case it exists.
     */
    where: DailyQuoteWhereUniqueInput
    /**
     * In case the DailyQuote found by the `where` argument doesn't exist, create a new DailyQuote with this data.
     */
    create: XOR<DailyQuoteCreateInput, DailyQuoteUncheckedCreateInput>
    /**
     * In case the DailyQuote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyQuoteUpdateInput, DailyQuoteUncheckedUpdateInput>
  }

  /**
   * DailyQuote delete
   */
  export type DailyQuoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyQuote
     */
    select?: DailyQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyQuote
     */
    omit?: DailyQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyQuoteInclude<ExtArgs> | null
    /**
     * Filter which DailyQuote to delete.
     */
    where: DailyQuoteWhereUniqueInput
  }

  /**
   * DailyQuote deleteMany
   */
  export type DailyQuoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyQuotes to delete
     */
    where?: DailyQuoteWhereInput
    /**
     * Limit how many DailyQuotes to delete.
     */
    limit?: number
  }

  /**
   * DailyQuote without action
   */
  export type DailyQuoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyQuote
     */
    select?: DailyQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyQuote
     */
    omit?: DailyQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyQuoteInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    refreshToken: 'refreshToken',
    roleId: 'roleId',
    isDeleted: 'isDeleted',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserConnectionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    identifier: 'identifier',
    metadata: 'metadata',
    connectedAt: 'connectedAt'
  };

  export type UserConnectionScalarFieldEnum = (typeof UserConnectionScalarFieldEnum)[keyof typeof UserConnectionScalarFieldEnum]


  export const UserStatsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    xp: 'xp',
    level: 'level',
    title: 'title',
    streak: 'streak',
    lastActivityDate: 'lastActivityDate',
    achievements: 'achievements'
  };

  export type UserStatsScalarFieldEnum = (typeof UserStatsScalarFieldEnum)[keyof typeof UserStatsScalarFieldEnum]


  export const RoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    isSystem: 'isSystem',
    isDeleted: 'isDeleted',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const PermissionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    resource: 'resource',
    action: 'action',
    isDeleted: 'isDeleted',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PermissionScalarFieldEnum = (typeof PermissionScalarFieldEnum)[keyof typeof PermissionScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    method: 'method',
    statusCode: 'statusCode',
    path: 'path',
    params: 'params',
    query: 'query',
    body: 'body',
    ip: 'ip',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    status: 'status',
    tags: 'tags',
    isPinned: 'isPinned',
    progress: 'progress',
    githubStats: 'githubStats',
    taskBoard: 'taskBoard',
    links: 'links',
    logs: 'logs',
    metadata: 'metadata',
    isDeleted: 'isDeleted',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const JournalScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    mood: 'mood',
    tags: 'tags',
    type: 'type',
    status: 'status',
    source: 'source',
    relations: 'relations',
    analysis: 'analysis',
    userId: 'userId',
    isDeleted: 'isDeleted',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JournalScalarFieldEnum = (typeof JournalScalarFieldEnum)[keyof typeof JournalScalarFieldEnum]


  export const MemoryScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    mood: 'mood',
    tags: 'tags',
    status: 'status',
    isDeleted: 'isDeleted',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MemoryScalarFieldEnum = (typeof MemoryScalarFieldEnum)[keyof typeof MemoryScalarFieldEnum]


  export const MoodScalarFieldEnum: {
    id: 'id',
    mood: 'mood',
    note: 'note',
    intensity: 'intensity',
    tags: 'tags',
    loggedAt: 'loggedAt',
    isDeleted: 'isDeleted',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MoodScalarFieldEnum = (typeof MoodScalarFieldEnum)[keyof typeof MoodScalarFieldEnum]


  export const QuoteScalarFieldEnum: {
    id: 'id',
    content: 'content',
    author: 'author',
    source: 'source',
    tags: 'tags',
    mood: 'mood',
    status: 'status',
    isDeleted: 'isDeleted',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type QuoteScalarFieldEnum = (typeof QuoteScalarFieldEnum)[keyof typeof QuoteScalarFieldEnum]


  export const DailyQuoteScalarFieldEnum: {
    id: 'id',
    date: 'date',
    quoteId: 'quoteId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DailyQuoteScalarFieldEnum = (typeof DailyQuoteScalarFieldEnum)[keyof typeof DailyQuoteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    refreshToken?: StringNullableFilter<"User"> | string | null
    roleId?: StringNullableFilter<"User"> | string | null
    isDeleted?: BoolFilter<"User"> | boolean
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    role?: XOR<RoleNullableScalarRelationFilter, RoleWhereInput> | null
    stats?: XOR<UserStatsNullableScalarRelationFilter, UserStatsWhereInput> | null
    connections?: UserConnectionListRelationFilter
    journals?: JournalListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    roleId?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: RoleOrderByWithRelationInput
    stats?: UserStatsOrderByWithRelationInput
    connections?: UserConnectionOrderByRelationAggregateInput
    journals?: JournalOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    refreshToken?: StringNullableFilter<"User"> | string | null
    roleId?: StringNullableFilter<"User"> | string | null
    isDeleted?: BoolFilter<"User"> | boolean
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    role?: XOR<RoleNullableScalarRelationFilter, RoleWhereInput> | null
    stats?: XOR<UserStatsNullableScalarRelationFilter, UserStatsWhereInput> | null
    connections?: UserConnectionListRelationFilter
    journals?: JournalListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    roleId?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    refreshToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    roleId?: StringNullableWithAggregatesFilter<"User"> | string | null
    isDeleted?: BoolWithAggregatesFilter<"User"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UserConnectionWhereInput = {
    AND?: UserConnectionWhereInput | UserConnectionWhereInput[]
    OR?: UserConnectionWhereInput[]
    NOT?: UserConnectionWhereInput | UserConnectionWhereInput[]
    id?: StringFilter<"UserConnection"> | string
    userId?: StringFilter<"UserConnection"> | string
    provider?: StringFilter<"UserConnection"> | string
    identifier?: StringFilter<"UserConnection"> | string
    metadata?: JsonNullableFilter<"UserConnection">
    connectedAt?: DateTimeFilter<"UserConnection"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserConnectionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    identifier?: SortOrder
    metadata?: SortOrderInput | SortOrder
    connectedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserConnectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_identifier?: UserConnectionProviderIdentifierCompoundUniqueInput
    AND?: UserConnectionWhereInput | UserConnectionWhereInput[]
    OR?: UserConnectionWhereInput[]
    NOT?: UserConnectionWhereInput | UserConnectionWhereInput[]
    userId?: StringFilter<"UserConnection"> | string
    provider?: StringFilter<"UserConnection"> | string
    identifier?: StringFilter<"UserConnection"> | string
    metadata?: JsonNullableFilter<"UserConnection">
    connectedAt?: DateTimeFilter<"UserConnection"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_identifier">

  export type UserConnectionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    identifier?: SortOrder
    metadata?: SortOrderInput | SortOrder
    connectedAt?: SortOrder
    _count?: UserConnectionCountOrderByAggregateInput
    _max?: UserConnectionMaxOrderByAggregateInput
    _min?: UserConnectionMinOrderByAggregateInput
  }

  export type UserConnectionScalarWhereWithAggregatesInput = {
    AND?: UserConnectionScalarWhereWithAggregatesInput | UserConnectionScalarWhereWithAggregatesInput[]
    OR?: UserConnectionScalarWhereWithAggregatesInput[]
    NOT?: UserConnectionScalarWhereWithAggregatesInput | UserConnectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserConnection"> | string
    userId?: StringWithAggregatesFilter<"UserConnection"> | string
    provider?: StringWithAggregatesFilter<"UserConnection"> | string
    identifier?: StringWithAggregatesFilter<"UserConnection"> | string
    metadata?: JsonNullableWithAggregatesFilter<"UserConnection">
    connectedAt?: DateTimeWithAggregatesFilter<"UserConnection"> | Date | string
  }

  export type UserStatsWhereInput = {
    AND?: UserStatsWhereInput | UserStatsWhereInput[]
    OR?: UserStatsWhereInput[]
    NOT?: UserStatsWhereInput | UserStatsWhereInput[]
    id?: StringFilter<"UserStats"> | string
    userId?: StringFilter<"UserStats"> | string
    xp?: IntFilter<"UserStats"> | number
    level?: IntFilter<"UserStats"> | number
    title?: StringFilter<"UserStats"> | string
    streak?: IntFilter<"UserStats"> | number
    lastActivityDate?: DateTimeFilter<"UserStats"> | Date | string
    achievements?: StringNullableListFilter<"UserStats">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserStatsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    title?: SortOrder
    streak?: SortOrder
    lastActivityDate?: SortOrder
    achievements?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserStatsWhereInput | UserStatsWhereInput[]
    OR?: UserStatsWhereInput[]
    NOT?: UserStatsWhereInput | UserStatsWhereInput[]
    xp?: IntFilter<"UserStats"> | number
    level?: IntFilter<"UserStats"> | number
    title?: StringFilter<"UserStats"> | string
    streak?: IntFilter<"UserStats"> | number
    lastActivityDate?: DateTimeFilter<"UserStats"> | Date | string
    achievements?: StringNullableListFilter<"UserStats">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserStatsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    title?: SortOrder
    streak?: SortOrder
    lastActivityDate?: SortOrder
    achievements?: SortOrder
    _count?: UserStatsCountOrderByAggregateInput
    _avg?: UserStatsAvgOrderByAggregateInput
    _max?: UserStatsMaxOrderByAggregateInput
    _min?: UserStatsMinOrderByAggregateInput
    _sum?: UserStatsSumOrderByAggregateInput
  }

  export type UserStatsScalarWhereWithAggregatesInput = {
    AND?: UserStatsScalarWhereWithAggregatesInput | UserStatsScalarWhereWithAggregatesInput[]
    OR?: UserStatsScalarWhereWithAggregatesInput[]
    NOT?: UserStatsScalarWhereWithAggregatesInput | UserStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserStats"> | string
    userId?: StringWithAggregatesFilter<"UserStats"> | string
    xp?: IntWithAggregatesFilter<"UserStats"> | number
    level?: IntWithAggregatesFilter<"UserStats"> | number
    title?: StringWithAggregatesFilter<"UserStats"> | string
    streak?: IntWithAggregatesFilter<"UserStats"> | number
    lastActivityDate?: DateTimeWithAggregatesFilter<"UserStats"> | Date | string
    achievements?: StringNullableListFilter<"UserStats">
  }

  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: StringFilter<"Role"> | string
    name?: StringFilter<"Role"> | string
    description?: StringNullableFilter<"Role"> | string | null
    isSystem?: BoolFilter<"Role"> | boolean
    isDeleted?: BoolFilter<"Role"> | boolean
    deletedAt?: DateTimeNullableFilter<"Role"> | Date | string | null
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
    users?: UserListRelationFilter
    permissions?: PermissionListRelationFilter
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isSystem?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    permissions?: PermissionOrderByRelationAggregateInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    description?: StringNullableFilter<"Role"> | string | null
    isSystem?: BoolFilter<"Role"> | boolean
    isDeleted?: BoolFilter<"Role"> | boolean
    deletedAt?: DateTimeNullableFilter<"Role"> | Date | string | null
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
    users?: UserListRelationFilter
    permissions?: PermissionListRelationFilter
  }, "id" | "name">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    isSystem?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoleCountOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Role"> | string
    name?: StringWithAggregatesFilter<"Role"> | string
    description?: StringNullableWithAggregatesFilter<"Role"> | string | null
    isSystem?: BoolWithAggregatesFilter<"Role"> | boolean
    isDeleted?: BoolWithAggregatesFilter<"Role"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Role"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string
  }

  export type PermissionWhereInput = {
    AND?: PermissionWhereInput | PermissionWhereInput[]
    OR?: PermissionWhereInput[]
    NOT?: PermissionWhereInput | PermissionWhereInput[]
    id?: StringFilter<"Permission"> | string
    name?: StringFilter<"Permission"> | string
    description?: StringNullableFilter<"Permission"> | string | null
    resource?: StringFilter<"Permission"> | string
    action?: StringFilter<"Permission"> | string
    isDeleted?: BoolFilter<"Permission"> | boolean
    deletedAt?: DateTimeNullableFilter<"Permission"> | Date | string | null
    createdAt?: DateTimeFilter<"Permission"> | Date | string
    updatedAt?: DateTimeFilter<"Permission"> | Date | string
    roles?: RoleListRelationFilter
  }

  export type PermissionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    resource?: SortOrder
    action?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roles?: RoleOrderByRelationAggregateInput
  }

  export type PermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: PermissionWhereInput | PermissionWhereInput[]
    OR?: PermissionWhereInput[]
    NOT?: PermissionWhereInput | PermissionWhereInput[]
    description?: StringNullableFilter<"Permission"> | string | null
    resource?: StringFilter<"Permission"> | string
    action?: StringFilter<"Permission"> | string
    isDeleted?: BoolFilter<"Permission"> | boolean
    deletedAt?: DateTimeNullableFilter<"Permission"> | Date | string | null
    createdAt?: DateTimeFilter<"Permission"> | Date | string
    updatedAt?: DateTimeFilter<"Permission"> | Date | string
    roles?: RoleListRelationFilter
  }, "id" | "name">

  export type PermissionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    resource?: SortOrder
    action?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PermissionCountOrderByAggregateInput
    _max?: PermissionMaxOrderByAggregateInput
    _min?: PermissionMinOrderByAggregateInput
  }

  export type PermissionScalarWhereWithAggregatesInput = {
    AND?: PermissionScalarWhereWithAggregatesInput | PermissionScalarWhereWithAggregatesInput[]
    OR?: PermissionScalarWhereWithAggregatesInput[]
    NOT?: PermissionScalarWhereWithAggregatesInput | PermissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Permission"> | string
    name?: StringWithAggregatesFilter<"Permission"> | string
    description?: StringNullableWithAggregatesFilter<"Permission"> | string | null
    resource?: StringWithAggregatesFilter<"Permission"> | string
    action?: StringWithAggregatesFilter<"Permission"> | string
    isDeleted?: BoolWithAggregatesFilter<"Permission"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Permission"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Permission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Permission"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    method?: StringNullableFilter<"AuditLog"> | string | null
    statusCode?: IntNullableFilter<"AuditLog"> | number | null
    path?: StringNullableFilter<"AuditLog"> | string | null
    params?: JsonNullableFilter<"AuditLog">
    query?: JsonNullableFilter<"AuditLog">
    body?: JsonNullableFilter<"AuditLog">
    ip?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    method?: SortOrderInput | SortOrder
    statusCode?: SortOrderInput | SortOrder
    path?: SortOrderInput | SortOrder
    params?: SortOrderInput | SortOrder
    query?: SortOrderInput | SortOrder
    body?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    method?: StringNullableFilter<"AuditLog"> | string | null
    statusCode?: IntNullableFilter<"AuditLog"> | number | null
    path?: StringNullableFilter<"AuditLog"> | string | null
    params?: JsonNullableFilter<"AuditLog">
    query?: JsonNullableFilter<"AuditLog">
    body?: JsonNullableFilter<"AuditLog">
    ip?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    method?: SortOrderInput | SortOrder
    statusCode?: SortOrderInput | SortOrder
    path?: SortOrderInput | SortOrder
    params?: SortOrderInput | SortOrder
    query?: SortOrderInput | SortOrder
    body?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _avg?: AuditLogAvgOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
    _sum?: AuditLogSumOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    method?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    statusCode?: IntNullableWithAggregatesFilter<"AuditLog"> | number | null
    path?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    params?: JsonNullableWithAggregatesFilter<"AuditLog">
    query?: JsonNullableWithAggregatesFilter<"AuditLog">
    body?: JsonNullableWithAggregatesFilter<"AuditLog">
    ip?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    status?: StringFilter<"Project"> | string
    tags?: StringNullableListFilter<"Project">
    isPinned?: BoolFilter<"Project"> | boolean
    progress?: IntFilter<"Project"> | number
    githubStats?: JsonNullableFilter<"Project">
    taskBoard?: JsonNullableFilter<"Project">
    links?: JsonNullableFilter<"Project">
    logs?: JsonNullableFilter<"Project">
    metadata?: JsonNullableFilter<"Project">
    isDeleted?: BoolFilter<"Project"> | boolean
    deletedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    tags?: SortOrder
    isPinned?: SortOrder
    progress?: SortOrder
    githubStats?: SortOrderInput | SortOrder
    taskBoard?: SortOrderInput | SortOrder
    links?: SortOrderInput | SortOrder
    logs?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    title?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    status?: StringFilter<"Project"> | string
    tags?: StringNullableListFilter<"Project">
    isPinned?: BoolFilter<"Project"> | boolean
    progress?: IntFilter<"Project"> | number
    githubStats?: JsonNullableFilter<"Project">
    taskBoard?: JsonNullableFilter<"Project">
    links?: JsonNullableFilter<"Project">
    logs?: JsonNullableFilter<"Project">
    metadata?: JsonNullableFilter<"Project">
    isDeleted?: BoolFilter<"Project"> | boolean
    deletedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    tags?: SortOrder
    isPinned?: SortOrder
    progress?: SortOrder
    githubStats?: SortOrderInput | SortOrder
    taskBoard?: SortOrderInput | SortOrder
    links?: SortOrderInput | SortOrder
    logs?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    title?: StringWithAggregatesFilter<"Project"> | string
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    status?: StringWithAggregatesFilter<"Project"> | string
    tags?: StringNullableListFilter<"Project">
    isPinned?: BoolWithAggregatesFilter<"Project"> | boolean
    progress?: IntWithAggregatesFilter<"Project"> | number
    githubStats?: JsonNullableWithAggregatesFilter<"Project">
    taskBoard?: JsonNullableWithAggregatesFilter<"Project">
    links?: JsonNullableWithAggregatesFilter<"Project">
    logs?: JsonNullableWithAggregatesFilter<"Project">
    metadata?: JsonNullableWithAggregatesFilter<"Project">
    isDeleted?: BoolWithAggregatesFilter<"Project"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type JournalWhereInput = {
    AND?: JournalWhereInput | JournalWhereInput[]
    OR?: JournalWhereInput[]
    NOT?: JournalWhereInput | JournalWhereInput[]
    id?: StringFilter<"Journal"> | string
    title?: StringNullableFilter<"Journal"> | string | null
    content?: StringFilter<"Journal"> | string
    mood?: StringNullableFilter<"Journal"> | string | null
    tags?: StringNullableListFilter<"Journal">
    type?: StringFilter<"Journal"> | string
    status?: StringFilter<"Journal"> | string
    source?: StringFilter<"Journal"> | string
    relations?: JsonNullableFilter<"Journal">
    analysis?: JsonNullableFilter<"Journal">
    userId?: StringNullableFilter<"Journal"> | string | null
    isDeleted?: BoolFilter<"Journal"> | boolean
    deletedAt?: DateTimeNullableFilter<"Journal"> | Date | string | null
    createdAt?: DateTimeFilter<"Journal"> | Date | string
    updatedAt?: DateTimeFilter<"Journal"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type JournalOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    content?: SortOrder
    mood?: SortOrderInput | SortOrder
    tags?: SortOrder
    type?: SortOrder
    status?: SortOrder
    source?: SortOrder
    relations?: SortOrderInput | SortOrder
    analysis?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type JournalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JournalWhereInput | JournalWhereInput[]
    OR?: JournalWhereInput[]
    NOT?: JournalWhereInput | JournalWhereInput[]
    title?: StringNullableFilter<"Journal"> | string | null
    content?: StringFilter<"Journal"> | string
    mood?: StringNullableFilter<"Journal"> | string | null
    tags?: StringNullableListFilter<"Journal">
    type?: StringFilter<"Journal"> | string
    status?: StringFilter<"Journal"> | string
    source?: StringFilter<"Journal"> | string
    relations?: JsonNullableFilter<"Journal">
    analysis?: JsonNullableFilter<"Journal">
    userId?: StringNullableFilter<"Journal"> | string | null
    isDeleted?: BoolFilter<"Journal"> | boolean
    deletedAt?: DateTimeNullableFilter<"Journal"> | Date | string | null
    createdAt?: DateTimeFilter<"Journal"> | Date | string
    updatedAt?: DateTimeFilter<"Journal"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type JournalOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    content?: SortOrder
    mood?: SortOrderInput | SortOrder
    tags?: SortOrder
    type?: SortOrder
    status?: SortOrder
    source?: SortOrder
    relations?: SortOrderInput | SortOrder
    analysis?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JournalCountOrderByAggregateInput
    _max?: JournalMaxOrderByAggregateInput
    _min?: JournalMinOrderByAggregateInput
  }

  export type JournalScalarWhereWithAggregatesInput = {
    AND?: JournalScalarWhereWithAggregatesInput | JournalScalarWhereWithAggregatesInput[]
    OR?: JournalScalarWhereWithAggregatesInput[]
    NOT?: JournalScalarWhereWithAggregatesInput | JournalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Journal"> | string
    title?: StringNullableWithAggregatesFilter<"Journal"> | string | null
    content?: StringWithAggregatesFilter<"Journal"> | string
    mood?: StringNullableWithAggregatesFilter<"Journal"> | string | null
    tags?: StringNullableListFilter<"Journal">
    type?: StringWithAggregatesFilter<"Journal"> | string
    status?: StringWithAggregatesFilter<"Journal"> | string
    source?: StringWithAggregatesFilter<"Journal"> | string
    relations?: JsonNullableWithAggregatesFilter<"Journal">
    analysis?: JsonNullableWithAggregatesFilter<"Journal">
    userId?: StringNullableWithAggregatesFilter<"Journal"> | string | null
    isDeleted?: BoolWithAggregatesFilter<"Journal"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Journal"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Journal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Journal"> | Date | string
  }

  export type MemoryWhereInput = {
    AND?: MemoryWhereInput | MemoryWhereInput[]
    OR?: MemoryWhereInput[]
    NOT?: MemoryWhereInput | MemoryWhereInput[]
    id?: StringFilter<"Memory"> | string
    title?: JsonFilter<"Memory">
    content?: JsonFilter<"Memory">
    mood?: StringNullableFilter<"Memory"> | string | null
    tags?: StringNullableListFilter<"Memory">
    status?: StringFilter<"Memory"> | string
    isDeleted?: BoolFilter<"Memory"> | boolean
    deletedAt?: DateTimeNullableFilter<"Memory"> | Date | string | null
    createdAt?: DateTimeFilter<"Memory"> | Date | string
    updatedAt?: DateTimeFilter<"Memory"> | Date | string
  }

  export type MemoryOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mood?: SortOrderInput | SortOrder
    tags?: SortOrder
    status?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MemoryWhereInput | MemoryWhereInput[]
    OR?: MemoryWhereInput[]
    NOT?: MemoryWhereInput | MemoryWhereInput[]
    title?: JsonFilter<"Memory">
    content?: JsonFilter<"Memory">
    mood?: StringNullableFilter<"Memory"> | string | null
    tags?: StringNullableListFilter<"Memory">
    status?: StringFilter<"Memory"> | string
    isDeleted?: BoolFilter<"Memory"> | boolean
    deletedAt?: DateTimeNullableFilter<"Memory"> | Date | string | null
    createdAt?: DateTimeFilter<"Memory"> | Date | string
    updatedAt?: DateTimeFilter<"Memory"> | Date | string
  }, "id">

  export type MemoryOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mood?: SortOrderInput | SortOrder
    tags?: SortOrder
    status?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MemoryCountOrderByAggregateInput
    _max?: MemoryMaxOrderByAggregateInput
    _min?: MemoryMinOrderByAggregateInput
  }

  export type MemoryScalarWhereWithAggregatesInput = {
    AND?: MemoryScalarWhereWithAggregatesInput | MemoryScalarWhereWithAggregatesInput[]
    OR?: MemoryScalarWhereWithAggregatesInput[]
    NOT?: MemoryScalarWhereWithAggregatesInput | MemoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Memory"> | string
    title?: JsonWithAggregatesFilter<"Memory">
    content?: JsonWithAggregatesFilter<"Memory">
    mood?: StringNullableWithAggregatesFilter<"Memory"> | string | null
    tags?: StringNullableListFilter<"Memory">
    status?: StringWithAggregatesFilter<"Memory"> | string
    isDeleted?: BoolWithAggregatesFilter<"Memory"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Memory"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Memory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Memory"> | Date | string
  }

  export type MoodWhereInput = {
    AND?: MoodWhereInput | MoodWhereInput[]
    OR?: MoodWhereInput[]
    NOT?: MoodWhereInput | MoodWhereInput[]
    id?: StringFilter<"Mood"> | string
    mood?: StringFilter<"Mood"> | string
    note?: StringNullableFilter<"Mood"> | string | null
    intensity?: IntNullableFilter<"Mood"> | number | null
    tags?: StringNullableListFilter<"Mood">
    loggedAt?: DateTimeFilter<"Mood"> | Date | string
    isDeleted?: BoolFilter<"Mood"> | boolean
    deletedAt?: DateTimeNullableFilter<"Mood"> | Date | string | null
    createdAt?: DateTimeFilter<"Mood"> | Date | string
    updatedAt?: DateTimeFilter<"Mood"> | Date | string
  }

  export type MoodOrderByWithRelationInput = {
    id?: SortOrder
    mood?: SortOrder
    note?: SortOrderInput | SortOrder
    intensity?: SortOrderInput | SortOrder
    tags?: SortOrder
    loggedAt?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MoodWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MoodWhereInput | MoodWhereInput[]
    OR?: MoodWhereInput[]
    NOT?: MoodWhereInput | MoodWhereInput[]
    mood?: StringFilter<"Mood"> | string
    note?: StringNullableFilter<"Mood"> | string | null
    intensity?: IntNullableFilter<"Mood"> | number | null
    tags?: StringNullableListFilter<"Mood">
    loggedAt?: DateTimeFilter<"Mood"> | Date | string
    isDeleted?: BoolFilter<"Mood"> | boolean
    deletedAt?: DateTimeNullableFilter<"Mood"> | Date | string | null
    createdAt?: DateTimeFilter<"Mood"> | Date | string
    updatedAt?: DateTimeFilter<"Mood"> | Date | string
  }, "id">

  export type MoodOrderByWithAggregationInput = {
    id?: SortOrder
    mood?: SortOrder
    note?: SortOrderInput | SortOrder
    intensity?: SortOrderInput | SortOrder
    tags?: SortOrder
    loggedAt?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MoodCountOrderByAggregateInput
    _avg?: MoodAvgOrderByAggregateInput
    _max?: MoodMaxOrderByAggregateInput
    _min?: MoodMinOrderByAggregateInput
    _sum?: MoodSumOrderByAggregateInput
  }

  export type MoodScalarWhereWithAggregatesInput = {
    AND?: MoodScalarWhereWithAggregatesInput | MoodScalarWhereWithAggregatesInput[]
    OR?: MoodScalarWhereWithAggregatesInput[]
    NOT?: MoodScalarWhereWithAggregatesInput | MoodScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Mood"> | string
    mood?: StringWithAggregatesFilter<"Mood"> | string
    note?: StringNullableWithAggregatesFilter<"Mood"> | string | null
    intensity?: IntNullableWithAggregatesFilter<"Mood"> | number | null
    tags?: StringNullableListFilter<"Mood">
    loggedAt?: DateTimeWithAggregatesFilter<"Mood"> | Date | string
    isDeleted?: BoolWithAggregatesFilter<"Mood"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Mood"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Mood"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Mood"> | Date | string
  }

  export type QuoteWhereInput = {
    AND?: QuoteWhereInput | QuoteWhereInput[]
    OR?: QuoteWhereInput[]
    NOT?: QuoteWhereInput | QuoteWhereInput[]
    id?: StringFilter<"Quote"> | string
    content?: JsonFilter<"Quote">
    author?: StringNullableFilter<"Quote"> | string | null
    source?: StringNullableFilter<"Quote"> | string | null
    tags?: StringNullableListFilter<"Quote">
    mood?: StringNullableFilter<"Quote"> | string | null
    status?: StringFilter<"Quote"> | string
    isDeleted?: BoolFilter<"Quote"> | boolean
    deletedAt?: DateTimeNullableFilter<"Quote"> | Date | string | null
    createdAt?: DateTimeFilter<"Quote"> | Date | string
    updatedAt?: DateTimeFilter<"Quote"> | Date | string
    dailyQuotes?: DailyQuoteListRelationFilter
  }

  export type QuoteOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    author?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    tags?: SortOrder
    mood?: SortOrderInput | SortOrder
    status?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dailyQuotes?: DailyQuoteOrderByRelationAggregateInput
  }

  export type QuoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuoteWhereInput | QuoteWhereInput[]
    OR?: QuoteWhereInput[]
    NOT?: QuoteWhereInput | QuoteWhereInput[]
    content?: JsonFilter<"Quote">
    author?: StringNullableFilter<"Quote"> | string | null
    source?: StringNullableFilter<"Quote"> | string | null
    tags?: StringNullableListFilter<"Quote">
    mood?: StringNullableFilter<"Quote"> | string | null
    status?: StringFilter<"Quote"> | string
    isDeleted?: BoolFilter<"Quote"> | boolean
    deletedAt?: DateTimeNullableFilter<"Quote"> | Date | string | null
    createdAt?: DateTimeFilter<"Quote"> | Date | string
    updatedAt?: DateTimeFilter<"Quote"> | Date | string
    dailyQuotes?: DailyQuoteListRelationFilter
  }, "id">

  export type QuoteOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    author?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    tags?: SortOrder
    mood?: SortOrderInput | SortOrder
    status?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: QuoteCountOrderByAggregateInput
    _max?: QuoteMaxOrderByAggregateInput
    _min?: QuoteMinOrderByAggregateInput
  }

  export type QuoteScalarWhereWithAggregatesInput = {
    AND?: QuoteScalarWhereWithAggregatesInput | QuoteScalarWhereWithAggregatesInput[]
    OR?: QuoteScalarWhereWithAggregatesInput[]
    NOT?: QuoteScalarWhereWithAggregatesInput | QuoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Quote"> | string
    content?: JsonWithAggregatesFilter<"Quote">
    author?: StringNullableWithAggregatesFilter<"Quote"> | string | null
    source?: StringNullableWithAggregatesFilter<"Quote"> | string | null
    tags?: StringNullableListFilter<"Quote">
    mood?: StringNullableWithAggregatesFilter<"Quote"> | string | null
    status?: StringWithAggregatesFilter<"Quote"> | string
    isDeleted?: BoolWithAggregatesFilter<"Quote"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Quote"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Quote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Quote"> | Date | string
  }

  export type DailyQuoteWhereInput = {
    AND?: DailyQuoteWhereInput | DailyQuoteWhereInput[]
    OR?: DailyQuoteWhereInput[]
    NOT?: DailyQuoteWhereInput | DailyQuoteWhereInput[]
    id?: StringFilter<"DailyQuote"> | string
    date?: StringFilter<"DailyQuote"> | string
    quoteId?: StringFilter<"DailyQuote"> | string
    createdAt?: DateTimeFilter<"DailyQuote"> | Date | string
    updatedAt?: DateTimeFilter<"DailyQuote"> | Date | string
    quote?: XOR<QuoteScalarRelationFilter, QuoteWhereInput>
  }

  export type DailyQuoteOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    quoteId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    quote?: QuoteOrderByWithRelationInput
  }

  export type DailyQuoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    date?: string
    AND?: DailyQuoteWhereInput | DailyQuoteWhereInput[]
    OR?: DailyQuoteWhereInput[]
    NOT?: DailyQuoteWhereInput | DailyQuoteWhereInput[]
    quoteId?: StringFilter<"DailyQuote"> | string
    createdAt?: DateTimeFilter<"DailyQuote"> | Date | string
    updatedAt?: DateTimeFilter<"DailyQuote"> | Date | string
    quote?: XOR<QuoteScalarRelationFilter, QuoteWhereInput>
  }, "id" | "date">

  export type DailyQuoteOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    quoteId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DailyQuoteCountOrderByAggregateInput
    _max?: DailyQuoteMaxOrderByAggregateInput
    _min?: DailyQuoteMinOrderByAggregateInput
  }

  export type DailyQuoteScalarWhereWithAggregatesInput = {
    AND?: DailyQuoteScalarWhereWithAggregatesInput | DailyQuoteScalarWhereWithAggregatesInput[]
    OR?: DailyQuoteScalarWhereWithAggregatesInput[]
    NOT?: DailyQuoteScalarWhereWithAggregatesInput | DailyQuoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyQuote"> | string
    date?: StringWithAggregatesFilter<"DailyQuote"> | string
    quoteId?: StringWithAggregatesFilter<"DailyQuote"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DailyQuote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DailyQuote"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    refreshToken?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: RoleCreateNestedOneWithoutUsersInput
    stats?: UserStatsCreateNestedOneWithoutUserInput
    connections?: UserConnectionCreateNestedManyWithoutUserInput
    journals?: JournalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    refreshToken?: string | null
    roleId?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    connections?: UserConnectionUncheckedCreateNestedManyWithoutUserInput
    journals?: JournalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneWithoutUsersNestedInput
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    connections?: UserConnectionUpdateManyWithoutUserNestedInput
    journals?: JournalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    connections?: UserConnectionUncheckedUpdateManyWithoutUserNestedInput
    journals?: JournalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    password: string
    refreshToken?: string | null
    roleId?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserConnectionCreateInput = {
    id?: string
    provider: string
    identifier: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    connectedAt?: Date | string
    user: UserCreateNestedOneWithoutConnectionsInput
  }

  export type UserConnectionUncheckedCreateInput = {
    id?: string
    userId: string
    provider: string
    identifier: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    connectedAt?: Date | string
  }

  export type UserConnectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConnectionsNestedInput
  }

  export type UserConnectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserConnectionCreateManyInput = {
    id?: string
    userId: string
    provider: string
    identifier: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    connectedAt?: Date | string
  }

  export type UserConnectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserConnectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserStatsCreateInput = {
    id?: string
    xp?: number
    level?: number
    title?: string
    streak?: number
    lastActivityDate?: Date | string
    achievements?: UserStatsCreateachievementsInput | string[]
    user: UserCreateNestedOneWithoutStatsInput
  }

  export type UserStatsUncheckedCreateInput = {
    id?: string
    userId: string
    xp?: number
    level?: number
    title?: string
    streak?: number
    lastActivityDate?: Date | string
    achievements?: UserStatsCreateachievementsInput | string[]
  }

  export type UserStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    streak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: DateTimeFieldUpdateOperationsInput | Date | string
    achievements?: UserStatsUpdateachievementsInput | string[]
    user?: UserUpdateOneRequiredWithoutStatsNestedInput
  }

  export type UserStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    streak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: DateTimeFieldUpdateOperationsInput | Date | string
    achievements?: UserStatsUpdateachievementsInput | string[]
  }

  export type UserStatsCreateManyInput = {
    id?: string
    userId: string
    xp?: number
    level?: number
    title?: string
    streak?: number
    lastActivityDate?: Date | string
    achievements?: UserStatsCreateachievementsInput | string[]
  }

  export type UserStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    streak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: DateTimeFieldUpdateOperationsInput | Date | string
    achievements?: UserStatsUpdateachievementsInput | string[]
  }

  export type UserStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    streak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: DateTimeFieldUpdateOperationsInput | Date | string
    achievements?: UserStatsUpdateachievementsInput | string[]
  }

  export type RoleCreateInput = {
    id?: string
    name: string
    description?: string | null
    isSystem?: boolean
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutRoleInput
    permissions?: PermissionCreateNestedManyWithoutRolesInput
  }

  export type RoleUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    isSystem?: boolean
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutRoleInput
    permissions?: PermissionUncheckedCreateNestedManyWithoutRolesInput
  }

  export type RoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutRoleNestedInput
    permissions?: PermissionUpdateManyWithoutRolesNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutRoleNestedInput
    permissions?: PermissionUncheckedUpdateManyWithoutRolesNestedInput
  }

  export type RoleCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    isSystem?: boolean
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionCreateInput = {
    id?: string
    name: string
    description?: string | null
    resource: string
    action: string
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roles?: RoleCreateNestedManyWithoutPermissionsInput
  }

  export type PermissionUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    resource: string
    action: string
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roles?: RoleUncheckedCreateNestedManyWithoutPermissionsInput
  }

  export type PermissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: RoleUpdateManyWithoutPermissionsNestedInput
  }

  export type PermissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: RoleUncheckedUpdateManyWithoutPermissionsNestedInput
  }

  export type PermissionCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    resource: string
    action: string
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    userId?: string | null
    action: string
    method?: string | null
    statusCode?: number | null
    path?: string | null
    params?: NullableJsonNullValueInput | InputJsonValue
    query?: NullableJsonNullValueInput | InputJsonValue
    body?: NullableJsonNullValueInput | InputJsonValue
    ip?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    userId?: string | null
    action: string
    method?: string | null
    statusCode?: number | null
    path?: string | null
    params?: NullableJsonNullValueInput | InputJsonValue
    query?: NullableJsonNullValueInput | InputJsonValue
    body?: NullableJsonNullValueInput | InputJsonValue
    ip?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    method?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    params?: NullableJsonNullValueInput | InputJsonValue
    query?: NullableJsonNullValueInput | InputJsonValue
    body?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    method?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    params?: NullableJsonNullValueInput | InputJsonValue
    query?: NullableJsonNullValueInput | InputJsonValue
    body?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    userId?: string | null
    action: string
    method?: string | null
    statusCode?: number | null
    path?: string | null
    params?: NullableJsonNullValueInput | InputJsonValue
    query?: NullableJsonNullValueInput | InputJsonValue
    body?: NullableJsonNullValueInput | InputJsonValue
    ip?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    method?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    params?: NullableJsonNullValueInput | InputJsonValue
    query?: NullableJsonNullValueInput | InputJsonValue
    body?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    method?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: NullableIntFieldUpdateOperationsInput | number | null
    path?: NullableStringFieldUpdateOperationsInput | string | null
    params?: NullableJsonNullValueInput | InputJsonValue
    query?: NullableJsonNullValueInput | InputJsonValue
    body?: NullableJsonNullValueInput | InputJsonValue
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    tags?: ProjectCreatetagsInput | string[]
    isPinned?: boolean
    progress?: number
    githubStats?: NullableJsonNullValueInput | InputJsonValue
    taskBoard?: NullableJsonNullValueInput | InputJsonValue
    links?: NullableJsonNullValueInput | InputJsonValue
    logs?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    tags?: ProjectCreatetagsInput | string[]
    isPinned?: boolean
    progress?: number
    githubStats?: NullableJsonNullValueInput | InputJsonValue
    taskBoard?: NullableJsonNullValueInput | InputJsonValue
    links?: NullableJsonNullValueInput | InputJsonValue
    logs?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    tags?: ProjectUpdatetagsInput | string[]
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    progress?: IntFieldUpdateOperationsInput | number
    githubStats?: NullableJsonNullValueInput | InputJsonValue
    taskBoard?: NullableJsonNullValueInput | InputJsonValue
    links?: NullableJsonNullValueInput | InputJsonValue
    logs?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    tags?: ProjectUpdatetagsInput | string[]
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    progress?: IntFieldUpdateOperationsInput | number
    githubStats?: NullableJsonNullValueInput | InputJsonValue
    taskBoard?: NullableJsonNullValueInput | InputJsonValue
    links?: NullableJsonNullValueInput | InputJsonValue
    logs?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    status?: string
    tags?: ProjectCreatetagsInput | string[]
    isPinned?: boolean
    progress?: number
    githubStats?: NullableJsonNullValueInput | InputJsonValue
    taskBoard?: NullableJsonNullValueInput | InputJsonValue
    links?: NullableJsonNullValueInput | InputJsonValue
    logs?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    tags?: ProjectUpdatetagsInput | string[]
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    progress?: IntFieldUpdateOperationsInput | number
    githubStats?: NullableJsonNullValueInput | InputJsonValue
    taskBoard?: NullableJsonNullValueInput | InputJsonValue
    links?: NullableJsonNullValueInput | InputJsonValue
    logs?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    tags?: ProjectUpdatetagsInput | string[]
    isPinned?: BoolFieldUpdateOperationsInput | boolean
    progress?: IntFieldUpdateOperationsInput | number
    githubStats?: NullableJsonNullValueInput | InputJsonValue
    taskBoard?: NullableJsonNullValueInput | InputJsonValue
    links?: NullableJsonNullValueInput | InputJsonValue
    logs?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JournalCreateInput = {
    id?: string
    title?: string | null
    content: string
    mood?: string | null
    tags?: JournalCreatetagsInput | string[]
    type?: string
    status?: string
    source?: string
    relations?: NullableJsonNullValueInput | InputJsonValue
    analysis?: NullableJsonNullValueInput | InputJsonValue
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutJournalsInput
  }

  export type JournalUncheckedCreateInput = {
    id?: string
    title?: string | null
    content: string
    mood?: string | null
    tags?: JournalCreatetagsInput | string[]
    type?: string
    status?: string
    source?: string
    relations?: NullableJsonNullValueInput | InputJsonValue
    analysis?: NullableJsonNullValueInput | InputJsonValue
    userId?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JournalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: JournalUpdatetagsInput | string[]
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    relations?: NullableJsonNullValueInput | InputJsonValue
    analysis?: NullableJsonNullValueInput | InputJsonValue
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutJournalsNestedInput
  }

  export type JournalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: JournalUpdatetagsInput | string[]
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    relations?: NullableJsonNullValueInput | InputJsonValue
    analysis?: NullableJsonNullValueInput | InputJsonValue
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JournalCreateManyInput = {
    id?: string
    title?: string | null
    content: string
    mood?: string | null
    tags?: JournalCreatetagsInput | string[]
    type?: string
    status?: string
    source?: string
    relations?: NullableJsonNullValueInput | InputJsonValue
    analysis?: NullableJsonNullValueInput | InputJsonValue
    userId?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JournalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: JournalUpdatetagsInput | string[]
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    relations?: NullableJsonNullValueInput | InputJsonValue
    analysis?: NullableJsonNullValueInput | InputJsonValue
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JournalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: JournalUpdatetagsInput | string[]
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    relations?: NullableJsonNullValueInput | InputJsonValue
    analysis?: NullableJsonNullValueInput | InputJsonValue
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemoryCreateInput = {
    id?: string
    title?: JsonNullValueInput | InputJsonValue
    content?: JsonNullValueInput | InputJsonValue
    mood?: string | null
    tags?: MemoryCreatetagsInput | string[]
    status?: string
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemoryUncheckedCreateInput = {
    id?: string
    title?: JsonNullValueInput | InputJsonValue
    content?: JsonNullValueInput | InputJsonValue
    mood?: string | null
    tags?: MemoryCreatetagsInput | string[]
    status?: string
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: JsonNullValueInput | InputJsonValue
    content?: JsonNullValueInput | InputJsonValue
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MemoryUpdatetagsInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: JsonNullValueInput | InputJsonValue
    content?: JsonNullValueInput | InputJsonValue
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MemoryUpdatetagsInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemoryCreateManyInput = {
    id?: string
    title?: JsonNullValueInput | InputJsonValue
    content?: JsonNullValueInput | InputJsonValue
    mood?: string | null
    tags?: MemoryCreatetagsInput | string[]
    status?: string
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: JsonNullValueInput | InputJsonValue
    content?: JsonNullValueInput | InputJsonValue
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MemoryUpdatetagsInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: JsonNullValueInput | InputJsonValue
    content?: JsonNullValueInput | InputJsonValue
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MemoryUpdatetagsInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodCreateInput = {
    id?: string
    mood: string
    note?: string | null
    intensity?: number | null
    tags?: MoodCreatetagsInput | string[]
    loggedAt?: Date | string
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MoodUncheckedCreateInput = {
    id?: string
    mood: string
    note?: string | null
    intensity?: number | null
    tags?: MoodCreatetagsInput | string[]
    loggedAt?: Date | string
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MoodUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    intensity?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: MoodUpdatetagsInput | string[]
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    intensity?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: MoodUpdatetagsInput | string[]
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodCreateManyInput = {
    id?: string
    mood: string
    note?: string | null
    intensity?: number | null
    tags?: MoodCreatetagsInput | string[]
    loggedAt?: Date | string
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MoodUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    intensity?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: MoodUpdatetagsInput | string[]
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    intensity?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: MoodUpdatetagsInput | string[]
    loggedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuoteCreateInput = {
    id?: string
    content?: JsonNullValueInput | InputJsonValue
    author?: string | null
    source?: string | null
    tags?: QuoteCreatetagsInput | string[]
    mood?: string | null
    status?: string
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyQuotes?: DailyQuoteCreateNestedManyWithoutQuoteInput
  }

  export type QuoteUncheckedCreateInput = {
    id?: string
    content?: JsonNullValueInput | InputJsonValue
    author?: string | null
    source?: string | null
    tags?: QuoteCreatetagsInput | string[]
    mood?: string | null
    status?: string
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dailyQuotes?: DailyQuoteUncheckedCreateNestedManyWithoutQuoteInput
  }

  export type QuoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    author?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: QuoteUpdatetagsInput | string[]
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyQuotes?: DailyQuoteUpdateManyWithoutQuoteNestedInput
  }

  export type QuoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    author?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: QuoteUpdatetagsInput | string[]
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dailyQuotes?: DailyQuoteUncheckedUpdateManyWithoutQuoteNestedInput
  }

  export type QuoteCreateManyInput = {
    id?: string
    content?: JsonNullValueInput | InputJsonValue
    author?: string | null
    source?: string | null
    tags?: QuoteCreatetagsInput | string[]
    mood?: string | null
    status?: string
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    author?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: QuoteUpdatetagsInput | string[]
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    author?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: QuoteUpdatetagsInput | string[]
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyQuoteCreateInput = {
    id?: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
    quote: QuoteCreateNestedOneWithoutDailyQuotesInput
  }

  export type DailyQuoteUncheckedCreateInput = {
    id?: string
    date: string
    quoteId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyQuoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    quote?: QuoteUpdateOneRequiredWithoutDailyQuotesNestedInput
  }

  export type DailyQuoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    quoteId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyQuoteCreateManyInput = {
    id?: string
    date: string
    quoteId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyQuoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyQuoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    quoteId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RoleNullableScalarRelationFilter = {
    is?: RoleWhereInput | null
    isNot?: RoleWhereInput | null
  }

  export type UserStatsNullableScalarRelationFilter = {
    is?: UserStatsWhereInput | null
    isNot?: UserStatsWhereInput | null
  }

  export type UserConnectionListRelationFilter = {
    every?: UserConnectionWhereInput
    some?: UserConnectionWhereInput
    none?: UserConnectionWhereInput
  }

  export type JournalListRelationFilter = {
    every?: JournalWhereInput
    some?: JournalWhereInput
    none?: JournalWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserConnectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JournalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    refreshToken?: SortOrder
    roleId?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    refreshToken?: SortOrder
    roleId?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    refreshToken?: SortOrder
    roleId?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserConnectionProviderIdentifierCompoundUniqueInput = {
    provider: string
    identifier: string
  }

  export type UserConnectionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    identifier?: SortOrder
    metadata?: SortOrder
    connectedAt?: SortOrder
  }

  export type UserConnectionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    identifier?: SortOrder
    connectedAt?: SortOrder
  }

  export type UserConnectionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    identifier?: SortOrder
    connectedAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserStatsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    title?: SortOrder
    streak?: SortOrder
    lastActivityDate?: SortOrder
    achievements?: SortOrder
  }

  export type UserStatsAvgOrderByAggregateInput = {
    xp?: SortOrder
    level?: SortOrder
    streak?: SortOrder
  }

  export type UserStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    title?: SortOrder
    streak?: SortOrder
    lastActivityDate?: SortOrder
  }

  export type UserStatsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    xp?: SortOrder
    level?: SortOrder
    title?: SortOrder
    streak?: SortOrder
    lastActivityDate?: SortOrder
  }

  export type UserStatsSumOrderByAggregateInput = {
    xp?: SortOrder
    level?: SortOrder
    streak?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type PermissionListRelationFilter = {
    every?: PermissionWhereInput
    some?: PermissionWhereInput
    none?: PermissionWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isSystem?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isSystem?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    isSystem?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleListRelationFilter = {
    every?: RoleWhereInput
    some?: RoleWhereInput
    none?: RoleWhereInput
  }

  export type RoleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PermissionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    resource?: SortOrder
    action?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PermissionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    resource?: SortOrder
    action?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PermissionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    resource?: SortOrder
    action?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    method?: SortOrder
    statusCode?: SortOrder
    path?: SortOrder
    params?: SortOrder
    query?: SortOrder
    body?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogAvgOrderByAggregateInput = {
    statusCode?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    method?: SortOrder
    statusCode?: SortOrder
    path?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    method?: SortOrder
    statusCode?: SortOrder
    path?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogSumOrderByAggregateInput = {
    statusCode?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    tags?: SortOrder
    isPinned?: SortOrder
    progress?: SortOrder
    githubStats?: SortOrder
    taskBoard?: SortOrder
    links?: SortOrder
    logs?: SortOrder
    metadata?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    isPinned?: SortOrder
    progress?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    isPinned?: SortOrder
    progress?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type JournalCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mood?: SortOrder
    tags?: SortOrder
    type?: SortOrder
    status?: SortOrder
    source?: SortOrder
    relations?: SortOrder
    analysis?: SortOrder
    userId?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JournalMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mood?: SortOrder
    type?: SortOrder
    status?: SortOrder
    source?: SortOrder
    userId?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JournalMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mood?: SortOrder
    type?: SortOrder
    status?: SortOrder
    source?: SortOrder
    userId?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type MemoryCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mood?: SortOrder
    tags?: SortOrder
    status?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemoryMaxOrderByAggregateInput = {
    id?: SortOrder
    mood?: SortOrder
    status?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemoryMinOrderByAggregateInput = {
    id?: SortOrder
    mood?: SortOrder
    status?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type MoodCountOrderByAggregateInput = {
    id?: SortOrder
    mood?: SortOrder
    note?: SortOrder
    intensity?: SortOrder
    tags?: SortOrder
    loggedAt?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MoodAvgOrderByAggregateInput = {
    intensity?: SortOrder
  }

  export type MoodMaxOrderByAggregateInput = {
    id?: SortOrder
    mood?: SortOrder
    note?: SortOrder
    intensity?: SortOrder
    loggedAt?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MoodMinOrderByAggregateInput = {
    id?: SortOrder
    mood?: SortOrder
    note?: SortOrder
    intensity?: SortOrder
    loggedAt?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MoodSumOrderByAggregateInput = {
    intensity?: SortOrder
  }

  export type DailyQuoteListRelationFilter = {
    every?: DailyQuoteWhereInput
    some?: DailyQuoteWhereInput
    none?: DailyQuoteWhereInput
  }

  export type DailyQuoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuoteCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    author?: SortOrder
    source?: SortOrder
    tags?: SortOrder
    mood?: SortOrder
    status?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuoteMaxOrderByAggregateInput = {
    id?: SortOrder
    author?: SortOrder
    source?: SortOrder
    mood?: SortOrder
    status?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuoteMinOrderByAggregateInput = {
    id?: SortOrder
    author?: SortOrder
    source?: SortOrder
    mood?: SortOrder
    status?: SortOrder
    isDeleted?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuoteScalarRelationFilter = {
    is?: QuoteWhereInput
    isNot?: QuoteWhereInput
  }

  export type DailyQuoteCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    quoteId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyQuoteMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    quoteId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyQuoteMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    quoteId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleCreateNestedOneWithoutUsersInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    connect?: RoleWhereUniqueInput
  }

  export type UserStatsCreateNestedOneWithoutUserInput = {
    create?: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutUserInput
    connect?: UserStatsWhereUniqueInput
  }

  export type UserConnectionCreateNestedManyWithoutUserInput = {
    create?: XOR<UserConnectionCreateWithoutUserInput, UserConnectionUncheckedCreateWithoutUserInput> | UserConnectionCreateWithoutUserInput[] | UserConnectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserConnectionCreateOrConnectWithoutUserInput | UserConnectionCreateOrConnectWithoutUserInput[]
    createMany?: UserConnectionCreateManyUserInputEnvelope
    connect?: UserConnectionWhereUniqueInput | UserConnectionWhereUniqueInput[]
  }

  export type JournalCreateNestedManyWithoutUserInput = {
    create?: XOR<JournalCreateWithoutUserInput, JournalUncheckedCreateWithoutUserInput> | JournalCreateWithoutUserInput[] | JournalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JournalCreateOrConnectWithoutUserInput | JournalCreateOrConnectWithoutUserInput[]
    createMany?: JournalCreateManyUserInputEnvelope
    connect?: JournalWhereUniqueInput | JournalWhereUniqueInput[]
  }

  export type UserStatsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutUserInput
    connect?: UserStatsWhereUniqueInput
  }

  export type UserConnectionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserConnectionCreateWithoutUserInput, UserConnectionUncheckedCreateWithoutUserInput> | UserConnectionCreateWithoutUserInput[] | UserConnectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserConnectionCreateOrConnectWithoutUserInput | UserConnectionCreateOrConnectWithoutUserInput[]
    createMany?: UserConnectionCreateManyUserInputEnvelope
    connect?: UserConnectionWhereUniqueInput | UserConnectionWhereUniqueInput[]
  }

  export type JournalUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<JournalCreateWithoutUserInput, JournalUncheckedCreateWithoutUserInput> | JournalCreateWithoutUserInput[] | JournalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JournalCreateOrConnectWithoutUserInput | JournalCreateOrConnectWithoutUserInput[]
    createMany?: JournalCreateManyUserInputEnvelope
    connect?: JournalWhereUniqueInput | JournalWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RoleUpdateOneWithoutUsersNestedInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    upsert?: RoleUpsertWithoutUsersInput
    disconnect?: RoleWhereInput | boolean
    delete?: RoleWhereInput | boolean
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutUsersInput, RoleUpdateWithoutUsersInput>, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type UserStatsUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutUserInput
    upsert?: UserStatsUpsertWithoutUserInput
    disconnect?: UserStatsWhereInput | boolean
    delete?: UserStatsWhereInput | boolean
    connect?: UserStatsWhereUniqueInput
    update?: XOR<XOR<UserStatsUpdateToOneWithWhereWithoutUserInput, UserStatsUpdateWithoutUserInput>, UserStatsUncheckedUpdateWithoutUserInput>
  }

  export type UserConnectionUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserConnectionCreateWithoutUserInput, UserConnectionUncheckedCreateWithoutUserInput> | UserConnectionCreateWithoutUserInput[] | UserConnectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserConnectionCreateOrConnectWithoutUserInput | UserConnectionCreateOrConnectWithoutUserInput[]
    upsert?: UserConnectionUpsertWithWhereUniqueWithoutUserInput | UserConnectionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserConnectionCreateManyUserInputEnvelope
    set?: UserConnectionWhereUniqueInput | UserConnectionWhereUniqueInput[]
    disconnect?: UserConnectionWhereUniqueInput | UserConnectionWhereUniqueInput[]
    delete?: UserConnectionWhereUniqueInput | UserConnectionWhereUniqueInput[]
    connect?: UserConnectionWhereUniqueInput | UserConnectionWhereUniqueInput[]
    update?: UserConnectionUpdateWithWhereUniqueWithoutUserInput | UserConnectionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserConnectionUpdateManyWithWhereWithoutUserInput | UserConnectionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserConnectionScalarWhereInput | UserConnectionScalarWhereInput[]
  }

  export type JournalUpdateManyWithoutUserNestedInput = {
    create?: XOR<JournalCreateWithoutUserInput, JournalUncheckedCreateWithoutUserInput> | JournalCreateWithoutUserInput[] | JournalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JournalCreateOrConnectWithoutUserInput | JournalCreateOrConnectWithoutUserInput[]
    upsert?: JournalUpsertWithWhereUniqueWithoutUserInput | JournalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JournalCreateManyUserInputEnvelope
    set?: JournalWhereUniqueInput | JournalWhereUniqueInput[]
    disconnect?: JournalWhereUniqueInput | JournalWhereUniqueInput[]
    delete?: JournalWhereUniqueInput | JournalWhereUniqueInput[]
    connect?: JournalWhereUniqueInput | JournalWhereUniqueInput[]
    update?: JournalUpdateWithWhereUniqueWithoutUserInput | JournalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JournalUpdateManyWithWhereWithoutUserInput | JournalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JournalScalarWhereInput | JournalScalarWhereInput[]
  }

  export type UserStatsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserStatsCreateOrConnectWithoutUserInput
    upsert?: UserStatsUpsertWithoutUserInput
    disconnect?: UserStatsWhereInput | boolean
    delete?: UserStatsWhereInput | boolean
    connect?: UserStatsWhereUniqueInput
    update?: XOR<XOR<UserStatsUpdateToOneWithWhereWithoutUserInput, UserStatsUpdateWithoutUserInput>, UserStatsUncheckedUpdateWithoutUserInput>
  }

  export type UserConnectionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserConnectionCreateWithoutUserInput, UserConnectionUncheckedCreateWithoutUserInput> | UserConnectionCreateWithoutUserInput[] | UserConnectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserConnectionCreateOrConnectWithoutUserInput | UserConnectionCreateOrConnectWithoutUserInput[]
    upsert?: UserConnectionUpsertWithWhereUniqueWithoutUserInput | UserConnectionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserConnectionCreateManyUserInputEnvelope
    set?: UserConnectionWhereUniqueInput | UserConnectionWhereUniqueInput[]
    disconnect?: UserConnectionWhereUniqueInput | UserConnectionWhereUniqueInput[]
    delete?: UserConnectionWhereUniqueInput | UserConnectionWhereUniqueInput[]
    connect?: UserConnectionWhereUniqueInput | UserConnectionWhereUniqueInput[]
    update?: UserConnectionUpdateWithWhereUniqueWithoutUserInput | UserConnectionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserConnectionUpdateManyWithWhereWithoutUserInput | UserConnectionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserConnectionScalarWhereInput | UserConnectionScalarWhereInput[]
  }

  export type JournalUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<JournalCreateWithoutUserInput, JournalUncheckedCreateWithoutUserInput> | JournalCreateWithoutUserInput[] | JournalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JournalCreateOrConnectWithoutUserInput | JournalCreateOrConnectWithoutUserInput[]
    upsert?: JournalUpsertWithWhereUniqueWithoutUserInput | JournalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JournalCreateManyUserInputEnvelope
    set?: JournalWhereUniqueInput | JournalWhereUniqueInput[]
    disconnect?: JournalWhereUniqueInput | JournalWhereUniqueInput[]
    delete?: JournalWhereUniqueInput | JournalWhereUniqueInput[]
    connect?: JournalWhereUniqueInput | JournalWhereUniqueInput[]
    update?: JournalUpdateWithWhereUniqueWithoutUserInput | JournalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JournalUpdateManyWithWhereWithoutUserInput | JournalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JournalScalarWhereInput | JournalScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutConnectionsInput = {
    create?: XOR<UserCreateWithoutConnectionsInput, UserUncheckedCreateWithoutConnectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConnectionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutConnectionsNestedInput = {
    create?: XOR<UserCreateWithoutConnectionsInput, UserUncheckedCreateWithoutConnectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConnectionsInput
    upsert?: UserUpsertWithoutConnectionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConnectionsInput, UserUpdateWithoutConnectionsInput>, UserUncheckedUpdateWithoutConnectionsInput>
  }

  export type UserStatsCreateachievementsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutStatsInput = {
    create?: XOR<UserCreateWithoutStatsInput, UserUncheckedCreateWithoutStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatsInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserStatsUpdateachievementsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutStatsNestedInput = {
    create?: XOR<UserCreateWithoutStatsInput, UserUncheckedCreateWithoutStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStatsInput
    upsert?: UserUpsertWithoutStatsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStatsInput, UserUpdateWithoutStatsInput>, UserUncheckedUpdateWithoutStatsInput>
  }

  export type UserCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PermissionCreateNestedManyWithoutRolesInput = {
    create?: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput> | PermissionCreateWithoutRolesInput[] | PermissionUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutRolesInput | PermissionCreateOrConnectWithoutRolesInput[]
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PermissionUncheckedCreateNestedManyWithoutRolesInput = {
    create?: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput> | PermissionCreateWithoutRolesInput[] | PermissionUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutRolesInput | PermissionCreateOrConnectWithoutRolesInput[]
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoleInput | UserUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoleInput | UserUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoleInput | UserUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PermissionUpdateManyWithoutRolesNestedInput = {
    create?: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput> | PermissionCreateWithoutRolesInput[] | PermissionUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutRolesInput | PermissionCreateOrConnectWithoutRolesInput[]
    upsert?: PermissionUpsertWithWhereUniqueWithoutRolesInput | PermissionUpsertWithWhereUniqueWithoutRolesInput[]
    set?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    disconnect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    delete?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    update?: PermissionUpdateWithWhereUniqueWithoutRolesInput | PermissionUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: PermissionUpdateManyWithWhereWithoutRolesInput | PermissionUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoleInput | UserUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoleInput | UserUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoleInput | UserUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PermissionUncheckedUpdateManyWithoutRolesNestedInput = {
    create?: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput> | PermissionCreateWithoutRolesInput[] | PermissionUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutRolesInput | PermissionCreateOrConnectWithoutRolesInput[]
    upsert?: PermissionUpsertWithWhereUniqueWithoutRolesInput | PermissionUpsertWithWhereUniqueWithoutRolesInput[]
    set?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    disconnect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    delete?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    update?: PermissionUpdateWithWhereUniqueWithoutRolesInput | PermissionUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: PermissionUpdateManyWithWhereWithoutRolesInput | PermissionUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
  }

  export type RoleCreateNestedManyWithoutPermissionsInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput> | RoleCreateWithoutPermissionsInput[] | RoleUncheckedCreateWithoutPermissionsInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput | RoleCreateOrConnectWithoutPermissionsInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
  }

  export type RoleUncheckedCreateNestedManyWithoutPermissionsInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput> | RoleCreateWithoutPermissionsInput[] | RoleUncheckedCreateWithoutPermissionsInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput | RoleCreateOrConnectWithoutPermissionsInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
  }

  export type RoleUpdateManyWithoutPermissionsNestedInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput> | RoleCreateWithoutPermissionsInput[] | RoleUncheckedCreateWithoutPermissionsInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput | RoleCreateOrConnectWithoutPermissionsInput[]
    upsert?: RoleUpsertWithWhereUniqueWithoutPermissionsInput | RoleUpsertWithWhereUniqueWithoutPermissionsInput[]
    set?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    disconnect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    delete?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    update?: RoleUpdateWithWhereUniqueWithoutPermissionsInput | RoleUpdateWithWhereUniqueWithoutPermissionsInput[]
    updateMany?: RoleUpdateManyWithWhereWithoutPermissionsInput | RoleUpdateManyWithWhereWithoutPermissionsInput[]
    deleteMany?: RoleScalarWhereInput | RoleScalarWhereInput[]
  }

  export type RoleUncheckedUpdateManyWithoutPermissionsNestedInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput> | RoleCreateWithoutPermissionsInput[] | RoleUncheckedCreateWithoutPermissionsInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput | RoleCreateOrConnectWithoutPermissionsInput[]
    upsert?: RoleUpsertWithWhereUniqueWithoutPermissionsInput | RoleUpsertWithWhereUniqueWithoutPermissionsInput[]
    set?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    disconnect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    delete?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    update?: RoleUpdateWithWhereUniqueWithoutPermissionsInput | RoleUpdateWithWhereUniqueWithoutPermissionsInput[]
    updateMany?: RoleUpdateManyWithWhereWithoutPermissionsInput | RoleUpdateManyWithWhereWithoutPermissionsInput[]
    deleteMany?: RoleScalarWhereInput | RoleScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectCreatetagsInput = {
    set: string[]
  }

  export type ProjectUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JournalCreatetagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutJournalsInput = {
    create?: XOR<UserCreateWithoutJournalsInput, UserUncheckedCreateWithoutJournalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutJournalsInput
    connect?: UserWhereUniqueInput
  }

  export type JournalUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneWithoutJournalsNestedInput = {
    create?: XOR<UserCreateWithoutJournalsInput, UserUncheckedCreateWithoutJournalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutJournalsInput
    upsert?: UserUpsertWithoutJournalsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJournalsInput, UserUpdateWithoutJournalsInput>, UserUncheckedUpdateWithoutJournalsInput>
  }

  export type MemoryCreatetagsInput = {
    set: string[]
  }

  export type MemoryUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MoodCreatetagsInput = {
    set: string[]
  }

  export type MoodUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type QuoteCreatetagsInput = {
    set: string[]
  }

  export type DailyQuoteCreateNestedManyWithoutQuoteInput = {
    create?: XOR<DailyQuoteCreateWithoutQuoteInput, DailyQuoteUncheckedCreateWithoutQuoteInput> | DailyQuoteCreateWithoutQuoteInput[] | DailyQuoteUncheckedCreateWithoutQuoteInput[]
    connectOrCreate?: DailyQuoteCreateOrConnectWithoutQuoteInput | DailyQuoteCreateOrConnectWithoutQuoteInput[]
    createMany?: DailyQuoteCreateManyQuoteInputEnvelope
    connect?: DailyQuoteWhereUniqueInput | DailyQuoteWhereUniqueInput[]
  }

  export type DailyQuoteUncheckedCreateNestedManyWithoutQuoteInput = {
    create?: XOR<DailyQuoteCreateWithoutQuoteInput, DailyQuoteUncheckedCreateWithoutQuoteInput> | DailyQuoteCreateWithoutQuoteInput[] | DailyQuoteUncheckedCreateWithoutQuoteInput[]
    connectOrCreate?: DailyQuoteCreateOrConnectWithoutQuoteInput | DailyQuoteCreateOrConnectWithoutQuoteInput[]
    createMany?: DailyQuoteCreateManyQuoteInputEnvelope
    connect?: DailyQuoteWhereUniqueInput | DailyQuoteWhereUniqueInput[]
  }

  export type QuoteUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DailyQuoteUpdateManyWithoutQuoteNestedInput = {
    create?: XOR<DailyQuoteCreateWithoutQuoteInput, DailyQuoteUncheckedCreateWithoutQuoteInput> | DailyQuoteCreateWithoutQuoteInput[] | DailyQuoteUncheckedCreateWithoutQuoteInput[]
    connectOrCreate?: DailyQuoteCreateOrConnectWithoutQuoteInput | DailyQuoteCreateOrConnectWithoutQuoteInput[]
    upsert?: DailyQuoteUpsertWithWhereUniqueWithoutQuoteInput | DailyQuoteUpsertWithWhereUniqueWithoutQuoteInput[]
    createMany?: DailyQuoteCreateManyQuoteInputEnvelope
    set?: DailyQuoteWhereUniqueInput | DailyQuoteWhereUniqueInput[]
    disconnect?: DailyQuoteWhereUniqueInput | DailyQuoteWhereUniqueInput[]
    delete?: DailyQuoteWhereUniqueInput | DailyQuoteWhereUniqueInput[]
    connect?: DailyQuoteWhereUniqueInput | DailyQuoteWhereUniqueInput[]
    update?: DailyQuoteUpdateWithWhereUniqueWithoutQuoteInput | DailyQuoteUpdateWithWhereUniqueWithoutQuoteInput[]
    updateMany?: DailyQuoteUpdateManyWithWhereWithoutQuoteInput | DailyQuoteUpdateManyWithWhereWithoutQuoteInput[]
    deleteMany?: DailyQuoteScalarWhereInput | DailyQuoteScalarWhereInput[]
  }

  export type DailyQuoteUncheckedUpdateManyWithoutQuoteNestedInput = {
    create?: XOR<DailyQuoteCreateWithoutQuoteInput, DailyQuoteUncheckedCreateWithoutQuoteInput> | DailyQuoteCreateWithoutQuoteInput[] | DailyQuoteUncheckedCreateWithoutQuoteInput[]
    connectOrCreate?: DailyQuoteCreateOrConnectWithoutQuoteInput | DailyQuoteCreateOrConnectWithoutQuoteInput[]
    upsert?: DailyQuoteUpsertWithWhereUniqueWithoutQuoteInput | DailyQuoteUpsertWithWhereUniqueWithoutQuoteInput[]
    createMany?: DailyQuoteCreateManyQuoteInputEnvelope
    set?: DailyQuoteWhereUniqueInput | DailyQuoteWhereUniqueInput[]
    disconnect?: DailyQuoteWhereUniqueInput | DailyQuoteWhereUniqueInput[]
    delete?: DailyQuoteWhereUniqueInput | DailyQuoteWhereUniqueInput[]
    connect?: DailyQuoteWhereUniqueInput | DailyQuoteWhereUniqueInput[]
    update?: DailyQuoteUpdateWithWhereUniqueWithoutQuoteInput | DailyQuoteUpdateWithWhereUniqueWithoutQuoteInput[]
    updateMany?: DailyQuoteUpdateManyWithWhereWithoutQuoteInput | DailyQuoteUpdateManyWithWhereWithoutQuoteInput[]
    deleteMany?: DailyQuoteScalarWhereInput | DailyQuoteScalarWhereInput[]
  }

  export type QuoteCreateNestedOneWithoutDailyQuotesInput = {
    create?: XOR<QuoteCreateWithoutDailyQuotesInput, QuoteUncheckedCreateWithoutDailyQuotesInput>
    connectOrCreate?: QuoteCreateOrConnectWithoutDailyQuotesInput
    connect?: QuoteWhereUniqueInput
  }

  export type QuoteUpdateOneRequiredWithoutDailyQuotesNestedInput = {
    create?: XOR<QuoteCreateWithoutDailyQuotesInput, QuoteUncheckedCreateWithoutDailyQuotesInput>
    connectOrCreate?: QuoteCreateOrConnectWithoutDailyQuotesInput
    upsert?: QuoteUpsertWithoutDailyQuotesInput
    connect?: QuoteWhereUniqueInput
    update?: XOR<XOR<QuoteUpdateToOneWithWhereWithoutDailyQuotesInput, QuoteUpdateWithoutDailyQuotesInput>, QuoteUncheckedUpdateWithoutDailyQuotesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type RoleCreateWithoutUsersInput = {
    id?: string
    name: string
    description?: string | null
    isSystem?: boolean
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    permissions?: PermissionCreateNestedManyWithoutRolesInput
  }

  export type RoleUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    description?: string | null
    isSystem?: boolean
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    permissions?: PermissionUncheckedCreateNestedManyWithoutRolesInput
  }

  export type RoleCreateOrConnectWithoutUsersInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
  }

  export type UserStatsCreateWithoutUserInput = {
    id?: string
    xp?: number
    level?: number
    title?: string
    streak?: number
    lastActivityDate?: Date | string
    achievements?: UserStatsCreateachievementsInput | string[]
  }

  export type UserStatsUncheckedCreateWithoutUserInput = {
    id?: string
    xp?: number
    level?: number
    title?: string
    streak?: number
    lastActivityDate?: Date | string
    achievements?: UserStatsCreateachievementsInput | string[]
  }

  export type UserStatsCreateOrConnectWithoutUserInput = {
    where: UserStatsWhereUniqueInput
    create: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
  }

  export type UserConnectionCreateWithoutUserInput = {
    id?: string
    provider: string
    identifier: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    connectedAt?: Date | string
  }

  export type UserConnectionUncheckedCreateWithoutUserInput = {
    id?: string
    provider: string
    identifier: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    connectedAt?: Date | string
  }

  export type UserConnectionCreateOrConnectWithoutUserInput = {
    where: UserConnectionWhereUniqueInput
    create: XOR<UserConnectionCreateWithoutUserInput, UserConnectionUncheckedCreateWithoutUserInput>
  }

  export type UserConnectionCreateManyUserInputEnvelope = {
    data: UserConnectionCreateManyUserInput | UserConnectionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type JournalCreateWithoutUserInput = {
    id?: string
    title?: string | null
    content: string
    mood?: string | null
    tags?: JournalCreatetagsInput | string[]
    type?: string
    status?: string
    source?: string
    relations?: NullableJsonNullValueInput | InputJsonValue
    analysis?: NullableJsonNullValueInput | InputJsonValue
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JournalUncheckedCreateWithoutUserInput = {
    id?: string
    title?: string | null
    content: string
    mood?: string | null
    tags?: JournalCreatetagsInput | string[]
    type?: string
    status?: string
    source?: string
    relations?: NullableJsonNullValueInput | InputJsonValue
    analysis?: NullableJsonNullValueInput | InputJsonValue
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JournalCreateOrConnectWithoutUserInput = {
    where: JournalWhereUniqueInput
    create: XOR<JournalCreateWithoutUserInput, JournalUncheckedCreateWithoutUserInput>
  }

  export type JournalCreateManyUserInputEnvelope = {
    data: JournalCreateManyUserInput | JournalCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RoleUpsertWithoutUsersInput = {
    update: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutUsersInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type RoleUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: PermissionUpdateManyWithoutRolesNestedInput
  }

  export type RoleUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: PermissionUncheckedUpdateManyWithoutRolesNestedInput
  }

  export type UserStatsUpsertWithoutUserInput = {
    update: XOR<UserStatsUpdateWithoutUserInput, UserStatsUncheckedUpdateWithoutUserInput>
    create: XOR<UserStatsCreateWithoutUserInput, UserStatsUncheckedCreateWithoutUserInput>
    where?: UserStatsWhereInput
  }

  export type UserStatsUpdateToOneWithWhereWithoutUserInput = {
    where?: UserStatsWhereInput
    data: XOR<UserStatsUpdateWithoutUserInput, UserStatsUncheckedUpdateWithoutUserInput>
  }

  export type UserStatsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    streak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: DateTimeFieldUpdateOperationsInput | Date | string
    achievements?: UserStatsUpdateachievementsInput | string[]
  }

  export type UserStatsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    xp?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    streak?: IntFieldUpdateOperationsInput | number
    lastActivityDate?: DateTimeFieldUpdateOperationsInput | Date | string
    achievements?: UserStatsUpdateachievementsInput | string[]
  }

  export type UserConnectionUpsertWithWhereUniqueWithoutUserInput = {
    where: UserConnectionWhereUniqueInput
    update: XOR<UserConnectionUpdateWithoutUserInput, UserConnectionUncheckedUpdateWithoutUserInput>
    create: XOR<UserConnectionCreateWithoutUserInput, UserConnectionUncheckedCreateWithoutUserInput>
  }

  export type UserConnectionUpdateWithWhereUniqueWithoutUserInput = {
    where: UserConnectionWhereUniqueInput
    data: XOR<UserConnectionUpdateWithoutUserInput, UserConnectionUncheckedUpdateWithoutUserInput>
  }

  export type UserConnectionUpdateManyWithWhereWithoutUserInput = {
    where: UserConnectionScalarWhereInput
    data: XOR<UserConnectionUpdateManyMutationInput, UserConnectionUncheckedUpdateManyWithoutUserInput>
  }

  export type UserConnectionScalarWhereInput = {
    AND?: UserConnectionScalarWhereInput | UserConnectionScalarWhereInput[]
    OR?: UserConnectionScalarWhereInput[]
    NOT?: UserConnectionScalarWhereInput | UserConnectionScalarWhereInput[]
    id?: StringFilter<"UserConnection"> | string
    userId?: StringFilter<"UserConnection"> | string
    provider?: StringFilter<"UserConnection"> | string
    identifier?: StringFilter<"UserConnection"> | string
    metadata?: JsonNullableFilter<"UserConnection">
    connectedAt?: DateTimeFilter<"UserConnection"> | Date | string
  }

  export type JournalUpsertWithWhereUniqueWithoutUserInput = {
    where: JournalWhereUniqueInput
    update: XOR<JournalUpdateWithoutUserInput, JournalUncheckedUpdateWithoutUserInput>
    create: XOR<JournalCreateWithoutUserInput, JournalUncheckedCreateWithoutUserInput>
  }

  export type JournalUpdateWithWhereUniqueWithoutUserInput = {
    where: JournalWhereUniqueInput
    data: XOR<JournalUpdateWithoutUserInput, JournalUncheckedUpdateWithoutUserInput>
  }

  export type JournalUpdateManyWithWhereWithoutUserInput = {
    where: JournalScalarWhereInput
    data: XOR<JournalUpdateManyMutationInput, JournalUncheckedUpdateManyWithoutUserInput>
  }

  export type JournalScalarWhereInput = {
    AND?: JournalScalarWhereInput | JournalScalarWhereInput[]
    OR?: JournalScalarWhereInput[]
    NOT?: JournalScalarWhereInput | JournalScalarWhereInput[]
    id?: StringFilter<"Journal"> | string
    title?: StringNullableFilter<"Journal"> | string | null
    content?: StringFilter<"Journal"> | string
    mood?: StringNullableFilter<"Journal"> | string | null
    tags?: StringNullableListFilter<"Journal">
    type?: StringFilter<"Journal"> | string
    status?: StringFilter<"Journal"> | string
    source?: StringFilter<"Journal"> | string
    relations?: JsonNullableFilter<"Journal">
    analysis?: JsonNullableFilter<"Journal">
    userId?: StringNullableFilter<"Journal"> | string | null
    isDeleted?: BoolFilter<"Journal"> | boolean
    deletedAt?: DateTimeNullableFilter<"Journal"> | Date | string | null
    createdAt?: DateTimeFilter<"Journal"> | Date | string
    updatedAt?: DateTimeFilter<"Journal"> | Date | string
  }

  export type UserCreateWithoutConnectionsInput = {
    id?: string
    email: string
    name: string
    password: string
    refreshToken?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: RoleCreateNestedOneWithoutUsersInput
    stats?: UserStatsCreateNestedOneWithoutUserInput
    journals?: JournalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConnectionsInput = {
    id?: string
    email: string
    name: string
    password: string
    refreshToken?: string | null
    roleId?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    journals?: JournalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConnectionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConnectionsInput, UserUncheckedCreateWithoutConnectionsInput>
  }

  export type UserUpsertWithoutConnectionsInput = {
    update: XOR<UserUpdateWithoutConnectionsInput, UserUncheckedUpdateWithoutConnectionsInput>
    create: XOR<UserCreateWithoutConnectionsInput, UserUncheckedCreateWithoutConnectionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConnectionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConnectionsInput, UserUncheckedUpdateWithoutConnectionsInput>
  }

  export type UserUpdateWithoutConnectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneWithoutUsersNestedInput
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    journals?: JournalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConnectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    journals?: JournalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutStatsInput = {
    id?: string
    email: string
    name: string
    password: string
    refreshToken?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: RoleCreateNestedOneWithoutUsersInput
    connections?: UserConnectionCreateNestedManyWithoutUserInput
    journals?: JournalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStatsInput = {
    id?: string
    email: string
    name: string
    password: string
    refreshToken?: string | null
    roleId?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    connections?: UserConnectionUncheckedCreateNestedManyWithoutUserInput
    journals?: JournalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStatsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStatsInput, UserUncheckedCreateWithoutStatsInput>
  }

  export type UserUpsertWithoutStatsInput = {
    update: XOR<UserUpdateWithoutStatsInput, UserUncheckedUpdateWithoutStatsInput>
    create: XOR<UserCreateWithoutStatsInput, UserUncheckedCreateWithoutStatsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStatsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStatsInput, UserUncheckedUpdateWithoutStatsInput>
  }

  export type UserUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneWithoutUsersNestedInput
    connections?: UserConnectionUpdateManyWithoutUserNestedInput
    journals?: JournalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    connections?: UserConnectionUncheckedUpdateManyWithoutUserNestedInput
    journals?: JournalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutRoleInput = {
    id?: string
    email: string
    name: string
    password: string
    refreshToken?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stats?: UserStatsCreateNestedOneWithoutUserInput
    connections?: UserConnectionCreateNestedManyWithoutUserInput
    journals?: JournalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRoleInput = {
    id?: string
    email: string
    name: string
    password: string
    refreshToken?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    connections?: UserConnectionUncheckedCreateNestedManyWithoutUserInput
    journals?: JournalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRoleInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput>
  }

  export type UserCreateManyRoleInputEnvelope = {
    data: UserCreateManyRoleInput | UserCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type PermissionCreateWithoutRolesInput = {
    id?: string
    name: string
    description?: string | null
    resource: string
    action: string
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionUncheckedCreateWithoutRolesInput = {
    id?: string
    name: string
    description?: string | null
    resource: string
    action: string
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionCreateOrConnectWithoutRolesInput = {
    where: PermissionWhereUniqueInput
    create: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput>
  }

  export type UserUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutRoleInput, UserUncheckedUpdateWithoutRoleInput>
    create: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput>
  }

  export type UserUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutRoleInput, UserUncheckedUpdateWithoutRoleInput>
  }

  export type UserUpdateManyWithWhereWithoutRoleInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutRoleInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    refreshToken?: StringNullableFilter<"User"> | string | null
    roleId?: StringNullableFilter<"User"> | string | null
    isDeleted?: BoolFilter<"User"> | boolean
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type PermissionUpsertWithWhereUniqueWithoutRolesInput = {
    where: PermissionWhereUniqueInput
    update: XOR<PermissionUpdateWithoutRolesInput, PermissionUncheckedUpdateWithoutRolesInput>
    create: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput>
  }

  export type PermissionUpdateWithWhereUniqueWithoutRolesInput = {
    where: PermissionWhereUniqueInput
    data: XOR<PermissionUpdateWithoutRolesInput, PermissionUncheckedUpdateWithoutRolesInput>
  }

  export type PermissionUpdateManyWithWhereWithoutRolesInput = {
    where: PermissionScalarWhereInput
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyWithoutRolesInput>
  }

  export type PermissionScalarWhereInput = {
    AND?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
    OR?: PermissionScalarWhereInput[]
    NOT?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
    id?: StringFilter<"Permission"> | string
    name?: StringFilter<"Permission"> | string
    description?: StringNullableFilter<"Permission"> | string | null
    resource?: StringFilter<"Permission"> | string
    action?: StringFilter<"Permission"> | string
    isDeleted?: BoolFilter<"Permission"> | boolean
    deletedAt?: DateTimeNullableFilter<"Permission"> | Date | string | null
    createdAt?: DateTimeFilter<"Permission"> | Date | string
    updatedAt?: DateTimeFilter<"Permission"> | Date | string
  }

  export type RoleCreateWithoutPermissionsInput = {
    id?: string
    name: string
    description?: string | null
    isSystem?: boolean
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutPermissionsInput = {
    id?: string
    name: string
    description?: string | null
    isSystem?: boolean
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutPermissionsInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
  }

  export type RoleUpsertWithWhereUniqueWithoutPermissionsInput = {
    where: RoleWhereUniqueInput
    update: XOR<RoleUpdateWithoutPermissionsInput, RoleUncheckedUpdateWithoutPermissionsInput>
    create: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
  }

  export type RoleUpdateWithWhereUniqueWithoutPermissionsInput = {
    where: RoleWhereUniqueInput
    data: XOR<RoleUpdateWithoutPermissionsInput, RoleUncheckedUpdateWithoutPermissionsInput>
  }

  export type RoleUpdateManyWithWhereWithoutPermissionsInput = {
    where: RoleScalarWhereInput
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyWithoutPermissionsInput>
  }

  export type RoleScalarWhereInput = {
    AND?: RoleScalarWhereInput | RoleScalarWhereInput[]
    OR?: RoleScalarWhereInput[]
    NOT?: RoleScalarWhereInput | RoleScalarWhereInput[]
    id?: StringFilter<"Role"> | string
    name?: StringFilter<"Role"> | string
    description?: StringNullableFilter<"Role"> | string | null
    isSystem?: BoolFilter<"Role"> | boolean
    isDeleted?: BoolFilter<"Role"> | boolean
    deletedAt?: DateTimeNullableFilter<"Role"> | Date | string | null
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
  }

  export type UserCreateWithoutJournalsInput = {
    id?: string
    email: string
    name: string
    password: string
    refreshToken?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: RoleCreateNestedOneWithoutUsersInput
    stats?: UserStatsCreateNestedOneWithoutUserInput
    connections?: UserConnectionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutJournalsInput = {
    id?: string
    email: string
    name: string
    password: string
    refreshToken?: string | null
    roleId?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stats?: UserStatsUncheckedCreateNestedOneWithoutUserInput
    connections?: UserConnectionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutJournalsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJournalsInput, UserUncheckedCreateWithoutJournalsInput>
  }

  export type UserUpsertWithoutJournalsInput = {
    update: XOR<UserUpdateWithoutJournalsInput, UserUncheckedUpdateWithoutJournalsInput>
    create: XOR<UserCreateWithoutJournalsInput, UserUncheckedCreateWithoutJournalsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJournalsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJournalsInput, UserUncheckedUpdateWithoutJournalsInput>
  }

  export type UserUpdateWithoutJournalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneWithoutUsersNestedInput
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    connections?: UserConnectionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutJournalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    connections?: UserConnectionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DailyQuoteCreateWithoutQuoteInput = {
    id?: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyQuoteUncheckedCreateWithoutQuoteInput = {
    id?: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyQuoteCreateOrConnectWithoutQuoteInput = {
    where: DailyQuoteWhereUniqueInput
    create: XOR<DailyQuoteCreateWithoutQuoteInput, DailyQuoteUncheckedCreateWithoutQuoteInput>
  }

  export type DailyQuoteCreateManyQuoteInputEnvelope = {
    data: DailyQuoteCreateManyQuoteInput | DailyQuoteCreateManyQuoteInput[]
    skipDuplicates?: boolean
  }

  export type DailyQuoteUpsertWithWhereUniqueWithoutQuoteInput = {
    where: DailyQuoteWhereUniqueInput
    update: XOR<DailyQuoteUpdateWithoutQuoteInput, DailyQuoteUncheckedUpdateWithoutQuoteInput>
    create: XOR<DailyQuoteCreateWithoutQuoteInput, DailyQuoteUncheckedCreateWithoutQuoteInput>
  }

  export type DailyQuoteUpdateWithWhereUniqueWithoutQuoteInput = {
    where: DailyQuoteWhereUniqueInput
    data: XOR<DailyQuoteUpdateWithoutQuoteInput, DailyQuoteUncheckedUpdateWithoutQuoteInput>
  }

  export type DailyQuoteUpdateManyWithWhereWithoutQuoteInput = {
    where: DailyQuoteScalarWhereInput
    data: XOR<DailyQuoteUpdateManyMutationInput, DailyQuoteUncheckedUpdateManyWithoutQuoteInput>
  }

  export type DailyQuoteScalarWhereInput = {
    AND?: DailyQuoteScalarWhereInput | DailyQuoteScalarWhereInput[]
    OR?: DailyQuoteScalarWhereInput[]
    NOT?: DailyQuoteScalarWhereInput | DailyQuoteScalarWhereInput[]
    id?: StringFilter<"DailyQuote"> | string
    date?: StringFilter<"DailyQuote"> | string
    quoteId?: StringFilter<"DailyQuote"> | string
    createdAt?: DateTimeFilter<"DailyQuote"> | Date | string
    updatedAt?: DateTimeFilter<"DailyQuote"> | Date | string
  }

  export type QuoteCreateWithoutDailyQuotesInput = {
    id?: string
    content?: JsonNullValueInput | InputJsonValue
    author?: string | null
    source?: string | null
    tags?: QuoteCreatetagsInput | string[]
    mood?: string | null
    status?: string
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuoteUncheckedCreateWithoutDailyQuotesInput = {
    id?: string
    content?: JsonNullValueInput | InputJsonValue
    author?: string | null
    source?: string | null
    tags?: QuoteCreatetagsInput | string[]
    mood?: string | null
    status?: string
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuoteCreateOrConnectWithoutDailyQuotesInput = {
    where: QuoteWhereUniqueInput
    create: XOR<QuoteCreateWithoutDailyQuotesInput, QuoteUncheckedCreateWithoutDailyQuotesInput>
  }

  export type QuoteUpsertWithoutDailyQuotesInput = {
    update: XOR<QuoteUpdateWithoutDailyQuotesInput, QuoteUncheckedUpdateWithoutDailyQuotesInput>
    create: XOR<QuoteCreateWithoutDailyQuotesInput, QuoteUncheckedCreateWithoutDailyQuotesInput>
    where?: QuoteWhereInput
  }

  export type QuoteUpdateToOneWithWhereWithoutDailyQuotesInput = {
    where?: QuoteWhereInput
    data: XOR<QuoteUpdateWithoutDailyQuotesInput, QuoteUncheckedUpdateWithoutDailyQuotesInput>
  }

  export type QuoteUpdateWithoutDailyQuotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    author?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: QuoteUpdatetagsInput | string[]
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuoteUncheckedUpdateWithoutDailyQuotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: JsonNullValueInput | InputJsonValue
    author?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: QuoteUpdatetagsInput | string[]
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserConnectionCreateManyUserInput = {
    id?: string
    provider: string
    identifier: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    connectedAt?: Date | string
  }

  export type JournalCreateManyUserInput = {
    id?: string
    title?: string | null
    content: string
    mood?: string | null
    tags?: JournalCreatetagsInput | string[]
    type?: string
    status?: string
    source?: string
    relations?: NullableJsonNullValueInput | InputJsonValue
    analysis?: NullableJsonNullValueInput | InputJsonValue
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserConnectionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserConnectionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserConnectionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    connectedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JournalUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: JournalUpdatetagsInput | string[]
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    relations?: NullableJsonNullValueInput | InputJsonValue
    analysis?: NullableJsonNullValueInput | InputJsonValue
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JournalUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: JournalUpdatetagsInput | string[]
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    relations?: NullableJsonNullValueInput | InputJsonValue
    analysis?: NullableJsonNullValueInput | InputJsonValue
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JournalUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: JournalUpdatetagsInput | string[]
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    relations?: NullableJsonNullValueInput | InputJsonValue
    analysis?: NullableJsonNullValueInput | InputJsonValue
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyRoleInput = {
    id?: string
    email: string
    name: string
    password: string
    refreshToken?: string | null
    isDeleted?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: UserStatsUpdateOneWithoutUserNestedInput
    connections?: UserConnectionUpdateManyWithoutUserNestedInput
    journals?: JournalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: UserStatsUncheckedUpdateOneWithoutUserNestedInput
    connections?: UserConnectionUncheckedUpdateManyWithoutUserNestedInput
    journals?: JournalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUncheckedUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUncheckedUpdateManyWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    resource?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateManyWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isSystem?: BoolFieldUpdateOperationsInput | boolean
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyQuoteCreateManyQuoteInput = {
    id?: string
    date: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyQuoteUpdateWithoutQuoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyQuoteUncheckedUpdateWithoutQuoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyQuoteUncheckedUpdateManyWithoutQuoteInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}