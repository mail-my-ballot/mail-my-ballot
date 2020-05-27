import { Button } from 'muicss/react'
import React from 'react'
import Geosuggest, { Suggest } from 'react-geosuggest'
import styled, { css, keyframes } from 'styled-components'
import { toast } from 'react-toastify'
import { ZipFinderContainer, zipFinderVisibility } from '../lib/unstated'
import { client } from '../lib/trpc'
import { useAppHistory } from '../lib/path'

interface WrapperProps {
  visibility: zipFinderVisibility
}

const wrapperFromRight = keyframes`
  from { right: calc(var(--width) * -1); opacity: 0; }
  to   { right: 2.5vw; opacity: 1; }
`
const wrapperToRight = keyframes`
  from { right: 2.5vw; opacity: 1; }
  to   { right: calc(var(--width) * -1); opacity: 0; }
`

const Wrapper = styled.div`
  /* CSS Variables */
  --width: 95vw;
  --height: calc(var(--vh, 1vh) * 80);
  --footerHeight: calc(var(--vh, 1vh) * 10);
  --contentHeight: calc(var(--height) - var(--footerHeight));

  /* Shape and Style */
  width: var(--width);
  height: var(--height);
  background-color: #ffffff;
  box-shadow: 0 4px 12px -5px #000;
  border-radius: 4px;

  position: absolute;
  top: calc(var(--vh, 1vh) * 10);
  display: ${(p: WrapperProps) => p.visibility === 'hidden' ? 'none' : 'flex'};
  flex-direction: column;

  animation: ${
    (p: WrapperProps) => p.visibility === 'hiding'
      ? css`${wrapperToRight} .4s ease both`
      : css`${wrapperFromRight} .4s ease both`
  };

  /* Adjust width for medium-sized screens */
  @media screen and (min-width: 541px) {
    --width: 50vw;
  }

  /* Adjust width for big-sized screens */
  @media screen and (min-width: 992px) {
    --width: 25vw;
    --footerHeight: calc(var(--vh, 1vh) * 8);
  }
`

const Content = styled.div`
  width: var(--width);
  height: var(--contentHeight);
  padding: calc(var(--vh, 1vh) * 3) 2vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  color: #555;

  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  text-align: center;

  & > h1 {
    width: var(--width);
    margin: 0;
    padding: 0;
    margin-bottom: calc(var(--vh, 1vh) * 3);

    display: flex;
    align-items: center;
    justify-content: center;

    color: #222;
    font-weight: bold;
    font-size: 1.15em;
  }

  @media screen and (max-width: 991px) {
    font-size: 1.08em;
  }

  @media screen and (min-width: 992px) {
    &::-webkit-scrollbar {
      width: 12px;
      background: #fff;
      border-radius: 12px;
    }
    &::-webkit-scrollbar-thumb {
      background: none;
      border-right: 4px solid #2095f2aa;
    }
    &::-webkit-scrollbar-thumb:hover {
      border-right: 6px solid #2095f2;
    }
  }
`

const GeoWrapper = styled.div`
  width: 100%;
  & > .geosuggest,
  & .geosuggest__input-wrapper {
    width: 100%;
  } & .geosuggest__input {
    width: 80%;
  }

  & .geosuggest__input {
    border: none;
    border-bottom: 1px solid #0001;
    padding-bottom: calc(var(--vh, 1vh) * 1.1);
    box-sizing: border-box;
  }
  & .geosuggest__input:focus {
    outline: none;
    border-bottom: 2px solid #2095f2;
  }
  & .geosuggest__input::placeholder {
    opacity: 0.7;
  }

  & .geosuggest .geosuggest__wrapper {
    width: 100%
  }
  & .geosuggest .geosuggest__suggests-wrapper > ul {
    width: 100;
    list-style: none;
    padding: 0;
    text-align: left;
  }
  & .geosuggest .geosuggest__item {
    width: 100%;
    padding: calc(var(--vh, 1vh) * 1.3);
    margin-top: calc(var(--vh, 1vh) * 1);
    box-sizing: border-box;
    transition: padding-left ease 300ms;
  }
  & .geosuggest .geosuggest__item--active {
    border-left: 3px solid #2095f2;
    padding-left: 15px;
  }
`

const Footer = styled.div`
  width: var(--width);
  height: var(--footerHeight);

  display: flex;
  justify-content: flex-end;

  & > button {
    width: 100%;
    height: var(--footerHeight);

    margin: 0 !important;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;

    background: none;
    border: none;

    font-weight: bold;
  }
`

export const ZipFinder: React.FC = () => {
  const { zipFinder, toggleZipFinder } = ZipFinderContainer.useContainer()
  const { pushAddress } = useAppHistory()

  if (zipFinder === 'hidden') return null

  const onSuggestSelect = async (s: Suggest) => {
    let zipCode = ''
    for (const ac of s?.gmaps?.address_components ?? []) {
      // AddressComponents have types, and each of them can have multiple
      // types contained in an array. Because of that we have to see if
      // this AC has the type 'postal_code', and if it does update our
      // variable accordingly.
      if (ac.types.indexOf('postal_code') >= 0) {
        zipCode = ac.long_name ?? ac.short_name
        break
      }
    }

    // If a zip code was found then fetch its state information through
    // client.fetchState. If something unusual happens then a toast is
    // generated alerting the user about it.
    if (zipCode !== '') {
      const resp = await client.fetchState(zipCode)
      if (resp.type === 'data') {
        pushAddress(resp.data, zipCode)
      } else if (resp.type === 'error') {
        toast(
          <div style={{ padding: '5%', fontSize: '1.08em' }}>
            We are sorry to inform that something went wrong while trying to autofill your Zip-Code
            <br />
            You can still try searching for your Zip-Code online and inserting it manually here to continue this process.
          </div>,
          {
            type: 'error',
            autoClose: 8000,
          }
        )
      }
      toggleZipFinder()
    }
  }

  return <Wrapper visibility={zipFinder}>
    <Content>
      <h1>Find your Zip-Code</h1>
      <div style={{ marginBottom: 'calc(var(--vh, 1vh) * 3)' }}>
        Type your address below and a list of suggestions will appear, select the one that matches where you live to get your Zip-Code.
      </div>
      <GeoWrapper>
        <Geosuggest
          onSuggestSelect={onSuggestSelect}
          autoFocus={true}
          highlightMatch={true}
          placeholder='Type here...'
          country='us'
        />
      </GeoWrapper>
    </Content>
    <Footer>
      <Button onClick={toggleZipFinder} variant='flat' style={{ color: '#888' }}>
        Cancel
      </Button>
    </Footer>
  </Wrapper>
}
