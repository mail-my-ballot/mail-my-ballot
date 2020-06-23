import React from 'react'
import styled, { keyframes, css } from 'styled-components'

import logo from './img/logo.png'
import { Button } from 'muicss/react'
import { Link } from 'react-router-dom'
import { useAppHistory, StartSectionPath } from '../lib/path'
import { cssQuery } from './util/cssQuery'


interface NavExpanded {
  expanded: boolean
}

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`

const slideUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(calc(var(--height) * 0));
  }
  to {
    opacity: 0;
    transform: translateY(calc(var(--height) * -1));
  }
`

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(calc(var(--height) * -1));
  }
  to {
    opacity: 1;
    transform: translateY(calc(var(--height) * 0));
  }
`

const Wrapper = styled.div<NavExpanded & { visible: boolean }>`
  /*
    We store these variables to reuse them when setting the icon size, etc.
    This helps us have some capabilities, such as perfectly round ripple
    effects on the Toggle Button, etc.
  */
  --height: 10vh;
  --expandedHeight: 50vh;
  --verticalPad: 1vh;
  /* The height inside the padded area */
  --contentHeight: calc(var(--height) - var(--verticalPad) - var(--verticalPad));
  ${cssQuery.desktop.all} {
    --height: 12vh;
    --expandedHeight: var(--height);
    ${cssQuery.desktop.tall} {
      --height: 10vh;
    }
  }
  ${cssQuery.mobile.tall} {
    ${cssQuery.mobile.wide} {
      --expandedHeight: 20vh;
    }
  }
  ${cssQuery.mobile.landscape.all} {
    --height: 20vh;
  }

  width: 100%;
  height: var(${p => p.expanded ? '--expandedHeight' : '--height'});
  padding: var(--verticalPad) 5%;
  box-sizing: border-box;

  position: fixed;
  top: 0;

  background-color: #fff;
  box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.05);

  z-index: 10;

  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: space-between;

  animation: ${
    p => p.visible
      ? css`${slideDown} ease .25s both`
      : css`${slideUp} ease .25s both`
  };

  transition: height ease .45s;
`

const Logo = styled(Link)`
  height: var(--contentHeight);
  /* Total space - NavToggle size */
  width: calc(90% - var(--contentHeight));
  ${cssQuery.desktop.all} { width: 30%; }

  /* Centers image on the padded, non-expanded area */
  display: flex;
  align-items: center;

  img {
    height: 50%;
    ${cssQuery.desktop.all} { height: 48%; }
    ${cssQuery.mobile.landscape.all} { height: 30%; }
  }
`

const NavToggle = styled(Button)<NavExpanded>`
  --color: ${p => p.expanded ? '#f44336' : '#2196f3'};
  --wrapperSize: var(--contentHeight);
  --iconSize: calc(var(--wrapperSize) * 0.35);
  --iconRotation: ${p => p.expanded ? '-90deg' : '0'};

  /* In order to make the Material Ripple a perfect circle */
  width: var(--contentHeight);
  height: var(--contentHeight);
  border-radius: var(--contentHeight);
  margin: 0;

  /* The Material Ripple already indicates interaction */
  :hover, :focus { background-color: #fff !important; }

  /* Centers icon */
  display: flex;
  align-items: center;
  justify-content: center;
  ${cssQuery.desktop.all} { display: none; }

  i {
    font-size: var(--iconSize);
    color: var(--color);
    transform: rotate(var(--iconRotation));
    transition: color ease .3s, transform ease .15s;
  }
`

const NavLinks = styled.div<NavExpanded>`
  display: ${p => p.expanded ? 'flex' : 'none'};
  width: 120%;
  height: calc(
    var(--expandedHeight) - var(--contentHeight) - var(--verticalPad) - var(--verticalPad)
  );

  ${cssQuery.mobile.all} {
    flex-direction: column;

    box-shadow: 0 4px 3px rgba(0, 0, 0, 0.05) inset;
    /* Makes the shadow (of the navlinks) ignore the Wrapper horizontal padding */
    margin: 0 -10%;
    animation: ${fadeIn} ease .5s .3s both;

    /* When animating, doesn't let the content be drawn on top of the logo/toggle button */
    z-index: -1;

    /*
      Wide portrait devices, i.e. tablets, have enough space to show all
      the links in one single row.
    */
    ${cssQuery.mobile.wide} {
      padding: 0 4em;
      flex-direction: row;
      font-size: 0.75em;
    }
  }

  ${cssQuery.desktop.all} {
    display: flex;
    flex-direction: row;
    width: 50%;
    height: 100%;
    font-size: 0.75em;
  }

  ${cssQuery.mobile.landscape.all} {
    font-size: 0.85em;
    animation: ${fadeIn} ease .5s .3s both;
    flex-direction: row;
  }

  justify-content: space-around;
  align-items: center;

  a {
    color: inherit;
    font-weight: bold;
    text-transform: uppercase;

    &.register, :hover, :focus, :active {
      color: #2196f3;
      text-decoration: none;
    }

    transition: color ease .2s;
  }
`

export const Navbar = () => {
  const { pushStartSection } = useAppHistory()
  const [expanded, setExpanded] = React.useState(false)
  const [visible, setVisibility] = React.useState(true)
  const [scrollY, setScrollY] = React.useState(window.pageYOffset)

  // Handles the visibility of the navbar
  React.useLayoutEffect(() => {
    window.onscroll = () => {
      if (visible === false) {
        if (window.pageYOffset < scrollY) {
          setVisibility(true)
        }
      } else {
        if (window.pageYOffset > scrollY) {
          setVisibility(false)
        }
      }
      setScrollY(window.pageYOffset)
    }
  }, [visible, scrollY])

  const toggleExpanded = () => setExpanded(!expanded)

  /** Pushes page section and closes the navbar */
  const pushAndClose = (section: StartSectionPath['type']) => {
    pushStartSection(section)
    if (expanded) toggleExpanded()
  }

  return <Wrapper expanded={expanded} visible={visible}>
    <Logo to="#" onClick={() => pushAndClose('start')}>
        <img src={logo} alt="Mail My Ballot"/>
    </Logo>
    <NavToggle onClick={toggleExpanded} expanded={expanded} variant="flat">
      <i className={`fa ${expanded ? 'fa-close' : 'fa-navicon'}`}/>
    </NavToggle>
    <NavLinks expanded={expanded}>
      <Link to="#about" onClick={() => pushAndClose('about')}>
        About
      </Link>
      <Link to="#team" onClick={() => pushAndClose('team')}>
        Team
      </Link>
      <Link to="#getInvolved" onClick={() => pushAndClose('getInvolved')}>
        Get Involved
      </Link>
      <Link to="#contact" onClick={() => pushAndClose('contact')}>
        Contact Us
      </Link>
      <a className="register" href="#register">
        Register
      </a>
    </NavLinks>
  </Wrapper>
}
