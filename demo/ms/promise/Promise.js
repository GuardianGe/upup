class MyPromise {
    constructor(handle) {
        this._status = 'PENDING';
        this._value = undefined;
        this.fulfilledQueues = [];
        this.rejectQueues = [];
        try {
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch (error) {
            this._reject(error)
        }
    }
    _resolve() {

    }
    _reject() {

    }
    then(onFulfilled, onRejected) {
        var { _status, _value } = this;
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            var fulfilled = function () {
                
            }
            var rejected = function () {

            }
            switch (_status) {
                case 'PENDING':
                    this.fulfilledQueues.push(fulfilled)
                    this.rejectQueues.push(rejected)
                    break;
                case 'FULFILLED':
                    fulfilled()
                    break;
                case 'REJECTED':
                    rejected()
                    break;
                default:
                    break;
            }
        })
    }
}