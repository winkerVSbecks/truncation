
var React = require('react/addons');
var R = require('ramda');
var clrs = require('colors.css');
var Path = require('./path.jsx');


var Truncation = React.createClass({

  render: function() {
    var vm = this;
    var size = vm.props.size;
    var viewBox = [0, 0, size, size * 0.75].join(' ');
    var c = size / 2;

    var polygon = generatePolygon(this.props.vertexCount, size / 4, c);
    var midpoints = generateMidpoints(polygon);
    var splitVertices = generateSplitVertices(polygon, midpoints);
    var truncatedPolygon = truncatePolygon(splitVertices, this.props.scale);

    return (
      <svg xmlns="http://www.w3.org/svg/2000"
        viewBox={ viewBox }
        width={ size }
        height={ size * 0.75 }
        fill="none">

        <g className="truncation">
          <Path pts={ [[-c, 0], [c, 0], [c, size], [-c, size]] }
            fill="#188F5C"
            closed={ true } />
          <Path pts={ [[size, 0], [size, 0.75 * size], [c, 0.75 * size]] }
            fill="#FCBE31"
            closed={ true } />
          <Path pts={ polygon }
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth="48"
            closed={ true } />
          <Path pts={ truncatedPolygon }
            fill="#f17447"
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
  return c * 0.75 - r * Math.sin(rad(a));
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

function lerp(start, stop, amt) {
  return amt * (stop - start) + start;
}

function generateMidpoints(vertices) {
  return R.mapIndexed(function(vertex, idx, vertices) {
    return idx === vertices.length - 1 ? midpoint(vertex, vertices[0]) :
                       midpoint(vertex, vertices[idx + 1]);
  }, vertices);
}

function generateSplitVertices(vertices, _mps) {
  var duplicate = R.chain(function(n) {
    return [n, n];
  });

  var splitVertices = duplicate(vertices);
  var mps = duplicate(_mps);

  return R.mapIndexed(function(vertex, idx) {
    if (idx === 0) {
      return [vertex, mps[mps.length - 1]];
    } else if (idx === 1) {
      return [vertex, mps[0]];
    } else if (idx % 2 === 0) {
      return [vertex, mps[idx - 1]];
    } else {
      return [vertex, mps[idx]];
    }
  }, splitVertices);
}

function truncatePolygon(splitVertices, scale) {
  return R.map(function(pair) {
    // Pair consists of vertex + mp
    var x = lerp(pair[0][0], pair[1][0], scale);
    var y = lerp(pair[0][1], pair[1][1], scale);
    return [x, y];
  }, splitVertices);
}


module.exports = Truncation;
