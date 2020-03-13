import React from 'react'
import styled from 'styled-components'
import { RoundedButton } from './util/Button'
import Container from 'muicss/lib/react/container'
import { Row, Col } from 'muicss/react'
import { useHistory } from 'react-router-dom'

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

const MyButton = styled(RoundedButton)`
  margin: 2em 0;
  background: #4DB6AC;
  :hover {
    background: #5DC6BC;
    color: #f1f1ff;
  }
  color: #f1f1ff;
`

export const Blurb: React.FC<{}> = () => {
  const history = useHistory()

  const handleClick = () => {
    document.getElementById('app')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    history.push('/#app')
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
              28 states now allow <i>any</i> registerecd voter to vote by mail.  Does yours?
            </Text>
            <MyButton data-testid='start' variant='raised' onClick={handleClick}>
              Do I Qualify?
            </MyButton>
          </FlexBox>
        </Col>
      </Row>
    </Container>
  </Background>
}
