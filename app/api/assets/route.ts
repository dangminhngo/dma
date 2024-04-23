import { NextResponse } from "next/server"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import { env } from "~/env"
import { r2 } from "~/lib/r2"
import chalk from "chalk"

export async function POST(req: Request) {
  const { key } = (await req.json()) as { key: string }

  try {
    const url = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: key,
      }),
      { expiresIn: 60 }
    )
    console.log(chalk.green("Generated presigned url"))
    return NextResponse.json({ url })
  } catch (err) {
    console.log(err)
  }
}

export async function PUT(req: Request) {
  const { url, dataUrl } = (await req.json()) as {
    url: string
    dataUrl: string
  }

  try {
    const data = dataUrl.match(/^data:(.+);base64,(.*)$/)
    if (data?.length !== 3)
      throw new Error("Cannot extract base64 from dataUrl")

    const buffer = Buffer.from(data?.[2] ?? "", "base64")
    await fetch(url, {
      method: "PUT",
      body: buffer,
      headers: {
        "Content-Type": data?.[1] ?? "text/plain",
        "Content-Encoding": "base64",
      },
    })
    console.log(chalk.green("File uploaded"))
    return NextResponse.json({})
  } catch (err) {
    console.log(chalk.red("File upload error: ", err))
  }
}
