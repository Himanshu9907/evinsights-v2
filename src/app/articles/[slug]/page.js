import Link from "next/link";
import { getContentBySlug } from "@/server/repositories/content.repository";
export async function generateMetadata({params}){const {slug}=await params;const a=await getContentBySlug(slug);return {title:a?`${a.title} | EVInsights Hub`:"Article not found"}}
function render(body){return body.split(/\n\n/).map((p,i)=>p.startsWith('## ')?<h2 key={i}>{p.slice(3)}</h2>:<p key={i}>{p}</p>)}
export const dynamic='force-dynamic';

export default async function Article({params}){const {slug}=await params;const a=await getContentBySlug(slug);if(!a||a.type!=='article')return <main className="shell page-hero"><h1>Article not found</h1><Link className="btn btn-primary" href="/articles">Back to articles</Link></main>;return <main className="shell"><section className="page-hero"><span className="eyebrow">{a.category}</span><h1>{a.title}</h1><p>{a.excerpt}</p></section><article className="article-body">{render(a.content)}</article><section className="section"><Link className="btn btn-secondary" href="/articles">← All articles</Link></section></main>}
