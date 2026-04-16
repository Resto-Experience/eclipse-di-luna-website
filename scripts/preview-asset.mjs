import sharp from 'sharp';
const inputs = process.argv.slice(2);
for (const p of inputs) {
  const out = `/tmp/preview-${p.split('/').pop().replace(/\.\w+$/, '')}.png`;
  await sharp(p).resize(300).toFormat('png').toFile(out);
  console.log(out);
}
