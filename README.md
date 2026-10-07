# open-datasets

Open structured datasets for developers, creators, and indie makers.

This repo is a public collection of static JSON datasets. The data is designed to be easy to review in pull requests, validate in CI, consume from scripts and sites, and publish as a static API.

The data may be served by `api.riyo.me`. This repository does not contain an API server and does not depend on a private backend.

## What This Is

- Human- and AI-curated JSON files under `datasets/`
- JSON Schemas under `schemas/`
- TypeScript scripts for validation and normalized builds
- Source-tracked data with explicit verification timestamps
- A source repository for periodically regenerated static API output

## What This Is Not

- A database server
- An authoritative legal, tax, policy, security, or compliance reference
- A private API implementation
- A guarantee that every record is current or complete

Some datasets may be periodically researched and updated by scheduled AI agents. Automated agents must preserve source provenance, follow the schemas, and operate under `docs/AI-DATA-GUIDE.md`. Important information should still be verified against the cited primary sources.

## Dataset Categories

| Group | Path | Purpose |
| --- | --- | --- |
| Platforms | `datasets/platforms/` | Marketplaces, stores, code hosts, and product platforms |
| Launch sites | `datasets/launch-sites/` | Places where makers submit or announce projects |
| Software distribution | `datasets/software-distribution/` | OS-level distribution notes and common formats |
| File types | `datasets/file-types/` | Common extensions, MIME types, and usage notes |
| Licenses | `datasets/licenses/` | Short license reference entries with SPDX/source links |
| Countries | `datasets/countries/` | Creator/developer monetization notes by country |
| Security | `datasets/security/` | Vulnerabilities and security advisories |
| Ransomware | `datasets/ransomware/` | Publicly reported ransomware incidents |
| EOL | `datasets/eol/` | Product and version support lifecycles |
| Emulation | `datasets/emulation/` | Emulator and compatibility observations |
| Services | `datasets/services/` | Developer-service limits, quotas, and plan constraints |

## AI-maintained data

Scheduled research agents may update the five dynamic groups: Security, Ransomware, EOL, Emulation, and Services. Each agent should be assigned one group and must follow [`docs/AI-DATA-GUIDE.md`](docs/AI-DATA-GUIDE.md).

The intended pipeline is:

```text
research agents -> datasets/ -> schema validation -> normalized build -> dist/ -> static API/CDN
```

Agents should not add unsourced claims. When evidence is incomplete, the record should express uncertainty instead of guessing.

## Validate

```sh
npm install
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

The build writes `dist/index.json` plus one JSON file per dataset group. Each group output is sorted by `id` and includes `total_count` and `generated_at` metadata.

Dynamic output includes:

- `dist/security.json`
- `dist/ransomware.json`
- `dist/eol.json`
- `dist/emulation.json`
- `dist/services.json`

These generated files can be published directly behind a static host/CDN, including a future `api.riyo.me` deployment.

## Contributing

Contributions are welcome, especially corrections with better primary-source links.

When adding or changing data:

- Keep entries factual and conservative.
- Add source URLs, preferably official documentation.
- Update verification timestamps when sources are reviewed.
- Do not add private credentials, private URLs, leaked personal data, or copyrighted payloads.
- For AI-maintained groups, follow `docs/AI-DATA-GUIDE.md` and the corresponding schema.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the general contribution workflow.

## Licenses

Code in this repository is licensed under the MIT License. See [LICENSE](LICENSE).

Dataset contents are licensed under Creative Commons Attribution 4.0 International. See [DATA-LICENSE](DATA-LICENSE).

The split is intentional: scripts and tooling are code, while the JSON dataset contents are data.
