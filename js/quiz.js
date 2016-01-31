(function () {

    var app = angular.module('myQuiz', []);

    app.controller('QuizController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
        //If this is less than number of questions then we know offended.
        //        $scope.offendedness = 'fine';
        $scope.questionNumber = 0;
        $scope.activeQuestion = -1;
        $scope.activeQuestionAnswered = 0;

        $http.get('quiz_data.json').then(function (quizData) {
            $scope.myQuestions = quizData.data;
            $scope.totalQuestions = $scope.myQuestions.length;
        });

        $scope.selectAnswer = function (qIndex, aIndex) {
            var questionState = $scope.myQuestions[qIndex].questionState;

            if (questionState != 'answered') {
                $scope.myQuestions[qIndex].selectedAnswer = aIndex;

                var correctAnswer = $scope.myQuestions[qIndex].offended;

                console.log(aIndex);

                $scope.myQuestions[qIndex].correctAnswer = correctAnswer;


                if (aIndex === correctAnswer) {
                    $scope.myQuestions[qIndex].offendedness = 'offended';
                    //Something to actually stop the loop
                } else {
                    $scope.myQuestions[qIndex].offendedness = 'fine';
                }
                $scope.myQuestions[qIndex].questionState = 'answered';
            }
        };

        $scope.isSelected = function (qIndex, aIndex) {
            return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
        }

        $scope.isOffended = function (qIndex, aIndex) {
//            return $scope.myQuestions[qIndex].correctAnswer === aIndex;
             return $scope.myQuestions[qIndex].offendedness === 'offended' && aIndex ===0;
        }

    }]);



})();