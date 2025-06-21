import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { parse } from 'csv-parse/sync';

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), 'public', 'photos.csv');
    const fileContent = await fs.readFile(csvPath, 'utf-8');

    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    const result = records.slice(0, 10).map((row: any) => ({
      id: row.id,
      alt: row.alt,
      photographer: row.photographer,
      photographer_url: row.photographer_url,
      avg_color: row.avg_color,
      src: {
        small: row['src.small'],
      },
    }));

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to load photos' }, { status: 500 });
  }
}