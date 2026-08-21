import { query } from "../db.js";
function normalize(row){if(!row)return null;return {...(row.payload||{}),id:row.id,vehicleId:row.vehicle_id,name:row.name,slug:row.slug};}
export async function getAllVariants(){const {rows}=await query(`SELECT * FROM variants ORDER BY name ASC`);return rows.map(normalize);}
export async function getVariantById(id){if(!id)return null;const {rows}=await query(`SELECT * FROM variants WHERE id=$1 LIMIT 1`,[id]);return normalize(rows[0]);}
export async function getVariantBySlug(slug){if(!slug)return null;const {rows}=await query(`SELECT * FROM variants WHERE slug=$1 LIMIT 1`,[slug]);return normalize(rows[0]);}
export async function getVariantsByVehicleId(vehicleId){if(!vehicleId)return [];const {rows}=await query(`SELECT * FROM variants WHERE vehicle_id=$1 ORDER BY name ASC`,[vehicleId]);return rows.map(normalize);}
