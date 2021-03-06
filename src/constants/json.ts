import {} from './type'
const defaultStyle = {
  position: "absolute",
  left: 0,
  top: 220,
};

export const jsonText = {
  type: "1",
  isMoving: false,
  style: {
    width: '150px',
    height: '31px',
    fontSize: "14px",
    color: '#000',
    textAlign: 'left',
    padding: '5px',
    boxSizing: 'border-box',
    transform: 'rotate(0deg)',
    zIndex: 2,
    ...defaultStyle,
  },
  alternateLeft: defaultStyle.left,
  alternateTop: defaultStyle.top,
  animation: {},
  event: {},
};
