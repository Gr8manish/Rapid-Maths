var app = angular.module("myApp",[])
  .controller("myCtrl",function($scope){
      $scope.rowsAnswers = [];
      $scope.columnAnswers = [];
      $scope.isCorrectArray = [];
      $scope.columnValues = [];
      $scope.rowValues = []
      for(var l=0;l<10;l++){
        $scope.columnValues[l] = Math.floor(Math.random()*90)+10;
        $scope.rowValues[l] = Math.floor(Math.random()*90)+10;
      }
      $scope.values = [];


      $scope.valueChanged = function(i,j){
       console.log("valueChanged",$scope.values[i+""+j]);
       if($scope.values[i+""+j] == undefined || $scope.values[i+""+j] == ($scope.rowValues[i] + $scope.columnValues[j])){
           $scope.isCorrectArray[i+""+j] = true;
       }else{
           $scope.isCorrectArray[i+""+j] = false;
       }
      }

      $scope.rowValueChanged = function(i){
          var rowNo = i;
          var sum=0;
          for(var l=0;l<10;l++){
                if($scope.values[rowNo+""+l]){
                   sum += parseInt($scope.values[rowNo+""+l]);
                }
          }
          if(!$scope.rowsAnswers[i] || sum == $scope.rowsAnswers[i]){
              $scope.isCorrectArray[i+"10"] = true;
          }else{
              $scope.isCorrectArray[i+"10"] = false;
          }
      }

      $scope.columnValueChanged = function(i){
          var colNo = i;
          var sum=0;
          for(var l=0;l<10;l++){
                if($scope.values[l+""+colNo]){
                   sum += parseInt($scope.values[l+""+colNo]);
                }
          }
          if(!$scope.columnAnswers[i] || sum == $scope.columnAnswers[i]){
              $scope.isCorrectArray["10"+i] = true;
          }else{
              $scope.isCorrectArray["10"+i] = false;
          }
      }
  });
