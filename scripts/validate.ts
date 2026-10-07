import Ajv, { type ValidateFunction } from "ajv";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const datasetsDir = path.join(rootDir, "datasets");
const schemasDir = path.join(rootDir, "schemas");

const schemaByGroup: Record<string, string> = {
  platforms: "platform.schema.json",
  "launch-sites": "launch-site.schema.json",
  "software-distribution": "software-distribution.schema.json",
  "file-types": "file-type.schema.json",
  licenses: "license.schema.json",
  countries: "country.schema.json",
  security: "vulnerability.schema.json",
  ransomware: "ransomware-incident.schema.json",
  eol: "eol-product.schema.json",
  emulation: "emulation-compatibility.schema.json",
  services: "service-limit.schema.json"
};

export type DatasetRecord = {
  id: string;
  name: string;
  [key: string]: unknown;
};

export type DatasetFile = {
  group: string;
  filePath: string;
  data: DatasetRecord;
};

async function listJsonFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return listJsonFiles(entryPath);
      return entry.isFile() && entry.name.endsWith(".json") ? [entryPath] : [];
    })
  );
  return files.flat().sort();
}

async function readJson(filePath: string): Promise<unknown> {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`${path.relative(rootDir, filePath)} is not valid JSON: ${message}`);
  }
}

async function loadValidators(): Promise<Record<string, ValidateFunction>> {
  const ajv = new Ajv({ allErrors: true, strict: true });
  const validators: Record<string, ValidateFunction> = {};
  for (const [group, schemaFile] of Object.entries(schemaByGroup)) {
    validators[group] = ajv.compile(await readJson(path.join(schemasDir, schemaFile)));
  }
  return validators;
}

export async function validateDatasets(): Promise<DatasetFile[]> {
  const validators = await loadValidators();
  const jsonFiles = await listJsonFiles(datasetsDir);
  const records: DatasetFile[] = [];
  const errors: string[] = [];

  for (const filePath of jsonFiles) {
    const relativePath = path.relative(datasetsDir, filePath);
    const group = relativePath.split(path.sep)[0];
    const validate = validators[group];
    if (!validate) {
      errors.push(`${path.relative(rootDir, filePath)} has no schema mapping for group "${group}".`);
      continue;
    }

    let data: unknown;
    try {
      data = await readJson(filePath);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
      continue;
    }

    if (!validate(data)) {
      const details = (validate.errors ?? [])
        .map((error) => `  - ${error.instancePath || "/"} ${error.message ?? "failed validation"}`)
        .join("\n");
      errors.push(`${path.relative(rootDir, filePath)} failed schema validation:\n${details}`);
      continue;
    }

    records.push({ group, filePath, data: data as DatasetRecord });
  }

  const idsByGroup = new Map<string, Set<string>>();
  for (const record of records) {
    const ids = idsByGroup.get(record.group) ?? new Set<string>();
    if (ids.has(record.data.id)) errors.push(`Duplicate id "${record.data.id}" in group "${record.group}".`);
    ids.add(record.data.id);
    idsByGroup.set(record.group, ids);
  }

  if (errors.length > 0) throw new Error(errors.join("\n\n"));
  return records;
}

const isCli = process.argv[1] ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1]) : false;
if (isCli) {
  validateDatasets()
    .then((records) => console.log(`Validated ${records.length} dataset files.`))
    .catch((error) => {
      console.error(error instanceof Error ? error.message : error);
      process.exitCode = 1;
    });
}
