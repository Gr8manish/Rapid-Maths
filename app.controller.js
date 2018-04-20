angular.module("myApp").controller("myCtrl",function($rootScope,$scope,ngDialog){

      $scope.startResumeButtonText = "Start";

      // Total of corresponding row
      $scope.rowsAnswers = [];

      // Total of corresponding column
      $scope.columnAnswers = [];

      // $scope.isCorrectArray[i+""+j] will be "true" if value entered by user is Correct.
      // $scope.isCorrectArray[i+""+j] will be "false" if value entered by user is not Correct.
      $scope.isCorrectArray = [];

      //Random generated values for row and column headers will be stored in this array.
      $scope.columnValues = [];
      $scope.rowValues = []

      // These are used to enable or disable stopWatch buttons
      $scope.isStartButtonDisabled = false;
      $scope.isPauseButtonDisabled = true;
      $scope.isStopButtonDisabled = true;

      // Generating random values for row and column headers
      for(var l=0;l<10;l++){
        $scope.columnValues[l] = Math.floor(Math.random()*90)+10;
        $scope.rowValues[l] = Math.floor(Math.random()*90)+10;
      }

      // $scope.values[i+""+j] will contain value entered by user in input field corresponding to i th and j th column.
      $scope.values = [];

      //This function will be called when user will change value in the input field
      // And set $scope.isCorrectArray[i+""+j] value.
      $scope.valueChanged = function(i,j){
            if($scope.values[i+""+j] == undefined){
                return;
            }

            if( $scope.values[i+""+j] == ($scope.rowValues[i] + $scope.columnValues[j])){
               $scope.isCorrectArray[i+""+j] = true;
            }else{
               $scope.isCorrectArray[i+""+j] = false;
            }
      }

      // Called when user change value in Total row field.
      //  And set $scope.isCorrectArray[i+""+j] value accordingly.
      $scope.rowValueChanged = function(i){
          var rowNo = i;
          var sum=0;

          //Adding all the values entered by user in current row.
          for(var l=0;l<10;l++){
                if($scope.values[rowNo+""+l]){
                   sum += parseInt($scope.values[rowNo+""+l]);
                }
          }

          //Checking if row Total value entered by user is correct or not.
          if(!$scope.rowsAnswers[i] || sum == $scope.rowsAnswers[i]){
              $scope.isCorrectArray[i+"10"] = true;
          }else{
              $scope.isCorrectArray[i+"10"] = false;
          }
      }

      // Called when user change value in Total row field.
      //  And set $scope.isCorrectArray[i+""+j] value accordingly.
      $scope.columnValueChanged = function(i){
          var colNo = i;

          //Adding all values entered by user in current column
          var sum=0;
          for(var l=0;l<10;l++){
                if($scope.values[l+""+colNo]){
                   sum += parseInt($scope.values[l+""+colNo]);
                }
          }

          //checking if Total entered by user is correct or not
          if(!$scope.columnAnswers[i] || sum == $scope.columnAnswers[i]){
              $scope.isCorrectArray["10"+i] = true;
          }else{
              $scope.isCorrectArray["10"+i] = false;
          }
      }

      // Inilializing the timer. EasyTimer library is user.
      $scope.initializeTimer = function(){
        var timer = new Timer();

        //Various timer button listeners
        $('#stopWatch .startButton').click(function () {
            $scope.isStartButtonDisabled = true;
            $scope.isPauseButtonDisabled = false;
            $scope.isStopButtonDisabled = false;
            $scope.$apply();
            timer.start();
        });
        $('#stopWatch .pauseButton').click(function () {
            $scope.isStartButtonDisabled = false;
            $scope.isPauseButtonDisabled = true;
            $scope.isStopButtonDisabled = false;
            $scope.startResumeButtonText = "Resume";
            $scope.$apply();
            timer.pause();
        });
        $('#stopWatch .stopButton').click(function () {
            $scope.noOfCorrectAns_TwoNumbers = 0;
            $scope.noOfCorrectAns_Row = 0;
            $scope.noOfCorrectAns_Column = 0;
            $scope.noOfCorrectAns_Total = 0;

            // Counting no of correct answers
            for(var i=0;i<11;i++){
                for(var j=0;j<11;j++){
                    if($scope.isCorrectArray[i+""+j]){
                        if(i==10){
                            $scope.noOfCorrectAns_Column++;
                        }else if(j==10){
                            $scope.noOfCorrectAns_Row++;
                        }else{
                            $scope.noOfCorrectAns_TwoNumbers++;
                        }
                    }
                }
            }
            $scope.noOfCorrectAns_Total = $scope.noOfCorrectAns_TwoNumbers+$scope.noOfCorrectAns_Row+$scope.noOfCorrectAns_Column;

            // Resetting all the values
            $scope.isStartButtonDisabled = false;
            $scope.isPauseButtonDisabled = true;
            $scope.isStopButtonDisabled = true;
            $scope.startResumeButtonText = "Start";
            $scope.values = [];
            $scope.rowsAnswers = [];
            $scope.columnAnswers = [];
            $scope.isCorrectArray = [];
            $scope.$apply();
            timer.stop();
            $scope.onStopButtonClicked();
        });

        timer.addEventListener('secondsUpdated', function (e) {
            $('#stopWatch .values').html(timer.getTimeValues().toString());
        });
        timer.addEventListener('started', function (e) {
            $('#stopWatch .values').html(timer.getTimeValues().toString());
        });
      }

      $scope.initializeTimer();


      // Function to show result dialog
      $scope.onStopButtonClicked = function(){
        ngDialog.open({ template: 'firstDialogId', controller: 'myCtrl', data: {noOfCorrectAns_TwoNumbers: $scope.noOfCorrectAns_TwoNumbers,
            noOfCorrectAns_Row: $scope.noOfCorrectAns_Row,
            noOfCorrectAns_Total: $scope.noOfCorrectAns_Total,
            noOfCorrectAns_Column: $scope.noOfCorrectAns_Column} });
      }


  });
