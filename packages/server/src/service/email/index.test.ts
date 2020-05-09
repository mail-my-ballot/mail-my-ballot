import { createMock } from 'ts-auto-mock'

import { FloridaInfo, MichiganInfo, StateInfo, GeorgiaInfo, WisconsinInfo, ContactMethod } from "../../common"
import { toLetter } from '../letter'
import { toEmailData } from '.'

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
  const emailDataProd = toEmailData(letter!, info.email, officialsEmails, { forceEmailOfficials: true })
  expect(emailDataProd.to.length).toBeGreaterThanOrEqual(2)
  expect(emailDataProd.to).toContain(email)
  expect(emailDataProd.md).toContain(confirmationId)
  
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const emailData = toEmailData(letter!, info.email, officialsEmails)
  expect(emailData.to).toEqual([email])
  expect(emailData.md).toContain(confirmationId)

  if (checkSignature) {
    expect(emailData.signature).toBeTruthy()
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
    signature: 'signature',
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
