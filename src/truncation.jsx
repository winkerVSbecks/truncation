
var React = require('react/addons');
var R = require('ramda');
var clrs = require('colors.css');
var Line = require('./line.jsx');
var Path = require('./path.jsx');


var Truncation = React.createClass({

  getInitialState: function() {
    return getInitialState(this.props.size);
  },

  componentWillReceiveProps: function() {
    return this.setState(getInitialState(this.props.size));
  },

  render: function() {
    var vm = this;
    var size = vm.state.size;
    var viewBox = [0, 0, size, size].join(' ');
    var c = size / 2;

    var polygon = generatePolygon(this.state.vertexCount, size/3, c);
    var midpoints = generateMidpoints(polygon);

    return (
      <svg xmlns="http://www.w3.org/svg/2000"
        viewBox={ viewBox }
        width={ size }
        height={ size * 0.75 }
        fill="none">

        <g className="truncation">
          <Path pts={ polygon }
            fill="#F17447"
            closed={ true } />
          <Path pts={ midpoints }
            fill="#ffffff"
            closed={ true } />
        </g>

      </svg>
    );

  }

});



/**
 * Utilities
 */
function rad(a) {
  return Math.PI * a / 180;
}

function rx(r, a, c) {
  return c - r * Math.cos(rad(a));
}

function ry(r, a, c) {
  return c - r * Math.sin(rad(a));
}

function generatePolygon(vertexCount, r, c) {

  var theta = 360 / vertexCount;

  var polygon = R.map(function(i) {
    return [rx(r, theta * i, c), ry(r, theta * i, c)];
  }, R.range(0, vertexCount));

  return polygon;
}

function midpoint(u, v) {
  return [(u[0] + v[0]) / 2, (u[1] + v[1]) / 2];
}

function generateMidpoints(vertices) {
  return R.mapIndexed(function(vertex, idx, vertices) {
    return idx === 0 ? midpoint(vertex, vertices[vertices.length - 1]) :
                       midpoint(vertex, vertices[idx - 1]);
  }, vertices);
}

function getInitialState(size) {

  return {
    size: size,
    vertexCount: 3
  };
}

module.exports = Truncation;
