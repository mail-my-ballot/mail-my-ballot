import { toLetter } from '.'
import { signatureStateInfo, sampleMethod } from './router'
import { implementedStates } from '../../common'

test('Leter for all states render correctly', () => {
  const confirmationId = 'sampleConfirmationId'

  const letters = implementedStates.map(state => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return toLetter(
      {...signatureStateInfo, state},
      sampleMethod,
      confirmationId
    )
  }).filter(letter => !!letter)
  
  letters.forEach(letter => {
    expect(letter?.md).toContain(confirmationId)
    /*
      A poor man's test for missing fields
      since most fields are '**{{field}}**' 
    */
    expect(letter?.md).not.toContain('****')
  })
})
