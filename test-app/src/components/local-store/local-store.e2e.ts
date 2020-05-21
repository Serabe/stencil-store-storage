import { newE2EPage, E2EPage } from '@stencil/core/testing';
import { key, defaultValues } from '../../stores/local-storage';

describe('syncs store to local storage', () => {
  it('takes initial values from passed values if there is no value in the storage', async () => {
    const page = await newE2EPage();

    await page.setContent('<local-store></local-store>');

    expect(await getValue(page, 'string')).toBe(defaultValues.aString);
    expect(await getValue(page, 'number')).toBe(`${defaultValues.aNumber}`);
  });

  it('syncs to local storage when updated', async () => {
    const page = await newE2EPage();

    await page.setContent('<local-store></local-store>');

    await page.type('.string', ' was before');

    const stored = JSON.parse(await page.evaluate(k => localStorage.getItem(k), key));

    expect(stored.aString).toBe(defaultValues.aString + ' was before');
  });
});

async function getValue(page: E2EPage, klazz: string): Promise<string> {
  const input = await page.find(`local-store input.${klazz}`);

  return input.getProperty('value');
}
