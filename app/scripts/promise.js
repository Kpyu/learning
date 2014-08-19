(function(global){
    var guid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    };
    /** */
    var Promise = function(resolver){
        this.uid = guid();
        if((!this instanceof Promise))return new Promise(resolver);
        var self = this;
        this.status = 'pending';
        this._resolves = [];
        this._rejects = [];



        if(typeof(resolver) ==="function"){
            resolver(this._resolve.bind(this),this._reject.bind(this));
        }
        return this;
    };

    Promise.prototype = {
        then:function(fullFilledHandler,errorHandler,progressHandler){
//            var next =  new Promise();

            if(this.status === 'pending'){
               if(typeof fullFilledHandler == "function") this._resolves.push(fullFilledHandler);
               if(typeof errorHandler == "function") this._rejects.push(errorHandler);
                console.log(this);
                return this;
            }
            if(this.status === 'resolved'){
                if(typeof fullFilledHandler === 'function'){
                    this.resolve(fullFilledHandler);
                    console.log(this);
                    return this;
                }
            }
            if(this.status === 'reject'){
                if(typeof errorHandler === 'function'){
                    this.reject(errorHandler);
                    console.log(this);
                    return this;
                }
            }
            console.log(this);

        },
        handler:function(promise){
            var status = promise.status;
            var queue =  promise["resolved" == status?"_resolves":"_rejects"];
            var result = promise['resolved' == status?"value":'reason'];
            var fn,iter;
            while(fn = queue.shift()){
                iter = fn.call(promise,result);
            }
            return promise;
        },
       _resolve : function(result){
        //self
            if(this.status === 'resolved') throw Error("非法调用");

            this.status = 'resolved';
            this.value = result;
            this.handler(this);
            return this;
        },
        _reject:function (result){
            if(this.status === 'reject') throw Error("非法调用");

            this.status = 'reject';
            this.reason = result;

            this.handler(this);
            return this;
    }

};

    /*
    var Promise = function (fun) {
            var me = this,
                resolve = function (val) {
                    me.resolve(val);
                },
                reject = function (val) {
                    me.reject(val);
                }
            me._st = 'pending';
            me._rsq = null;
            me._rjq = null;
            (typeof fun === 'function') && fun(resolve, reject);
        },
        fn = Promise.prototype;

    fn.then = function (resolve, reject) {
        var pms = new Promise();
        this._rsq = function (val) {
            var ret = resolve ? resolve(val) : val;
            if (ret instanceof Promise) {
                ret.then(function (val) {
                    pms.resolve(val);
                });
            }
            else{
                pms.resolve(ret);
            }
        };
        this._rjq = function (val) {
            pms.reject(reject(val));
        };
        return pms;
    }

    fn.catch = function (reject) {
        return this.then(null, reject);
    }

    fn.resolve = function (val) {
        if (this._st === 'resolved' || this._st === 'pending') {
            this._st = 'resolved';
            this._rsq && this._rsq(val);
        }
    }

    fn.reject = function (val) {
        if (this._st === 'rejected' || this._st === 'pending') {
            this._st = 'rejected';
            this._rsq && this._rjq(val);
        }
    }

    Promise.all = function (arr) {
        var pms = new Promise();
        var len = arr.length,
            i = 0,
            res = 0;
        while (i < len) {
            arr[i].then(
                function () {
                    if (++res === len) {
                        pms.resolve();
                    }
                },
                function (val) {
                    pms.reject(val);
                }
            );
            i++;
        }
        return pms;
    }

    Promise.resolve = function (obj) {
        var pms = new Promise();
        if (obj && typeof obj.then === 'function') {
            for (var i in pms) {
                obj[i] = pms[i];
            }
            return obj;
        }
        else {
            setTimeout(function () {
                pms.resolve(obj);
            });
            return pms;
        }
    };
*/
//    global.Promise = Promise;
    global.Promise = Promise;
})(this);

/**
 *CommonJS之Promises/A规范，通过规范API接口来简化异步编程，使我们的异步逻辑代码更易理解。
    遵循Promises/A规范的实现我们称之为Promise对象，
    Promise对象有且仅有三种状态：unfulfilled（未完成）、fulfilled（已完成）、failed（失败/拒绝）；
     初始创建的时候是unfulfilled（未完成）状态，状态只可以从unfulfilled（未完成）变成fulfilled（已完成），
    或者unfulfilled（未完成）变成failed（失败/拒绝）。状态一旦变成fulfilled（已完成）或者failed（失败/拒绝），状态就不能再变了。

    Promises/A规范提供了一个在程序中描述延时（或将来）概念的解决方案。
    主要的思想不是执行一个方法然后阻塞应用程序等待结果返回后再回调其他方法，而是返回一个Promise对象来满足未来监听。
    fulfilled状态和failed状态都可以被监听。Promise通过实现一个then接口来返回Promise对象来注册回调
 *
 *
 *
 *
 *
 *
 *
 */

