import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Books, Courses, Faqs, Posts, Press, Testimonials } from './collections/content'
import { Leads } from './collections/Leads'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { HomePage, SiteSettings } from './globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' | Mentor Jenny Nguyễn' },
  },
  collections: [Users, Media, Courses, Books, Testimonials, Press, Posts, Faqs, Leads],
  globals: [SiteSettings, HomePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
    // Dev: tự đồng bộ schema. Production: dùng migration (`npm run payload migrate`).
    push: process.env.NODE_ENV !== 'production',
  }),
  sharp,
  plugins: [],
})
