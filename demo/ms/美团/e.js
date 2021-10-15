function Company() {
    this.name = 'a2';
    this.getName1 = () => {
        console.log(this)
        console.log(this.name);
    }
    this.getName2 = function () {
        console.log(this.name);
    }
}
Company.prototype.name = 'a3';
var company1 = new Company();
company1.getName1();
company1.getName2();

var adder = {
    base : 1,
      
    add : function(a) {
      var f = v => {
          console.log(this)
          v + this.base
      };
      return f(a);
    },
  
    addThruCall: function inFun(a) {
      var f = v => v + this.base;
      var b = {
        base : 2
      };
              
      return f.call(b, a);
    }
  };
  adder.add(2)