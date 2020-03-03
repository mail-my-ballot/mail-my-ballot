import * as marked from 'marked'

console.log(marked(`
# H1
## H2
### H3

Some text

- point 1
- point 2

1. num 1
1. num 2
`))
