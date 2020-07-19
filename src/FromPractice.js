import React, { Component } from 'react';

class FromPractice extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
  };

  changeName = (e) => {
    console.log(e.target.value);
    this.setState({
      name: e.target.value,
    });
  };

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s6 offset-sm-3'>
            <form onSubmit={this.handleSubmit}>
              <input
                onChange={this.changeName}
                value={this.state.name}
                type='text'
                placeholer='Enter name'
              />
              <input type='submit' value='Submit' />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FromPractice;
