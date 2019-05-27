import React from 'react'
import styled from 'styled-components'

const NotificationItemWrapper = styled.div`
  margin: 8px 0;
  padding: 8px 16px;
  border-color: rgb(172, 20, 90);
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  background-color: rgb(172, 20, 90);
  color: #fff;
  text-align: center;
  display: inline-block;
`

function NotificationItem(props) {
  return (
    <div>
      <NotificationItemWrapper>{props.children}</NotificationItemWrapper>
    </div>
  )
}

export default NotificationItem
