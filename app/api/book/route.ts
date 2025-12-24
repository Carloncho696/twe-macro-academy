import { NextResponse } from "next/server";

export const runtime = "nodejs"; // importante para evitar edge issues

export async function GET() {
  const base = process.env.BOOK_WORKER_URL; // ej: https://twe-book-worker....workers.dev/book
  const token = process.env.BOOK_TOKEN;

  if (!base || !token) {
    return new NextResponse("Missing env BOOK_WORKER_URL or BOOK_TOKEN", { status: 500 });
  }

  // OJO: nombre EXACTO del archivo en R2 (incluye espacios)
  const fileName = "book.pdf";

  const url = `${base}/${encodeURIComponent(fileName)}?token=${encodeURIComponent(token)}`;

  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return new NextResponse(`Upstream error ${res.status}: ${text}`, { status: 500 });
  }

  const arrayBuffer = await res.arrayBuffer();

  return new NextResponse(arrayBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${fileName}"`,
      "Cache-Control": "no-store",
    },
  });
}
