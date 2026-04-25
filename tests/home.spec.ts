import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display product grid', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('section')).toBeVisible();
  });

  test('should show category filter dropdown', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('combobox')).toBeVisible();
  });

  test('should update URL when category is selected', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('combobox').click();
    const firstOption = page.locator('[role="option"]').first();
    await firstOption.click();
    await expect(page).toHaveURL(/category=/);
  });

  test('should persist filters on refresh', async ({ page }) => {
    await page.goto('/?category=1&page=0');
    await page.reload();
    await expect(page).toHaveURL(/category=1/);
  });

  test('should go to next page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page).toHaveURL(/page=1/);
  });

  test('previous button should be disabled on first page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Previous' })).toBeDisabled();
  });
});