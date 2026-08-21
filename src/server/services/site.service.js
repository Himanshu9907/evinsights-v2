import { getAllVehicles } from "../repositories/vehicle.repository";
import { getAllBrands } from "../repositories/brand.repository";
import { getAllSources } from "../repositories/source.repository";
import { getAllContent } from "../repositories/content.repository";
export async function getSiteSnapshot(){const [vehicles,brands,sources,content]=await Promise.all([getAllVehicles(),getAllBrands(),getAllSources(),getAllContent()]);const approved=vehicles.filter(v=>v.verification?.status==='approved');const featured=approved.filter(v=>v.metadata?.featured);return {vehicles,brands,sources,content,approved,featured};}
