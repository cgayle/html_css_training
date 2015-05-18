var app = angular.module('app', []);

app.config(['$compileProvider', function($compileProvider){ // remove ng-scope class
  $compileProvider.debugInfoEnabled(false);
}]);

app.controller('AppController', function($scope) {
      $scope.tClass = true;
    }
);


//another ref for angular add/rem class
//http://codepen.io/fabiobiondi/pen/BszbI
