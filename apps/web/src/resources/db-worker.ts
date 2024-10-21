import { worker } from '@electric-sql/pglite/worker'
import { PGlite } from '@electric-sql/pglite'

worker({
	async init(options) {
		return new PGlite(options)
	}
})
