/**
 * Created by kpYu on 2014/7/8.
 */
/**
 * 框架核心入口
 */
(function baseInit(){

    "use strict";
    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype;


    var guid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    };

    var defineProperty = Object.defineProperty;


    var define =function(name,dependencies,callback){


    }

});