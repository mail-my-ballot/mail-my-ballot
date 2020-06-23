import styled from 'styled-components'

interface Props {
  /**
   * Centers the content of this Wrapper, vertically and horizontally.
   *
   * By default is true
   */
  centerContent?: boolean
  /**
   * Centers the content of immediate divs (e.g. `& > div`) of this Wrapper
   *
   * By default is false
   */
  centerChildContent?: boolean
  /**
   * Lays the content of immediate divs (e.g. `& > div`) of this Wrapper
   * in Flex-columns
   *
   * By default is false
   */
  columnChildContent?: boolean
}

export const FullscreenWrapper = styled.div<Props>`
  width: 100%;
  min-height: 100vh;
  padding: 4em 0;
  box-sizing: border-box;

  display: flex;
  align-items: ${
    p => (p.centerContent ?? true)
      ? 'center'
      : 'flex-start'
  };
  justify-content: ${
    p => (p.centerContent ?? true)
      ? 'center'
      : 'flex-start'
  };

  & > div {
    display: flex;
    text-align: ${
      p => p.centerChildContent
        ? 'center'
        : 'left'
    };
    flex-direction: ${
      p => p.columnChildContent
        ? 'column'
        : 'row'
    };
    align-items: ${
      p => p.centerChildContent
        ? 'center'
        : 'flex-start'
    };
    justify-content: ${
      p => p.centerChildContent
        ? 'center'
        : 'flex-start'
    };
  }
`
