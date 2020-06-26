import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { RoundedButton } from './util/Button'
import { StyleContainer } from './util/Container'
import { useAppHistory } from '../lib/path'
import { client } from '../lib/trpc'
import { AddressContainer, FetchingDataContainer } from '../lib/unstated'
import { AppForm } from './util/Form'


const Background = styled.div`
  top: 0;
  left: 0;
  min-width: 100%;
  background: rgb(144,202,249);
  background: linear-gradient(-45deg, rgba(144,202,249,1) 0%, rgba(30,136,229,1) 25%, rgba(21,101,192,1) 100%);
  color: #f1f1ff;
`

const Title = styled.h1`
  font-weight: 100;
  padding-top: 24px;
  @media only screen and (max-width: 544px) {
    padding-top: 8px;
  }
`

const Text = styled.p`
  margin-bottom: 16px;
`

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const FlexContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  justify-contnet: flex-start;
  align-content: center;
`

const ZipInput = styled.input`
  padding: 14px 16px;
  border: none;
  box-shadow: none;
  outline: none;
  width: 84px;
  border-radius: 4px;
  margin-right: 1rem;
`

const SubmitButton = styled(RoundedButton)`
  z-index: 0;
  background: #4DB6AC;
  color: #f1f1ff;
  margin 0;
  :hover {
    background: #5DC6BC;
    color: #f1f1ff;
  }
`

export const Blurb: React.FC<{}> = () => {
  const { path, pushAddress } = useAppHistory()
  const { address } = AddressContainer.useContainer()
  const zipRef = React.useRef<HTMLInputElement>(null)
  const { fetchingData, setFetchingData } = FetchingDataContainer.useContainer()

  // mobile browsers don't support 100vh, so use this trick instead
  // https://chanind.github.io/javascript/2019/09/28/avoid-100vh-on-mobile-web.html
  // Also, need to use a state variable instead of a simpler ts variable
  // https://stackoverflow.com/a/56156394/8930600
  const [height, setHeight] = React.useState('100vh')
  React.useEffect(() => {
    setHeight(`${window.innerHeight}px`)
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.persist()  // allow async function call
    event.preventDefault()
    const zip = zipRef?.current?.value
    if (!zip) return
    setFetchingData(true)
    const resp = await client.fetchState(zip)
    if (resp.type === 'error') {
      toast.error('Error finding the ZIP code')
    } else {
      pushAddress(resp.data, zip)
    }
    setFetchingData(false)
  }

  const defaultValue = () => {
    if (path?.type === 'address' && path.zip) {
      return path.zip
    } else {
      return address?.postcode ?? undefined
    }
  }

  return <Background style={{height}}>
    <StyleContainer>
      <FlexBox style={{height}}>
        <Title>Vote by Mail</Title>
        <Text>
          Voting by mail is a secure, time-tested, and easy way to vote.  Your ballot arrives safely in the mail weeks before the election and can be filled out and returned at your convenience.
        </Text>
        <Text>Sign up today in <b>2 minutes</b> before your state deadline expires.
        </Text>
        <AppForm onSubmit={handleSubmit}>
          <Text><b>Enter your ZIP code</b> to get started</Text>
          <FlexContainer>
            {/* id is used by WarningMsg to fill out zipcode */}
            <ZipInput
              id='start-zip'
              data-testid='start-zip'
              type='text'
              pattern='[0-9]{5}'
              placeholder='ZIP code'
              defaultValue={defaultValue()}
              ref={zipRef} />
            <SubmitButton
              id='start-submit'
              data-testid='start-submit'
              variant='raised'
              disabled={fetchingData}
            >
              Start
            </SubmitButton>
          </FlexContainer>
        </AppForm>
      </FlexBox>
    </StyleContainer>
  </Background>
}
