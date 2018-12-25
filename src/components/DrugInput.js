import React from 'react';

class DrugInput extends React.Component {
  submit(e) {
    e.preventDefault();
    const id1 = this.id1.value;
    const price1 = this.price1.value;
    const name1 = this.name1.value;
    const mfg1 = this.mfg1.value;
    const mrp1 = this.mrp1.value;
    const val1 = this.val1.value;
    const chain1 = [1,2]

    const state = this.props.state;
    const instance = state.instance;

    const setDrugRequest = async () => {
      const result = instance.setDrug(id1,price1,name1,mrp1,mfg1,val1,chain1, { from: state.web3.eth.accounts[0]}).then((result) => {
        this.props.initModal(0);
        return instance.getDrugNo()
      });
      return result
    }

    const getDrugRequest = async () => {
      this.props.initModal(1);
      const result = await setDrugRequest();
      this.props.sDrug(""+result);
    }

    getDrugRequest();
  }

  render() {
    return (
      <form className="Drug-form" onSubmit={(e) => this.submit(e)}>
        <input ref={(input) => this.id1 = input} type="number" className="number-input" placeholder="id text" /><br />
        <input ref={(input) => this.price1 = input} type="number" className="number-input" placeholder="price text" /><br />
        <input ref={(input) => this.name1 = input} type="text" className="text-input" placeholder="name text" /><br />
        <input ref={(input) => this.mrp1 = input} type="number" className="number-input" placeholder="mrp text" /><br />
        <input ref={(input) => this.mfg1 = input} type="number" className="number-input" placeholder="mfgdatetext" /><br />
        <input ref={(input) => this.val1 = input} type="number" className="number-input" placeholder="validity text" /><br />
        <button type="submit" value="Submit" className="button-submit js-button-submit">Submit</button>
      </form>
    )
  }
}

export default DrugInput;