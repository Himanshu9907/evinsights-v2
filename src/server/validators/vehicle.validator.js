import { isObject } from "../utils/json";

export function validateVehicle(vehicle) {
  const errors = [];
  if (!isObject(vehicle)) return { valid: false, errors: ["Vehicle must be an object"] };
  if (!vehicle.id) errors.push("Vehicle id is required");
  if (!vehicle.type || vehicle.type !== "vehicle") errors.push("Vehicle type must be vehicle");
  if (!vehicle.identity?.name) errors.push("Vehicle identity.name is required");
  if (!vehicle.identity?.slug) errors.push("Vehicle identity.slug is required");
  if (!vehicle.identity?.brandId) errors.push("Vehicle identity.brandId is required");
  if (!vehicle.classification?.vehicleType) errors.push("Vehicle classification.vehicleType is required");
  if (!isObject(vehicle.status)) errors.push("Vehicle status must be an object");
  if (!Array.isArray(vehicle.markets)) errors.push("Vehicle markets must be an array");
  if (!Array.isArray(vehicle.sourceIds)) errors.push("Vehicle sourceIds must be an array");
  if (!isObject(vehicle.specificationIds)) errors.push("Vehicle specificationIds must be an object");
  return { valid: errors.length === 0, errors };
}
