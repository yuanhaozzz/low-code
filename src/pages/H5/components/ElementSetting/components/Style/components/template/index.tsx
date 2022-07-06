import React, { Component } from 'react'

interface Props {
    update: (key: string, value: string) => void;
    style
  }
const Color = (props: Props) => {
    const { update, style } = props;
    const fontSize = style.fontSize
    return (
        <div className='style-color'></div>
    )
}

export default Color