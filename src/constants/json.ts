import {} from './type'
const defaultStyle = {
  position: "absolute",
  left: 0,
  top: 220,
};

export const jsonText = {
  type: "1",
  style: {
    width: '100%',
    fontSize: "14px",
    textAlign: 'center',
    padding: '10px 0',
    ...defaultStyle,
  },
  animation: {},
  event: {},
};
