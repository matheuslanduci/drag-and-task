import { init } from '@paralleldrive/cuid2'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

const generator = init({ length: 16 })

const generateId = (prefix: string) => `${prefix}_${generator()}`

export const boardsTable = pgTable('boards', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => generateId('board')),
	title: text('title').notNull(),
	createdAt: timestamp({
		withTimezone: true
	})
		.notNull()
		.defaultNow()
})

export type Board = typeof boardsTable.$inferSelect
export type NewBoard = typeof boardsTable.$inferInsert

export const listsTable = pgTable('lists', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => generateId('list')),
	boardId: text('board_id')
		.references(() => boardsTable.id)
		.notNull(),
	title: text('title').notNull(),
	createdAt: timestamp({
		withTimezone: true
	})
		.notNull()
		.defaultNow()
})

export type List = typeof listsTable.$inferSelect
export type NewList = typeof listsTable.$inferInsert

export const cardsTable = pgTable('cards', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => generateId('card')),
	listId: text('list_id')
		.references(() => listsTable.id)
		.notNull(),
	title: text('title').notNull(),
	createdAt: timestamp({
		withTimezone: true
	})
		.notNull()
		.defaultNow()
})

export type Card = typeof cardsTable.$inferSelect
export type NewCard = typeof cardsTable.$inferInsert
