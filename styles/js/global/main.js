var app = angular.module('myApp', []);


app.run(function ($rootScope) {
    $rootScope.name = "Ari Lerner";
});

app.controller('MyController', function ($scope) {
    $scope.person = { name: "Ari Lerner" };
    var updateClock = function () {
        $scope.clock = new Date();
    };
    var timer = setInterval(function () {
        $scope.$apply(updateClock);
    }, 1000);
    updateClock();
});

app.controller('RepeatController', function ($scope) {
    $scope.roommates = [
        { name: 'Ari'},
        { name: 'Q'},
        { name: 'Sean'},
        { name: 'Anand'}
    ];

    $scope.people = {
        'Ari': 'orange',
        'Q': 'purple',
        'Sean': 'green'
    }

    $scope.programs = data.list.story;
});

app.controller('ParentController', function ($scope) {
    $scope.person = {greeted: false};
});

app.controller('ChildController', function ($scope) {
    $scope.sayHello = function () {
        $scope.person.greeted = true;
    }
});

var apiKey = 'MDE5MDU5NDg3MDE0MzA4MTEwODA3ODUxMA001',
    nprUrl = 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON';

app.controller('PlayerController', function ($scope, $http) {
    // Hidden our previous section's content
    // construct our http request
    $http({
        method: 'JSONP',
        url: nprUrl + '&apiKey=' + apiKey + '&callback=JSON_CALLBACK'
    }).success(function (data, status) {
            // Now we have a list of the stories (data.list.story)
            // in the data object that the NPR API
            // returns in JSON that looks like:
            // data: { "list": {
            //   "title": ...
            //   "story": [
            //     { "id": ...
            //       "title": ...
            $scope.programs = data.list.story;
        }).error(function (data, status) {
            // Some error occurred
        });

    $scope.play = function (program) {
        if ($scope.playing) $scope.audio.pause();
        var url = program.audio[0].format.mp4.$text;
        audio.src = 'styles/audio/master.mp3';
        audio.play();
        // Store the state of the player as playing
        $scope.playing = true;
    }
});


//app.controller('PlayerController', ['$scope', function ($scope, $http) {
//    $scope.playing = false;
//    $scope.audio = document.createElement('audio');
//    $scope.audio.src = 'styles/audio/master.mp3';
//    $scope.play = function () {
//        $scope.audio.play();
//        $scope.playing = true;
//    };
//    $scope.stop = function () {
//        $scope.audio.pause();
//        $scope.playing = false;
//    };
//    $scope.audio.addEventListener('ended', function () {
//        $scope.$apply(function () {
//            $scope.stop()
//        });
//    });
//}]);

app.controller('RelatedController', ['$scope', function ($scope) {
}]);

app.controller('DemoController', function ($scope) {
    $scope.counter = 0;
    $scope.add = function (amount) {
        $scope.counter += amount;
    };
    $scope.subtract = function (amount) {
        $scope.counter -= amount;
    };
});


app.controller('ServiceController', ['$scope', 'githubService',
    function ($scope, githubService) {
        // Watch for changes on the username property.
        // If there is a change, run the function
        $scope.$watch('username', function (newUsername) {
            // uses the $http service to call the GitHub API
            // and returns the resulting promise
            githubService.events(newUsername)
                .success(function (data, status, headers) {
                    // the success function wraps the response in data
                    // so we need to call data.data to fetch the raw data
                    $scope.events = data.data;
                })
        });
    }]);