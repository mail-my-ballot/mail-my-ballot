import React from 'react'
import Form from 'muicss/lib/react/form'
import styled from 'styled-components'
import { RoundedButton } from './util/Button'
import Container from 'muicss/lib/react/container'
import { Row, Col } from 'muicss/react'
import { useAppHistory } from '../lib/path'
import { client } from '../lib/trpc'

const Background = styled.div`
  top: 0;
  left: 0;
  min-width: 100%;
  height: 100vh;
  background: rgb(144,202,249);
  background: linear-gradient(45deg, rgba(144,202,249,1) 0%, rgba(30,136,229,1) 25%, rgba(21,101,192,1) 100%);
  color: #f1f1ff;
`

const Title = styled.h1`
  font-weight: 100;
  margin: 1em 0;
`

const Text = styled.p`
  margin: 1em 0;
  font-size: 1.2em;
`

const FlexBox = styled.div`
  height: 100vh;
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
  height: 22px;
  border: none;
  border-color: transparent;
  box-shadow: none;
  outline: none;
  border-radius: 2em 0 0 2em;
`

const SubmitButton = styled(RoundedButton)`
  margin: 2em 0;
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
  const { pushAddress } = useAppHistory()
  const zipRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.persist()  // allow async function call
    event.preventDefault()
    const zip = zipRef?.current?.value
    if (!zip) return
    const state = await client.fetchState(zip)
    if (state.type === 'data') {
      pushAddress(state.data, zip)
    }
    // TODO: handle error
  }

  return <Background>
    <Container>
      <Row>
        <Col xs={12} md={8} md-offset={2} lg={6} lg-offset={6}>
          <FlexBox>
            <Title>Vote by Mail</Title>
            <Text>
              Voting by mail is a secure, time-tested, and <i>easy</i> way to vote.  Your ballot arrives safely in the mail weeks before the election and can be filled out and mailed back at your convenience.
            </Text>
            <Text>
              28 states now allow <i>any</i> registered voter to vote by mail.  Does yours?
            </Text>
            <h2>Enter your zipcode to see if you&apos;re eligible</h2>
            <Form onSubmit={handleSubmit}>
              <FlexContainer> 
                <ZipInput data-testid='start-zip' type='text' pattern='[0-9]{5}' placeholder='Zipcode' ref={zipRef}/>
                <SubmitButton data-testid='start-submit' variant='raised'>Do I Qualify?</SubmitButton>
              </FlexContainer>
            </Form>
          </FlexBox>
        </Col>
      </Row>
    </Container>
  </Background>
}
