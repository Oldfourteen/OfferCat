import puppeteer from 'puppeteer';

export async function htmlToPdfBuffer(html) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    // data: URI 大图（如 1800×1800）解码略慢，避免 pdf() 抢在 decode 之前
    await page.evaluate(async () => {
      const imgs = Array.from(document.images);
      await Promise.all(
        imgs.map(
          (img) =>
            img.complete
              ? Promise.resolve()
              : new Promise((resolve) => {
                  img.addEventListener('load', () => resolve(undefined), { once: true });
                  img.addEventListener('error', () => resolve(undefined), { once: true });
                  setTimeout(resolve, 8000);
                }),
        ),
      );
    });
    const buf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', bottom: '10mm', left: '12mm', right: '12mm' },
    });
    return buf;
  } finally {
    await browser.close();
  }
}
