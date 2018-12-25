pragma solidity ^0.4.18;

contract MediChain {

    uint public t1; 
    uint public t2; 

    struct drug{
        uint id;
        uint price;
        string name;
        uint mrp;
        uint mfgdate;
        uint validity;
        uint[] chain;
    }

    struct supplier{
        uint id;
        uint id_supplier;
        string name;
        string city;
    }


    mapping (uint => drug) d1;
    drug[] public dm;

    mapping (uint => supplier) s1;
    supplier[] public sm;

    function setDrug(uint _id,uint _price,string _name,uint _mrp, uint _mfgdate,uint _validity, uint[] _chain) public {
        var dnew = drug(_id,_price,_name,_mrp,_mfgdate,_validity,_chain);
        d1[_id] = dnew;
        dm.push(dnew);
        t1++;
    }

    function getDrug(uint _id) public view returns(uint,uint,string,uint,uint,uint,uint[]) {
        return (d1[_id].id,d1[_id].price,d1[_id].name,d1[_id].mrp,d1[_id].mfgdate,d1[_id].validity,d1[_id].chain);
    }


    function getDrugNo() public view returns(uint256) {
        return (t1);
    }

    function setSupplier(uint _id,uint _id_supplier,string _name,string _city) public {
        var snew = supplier(_id,_id_supplier,_name,_city);
        s1[_id_supplier] = snew;
        d1[_id].chain.push(_id_supplier);
        sm.push(snew);
        t2++;
    }

    function getSupplier(uint _id_supplier) public view returns(uint,uint,string,string) {
        return (s1[_id_supplier].id,s1[_id_supplier].id_supplier,s1[_id_supplier].name,s1[_id_supplier].city);
    }

    function getSupplierNo() public view returns(uint256) {
        return (t2);
    }
}
