import { test, expect } from '@playwright/test';

test.describe('Cart', () => {
  test.beforeEach(async ({ page }) => {
    // clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should add item to cart', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href*="/product/"]').first().click();
    await page.getByRole('button', { name: /add to cart/i }).click();
    await expect(page.getByRole('button', { name: /added/i })).toBeVisible();
  });

  test('should show item count in navbar after adding', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href*="/product/"]').first().click();
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.goto('/cart');
    await expect(page.getByText(/1 item/i)).toBeVisible();
  });

  test('should remove item from cart', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href*="/product/"]').first().click();
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.goto('/cart');
    await page.getByRole('button', { name: /remove/i }).click();
    await expect(page.getByText(/cart is empty/i)).toBeVisible();
  });

  test('should persist cart after page refresh', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href*="/product/"]').first().click();
    await page.getByRole('button', { name: /add to cart/i }).click();
    await page.reload();
    await page.goto('/cart');
    await expect(page.getByText(/1 item/i)).toBeVisible();
  });

  test('cart page should show empty state when no items', async ({ page }) => {
    await page.goto('/cart');
    await expect(page.getByText(/cart is empty/i)).toBeVisible();
  });
});