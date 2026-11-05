const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

const cache = new Map()

function loadSchema(filename) {
  const absolutePath = path.resolve(filename)

  if (cache.has(absolutePath)) {
    return cache.get(absolutePath)
  }

  const source = fs.readFileSync(absolutePath, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  })
  const moduleRecord = { exports: {} }
  const resolveImport = (specifier) => {
    if (specifier.startsWith('@/')) {
      return loadSchema(path.join('src', specifier.slice(2) + '.ts'))
    }

    if (specifier.startsWith('.')) {
      return loadSchema(path.join(path.dirname(absolutePath), specifier + '.ts'))
    }

    return require(specifier)
  }

  const evaluate = new Function('require', 'module', 'exports', compiled.outputText)
  evaluate(resolveImport, moduleRecord, moduleRecord.exports)
  cache.set(absolutePath, moduleRecord.exports)

  return moduleRecord.exports
}

const website = loadSchema('src/features/establishment/schemas/establishment-website-url.schema.ts')
const create = loadSchema('src/features/establishment/schemas/create-establishment.api.schema.ts')
const update = loadSchema('src/features/establishment/schemas/update-establishment.api.schema.ts')
const settings = loadSchema('src/features/establishment/schemas/establishment-settings-form.schema.ts')
const values = loadSchema('src/features/establishment/utils/establishment-settings-form-values.ts')

const validUrl = 'https://example.com/estabelecimento'
const createInput = { name: 'Unidade', description: '', phones: ['11999999999'] }
const establishmentId = '550e8400-e29b-41d4-a716-446655440000'

assert.equal(create.CreateEstablishmentRequestSchema.parse(createInput).websiteUrl, undefined)
assert.equal(create.CreateEstablishmentRequestSchema.parse({ ...createInput, websiteUrl: null }).websiteUrl, null)
assert.equal(create.CreateEstablishmentRequestSchema.parse({ ...createInput, websiteUrl: validUrl }).websiteUrl, validUrl)
assert.equal(update.UpdateEstablishmentRequestSchema.parse({ id: establishmentId }).websiteUrl, undefined)
assert.equal(update.UpdateEstablishmentRequestSchema.parse({ id: establishmentId, websiteUrl: null }).websiteUrl, null)
assert.equal(update.UpdateEstablishmentRequestSchema.parse({ id: establishmentId, websiteUrl: validUrl }).websiteUrl, validUrl)
assert.equal(website.EstablishmentWebsiteUrlFormSchema.parse(''), '')
assert.equal(website.EstablishmentWebsiteUrlFormSchema.parse('  ' + validUrl + '  '), validUrl)

for (const invalidUrl of ['http://example.com', 'javascript:alert(1)', 'https://', 'https://example.com/' + 'x'.repeat(2048)]) {
  assert.equal(website.EstablishmentWebsiteUrlFormSchema.safeParse(invalidUrl).success, false)
  assert.equal(create.CreateEstablishmentRequestSchema.safeParse({ ...createInput, websiteUrl: invalidUrl }).success, false)
  assert.equal(update.UpdateEstablishmentRequestSchema.safeParse({ id: establishmentId, websiteUrl: invalidUrl }).success, false)
}

const defaults = values.getEstablishmentSettingsFormValues()
assert.equal(defaults.websiteUrl, '')
assert.equal(settings.EstablishmentSettingsFormSchema.parse({ ...defaults, websiteUrl: validUrl }).websiteUrl, validUrl)
assert.equal(settings.EstablishmentSettingsFormSchema.parse({ ...defaults, websiteUrl: '' }).websiteUrl, '')
process.stdout.write('Contratos de websiteUrl do painel: criação, edição, configurações, vazio/null e URLs inválidas validados.\n')
