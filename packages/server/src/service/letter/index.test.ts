import { toLetter } from '.'
import { stateInfo, sampleMethod } from './router'
import { implementedStates } from '../../common'

test('Leter for all states render correctly', async () => {
  const confirmationId = 'sampleConfirmationId'

  const letters = await Promise.all(implementedStates.map(async state => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const info = await stateInfo(state)
    return toLetter(
      info,
      sampleMethod,
      confirmationId
    )
  }))
  
  letters.forEach(letter => {
    expect(letter?.md).toContain(confirmationId)
    /*
      A poor man's test for missing fields
      since most fields are '**{{field}}**' 
    */
    expect(letter?.md).not.toContain('****')
  })
})
