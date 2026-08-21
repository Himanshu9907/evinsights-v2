import fs from "node:fs/promises";
import path from "node:path";

const PROJECT_ROOT = process.cwd();

const INDEX_FILE = path.join(
  PROJECT_ROOT,
  "database",
  "indexes",
  "vehicles.json"
);

export async function getVehicleIndex() {
  try {
    const content = await fs.readFile(
      INDEX_FILE,
      "utf8"
    );

    const index = JSON.parse(content);

    if (!Array.isArray(index.records)) {
      throw new Error(
        "Vehicle index records must be an array"
      );
    }

    return index;
  } catch (error) {
    throw new Error(
      `Failed to read vehicle index: ${error.message}`
    );
  }
}

export async function getVehicles() {
  const index = await getVehicleIndex();

  return index.records;
}

export async function getVehicleBySlug(slug) {
  if (!slug) {
    return null;
  }

  const vehicles = await getVehicles();

  return (
    vehicles.find(
      (vehicle) =>
        vehicle.slug === slug
    ) || null
  );
}