import React from 'react'
import styled from 'styled-components'

import avatarExample from './img/team_avatar_example.png'
import { useAppHistory } from '../lib/path'
import { cssQuery } from './util/cssQuery'
import { FullscreenWrapper } from './util/FullscreenWrapper'
import { UnderlineAnchor } from './util/UnderlineAnchor'
import { Container } from 'muicss/react'

export const TeamWrapper = styled(FullscreenWrapper)`
  .mui-container > p, .mui-container > h4 {
    ${cssQuery.desktop.all} { width: 65%; }
    ${cssQuery.mobile.landscape.all} { width: 75%; }
    ${cssQuery.mobile.wide} { width: 75%; }
  }

  /*
    The default h1 padding-top as the first child of a FullscreenWrapper
    is going to produce a lot of padding.
  */
  h1 { padding-top: 0; }
`

const PeopleWrapper = styled.div`
  width: 90%;
  ${cssQuery.desktop.all} { width: 70%; }
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-top: 1.8em;
`

const PersonStyle = styled.div`
  width: 47%;
  ${cssQuery.desktop.all} { width: 30%; }
  ${cssQuery.mobile.wide} { width: 30%; }
  box-sizing: border-box;
  margin-bottom: 2em;

  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    display: block;
    width: 25vw;
    height: 25vw;
    border-radius: 15vw;
    object-fit: contain;
    ${cssQuery.desktop.all} {
      width: 10vw;
      height: 10vw;
    }
    ${cssQuery.mobile.wide} {
      width: 15vw;
      height: 15vw;
    }
    background-color: #0002;
  }

  .title {
    font-size: 0.9em;
    font-weight: bold;
    line-height: 1.15;
    margin: 1em 0;
    text-transform: uppercase;
  }

  p {
    font-size: 0.7em;
    ${cssQuery.desktop.all} {
      width: 80%;
    }
  }

  .social {
    display: flex;
    width: 40%;
    max-width: 56px;
    flex-direction: row;
    justify-content: space-between;

    a {
      color: inherit;
      transition: color ease .2s;
      :hover { color: #2596f2; }
    }
  }
`

interface PersonProps {
  /**
   * For the best looking results, ensure the image is in a square proportion,
   * e.g. 150x150, 250x250
   */
  img: string
  name: string
  title?: string
  description: string
  /** Dont pass the full url to this prop */
  twitter?: string
  /** This person email */
  email?: string
}
const Person: React.FC<PersonProps> = ({
  img, name, title, description, twitter, email,
}) => {
  return <PersonStyle>
    <img src={img} alt={name}/>
    <div className="title">{name}{title && `, ${title}`}</div>
    <p>{description}</p>
    <div className="social">
      {twitter && <a href={`https://twitter.com/${twitter}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"/></a>}
      {email && <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer"><i className="fa fa-envelope-o"/></a>}
    </div>
  </PersonStyle>
}

export const Team: React.FC = () => {
  const { pushStartSection } = useAppHistory()

  return <TeamWrapper columnChildContent={true} centerChildContent={true}>
    <Container>
      <h1>Who are we?</h1>
      <p>
        MailMyBallot.org is a <a href="https://www.voteathome.org" target="_blank" rel="noopener noreferrer">National Vote at Home Institute project</a>. The National Vote at Home Institute is a non-partisan, 501(c)3 dedicated to promoting vote by mail.
      </p>
      <p>The project is developed by a team of enthusiastic volunteer technologists.</p>

      <PeopleWrapper>
        <Person
          img={avatarExample}
          name='John Doe'
          title='Title'
          description='Fusce hendrerit lacus nulla, eu accumsan lacus vestibulum sit amet. Curabitur lacinia lobortis sodales.'
          twitter='mailmyballot'
          email='contact@mailmyballot.org'
        />
        <Person
          img=''
          name='John Doe'
          title='Title that is long'
          description='Fusce hendrerit lacus nulla, eu accumsan lacus vestibulum sit amet. Curabitur lacinia lobortis sodales.'
          twitter='mailmyballot'
          email='contact@mailmyballot.org'
        />
        <Person
          img=''
          name='John Doe'
          title='Title'
          description='Fusce hendrerit lacus nulla, eu accumsan lacus vestibulum sit amet. Curabitur lacinia lobortis sodales.'
          twitter='mailmyballot'
          email='contact@mailmyballot.org'
        />
        <Person
          img=''
          name='John Doe'
          title='Title'
          description='Fusce hendrerit lacus nulla, eu accumsan lacus vestibulum sit amet. Curabitur lacinia lobortis sodales.'
          twitter='mailmyballot'
          email='contact@mailmyballot.org'
        />
        <Person
          img=''
          name='John Doe'
          title='Title'
          description='Fusce hendrerit lacus nulla, eu accumsan lacus vestibulum sit amet. Curabitur lacinia lobortis sodales.'
          twitter='mailmyballot'
          email='contact@mailmyballot.org'
        />
        <Person
          img=''
          name='John Doe'
          title='Title'
          description='Fusce hendrerit lacus nulla, eu accumsan lacus vestibulum sit amet. Curabitur lacinia lobortis sodales.'
          twitter='mailmyballot'
          email='contact@mailmyballot.org'
        />
      </PeopleWrapper>

      <h4>
        Interested in volunteering with MailMyBallot? We&apos;d love to hear from you even if you&apos;re unsure how you could help!
      </h4>
      <UnderlineAnchor href="#getInvolved" onClick={() => pushStartSection('contact')}>
        How to get involved
      </UnderlineAnchor>
    </Container>
  </TeamWrapper>
}
