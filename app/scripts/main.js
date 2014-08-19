console.log('\'Allo \'Allo!');

var articalPromise =function(){
    return new Promise(function(resolve,reject){
    //$.get('data/artical.json',{},function(result){
        var xhr = new XMLHttpRequest();
        xhr.open('GET','scripts/data/artical.json');
        xhr.onload = function(){
            if(xhr.status == 200){
                resolve(xhr.response);
            }else{
                reject(xhr.statusText);
            }
        }
        xhr.onerror = function(){
            reject('Network Error');
        };
        xhr.send();
    });
};
articalPromise().then(function(response){
    console.log(JSON.parse(response)[0].text);
},function(error){
    console.log(error);
}).then(function(){
    console.log(1);
}).then(function(){
    setTimeout(function(){console.log(2)},2000)
}).then(function(){
    setTimeout(function(){console.log(3)},2000)
}).then(null,function(){
    setTimeout(function(){console.log(4)},3000)
});
