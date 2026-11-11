import assert from "node:assert/strict";
import { createRequire } from "node:module";

// Usage: node scripts/verify-lex-dossier.mjs [playwright-package-path] [base-url]
const require = createRequire(import.meta.url);
const { chromium } = require(process.argv[2] || "playwright");
const browser = await chromium.launch({ channel: "msedge" });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto(`${process.argv[3] || "http://localhost:3000"}/LexDossier`);
  await page.locator(".lex-theme-light").waitFor();
  for (const width of [375, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (let n = 1; n <= 6; n++) {
      await page.locator(`#fl-${n}`).scrollIntoViewIfNeeded();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `overflow at ${width}px, leaf ${n}`);
    }
  }
  await page.getByRole("button", { name: "Ativar Gabinete Noturno" }).click();
  await page.locator(".lex-theme-dark").waitFor();
  await page.getByRole("button", { name: "Ativar Luz do Dia" }).click();
  await page.getByRole("button", { name: /Recrutadores & Headhunters/ }).click();
  await page.getByRole("heading", { name: "Senioridade que se comprova no detalhe." }).waitFor();
  await page.getByRole("tab", { name: /Contencioso estratégico/ }).click();
  await page.getByRole("tabpanel").getByText("PJe · e-SAJ · Eproc · SEI · Projudi").waitFor();
  await page.locator("#lex-tier").selectOption("0");
  assert.match(await page.locator(".lex-retainer").innerText(), /2\.800/);
  await page.getByRole("button", { name: /Atos avulsos/ }).click();
  await page.getByLabel("Protocolo e diligência societária").check();
  await page.getByLabel("Dossiê de due diligence de imóvel urbano").check();
  assert.match(await page.locator(".lex-total").innerText(), /2\.450/);
  await page.getByRole("button", { name: /Anexar ao termo/ }).click();
  assert.match(await page.locator(".lex-attached").innerText(), /2\.450/);
  await page.getByLabel("Nome do solicitante").fill("Teste de navegação");
  await page.getByLabel("Banca / empresa").fill("Banca teste");
  await page.getByLabel("E-mail de retorno").fill("teste@example.com");
  await page.getByLabel("Prazo / data esperada").fill("2026-12-01");
  await page.getByLabel("Objeto da demanda").fill("Conferir seleção e composição da minuta.");
  await page.getByLabel("Autorizo o uso destes dados").check();
  await page.getByRole("button", { name: "Protocolar despacho ↗", exact: true }).first().click();
  await page.locator(".lex-protocol").waitFor();
  const href = await page.locator(".lex-protocol a").first().getAttribute("href");
  const text = new URL(href).searchParams.get("text");
  assert.match(text, /HP-2026-/);
  assert.match(text, /Protocolo e diligência societária/);
  assert.match(text, /2\.450/);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: /Índice \[01–06\]/ }).click();
  await page.locator("#lex-mobile-index").getByRole("button", { name: /FL. 02/ }).click();
  await page.locator("#lex-mobile-index").waitFor({ state: "hidden" });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  assert.equal(await page.locator(".lex-theme-light").count(), 1);
  assert.deepEqual(errors, []);
  console.log("PASS: six viewport widths, six leaves, theme, persona, operations, retainer, sum, dispatch, mobile index, reduced motion.");
} finally {
  await browser.close();
}
