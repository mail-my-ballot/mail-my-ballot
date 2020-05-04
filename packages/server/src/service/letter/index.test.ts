import { toLetter } from '.'
import { sampleStateInfo } from './router'
import { availableStates } from '../../common'

test('Leteer for all states render correctly', () => {
  const confirmationId = 'sampleConfirmationId'

  const letters = availableStates.map(state => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return toLetter({...sampleStateInfo, state: state as any}, confirmationId)
  }).filter(letter => !!letter)
  
  letters.forEach(letter => {
    expect(letter?.md).toContain(confirmationId)
    expect(letter?.md).not.toContain('undefined')
  })
})
