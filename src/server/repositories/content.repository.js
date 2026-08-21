import { query } from "../db.js";
function normalize(row){return row?{...(row.payload||{}),id:row.id,type:row.type,slug:row.slug,title:row.title,category:row.category,excerpt:row.excerpt,content:row.content,vehicleIds:row.vehicle_ids||[],score:row.score==null?null:Number(row.score)}:null;}
export async function getAllContent(){const {rows}=await query(`SELECT * FROM content ORDER BY created_at DESC`);return rows.map(normalize);}
export async function getContentBySlug(slug){if(!slug)return null;const {rows}=await query(`SELECT * FROM content WHERE slug=$1 LIMIT 1`,[slug]);return normalize(rows[0]);}
export async function getContentForVehicle(vehicleId,type=null){const params=[vehicleId];let sql=`SELECT * FROM content WHERE $1=ANY(vehicle_ids)`;if(type){params.push(type);sql+=` AND type=$2`;}sql+=' ORDER BY created_at DESC';const {rows}=await query(sql,params);return rows.map(normalize);}
