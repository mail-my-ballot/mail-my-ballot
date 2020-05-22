import React from 'react'
import Form from 'muicss/lib/react/form'
import styled from 'styled-components'
import { RoundedButton } from './util/Button'
import Container from 'muicss/lib/react/container'
import { Row, Col } from 'muicss/react'
import { useAppHistory } from '../lib/path'
import { client } from '../lib/trpc'
import { AddressContainer } from '../lib/unstated'

const Background = styled.div`
  top: 0;
  left: 0;
  min-width: 100%;
  background: rgb(144,202,249);
  background: linear-gradient(45deg, rgba(144,202,249,1) 0%, rgba(30,136,229,1) 25%, rgba(21,101,192,1) 100%);
  color: #f1f1ff;
`

const Title = styled.h1`
  font-weight: 100;
  margin: 1em 0;
`

const Text = styled.p`
  margin: 0.5em 0;
  font-size: 1.2em;
`

const Prompt = styled.h3`
  margin-bottom: 0;
`

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-contnet: flex-start;
  align-content: center;
`

const ZipInput = styled.input`
  margin: 2em 0;
  padding: 0.5em 1em;
  width: 6em;
  height: 22px;
  border: none;
  border-color: transparent;
  box-shadow: none;
  outline: none;
  border-radius: 2em 0 0 2em;
`

const SubmitButton = styled(RoundedButton)`
  margin: 2em 0;
  width: 8em;  // ZipInput's width + margin
  border-radius: 0 2em 2em 0;
  z-index: 0;
  background: #4DB6AC;
  color: #f1f1ff;
  :hover {
    background: #5DC6BC;
    color: #f1f1ff;
  }
`

export const Blurb: React.FC<{}> = () => {
  const { path, pushAddress } = useAppHistory()
  const { address } = AddressContainer.useContainer()
  const zipRef = React.useRef<HTMLInputElement>(null)

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
    const resp = await client.fetchState(zip)
    if (resp.type === 'error') return
    pushAddress(resp.data, zip)
    // TODO: handle error
  }

  const defaultValue = () => {
    if (path?.type === 'address' && path.zip) {
      return path.zip
    } else {
      return address?.postcode ?? undefined
    }
  }

  return <Background style={{height}}>
    <Container>
      <Row>
        <Col xs={12} md={8} md-offset={2} lg={6} lg-offset={6}>
          <FlexBox style={{height}}>
            <Title>Vote by Mail</Title>
            <Text>
              Voting by mail is a secure, time-tested, and easy way to vote.  Your ballot arrives safely in the mail weeks before the election and can be filled out and returned at your convenience.
            </Text>
            <Text>Sign up today in <b style={{fontSize: '1.1em'}}>2 minutes</b> before your state deadline expires.
            </Text>
            <Prompt>Enter your ZIP code to get started</Prompt>
            <Form onSubmit={handleSubmit}>
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
                >
                  Start
                </SubmitButton>
              </FlexContainer>
            </Form>
          </FlexBox>
        </Col>
      </Row>
    </Container>
  </Background>
}
