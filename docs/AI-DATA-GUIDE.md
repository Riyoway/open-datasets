# AI Data Guide

This repository may be updated by scheduled AI research agents. The agents are curators, not authoritative sources.

## Core rules

1. Prefer primary and official sources. Use secondary reporting only when primary material is unavailable or when corroboration is useful.
2. Never invent facts, dates, versions, identifiers, URLs, or confidence values.
3. Every machine-maintained record must include source provenance and `last_checked`.
4. Preserve stable `id` values. Do not rename an existing ID just to improve wording.
5. Update an existing record instead of creating a duplicate for the same entity or event.
6. When a fact cannot be verified, represent uncertainty explicitly. Do not convert uncertainty into a definitive claim.
7. Prefer marking records inactive, superseded, resolved, or historical over deleting useful history.
8. Keep summaries factual and compact. Avoid promotional language and speculation.
9. Before committing, run `npm run check` and fix schema or duplicate-ID failures.
10. Only edit the dataset group assigned to the agent unless the task explicitly requires a cross-group change.

## Shared provenance fields

AI-maintained schemas use these fields where applicable:

- `id`: stable machine-readable identifier.
- `name` or `title`: human-readable label.
- `status`: lifecycle or verification state defined by the schema.
- `first_seen`: first time this repository observed the item, ISO 8601 date-time.
- `last_seen`: most recent time the item was observed, ISO 8601 date-time.
- `last_checked`: most recent source verification time, ISO 8601 date-time.
- `confidence`: number from 0 to 1. This is confidence in the normalized record, not a probability that an event occurred.
- `sources`: one or more source objects containing `url`, `type`, and optionally `title` and `published_at`.

## Source types

Use one of:

- `official`: vendor, project, government, standards body, or directly affected organization.
- `database`: maintained structured database or registry.
- `research`: security/research organization or technical analysis.
- `news`: journalistic reporting.
- `community`: project/community source. Use cautiously and corroborate important claims.

## Confidence guidance

- `0.95-1.00`: directly supported by authoritative primary sources and internally consistent.
- `0.80-0.94`: strong evidence, possibly combining primary and reputable secondary sources.
- `0.60-0.79`: plausible and supported, but some important detail is indirect or incomplete.
- `<0.60`: generally do not publish as a normal record; use `needs_verification` where the schema permits it.

Confidence must not be increased merely because multiple sites repeat the same original claim.

## Dates and changes

Do not overwrite `first_seen` during routine updates. Update `last_seen` when the item is observed again and `last_checked` whenever its sources are re-verified. Source publication dates belong in `sources[].published_at` and must not be substituted for observation dates.

## Deletion policy

Delete only obvious mistakes, duplicates, test data, or records that cannot be retained legally/licensably. Otherwise preserve history with a status change.

## Group ownership

| Group | Path | Primary responsibility |
| --- | --- | --- |
| Security | `datasets/security/` | Vulnerabilities and security advisories |
| Ransomware | `datasets/ransomware/` | Publicly reported ransomware incidents and groups |
| EOL | `datasets/eol/` | Product/version support lifecycle information |
| Emulation | `datasets/emulation/` | Emulator/project and compatibility observations |
| Services | `datasets/services/` | Developer-service limits, free tiers, quotas, and policy-relevant technical constraints |

The schemas are the contract. If a useful fact does not fit, propose a schema change rather than silently adding ad-hoc fields.