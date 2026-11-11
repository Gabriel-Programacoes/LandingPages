import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.argv[2] || "playwright");
const base = process.argv[3] || "http://localhost:3000";
const browser = await chromium.launch({ channel: "msedge" });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const failed = [];
  page.on("pageerror", error => failed.push(error.message));
  page.on("response", response => { if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`); });
  for (const width of [375, 390, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(`${base}/Valmont`, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    if (overflow) throw Error(`Overflow horizontal: ${width}px`);
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.reload({ waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Ativar modo noturno" }).click();
  if (await page.locator(".valmont").getAttribute("data-theme") !== "dark") throw Error("Tema não alterou");
  await page.getByRole("button", { name: "Ativar modo claro" }).click();
  await page.getByRole("button", { name: "Barba", exact: true }).click();
  if (await page.locator(".vm-service-trigger").count() !== 1) throw Error("Filtro não aplicado");
  await page.getByLabel("Visitas por mês").fill("4");
  await page.waitForFunction(() => document.querySelector(".vm-calc-result")?.textContent?.includes("Black Imperial"));
  await page.locator("#vm-service").selectOption("barba");
  await page.locator("#vm-barber").selectOption("arthur");
  await page.locator("#vm-date").fill("2026-12-01");
  await page.locator("#vm-shift").selectOption("Noite");
  const popup = page.waitForEvent("popup");
  await page.getByRole("button", { name: /Preparar no WhatsApp/ }).click();
  const sent = await popup;
  const url = new URL(await page.locator(".vm-prepared a").getAttribute("href"));
  const message = url.searchParams.get("text") || "";
  for (const value of ["Barboterapia Tradicional", "Arthur Peixoto", "01/12/2026", "Noite"]) if (!message.includes(value)) throw Error(`Comanda não inclui: ${value}`);
  if (!(await page.locator(".vm-prepared").isVisible())) throw Error("Fallback WhatsApp não apareceu");
  await sent.close();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Abrir menu" }).click();
  if (!(await page.getByRole("navigation", { name: "Menu mobile" }).isVisible())) throw Error("Menu mobile não abriu");
  await page.keyboard.press("Escape");
  if (await page.getByRole("navigation", { name: "Menu mobile" }).count()) throw Error("Menu mobile não fechou");
  if (failed.length) throw Error(failed.join("\n"));
  if (process.argv[4]) {
    await page.screenshot({ path: `${process.argv[4]}-mobile.png`, fullPage: true });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({ path: `${process.argv[4]}-desktop.png`, fullPage: true });
  }
  console.log("PASS Valmont: 6 larguras, tema, filtro, simulador, comanda, menu e recursos");
} finally { await browser.close(); }
