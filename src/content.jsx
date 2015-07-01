
var React = require('react');
var Truncation = require('./truncation.jsx');

var Content = React.createClass({

  getInitialState: function() {
    return { width: 0 };
  },

  componentDidMount: function () {

    var container = React.findDOMNode(this);
    var vm = this;

    function resize(event) {
      vm.setState({ width: container.offsetWidth });
    };

    window.onresize = resize;
    resize();
  },

  render: function() {

    var truncation = this.state.width > 0 ? (
      <div className="center mb2">
        <Truncation size={ this.state.width } />
      </div>
    ) : null;

    return (
      <div className="prose mb4">
        <blockquote className="italic"
          cite="https://en.wikipedia.org/wiki/Truncation_(geometry)">
          <p>In geometry, a truncation is an operation in any dimension that cuts polytope vertices, creating a new facet in place of each vertex.</p>
          <footer>&mdash; <a href="https://en.wikipedia.org/wiki/Truncation_(geometry)"> Truncation (wikipedia)</a></footer>
        </blockquote>

        { truncation }
      </div>
    );
  }

});

module.exports = Content;
