function Company() {
    var instance = {
        name: 'a1',
        fun1:{
            getName() {
                console.log(this.name);
            }
        },
        fun: {
            getName1: () => {
                console.log(this.name);
            }
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
company1.fun1.getName();
company1.fun.getName1();