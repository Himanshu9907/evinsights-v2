import { query } from "../db.js";
function normalize(row){return row?{...(row.payload||{}),...(row.data||{}),id:row.id,vehicleId:row.vehicle_id}:null;}
export async function getAllCharging(){const {rows}=await query(`SELECT * FROM charging ORDER BY id`);return rows.map(normalize);}
export async function getChargingByIds(ids=[]){if(!ids.length)return [];const {rows}=await query(`SELECT * FROM charging WHERE id=ANY($1::text[])`,[ids]);return rows.map(normalize);}
