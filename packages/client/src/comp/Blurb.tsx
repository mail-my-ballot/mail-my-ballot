import React from 'react'
import styled from 'styled-components'
import { RoundedButton } from './util/Button'
import Container from 'muicss/lib/react/container'
import { Row, Col } from 'muicss/react'

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
`

const Text = styled.p`
  margin: 2em 0;
  font-size: 1.2em;
`

const FlexBox = styled.div`
  display: table-cell;
  vertical-align: middle;
  height: 100vh;
`

export const Blurb = (props: React.PropsWithChildren<{}>) => {
  return <Background>
    <Container>
      <Row>
        <Col lg={6} lg-offset={6}>
          <FlexBox>
          <Title>Vote By Mail</Title>
          <Text>
            Voting by mail is a secure, time-tested, and <i>easy</i> way to vote.
          </Text>
          <Text>
            Your ballot arrives safely in the mail weeks before the election and can be filled out and mailed back at your convenience.
          </Text>
          <Text>
            28 states now allow <i>any</i> registerecd voter to vote by mail.
          </Text>
          <RoundedButton variant='raised'>Do I Qualify?</RoundedButton>
          </FlexBox>
        </Col>
      </Row>
    </Container>
  </Background>
}
