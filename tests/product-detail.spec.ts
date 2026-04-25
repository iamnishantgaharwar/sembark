import { test, expect } from '@playwright/test';

test.describe('Product Detail Page', () => {
  test('should navigate to detail page on product click', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href*="/product/"]').first().click();
    await expect(page).toHaveURL(/\/product\//);
  });

  test('should display product info', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href*="/product/"]').first().click();
    await expect(page.getByRole('heading')).toBeVisible();
    await expect(page.getByRole('button', { name: /add to cart/i })).toBeVisible();
  });

  test('back button should go to home', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href*="/product/"]').first().click();
    await page.getByText('Back').click();
    await expect(page).toHaveURL('/');
  });
});