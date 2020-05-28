import styled from "styled-components"

export const Muted = styled.p`
  font-size:    16px;
  line-height:  22px;
  color:        #4F4F4F;
  opacity       0.5;
`

export const P = styled.p`
  margin-bottom: 16px;
  @media only screen and (max-width: 414px) {
    font-size: 18px;
    width: 90%;
  }
`

export const H1 = styled.h1`
  font-weight: 100;
  padding-top: 24px;
  @media only screen and (max-width: 414px) {
    padding-top: 0px;
    font-size: 35px;
  }
`