import { getAllVehicles, getVehicleBySlug, getVehicleById } from "../repositories/vehicle.repository";
import { getVariantsByVehicleId } from "../repositories/variant.repository";
import { getPricingByVariantId, getPricingByIds } from "../repositories/pricing.repository";
import { getSpecificationsByIds, getAllSpecifications } from "../repositories/specification.repository";
import { getChargingByIds } from "../repositories/charging.repository";
import { getAllSources, getSourcesByIds } from "../repositories/source.repository";
import { getBrandById } from "../repositories/brand.repository";
import { getMediaByIds, getMediaForEntity } from "../repositories/media.repository";

const SPEC_GROUPS=["battery","performance","dimensions","safety","features"];
const unique=v=>[...new Set((v||[]).filter(Boolean))];
const mergeIds=(a,b)=>unique([...(a||[]),...(b||[])]);
function variantSpecIds(variants){const out=Object.fromEntries(SPEC_GROUPS.map(g=>[g,[]]));for(const v of variants){for(const g of SPEC_GROUPS){const x=v.specificationIds?.[g];if(Array.isArray(x))out[g].push(...x);else if(x)out[g].push(x);}}for(const g of SPEC_GROUPS)out[g]=unique(out[g]);return out;}
function variantIds(variants,key){return unique(variants.flatMap(v=>Array.isArray(v[key])?v[key]:v[key]?[v[key]]:[]));}

export async function listVehicles({page=1,limit=12,brandId=null}={}){const safePage=Math.max(1,Number(page)||1);const safeLimit=Math.min(100,Math.max(1,Number(limit)||12));let vehicles=await getAllVehicles();if(brandId)vehicles=vehicles.filter(v=>v.brandId===brandId);const total=vehicles.length;return {data:vehicles.slice((safePage-1)*safeLimit,(safePage-1)*safeLimit+safeLimit),pagination:{page:safePage,limit:safeLimit,total,totalPages:Math.ceil(total/safeLimit)}};}
export async function findVehicle(slug){return getVehicleBySlug(slug);}
export async function findVehicleById(id){return getVehicleById(id);}
export async function getVehicleVariants(vehicleId){return getVariantsByVehicleId(vehicleId);}
export async function getVehiclePricing(vehicleId){const variants=await getVehicleVariants(vehicleId);const rows=(await Promise.all(variants.map(v=>getPricingByVariantId(v.id)))).flat();const ids=unique(variants.flatMap(v=>v.pricingIds||[]));const direct=ids.length?await getPricingByIds(ids):[];return [...new Map([...rows,...direct].map(r=>[r.id,r])).values()];}

export async function getVehicleDetails(slug){
 const vehicle=await getVehicleBySlug(slug);if(!vehicle)return null;
 const variants=await getVehicleVariants(vehicle.id);
 const vSpecs=variantSpecIds(variants);
 const specificationIds=Object.fromEntries(SPEC_GROUPS.map(g=>[g,mergeIds(vehicle.specificationIds?.[g],vSpecs[g])]));
 const chargingIds=mergeIds(vehicle.chargingIds,variantIds(variants,'chargingIds'));
 const sourceIds=mergeIds(vehicle.sourceIds,variantIds(variants,'sourceIds'));
 const mediaIds=mergeIds(vehicle.mediaIds,variantIds(variants,'mediaIds'));
 const pricingIds=mergeIds(vehicle.pricingIds,variantIds(variants,'pricingIds'));
 const [brand,specifications,charging,allSources,mediaByEntity,pricing]=await Promise.all([
  getBrandById(vehicle.brandId),getSpecificationsByIds(specificationIds),getChargingByIds(chargingIds),getAllSources(),getMediaForEntity(vehicle.id),getVehiclePricing(vehicle.id)
 ]);
 const linkedSources=allSources.filter(s=>sourceIds.includes(s.id)||s.entityIds?.includes(vehicle.id));
 const media=[...new Map([...(mediaByEntity||[]),...(mediaIds.length?await getMediaByIds(mediaIds):[])].map(m=>[m.id,m])).values()];
 if(pricingIds.length){const direct=await getPricingByIds(pricingIds);pricing.splice(0,pricing.length,...new Map([...pricing,...direct].map(r=>[r.id,r])).values());}
 return {vehicle,brand,variants,pricing,specifications,allSpecifications:specifications,charging,sources:linkedSources,media};
}
