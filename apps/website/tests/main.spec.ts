import {expect, test} from '@playwright/test';

test.describe('Code4TW Website', () => {
  test('homepage loads successfully', async ({page}) => {
    await page.goto('/');

    // Check if page loads without errors
    const title = await page.title();
    expect(title).toBeTruthy();

    // Check if main content exists
    const body = await page.textContent('body');
    expect(body).toBeTruthy();
  });

  test('supports Chinese locale', async ({page}) => {
    await page.goto('/zh');

    // Check if Chinese locale loads
    const html = await page.getAttribute('html', 'lang');
    expect(html).toBe('zh');
  });

  test('supports English locale', async ({page}) => {
    await page.goto('/en');

    // Check if English locale loads
    const html = await page.getAttribute('html', 'lang');
    expect(html).toBe('en');
  });

  test('navbar is visible', async ({page}) => {
    await page.goto('/');

    // Wait for navbar to be visible
    await page.waitForSelector('nav', {timeout: 10000});

    const navbar = await page.isVisible('nav');
    expect(navbar).toBeTruthy();
  });

  test('footer is present', async ({page}) => {
    await page.goto('/');

    // Check if footer exists
    const footer = await page.locator('footer').count();
    expect(footer).toBeGreaterThan(0);
  });
});