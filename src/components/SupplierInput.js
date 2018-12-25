import React from 'react';

class SupplierInput extends React.Component {
  submit(e) {
    e.preventDefault();
    const id1 = this.id1.value;
    const id_supplier1 = this.id_supplier1.value;
    const name1 = this.name1.value;
    const city1 = this.city1.value;
    
    const state = this.props.state;
    const instance = state.instance;

    const setSupplierRequest = async () => {
      const result = instance.setSupplier(id1,id_supplier1,name1,city1, { from: state.web3.eth.accounts[0]}).then((result) => {
        this.props.initModal(0);
        return instance.getSupplierNo()
      });
      return result
    }

    const getSupplierRequest = async () => {
      this.props.initModal(1);
      const result = await setSupplierRequest();
      this.props.sSupplier(""+result);
    }

    getSupplierRequest();
  }

  render() {
    return (
      <form className="Supplier-form" onSubmit={(e) => this.submit(e)}>
        <input ref={(input) => this.id1 = input} type="number" className="number-input" placeholder="id text" /><br />
        <input ref={(input) => this.id_supplier1 = input} type="number" className="number-input" placeholder="supplier id text" /><br />
        <input ref={(input) => this.name1 = input} type="text" className="text-input" placeholder="name text" /><br />
        <input ref={(input) => this.city1 = input} type="text" className="text-input" placeholder="city text" /><br />
       <button type="submit" value="Submit" className="button-submit js-button-submit">Submit</button>
      </form>
    )
  }
}

export default SupplierInput;