import 'dotenv/config';
import pg from 'pg';
const { Client }=pg;
if(!process.env.DATABASE_URL){console.error('DATABASE_URL is not configured.');process.exit(1)}
const client=new Client({connectionString:process.env.DATABASE_URL,ssl:/sslmode=require|neon|supabase/i.test(process.env.DATABASE_URL)?{rejectUnauthorized:false}:undefined});
await client.connect();
const tables=['brands','vehicles','variants','pricing','specifications','charging','sources','media','content'];
for(const table of tables){const r=await client.query(`SELECT COUNT(*)::int count FROM ${table}`);console.log(`${table}: ${r.rows[0].count}`)}
const integrity=await client.query(`SELECT COUNT(*)::int AS broken FROM vehicles v LEFT JOIN brands b ON b.id=v.brand_id WHERE b.id IS NULL`);
if(integrity.rows[0].broken) throw new Error(`Broken vehicle-brand references: ${integrity.rows[0].broken}`);
console.log('BACKEND SQL CHECK PASSED');
await client.end();
