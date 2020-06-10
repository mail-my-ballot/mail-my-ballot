export const testEach = process.env.CI ? test.skip.each : test.each

export const testRoutine = process.env.CI ? test.skip : test