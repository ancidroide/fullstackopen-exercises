import { test, expect } from '@playwright/test'


test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    // empty db
    await request.post('http://localhost:3001/api/testing/reset')

    // create a new User and add it to DB
    const newUser = {
        username: 'testuser',
        password: 'testpassword',
        name: 'Test User'
    }

    const response = await request.post('http://localhost:3001/api/users', {
    data: newUser
    })
    // connect to bloglist app page
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

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        // fill inputs
        await page.getByPlaceholder('username').fill('testuser')
        await page.getByPlaceholder('password').fill('testpassword')

        // click login btn
        await page.getByRole('button', { name: 'login'}).click()

        // verify successfull login
        await expect(page.locator('.notification.success')).toContainText('Test User logged in successfully')
    })

    test('fails with wrong credentials', async ({ page }) => {
        await page.getByPlaceholder('username').fill('testuser')
        await page.getByPlaceholder('password').fill('wrongpassword')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('wrong username or password')).toBeVisible()
        await expect(page.getByPlaceholder('username')).toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    // login
    test.beforeEach(async ({ page }) => {
      await page.getByPlaceholder('username').fill('testuser')
      await page.getByPlaceholder('password').fill('testpassword')
      await page.getByRole('button', { name: 'login'}).click()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()      
    })


    // testing blog creation
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByPlaceholder('title').fill('test blog')
      await page.getByPlaceholder('author').fill('tester')
      await page.getByPlaceholder('url').fill('http://test.com')

      // Set up response listener BEFORE clicking
      const responsePromise = page.waitForResponse(resp => {
        console.log('Response status:', resp.status(), 'URL:', resp.url())
        return resp.url().includes('/api/blogs') && resp.status() === 201
      })

      await page.getByRole('button', { name: 'create' }).click()
      await responsePromise
      

      // Verifica che il blog sia stato aggiunto alla lista
      const blogElements = await page.locator('div').filter({ hasText: 'test blog' }).all()
      expect(blogElements.length).toBeGreaterThan(0)

      // Verifica che il form si sia chiuso
      await expect(page.getByRole('button', { name: 'create new blog' })).toBeVisible()  
    })

  })
})