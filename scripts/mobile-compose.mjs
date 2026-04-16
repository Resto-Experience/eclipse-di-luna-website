// Compose side-by-side mobile QA chunks: live | ours
// Reads mobile-live-full.png + mobile-ours-full.png, places them side-by-side,
// then slices the result into chunks of CHUNK_HEIGHT for easy reading.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const OUT_DIR = 'extracted/qa/compose';
const CHUNK_HEIGHT = 1600;       // slice height per chunk in source px
const SCALE = 0.6;               // final downscale to keep chunks light
const GUTTER = 16;               // px between live and ours

await mkdir(OUT_DIR, { recursive: true });

const live = sharp('extracted/qa/mobile-live-full.png');
const ours = sharp('extracted/qa/mobile-ours-full.png');
const liveMeta = await live.metadata();
const oursMeta = await ours.metadata();

const W = Math.max(liveMeta.width, oursMeta.width);
const H = Math.max(liveMeta.height, oursMeta.height);

console.log(`live: ${liveMeta.width}x${liveMeta.height}`);
console.log(`ours: ${oursMeta.width}x${oursMeta.height}`);
console.log(`chunks: ceil(${H}/${CHUNK_HEIGHT}) = ${Math.ceil(H / CHUNK_HEIGHT)}`);

const liveBuf = await live.toBuffer();
const oursBuf = await ours.toBuffer();

const numChunks = Math.ceil(H / CHUNK_HEIGHT);

for (let i = 0; i < numChunks; i++) {
  const y = i * CHUNK_HEIGHT;
  const liveChunkH = Math.min(CHUNK_HEIGHT, Math.max(0, liveMeta.height - y));
  const oursChunkH = Math.min(CHUNK_HEIGHT, Math.max(0, oursMeta.height - y));

  const composite = [];

  if (liveChunkH > 0) {
    const lc = await sharp(liveBuf)
      .extract({ left: 0, top: y, width: liveMeta.width, height: liveChunkH })
      .toBuffer();
    composite.push({ input: lc, top: 0, left: 0 });
  }

  if (oursChunkH > 0) {
    const oc = await sharp(oursBuf)
      .extract({ left: 0, top: y, width: oursMeta.width, height: oursChunkH })
      .toBuffer();
    composite.push({ input: oc, top: 0, left: W + GUTTER });
  }

  const canvasH = Math.max(liveChunkH, oursChunkH, 1);
  const canvasW = W * 2 + GUTTER;

  const finalW = Math.round(canvasW * SCALE);
  const out = `${OUT_DIR}/chunk-${String(i + 1).padStart(2, '0')}.png`;

  // Build canvas first, then resize as a separate step (avoids "same dimensions or smaller" error).
  const canvasBuf = await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: { r: 240, g: 240, b: 240, alpha: 1 },
    },
  })
    .composite(composite)
    .png()
    .toBuffer();

  await sharp(canvasBuf)
    .resize({ width: finalW })
    .png({ quality: 80, compressionLevel: 9 })
    .toFile(out);

  console.log(`  ${out} — y=${y}, h=${canvasH}, ${finalW}px wide`);
}

console.log(`\n✅ ${numChunks} chunks ready in ${OUT_DIR}/`);
