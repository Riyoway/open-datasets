import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateDatasets } from "./validate.js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");

const groupOrder = [
  "platforms",
  "launch-sites",
  "software-distribution",
  "file-types",
  "licenses",
  "countries",
  "security",
  "ransomware",
  "eol",
  "emulation",
  "services"
];

async function writeJson(fileName: string, data: unknown): Promise<void> {
  await writeFile(path.join(distDir, fileName), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function build(): Promise<void> {
  const records = await validateDatasets();
  const generatedAt = new Date().toISOString();
  const grouped = new Map<string, unknown[]>();
  for (const group of groupOrder) grouped.set(group, []);

  for (const record of records) {
    const groupRecords = grouped.get(record.group) ?? [];
    groupRecords.push(record.data);
    grouped.set(record.group, groupRecords);
  }

  await mkdir(distDir, { recursive: true });

  const groups = groupOrder.map((group) => {
    const data = (grouped.get(group) ?? []).sort((a, b) => {
      const left = typeof a === "object" && a && "id" in a ? String(a.id) : "";
      const right = typeof b === "object" && b && "id" in b ? String(b.id) : "";
      return left.localeCompare(right);
    });
    return { id: group, file: `${group}.json`, count: data.length };
  });

  for (const group of groups) {
    await writeJson(group.file, {
      metadata: { group: group.id, total_count: group.count, generated_at: generatedAt },
      data: (grouped.get(group.id) ?? []).sort((a, b) => {
        const left = typeof a === "object" && a && "id" in a ? String(a.id) : "";
        const right = typeof b === "object" && b && "id" in b ? String(b.id) : "";
        return left.localeCompare(right);
      })
    });
  }

  await writeJson("index.json", {
    metadata: { total_count: records.length, generated_at: generatedAt, groups }
  });

  console.log(`Built ${records.length} records into dist/.`);
}

build().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
