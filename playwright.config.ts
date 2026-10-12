/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Run tests in parallel across files
  fullyParallel: true,

  // Run with 2 parallel browser windows locally (stable & fast)
  workers: 2,

  // Fail fast locally without retries
  retries: 0,

  // Generates an interactive HTML test report
  reporter: 'html',

  use: {
    // Runs headless in CI, but headed on your local machine:
    headless: !!process.env.CI ? true : false,

    // Base URL so you can just type page.goto('/') in your tests if you want
    baseURL: 'https://www.saucedemo.com',

    // Capture screenshots only when a test fails
    screenshot: 'only-on-failure',

    // Record video only for failing tests
    video: 'retain-on-failure',

    // Record trace only when a test fails (vital for debugging)
    trace: 'retain-on-failure',
  },

  // Target Chromium browser
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});