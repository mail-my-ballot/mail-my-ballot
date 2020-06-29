import styled from 'styled-components'

/**
 * Creates an HTML Anchor element where its underline is padded by a few
 * pixels from the text.
 */
export const UnderlineAnchor = styled.a`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.8em;
  padding-bottom: 0.2em;
  border-bottom: 2px solid #2196F3;
  &:hover {
    text-decoration: none;
  }
`
