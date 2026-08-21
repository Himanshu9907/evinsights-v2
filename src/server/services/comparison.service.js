import { getVehicleBySlug } from "../repositories/vehicle.repository";
import { getVariantsByVehicleId } from "../repositories/variant.repository";
import { getPricingByVariantId } from "../repositories/pricing.repository";
import { getSpecificationsByIds } from "../repositories/specification.repository";
import { getChargingByIds } from "../repositories/charging.repository";
export async function compareVehicles(slugs=[]){const unique=[...new Set(Array.isArray(slugs)?slugs.filter(Boolean):[])].slice(0,4);const vehicles=(await Promise.all(unique.map(getVehicleBySlug))).filter(Boolean);return Promise.all(vehicles.map(async vehicle=>{const variants=await getVariantsByVehicleId(vehicle.id);const pricing=(await Promise.all(variants.map(v=>getPricingByVariantId(v.id)))).flat();const specifications=await getSpecificationsByIds(vehicle.specificationIds||{});const charging=await getChargingByIds(vehicle.chargingIds||[]);return {vehicle,variants,pricing,specifications,charging};}));}
