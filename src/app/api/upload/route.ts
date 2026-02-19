import { NextRequest, NextResponse } from "next/server";
import { uploadToS3 } from "@/libs/s3-upload";

/**
 * POST /api/upload — Upload un fichier vers S3.
 * Body: FormData avec "file" (obligatoire), "type" (optionnel, ex: product), "prefix" (optionnel, ex: sellers/abc123).
 * Retourne { url, key }.
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const type = (formData.get("type") as string) || "upload";
    const prefix = (formData.get("prefix") as string) || "uploads";

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Fichier manquant (attendu: champ 'file')" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name || `file-${Date.now()}`;

    const { url, key } = await uploadToS3({
      file: buffer,
      fileName,
      prefix,
      type,
      bucket: "images",
    });

    return NextResponse.json({ url, key });
  } catch (err) {
    console.error("Erreur upload:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Erreur lors de l'upload",
      },
      { status: 500 }
    );
  }
}
