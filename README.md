# open-datasets

Open structured datasets for developers, creators, and indie makers.

This repo is a small public collection of static JSON datasets. The data is meant to be easy to read in a pull request, easy to validate in CI, and easy to consume from scripts, sites, or a future API.

The data may be served by `api.riyo.me`, but this repository does not contain an API server and does not depend on any private codebase.

## What This Is

- Human-editable JSON files under `datasets/`
- JSON Schemas under `schemas/`
- TypeScript scripts for validation and normalized builds
- Source-tracked starter data for platforms, launch sites, file types, licenses, countries, and software distribution notes

## What This Is Not

- A database
- A scraper
- A legal, tax, policy, or compliance reference
- A private API implementation
- A guarantee that every platform rule is current

Every entry has sources and a `last_checked` date, but humans should verify anything important before relying on it.

## Example Uses

- Fill dropdowns or reference pages in maker tools
- Build static lookup tables for websites
- Seed a public API with reviewed JSON data
- Compare software distribution options
- Track source links for platform and license research

## Dataset Categories

| Group | Path | Purpose |
| --- | --- | --- |
| Platforms | `datasets/platforms/` | Marketplaces, stores, code hosts, and product platforms |
| Launch sites | `datasets/launch-sites/` | Places where makers submit or announce projects |
| Software distribution | `datasets/software-distribution/` | OS-level distribution notes and common formats |
| File types | `datasets/file-types/` | Common extensions, MIME types, and usage notes |
| Licenses | `datasets/licenses/` | Short license reference entries with SPDX/source links |
| Countries | `datasets/countries/` | Creator/developer monetization notes by country |

## Validate

Install dependencies:

```sh
npm install
```

Validate every dataset file:

```sh
npm run validate
```

Build normalized output under `dist/`:

```sh
npm run build
```

Run both:

```sh
npm run check
```

## Output

The build script writes:

- `dist/index.json`
- `dist/platforms.json`
- `dist/launch-sites.json`
- `dist/software-distribution.json`
- `dist/file-types.json`
- `dist/licenses.json`
- `dist/countries.json`

Each group output is sorted by `id` and includes a small metadata block with `total_count` and `generated_at`.

## Contributing

Contributions are welcome, especially corrections with better source links.

When adding or changing data:

- Keep entries factual and conservative.
- Use `unknown`, `partial`, `yes`, `no`, `varies`, or `needs_verification` when a field is not clear.
- Add source URLs, preferably official documentation.
- Update `last_checked` when you personally review a source.
- Do not scrape data into this repository.
- Do not add private credentials, private URLs, or deployment details.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow.

## Licenses

Code in this repository is licensed under the MIT License. See [LICENSE](LICENSE).

Dataset contents are licensed under Creative Commons Attribution 4.0 International. See [DATA-LICENSE](DATA-LICENSE).

The split is intentional: scripts and tooling are code, while the JSON dataset contents are data.
