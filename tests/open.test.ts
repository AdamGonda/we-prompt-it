import { test, expect } from '@playwright/test';

test('open - {logo} -> home', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/');

  await page.getByTestId('logo').click();
  expect(await page.title()).toBe('Home | We Prompt');
});

test('open - {my collection} -> login', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/');

  await page.getByTestId('my-collection').click();
  expect(await page.title()).toBe('Login | We Prompt');
});

test('open - {create prompt} -> login', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/');

  await page.getByTestId('create-prompt').click();
  expect(await page.title()).toBe('Login | We Prompt');
});

test('open - {login} -> login', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/');

  await page.getByTestId('login').click();
  expect(await page.title()).toBe('Login | We Prompt');
});

