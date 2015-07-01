
var React = require('react');
var Truncation = require('./truncation.jsx');
var Range = require('./range.jsx');

var Content = React.createClass({

  getInitialState: function() {
    return {
      size: 0,
      vertexCount: 3,
      scale: 0
    };
  },

  componentDidMount: function () {

    var container = React.findDOMNode(this);
    var vm = this;

    function resize(event) {
      vm.setState({ size: container.offsetWidth });
    };

    window.onresize = resize;
    resize();
  },

  handleChange: function(e) {
    var name = e.target.name;
    var state = this.state;
    state[name] = e.target.value;
    this.setState(state);
  },

  render: function() {

    var truncation = this.state.size > 0 ? (
      <div className="center mb2">
        <Truncation {...this.state} />
      </div>
    ) : null;

    return (
      <div>
        <div className="prose mb2">
          <blockquote className="italic"
            cite="https://en.wikipedia.org/wiki/Truncation_(geometry)">
            <p>In geometry, a truncation is an operation in any dimension that cuts polytope vertices, creating a new facet in place of each vertex.</p>
            <footer>&mdash; <a href="https://en.wikipedia.org/wiki/Truncation_(geometry)"> Truncation (wikipedia)</a></footer>
          </blockquote>
          <p>We start with a polygon &mdash; let's say a triangle. This triangle has 3 vertices. In order to truncate we need to split each vertex into two. Now the triangle is made up of 6 vertices. Or rather 3 pairs of vertices. Each pair occupies the same position as the original vertex it is split from.</p>
          <p>The vertices are used to define the sides of a triangle. Therefore, each vertex has a direct <i>relation</i> to a side. The process of truncation involves moving each vertex along it's line towards the mid-point of the line.</p>
          <figure className="my2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Types_of_truncation_on_square4.png/1200px-Types_of_truncation_on_square4.png" />
            <figcaption>Fig 1.0: Types of truncation on a square (<a href="https://en.wikipedia.org/wiki/Truncation_(geometry)#/media/File:Types_of_truncation_on_square4.png">src</a>)</figcaption>
          </figure>
          <p>Once all the vertices reach the mid-points this is known as <b>Complete Truncation</b>. If we keep moving beyond the mid-point then it is known as <b>Hypertruncation</b>. As we execute Hypertruncation there is a point where the vertex reaches the starting location of the vertex directly opposite to itself. If we keep going beyond that location then we are executing <b>Quasitruncation</b>. Lastly, we can also go away from the mid-points. This is known as <b>Antitruncation</b>.</p>
          { truncation }
        </div>
        <div className="md-flex mb4 mxn2">
          <div className="md-col-6 px2">
            <Range id="vertexCount"
              label="Vertex Count"
              min={ 3 }
              max={ 50 }
              step={ 1 }
              value={ this.state.vertexCount }
              onChange={ this.handleChange } />
          </div>
          <div className="md-col-6 px2">
            <Range id="scale"
              label="Truncation Scale"
              min={ -1 }
              max={ 3 }
              step={ 0.01 }
              value={ this.state.scale }
              onChange={ this.handleChange } />
          </div>
        </div>
      </div>
    );
  }

});


module.exports = Content;
