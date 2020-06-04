import { createMock } from 'ts-auto-mock'

import { FloridaInfo, MichiganInfo, StateInfo, GeorgiaInfo, WisconsinInfo, ContactMethod } from "../common"
import { toLetter } from './letter'
import { toSignupEmailData } from './mg'

const email = 'email@example.com'

const check = (info: StateInfo, checkSignature = false): void => {
  const sampleMethod: ContactMethod = {
    stateMethod: 'fax-email',
    emails: ['official@elections.gov'],
    faxes: [],
  }
  
  const officialsEmails = sampleMethod.emails
  const confirmationId = 'abc123'
  
  const letter = toLetter(info, sampleMethod, confirmationId)
  expect(letter).toBeTruthy()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const emailDataProd = toSignupEmailData(letter!, info.email, officialsEmails, { force: true })
  expect(emailDataProd.to.length).toBeGreaterThanOrEqual(2)
  expect(emailDataProd.to).toContain(email)
  expect(emailDataProd.html).toContain(confirmationId)
  
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const emailData = toSignupEmailData(letter!, info.email, officialsEmails)
  expect(emailData.to).toEqual([email])
  expect(emailData.html).toContain(confirmationId)

  if (checkSignature) {
    expect(emailData.attachment).toBeTruthy()
  }
}

test('florida', () => {
  const info = createMock<FloridaInfo>({
    county: 'Miami-Dade County',
    email,
  })

  check(info)
})

test('michigan', () => {
  const info = createMock<MichiganInfo>({
    city: 'Grand Rapids City',
    county: 'Kent County',
    signature: 'data:image/png;base64,signature',
    email,
  })

  check(info, true)
})

test('georgia', () => {
  const info = createMock<GeorgiaInfo>({
    county: 'Fulton County',
    email,
  })

  check(info)
})

test('wisconsin', () => {
  const info = createMock<WisconsinInfo>({
    city: 'Green Bay',
    county: 'Brown County',
    email,
  })

  check(info)
})
