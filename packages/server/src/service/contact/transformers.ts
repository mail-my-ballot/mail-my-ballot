type Transform = (text: string) => string

/* applies functions in order they appear */
const compose = (...fs: Transform[]): Transform => {
  return (text) => {
    return fs.reverse().reduce((t, f) => f(t), text)
  }
}

/* expand appreviations for "Saint" */
const expandSaint: Transform = (text): string => {
  if (text.startsWith('st ')) {
    return text.replace('st ', 'saint ')
  } else if (text.startsWith('st. ')) { 
    return text.replace('st. ', 'saint ')
  } else {
    return text
  }
}

export const mandatoryTransform = compose(expandSaint)
