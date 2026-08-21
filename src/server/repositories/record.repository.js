import { query } from "../db.js";
const TABLES={brands:'brands',vehicles:'vehicles',variants:'variants',pricing:'pricing',sources:'sources',media:'media',charging:'charging',content:'content'};
export function getEntityDirectory(entity){if(!TABLES[entity])throw new Error(`Unsupported SQL entity: ${entity}`);return TABLES[entity];}
export async function getAllRecords(entity){const table=getEntityDirectory(entity);const {rows}=await query(`SELECT payload FROM ${table}`);return rows.map(r=>r.payload);}
export async function getRecordById(entity,id){const table=getEntityDirectory(entity);const {rows}=await query(`SELECT payload FROM ${table} WHERE id=$1 LIMIT 1`,[id]);return rows[0]?.payload||null;}
export async function getRecordBySlug(entity,slug){const table=getEntityDirectory(entity);const {rows}=await query(`SELECT payload FROM ${table} WHERE slug=$1 LIMIT 1`,[slug]);return rows[0]?.payload||null;}
export async function findRecords(entity,predicate){return (await getAllRecords(entity)).filter(predicate);}
export async function countRecords(entity){const table=getEntityDirectory(entity);const {rows}=await query(`SELECT COUNT(*)::int AS count FROM ${table}`);return rows[0].count;}
