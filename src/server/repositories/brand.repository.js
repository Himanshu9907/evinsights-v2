import { query } from "../db.js";
function normalize(row){return row?{...(row.payload||{}),id:row.id,name:row.name,slug:row.slug,country:row.country,logo:row.logo}:null;}
export async function getAllBrands(){const {rows}=await query(`SELECT * FROM brands ORDER BY name ASC`);return rows.map(normalize);}
export async function getBrandById(id){if(!id)return null;const {rows}=await query(`SELECT * FROM brands WHERE id=$1 LIMIT 1`,[id]);return normalize(rows[0]);}
export async function getBrandBySlug(slug){if(!slug)return null;const {rows}=await query(`SELECT * FROM brands WHERE slug=$1 LIMIT 1`,[slug]);return normalize(rows[0]);}
