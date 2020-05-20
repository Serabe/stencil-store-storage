import { newE2EPage, E2EPage } from "@stencil/core/testing";
import { key, defaultValues } from "../../stores/local-storage";

describe("syncs locale with html[lang]", () => {
  it("takes initial values from passed values if there is no value in the storage", async () => {
    const page = await newE2EPage();

    await page.evaluate(key => localStorage.removeItem(key), key);
    await page.setContent("<local-store></local-store>");

    expect(await getValue(page, "string")).toBe(defaultValues.aString);
    expect(await getValue(page, "number")).toBe(`${defaultValues.aNumber}`);
  });
});

async function getValue(page: E2EPage, klazz: string): string {
  const input = await page.find(`input.${klazz}`);

  return input.getProperty("value");
}
