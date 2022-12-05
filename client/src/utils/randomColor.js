const random_color = () => {
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  return `rgb(${x}, ${y}, ${z})`;
};

export default random_color;
