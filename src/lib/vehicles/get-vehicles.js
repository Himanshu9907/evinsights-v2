import {
  getAllVehicles,
  getVehicleBySlug,
} from "@/server/repositories/vehicle.repository";

export async function getVehicles() {
  return getAllVehicles();
}

export async function getVehicleBySlugData(slug) {
  return getVehicleBySlug(slug);
}