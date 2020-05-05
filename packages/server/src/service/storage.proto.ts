import { upload, getSignedUrl } from './storage'

const main = async () => {
  const result = await upload('test/test.pdf', 'abcd')
  console.log(result)
  const reuslt2 = await getSignedUrl('test/test.pdf')
  console.log(reuslt2)
}

main()
