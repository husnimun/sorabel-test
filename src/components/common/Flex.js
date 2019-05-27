import styled, { css } from 'styled-components'

export const Flex = styled.div`
  display: flex;
`
export const FlexItem = styled.div`
  ${props =>
    props.flexSize &&
    css`
      flex: ${props.flexSize};
    `}
  ${props =>
    props.alignCenter &&
    css`
      margin-top: auto;
      margin-bottom: auto;
    `}
`
