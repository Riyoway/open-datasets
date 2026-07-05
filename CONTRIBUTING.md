# Contributing

Thanks for helping improve `open-datasets`.

This project works best when entries stay boring, sourced, and easy to review. If a fact needs interpretation, use a conservative value and leave a note for future verification.

## Add Or Update Data

1. Pick the correct group under `datasets/`.
2. Add or edit one JSON file per item.
3. Match the schema for that group in `schemas/`.
4. Include every required shared field:

```json
{
  "id": "example-id",
  "name": "Example",
  "description": "Short plain-language description.",
  "category": "example",
  "tags": ["example"],
  "sources": [
    {
      "title": "Official source",
      "url": "https://example.com",
      "type": "official",
      "last_checked": "2026-07-05"
    }
  ],
  "last_checked": "2026-07-05",
  "notes": "Explain uncertainty or review context."
}
```

5. Run:

```sh
npm run check
```

6. Commit the dataset change and any updated `dist/` output.

## Source Rules

- Prefer official documentation, standards bodies, or maintained help pages.
- Use community sources only when official sources are missing or incomplete.
- Do not scrape websites.
- Do not copy long text from sources.
- Do not make exact legal, tax, payout, or policy claims unless the entry clearly cites a current source.
- If a claim is unclear, use `unknown`, `partial`, `varies`, or `needs_verification`.

## Dates

Use ISO dates in `YYYY-MM-DD` format.

Set `last_checked` to the date you reviewed the source yourself. Do not update dates just to make entries look fresh.

## Notes

The `notes` field should explain review context, caveats, or next checks. It is fine for notes to say that an entry needs manual verification.

## Schema Changes

Schema changes affect contributors and downstream users. Keep them small and explain the reason in the pull request.

If a new field is useful for only one item, put it in `notes` first. Promote it into the schema when it becomes useful across the group.

## What Not To Add

- Private API code
- Deployment secrets
- Environment variables
- Private repository references
- Generated scrape dumps
- Legal, tax, or compliance advice

## Pull Requests

Pull requests should pass CI. The CI runs `npm run validate`, which checks all JSON files against their group schemas.
