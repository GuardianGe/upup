function Company() {
    var instance = {
      name: 'a1',
      b:{
        getname4:()=>{
          console.log(this.name)
        }
      },
      getName() {
        console.log(this.name);
      },
      getName1: () => {
        console.log(JSON.stringify(this))
        console.log(this.name);
      }
    };
    this.name = 'a2';
    this.getName2 = function () {
      console.log(this.name);
    }
    return instance;
  }
  Company.prototype.name = 'a3';
  var company1 = new Company();
  company1.getName();
  company1.b.getname4();
  company1.getName1();

  // company1.getName2();