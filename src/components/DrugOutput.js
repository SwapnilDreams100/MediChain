import React from 'react';

class DrugOutput extends React.Component {
  submit(e) {
    e.preventDefault();
    const id1 = this.id1.value;
    
    const state = this.props.state;
    const instance = state.instance;

    const setDrugRequest = async () => {
      const result = instance.getDrug(id1 ,{ from: state.web3.eth.accounts[0]}).then((result) => {
        this.props.initModal(0);
        return result
      });
      return result
    }

    const getDrugRequest = async () => {
      this.props.initModal(1);
      const result = await setDrugRequest();
      this.props.gDrug(result);
    }

    getDrugRequest();
  }

  render() {
    return (
      <form className="Drug-form" onSubmit={(e) => this.submit(e)}>
        <input ref={(input) => this.id1 = input} type="number" className="number-input" placeholder="id text" /><br />
        <button type="submit" value="Submit" className="button-submit js-button-submit">Submit</button>
      </form>
    )
  }
}

export default DrugOutput;
