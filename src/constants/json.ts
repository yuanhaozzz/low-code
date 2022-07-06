import {} from './type'
const defaultStyle = {
  position: "absolute",
  left: 0,
  top: 220,
};

export const jsonText = {
  type: "1",
  style: {
    width: '150px',
    height: '31px',
    fontSize: "14px",
    color: '#000',
    textAlign: 'left',
    padding: '5px',
    boxSizing: 'border-box',
    ...defaultStyle,
  },
  animation: {},
  event: {},
};
