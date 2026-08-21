import Link from "next/link";
import { getAllContent } from "@/server/repositories/content.repository";
export const dynamic='force-dynamic';

export default async function Articles(){const items=(await getAllContent()).filter(x=>x.type==='article');return <main className="shell"><section className="page-hero"><span className="eyebrow">EV knowledge</span><h1>Articles that explain the EV world.</h1><p>Buying guides, vehicle explainers and data-led updates generated from the platform's source-backed records.</p></section><div className="article-grid">{items.map(a=><Link key={a.id} href={`/articles/${a.slug}`} className="article-card"><span className="tag">{a.category}</span><h3>{a.title}</h3><p>{a.excerpt}</p><span className="btn btn-secondary">Read article →</span></Link>)}</div></main>}
