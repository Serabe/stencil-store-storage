import { createStorageStore } from './storage';
import { MinimumStorage } from './types';

describe('createStorageStore', () => {
  test('initial values are taken from passed values if the key is not found in storage', () => {
    const storage = createStorage({});
    const defaultValues = { hola: 'Sergio', adios: 'everyone' };
    const { state } = createStorageStore(storage, 'my-key', defaultValues);

    expect(state).toHaveProperty('hola', defaultValues.hola);
    expect(state).toHaveProperty('adios', defaultValues.adios);
  });

  test('default values are written to the store if there were none', async () => {
    const storage = createStorage({});
    const defaultValues = { hola: 'Sergio', adios: 'everyone' };
    createStorageStore(storage, 'my-key', defaultValues);

    await forWrite();

    expect(JSON.parse(storage.getItem('my-key'))).toMatchObject(defaultValues);
  });

  test('initial values are taken from the store if the key is found', () => {
    const key = 'my-key';
    const valuesInStore = { hola: 'Manu' };
    const storage = createStorage({ [key]: JSON.stringify(valuesInStore) });
    const defaultValues = { hola: 'Sergio', adios: 'everyone' };
    const { state } = createStorageStore(storage, key, defaultValues);

    expect(state.hola).toBe(valuesInStore.hola);
    expect(state).not.toHaveProperty('adios');
  });

  test('changing an item in the store gets it synced to the storage', async () => {
    const storage = createStorage({});
    const defaultValues = { hola: 'Sergio', adios: 'everyone' };
    const { state } = createStorageStore(storage, 'my-key', defaultValues);

    await forWrite();

    state.hola = 'Gardner';

    await forWrite();

    expect(JSON.parse(storage.getItem('my-key'))).toMatchObject({
      ...defaultValues,
      hola: 'Gardner',
    });
  });

  test('changing several items at once only calls write once', async () => {
    const storage = createStorage({});
    const writeSpy = jest.spyOn(storage, 'setItem');
    const defaultValues = { hola: 'Sergio', adios: 'everyone' };
    const { state } = createStorageStore(storage, 'my-key', defaultValues);

    await forWrite();

    writeSpy.mockClear();
    expect(writeSpy).toHaveBeenCalledTimes(0);

    state.hola = 'Gardner';
    state.adios = 'Tomás';

    await forWrite();

    expect(writeSpy).toHaveBeenCalledTimes(1);
  });
});

function createStorage(values: Record<string, string>): MinimumStorage {
  return {
    getItem(key): string {
      return values[key];
    },
    setItem(key: string, value: string) {
      values[key] = value;
    },
  };
}

function forWrite() {
  return new Promise(resolve => setTimeout(resolve, 0));
}
