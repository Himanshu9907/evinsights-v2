import { query } from "../db.js";
function normalize(row){return row?{...(row.payload||{}),id:row.id,entityIds:row.entity_ids||[],type:row.type,title:row.title,publisher:row.publisher,url:row.url,reliability:row.reliability}:null;}
export async function getAllSources(){const {rows}=await query(`SELECT * FROM sources ORDER BY publisher NULLS LAST`);return rows.map(normalize);}
export async function getSourceById(id){if(!id)return null;const {rows}=await query(`SELECT * FROM sources WHERE id=$1 LIMIT 1`,[id]);return normalize(rows[0]);}
export async function getSourceBySlug(slug){if(!slug)return null;const {rows}=await query(`SELECT * FROM sources WHERE (payload->>'slug')=$1 LIMIT 1`,[slug]);return normalize(rows[0]);}
export async function getSourcesForEntity(entityId){if(!entityId)return [];const {rows}=await query(`SELECT * FROM sources WHERE $1=ANY(entity_ids)`,[entityId]);return rows.map(normalize);}
export async function getSourcesByIds(ids=[]){if(!ids.length)return [];const {rows}=await query(`SELECT * FROM sources WHERE id=ANY($1::text[])`,[ids]);return rows.map(normalize);}
