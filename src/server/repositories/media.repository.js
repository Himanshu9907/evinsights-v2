import { query } from "../db.js";
function normalize(row){return row?{...(row.payload||{}),id:row.id,entity:{type:'vehicle',id:row.vehicle_id},type:row.type,url:row.url,alt:row.alt}:null;}
export async function getAllMedia(){const {rows}=await query(`SELECT * FROM media ORDER BY id`);return rows.map(normalize);}
export async function getMediaByIds(ids=[]){if(!ids.length)return [];const {rows}=await query(`SELECT * FROM media WHERE id=ANY($1::text[])`,[ids]);return rows.map(normalize);}
export async function getMediaForEntity(entityId){if(!entityId)return [];const {rows}=await query(`SELECT * FROM media WHERE vehicle_id=$1 ORDER BY id`,[entityId]);return rows.map(normalize);}
