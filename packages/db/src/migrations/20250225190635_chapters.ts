import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('chapters')
    .addColumn('created_at', 'timestamptz', (column) => {
      return column.notNull().defaultTo(sql`now()`);
    })
    .addColumn('id', 'text', (column) => {
      return column.primaryKey();
    })
    .addColumn('school_id', 'text', (column) => {
      return column.notNull().unique().references('schools.id');
    })
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('chapters').execute();
}
