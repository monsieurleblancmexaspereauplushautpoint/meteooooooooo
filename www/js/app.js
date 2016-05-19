// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'/*,'textAngular'*/])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.search', {
                url: '/search',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/search.html'
                    }
                }
            })

            .state('app.browse', {
                url: '/browse',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/browse.html'
                    }
                }
            })


          .state('app.profile', {
            url: '/profile',
            views: {
              'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
              }
            }
          })

            .state('app.index', {
                url: '/index',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/index.html',
                        controller: 'TutorialsCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        if (
            ionic.Platform.isAndroid()
            || ionic.Platform.isIOS()
        ) {
            $urlRouterProvider.otherwise('/app/mobile_login') ;
        } else {
            $urlRouterProvider.otherwise('/app/index');
        }
    })

  .controller('MainCtrl', function ($scope) {
    $scope.showContent = function($fileContent){
      $scope.content = $fileContent;
    };

    $scope.header = "CREATEDATE	LOCAL_WINDSPEED_INSTANT	LOCAL_WINDDIR_INSTANT	LOCAL_WS_2MIN_MNM	LOCAL_WS_2MIN_AVG	LOCAL_WS_2MIN_MAX	LOCAL_WS_10MIN_MNM	LOCAL_WS_10MIN_AVG	LOCAL_WS_10MIN_MAX	LOCAL_WD_2MIN_MNM	LOCAL_WD_2MIN_AVG	LOCAL_WD_2MIN_MAX	LOCAL_WD_10MIN_MNM	LOCAL_WD_10MIN_AVG	LOCAL_WD_10MIN_MAX	LOCAL_WIND_GUST	LOCAL_WIND_SQUALL	REMOTE_WINDSPEED_INSTANT	REMOTE_WINDDIR_INSTANT	REMOTE_WIND_2MIN_MNM	REMOTE_WIND_2MIN_AVG	REMOTE_WIND_2MIN_MAX	REMOTE_WIND_10MIN_MNM	REMOTE_WIND_10MIN_AVG	REMOTE_WIND_10MIN_MAX	REMOTE_WD_2MIN_MNM	REMOTE_WD_2MIN_AVG	REMOTE_WD_2MIN_MAX	REMOTE_WD_10MIN_MNM	REMOTE_WD_10MIN_AVG	REMOTE_WD_10MIN_MAX	REMOTE_WIND_GUST	REMOTE_WIND_SQUALL	AIR_TEMPERATURE	DEW_POINT	REL_HUMIDITY	RAIN_1H	RAIN_24H	AIR_PRESSURE	QNH	QFE	QFF	TREND_3H	TENDENCY	PRESSURE_ALT	DENSITY_ALT	PRESENT_WEATHER	RECENT_WEATHER	MOR_1MIN	MOR_10MIN	CLOUD_INSTANT_CL1	CLOUD_INSTANT_CL2	CLOUD_INSTANT_CL3	VERTICAL_VISIBILITY	LIGHTNING_DISTANCE	LIGHTNING_DIRECTION	LIGHTNING_COUNT	LIGHTNING_RF_NOISE	FREEZING_RAIN_ICING_STATUS	FREEZING_RAIN_ICING_MODE	CL1_OCTA1	CL1_BASE1	CL1_OCTA2	CL1_BASE2	CL1_OCTA3	CL1_BASE3	CL1_OCTA4	CL1_BASE4	CL1_OCTA5	CL1_BASE5	WATER_1H	WATER_3H	WATER_6H	WATER_24H	RATE	SNOW_1H	SNOW_3H	SNOW_6H	SNOW_24H";
    $scope.headers = $scope.header.split("\t");

    //Zone de taff recherche nom colonne par string


    var count = 0;
    $scope.headers.forEach(function(col){
      count ++;
      console.log("case " + count + " : " + col );
    });

    $scope.tamerelachaudiere = function() {

      var tab = $scope.content.split('\n');
      var computedData;

          computedData =
            [
              [
                parseFloat(tab[2].split("\t")[33]),
                parseFloat(tab[2].split("\t")[33]),
                tab[2].split("\t")[0] + " " + tab[2].split("\t")[1],
                tab[2].split("\t")[0] + " " + tab[2].split("\t")[1],
                0
              ],
              [
                parseFloat(tab[2].split("\t")[35]),
                parseFloat(tab[2].split("\t")[35]),
                tab[2].split("\t")[0] + " " + tab[2].split("\t")[1],
                tab[2].split("\t")[0] + " " + tab[2].split("\t")[1],
                0
              ],
              [
                parseFloat(tab[2].split("\t")[38]),
                parseFloat(tab[2].split("\t")[38]),
                tab[2].split("\t")[0] + " " + tab[2].split("\t")[1],
                tab[2].split("\t")[0] + " " + tab[2].split("\t")[1],
                0
              ],
              [
                parseFloat(tab[2].split("\t")[3]),
                parseFloat(tab[2].split("\t")[3]),
                tab[2].split("\t")[0] + " " + tab[2].split("\t")[1],
                tab[2].split("\t")[0] + " " + tab[2].split("\t")[1],
                0
              ],
              [
                parseFloat(tab[2].split("\t")[9]),
                parseFloat(tab[2].split("\t")[9]),
                tab[2].split("\t")[0] + " " + tab[2].split("\t")[1],
                tab[2].split("\t")[0] + " " + tab[2].split("\t")[1],
                0
              ]
            ];

      var counta = 0;
      tab.shift();
      tab.shift();
      tab.shift();
      console.log(computedData[0][0]);
      tab.forEach(function(col){
        counta ++;
        var line = col.split("\t");
        //temp
        if (parseFloat(line[33]) < computedData[0][0]) {
          console.log("line : " + parseFloat(line[33]) + " < " + computedData[0][0]);
            computedData[0][0] = parseFloat(line[33]);
            computedData[0][2] = line[0] + " " + line[1]; //c'est la date ducon
        } else if (parseFloat(line[33]) > computedData[0][1]) {
          computedData[0][1] = parseFloat(line[33]);
          computedData[0][3] = line[0] + " " + line[1];
        }
        //humi
        if (parseFloat(line[35]) < computedData[1][0]) {
          computedData[1][0] = parseFloat(line[35]);
          computedData[1][2] = line[0] + " " + line[1];
        } else if (parseFloat(line[35]) > computedData[1][1]) {
          computedData[1][1] = parseFloat(line[35]);
          computedData[1][3] = line[0] + " " + line[1];
        }

        if (parseFloat(line[3]) < computedData[3][0]) {
          computedData[3][0] = parseFloat(line[35]);
          computedData[3][2] = line[0] + " " + line[1];
        } else if (parseFloat(line[3]) > computedData[3][1]) {
          computedData[1][1] = parseFloat(line[35]);
          computedData[1][3] = line[0] + " " + line[1];
        }



        //console.log("case " + count + " : " + col );
      });
      console.log(computedData[0][0]);
      console.log(computedData[0][1]);
      console.log(computedData[0][2]);
      console.log(computedData[0][3]);
      console.log(counta);
    };
  })
  .directive('onReadFile', function ($parse) {
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attrs) {
      var fn = $parse(attrs.onReadFile);

      element.on('change', function(onChangeEvent) {
        var reader = new FileReader();

        reader.onload = function(onLoadEvent) {
          scope.$apply(function() {
            fn(scope, {$fileContent:onLoadEvent.target.result});
            console.log("AAAAHAHAHAHAHA");
          });
        };

        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
      });
    }
  };
});
