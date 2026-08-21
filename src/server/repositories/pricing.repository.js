import { query } from "../db.js";
function normalize(row){if(!row)return null;return {...(row.payload||{}),id:row.id,variantId:row.variant_id,marketId:row.market_id,amount:row.amount==null?null:Number(row.amount),currencyCode:row.currency_code,currencySymbol:row.currency_symbol,entity:{type:'variant',id:row.variant_id}};}
export async function getAllPricing(){const {rows}=await query(`SELECT * FROM pricing ORDER BY amount ASC NULLS LAST`);return rows.map(normalize);}
export async function getPricingByVariantId(id){if(!id)return [];const {rows}=await query(`SELECT * FROM pricing WHERE variant_id=$1 ORDER BY amount ASC NULLS LAST`,[id]);return rows.map(normalize);}
export async function getPricingByMarket(variantId,marketId){const {rows}=await query(`SELECT * FROM pricing WHERE variant_id=$1 AND market_id=$2`,[variantId,marketId]);return rows.map(normalize);}
export async function getPricingByIds(ids=[]){if(!ids.length)return [];const {rows}=await query(`SELECT * FROM pricing WHERE id=ANY($1::text[])`,[ids]);return rows.map(normalize);}
