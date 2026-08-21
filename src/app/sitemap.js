import { getAllVehicles } from '@/server/repositories/vehicle.repository';
import { getAllBrands } from '@/server/repositories/brand.repository';
import { getAllContent } from '@/server/repositories/content.repository';
export const dynamic='force-dynamic';

export default async function sitemap(){const [v,b,c]=await Promise.all([getAllVehicles(),getAllBrands(),getAllContent()]);const base=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';return [{url:base},{url:`${base}/cars`},{url:`${base}/brands`},{url:`${base}/compare`},{url:`${base}/articles`},{url:`${base}/reviews`},{url:`${base}/guides`},...v.map(x=>({url:`${base}/vehicles/${x.slug}`,lastModified:x.updatedAt?new Date(x.updatedAt):undefined})),...b.map(x=>({url:`${base}/brands/${x.slug}`})),...c.map(x=>({url:`${base}/${x.type==='review'?'reviews':'articles'}/${x.slug}`,lastModified:x.updatedAt?new Date(x.updatedAt):undefined}))]}
