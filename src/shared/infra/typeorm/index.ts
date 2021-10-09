import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async(host = "database_ignite"): Promise<Connection> => {
  const defaultOption = await getConnectionOptions();

  const isDev = process.env.NODE_ENV === 'test';

  return createConnection(
    Object.assign(defaultOption, {
      host: isDev ? "localhost" : host,
      database: isDev
        ? "rentx_test"
        : defaultOption.database
    })
  )
}