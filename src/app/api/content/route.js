import { NextResponse } from 'next/server';
import { getAllContent } from '@/server/repositories/content.repository';
export async function GET(){return NextResponse.json({data:await getAllContent()},{headers:{'Cache-Control':'public, s-maxage=300, stale-while-revalidate=900'}})}
