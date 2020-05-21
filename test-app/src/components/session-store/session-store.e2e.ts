import { newE2EPage, E2EPage } from '@stencil/core/testing';
import { key, defaultValues } from '../../stores/session-storage';

describe('syncs store to session storage', () => {
  it('takes initial values from passed values if there is no value in the storage', async () => {
    const page = await newE2EPage();

    await page.setContent('<session-store></session-store>');

    expect(await getValue(page, 'string')).toBe(defaultValues.aString);
    expect(await getValue(page, 'number')).toBe(`${defaultValues.aNumber}`);
  });

  it('syncs to local storage when updated', async () => {
    const page = await newE2EPage();

    await page.setContent('<session-store></session-store>');

    await page.type('.string', ' was before');

    const stored = JSON.parse(await page.evaluate(k => sessionStorage.getItem(k), key));

    expect(stored.aString).toBe(defaultValues.aString + ' was before');
  });
});

async function getValue(page: E2EPage, klazz: string): Promise<string> {
  const input = await page.find(`session-store input.${klazz}`);

  return input.getProperty('value');
}
