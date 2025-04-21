import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {

  #tableName = 'locations'
  #tableNameTranslations = 'location_translations'
  #tableNameCategories = 'location_categories'

  async up() {

    this.schema.createTable(this.#tableNameCategories, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.string('name')
      table.string('slug').unique()
      table.boolean('archived').defaultTo(false)
    })

    this.schema.createTable(this.#tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.#tableNameTranslations)
    this.schema.dropTable(this.#tableName)
    this.schema.dropTable(this.#tableNameCategories)
  }
}