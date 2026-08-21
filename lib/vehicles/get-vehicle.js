import { getVehicleDetails } from "@/server/services/vehicle.service";

export async function getVehicle(slug) {
  if (!slug) return null;
  const details = await getVehicleDetails(slug);
  return details?.vehicle ?? null;
}
