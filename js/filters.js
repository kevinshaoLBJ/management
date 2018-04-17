angular.module('program.filters', [])
    .filter("checkedFilter", function () {
        return function (id) {
            var x=JSON.parse(localStorage.getItem("checkKey"))
            for(var i=0;i<x.length;i++){
                if(x[i].id===id){
                    var res=true
                }
            }
            return res
        }
    })