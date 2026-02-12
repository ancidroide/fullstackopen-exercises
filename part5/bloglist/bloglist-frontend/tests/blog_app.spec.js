import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    // Step 1: Verify the login heading is visible
    const header = page.getByRole('heading', { name: 'Login' })
    await expect(header).toBeVisible()
    
    // Step 2: Verify username input exists
    const usernameInput = page.getByPlaceholder('username')
    await expect(usernameInput).toBeVisible()
    
    // Step 3: Verify password input exists
    const passwordInput = page.getByPlaceholder('password')
    await expect(passwordInput).toBeVisible()

    // Step 4: Verify login button exists
    const loginButton = page.getByRole('button', { name: 'login' })
    await expect(loginButton).toBeVisible()
  })
})