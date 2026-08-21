import {
  getVehicleBySlug,
} from "@/server/repositories/vehicle.repository";

export async function getVehicle(slug) {
  return getVehicleBySlug(slug);
}