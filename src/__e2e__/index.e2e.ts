import dotenv from 'dotenv';
import * as path from 'path';
import { readFileSync } from 'fs';
import { format } from 'date-fns';

import { test, expect } from '@playwright/test';

import { loadFromFileContent } from '../utils/load-cells-from-file';

function streamToString(stream: any) {
  const chunks: any[] = [];
  return new Promise<string>((resolve, reject) => {
    stream.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err: any) => reject(err));
    stream.on('end', () => resolve(
      Buffer
        .concat(chunks)
        .toString('utf8') as string,
    ));
  });
}

dotenv.config();

const APP_URL = `http://localhost:${process.env.PORT}`;

test('should correctly set rows and columns', async ({ page }) => {
  await page.goto(APP_URL);

  await page.fill('#configure-rows-input', '7');
  await page.fill('#configure-columns-input', '5');

  const rows = await page.$$('.Board-row');
  const cells = await page.$$('.Cell');

  expect(rows.length).toBe(7);
  expect(cells.length).toBe(35);
});

test('should correctly set generation', async ({ page }) => {
  await page.goto(APP_URL);

  await page.fill('#configure-generations-input', '157');

  const generationValue = await page.inputValue('#configure-generations-input');

  expect(generationValue).toBe('157');
});

test('should correctly upload a configuration file', async ({ page }) => {
  await page.goto(APP_URL);

  const configFilePath = path.resolve(__dirname, '../data/sample-1.txt');

  const fileContent = readFileSync(configFilePath);
  const gameConfig = loadFromFileContent(fileContent.toString());

  const {
    dimensions: {
      rowsCount,
      columnsCount,
    },
    generation,
  } = gameConfig;

  await page.setInputFiles('#upload-config-input', [configFilePath]);

  const rows = await page.$$('.Board-row');
  const cells = await page.$$('.Cell');
  const generationValue = await page.inputValue('#configure-generations-input');

  expect(rows.length).toBe(rowsCount);
  expect(cells.length).toBe(rowsCount * columnsCount);
  expect(generationValue).toBe(generation.toString());
});

test('should alert error: invalid rows/columns (1)', async ({ page }) => {
  await page.goto(APP_URL);

  const configFilePath = path.resolve(__dirname, '../data/sample-error-1.txt');
  const expectedMessage = 'Invalid columns in configuration: expected columnsCount 17, found 16, at line number 0';

  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toEqual(expectedMessage);
    await dialog.accept();
  });

  await page.setInputFiles('#upload-config-input', [configFilePath]);
  await page.inputValue('#upload-config-input');
});

test('should alert error: invalid rows/columns (2)', async ({ page }) => {
  await page.goto(APP_URL);

  const configFilePath = path.resolve(__dirname, '../data/sample-error-2.txt');
  const expectedMessage = 'Invalid columns in configuration: expected columnsCount 16, found 17, at line number 1';

  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toEqual(expectedMessage);
    await dialog.accept();
  });

  await page.setInputFiles('#upload-config-input', [configFilePath]);
  await page.inputValue('#upload-config-input');
});

test('should alert error: configuration with an invalid symbol', async ({ page }) => {
  await page.goto(APP_URL);

  const configFilePath = path.resolve(__dirname, '../data/sample-error-3.txt');
  const expectedMessage = 'Invalid symbol in configuration: expected "*", "." or " ", found "A", at line number 4, position 8';

  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toEqual(expectedMessage);
    await dialog.accept();
  });

  await page.setInputFiles('#upload-config-input', [configFilePath]);
  await page.inputValue('#upload-config-input');
});

test('should alert error: invalid generation', async ({ page }) => {
  await page.goto(APP_URL);

  const configFilePath = path.resolve(__dirname, '../data/sample-error-4.txt');
  const expectedMessage = 'Invalid generation in configuration';

  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toEqual(expectedMessage);
    await dialog.accept();
  });

  await page.setInputFiles('#upload-config-input', [configFilePath]);
  await page.inputValue('#upload-config-input');
});

test('should download configuration', async ({ page }) => {
  await page.goto(APP_URL);

  const configFilePath = path.resolve(__dirname, '../data/sample-1.txt');
  await page.setInputFiles('#upload-config-input', [configFilePath]);

  const fileContent = readFileSync(configFilePath).toString();

  page.on('download', async (download) => {
    const fileName = download.suggestedFilename();
    const formattedToday = format(new Date(), 'dd-MM-yyyy');
    expect(fileName).toBe(`board-8x16_${formattedToday}.txt`);

    const downloadedContent = await streamToString(await download.createReadStream());
    expect(downloadedContent).toEqual(fileContent);
  });

  await page.locator('#save-board-button').click();
});
