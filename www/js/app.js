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

//    $scope.lines = "ma première line et \n" +
//      "la seconde";
//    $scope.lineOne = $scope.lines.split("\n");
//    console.log(content);
//    $scope.lineOne.forEach(function(ligne, i, j){
//      console.log(ligne + i);
//    });
//    console.log(lineOne);

    $scope.header = "CREATEDATE	LOCAL_WINDSPEED_INSTANT	LOCAL_WINDDIR_INSTANT	LOCAL_WS_2MIN_MNM	LOCAL_WS_2MIN_AVG	LOCAL_WS_2MIN_MAX	LOCAL_WS_10MIN_MNM	LOCAL_WS_10MIN_AVG	LOCAL_WS_10MIN_MAX	LOCAL_WD_2MIN_MNM	LOCAL_WD_2MIN_AVG	LOCAL_WD_2MIN_MAX	LOCAL_WD_10MIN_MNM	LOCAL_WD_10MIN_AVG	LOCAL_WD_10MIN_MAX	LOCAL_WIND_GUST	LOCAL_WIND_SQUALL	REMOTE_WINDSPEED_INSTANT	REMOTE_WINDDIR_INSTANT	REMOTE_WIND_2MIN_MNM	REMOTE_WIND_2MIN_AVG	REMOTE_WIND_2MIN_MAX	REMOTE_WIND_10MIN_MNM	REMOTE_WIND_10MIN_AVG	REMOTE_WIND_10MIN_MAX	REMOTE_WD_2MIN_MNM	REMOTE_WD_2MIN_AVG	REMOTE_WD_2MIN_MAX	REMOTE_WD_10MIN_MNM	REMOTE_WD_10MIN_AVG	REMOTE_WD_10MIN_MAX	REMOTE_WIND_GUST	REMOTE_WIND_SQUALL	AIR_TEMPERATURE	DEW_POINT	REL_HUMIDITY	RAIN_1H	RAIN_24H	AIR_PRESSURE	QNH	QFE	QFF	TREND_3H	TENDENCY	PRESSURE_ALT	DENSITY_ALT	PRESENT_WEATHER	RECENT_WEATHER	MOR_1MIN	MOR_10MIN	CLOUD_INSTANT_CL1	CLOUD_INSTANT_CL2	CLOUD_INSTANT_CL3	VERTICAL_VISIBILITY	LIGHTNING_DISTANCE	LIGHTNING_DIRECTION	LIGHTNING_COUNT	LIGHTNING_RF_NOISE	FREEZING_RAIN_ICING_STATUS	FREEZING_RAIN_ICING_MODE	CL1_OCTA1	CL1_BASE1	CL1_OCTA2	CL1_BASE2	CL1_OCTA3	CL1_BASE3	CL1_OCTA4	CL1_BASE4	CL1_OCTA5	CL1_BASE5	WATER_1H	WATER_3H	WATER_6H	WATER_24H	RATE	SNOW_1H	SNOW_3H	SNOW_6H	SNOW_24H";
    $scope.rawHeaders = $scope.header.split("\t");

    var count = 0;
    $scope.rawHeaders.forEach(function(col){
      count ++;
      //console.log("case " + count + " : " + col );
    });

    $scope.tamerelachaudiere = function() { //méthode appelée au click du bouton, pour traiter les données du fichier

      var tab = $scope.content.split('\n');

      //Zone de taff recherche nom colonne par string
        //on récupère la 2e ligne, car c'est dans celle là que nous avons les headers :
        var headers = tab[1].split('\t');

        //on creer les variables
        var dateIndex, tempIndex, humiIndex, presIndex, wsIndex, wdIndex;

        //le parsage des noms de colonnes
        headers.forEach(function(str, index){

          if (str == "CREATEDATE") { dateIndex = index; }
          if (str == "AIR_TEMPERATURE") { tempIndex = index; }
          if (str == "REL_HUMIDITY") { humiIndex = index; }
          if (str == "AIR_PRESSURE") { presIndex = index; }
          if (str == "LOCAL_WS_2MIN_MNM") { wsIndex = index; }
          if (str == "LOCAL_WD_2MIN_MNM") { wdIndex = index; }

        });


      //fin zone de taff recherche nom colonne par string


      var computedData;
      //initialisation du tab
      computedData =
        [
          [
            parseFloat(tab[2].split("\t")[tempIndex]),
            parseFloat(tab[2].split("\t")[tempIndex]),
            tab[2].split("\t")[dateIndex],
            tab[2].split("\t")[dateIndex],
            0,
            0
          ],
          [
            parseFloat(tab[2].split("\t")[humiIndex]),
            parseFloat(tab[2].split("\t")[humiIndex]),
            tab[2].split("\t")[dateIndex],
            tab[2].split("\t")[dateIndex],
            0,
            0
          ],
          [
            parseFloat(tab[2].split("\t")[presIndex]),
            parseFloat(tab[2].split("\t")[presIndex]),
            tab[2].split("\t")[dateIndex],
            tab[2].split("\t")[dateIndex],
            0,
            0
          ],
          [
            parseFloat(tab[2].split("\t")[wsIndex]),
            parseFloat(tab[2].split("\t")[wsIndex]),
            tab[2].split("\t")[dateIndex],
            tab[2].split("\t")[dateIndex],
            0,
            0
          ],
          [
            parseFloat(tab[2].split("\t")[wdIndex]),
            parseFloat(tab[2].split("\t")[wdIndex]),
            tab[2].split("\t")[dateIndex],
            tab[2].split("\t")[dateIndex],
            0
          ]
        ];

      tab.shift();  //titre qui ne sert à rien
      tab.shift();  //headers
      tab.shift();  //premiere ligne de données avec laquelle on a initialisé notre tableau

      tab.forEach(function(col){
        var line = col.split("\t");
        //temp
        if (parseFloat(line[tempIndex]) < computedData[0][0]) {
          computedData[0][0] = parseFloat(line[tempIndex]);
          computedData[0][2] = line[dateIndex];
        } else if (parseFloat(line[tempIndex]) > computedData[0][1]) {
          computedData[0][1] = parseFloat(line[tempIndex]);
          computedData[0][3] = line[dateIndex];
        }
        //humi
        if (parseFloat(line[humiIndex]) < computedData[1][0]) {
          computedData[1][0] = parseFloat(line[humiIndex]);
          computedData[1][2] = line[dateIndex];
        } else if (parseFloat(line[humiIndex]) > computedData[1][1]) {
          computedData[1][1] = parseFloat(line[humiIndex]);
          computedData[1][3] = line[dateIndex];
        }
        //pres
        if (parseFloat(line[presIndex]) < computedData[2][0]) {
          computedData[2][0] = parseFloat(line[presIndex]);
          computedData[2][2] = line[dateIndex];
        } else if (parseFloat(line[presIndex]) > computedData[2][1]) {
          computedData[2][1] = parseFloat(line[presIndex]);
          computedData[2][3] = line[dateIndex];
        }

        //wind speed & direction
        if (parseFloat(line[wsIndex]) < computedData[3][0]) {
          computedData[3][0] = parseFloat(line[wsIndex]);
          computedData[4][0] = parseFloat(line[wdIndex]);
          computedData[3][2] = line[dateIndex];
        } else if (parseFloat(line[wsIndex]) > computedData[3][1]) {
          computedData[3][1] = parseFloat(line[wsIndex]);
          computedData[4][1] = parseFloat(line[wdIndex]);
          computedData[3][3] = line[dateIndex];
        }

        //count
        if (line[tempIndex] && line[tempIndex].trim()){
          computedData[0][4] ++;
          computedData[0][5] += parseFloat(line[tempIndex]);
        }

        if (line[humiIndex]){
          computedData[1][4] ++;
          computedData[1][5] += parseFloat(line[humiIndex]);
        }

        if (line[presIndex]){
          computedData[2][4] ++;
          computedData[2][5] += parseFloat(line[presIndex]);
        }

        if (line[wsIndex]){
          computedData[3][4] ++;
          computedData[3][5] += parseFloat(line[wsIndex]);
        }


      });
      console.log(computedData[0][0]);  //valeur min
      console.log(computedData[0][1]);  //valeur max
      console.log(computedData[0][2]);  //date de la valeur min
      console.log(computedData[0][3]);  //date de la valeur max
      console.log(computedData[0][4]);  //nombre de données enregistées
      console.log(computedData[0][5]);  //somme de ces données (calculée pour la moyenne)
      console.log("Moyenne temp : " + computedData[0][5] /computedData[0][4])
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
              console.log(" - - - CHARGEMENT OK - - - ");
            });
          };

          reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
        });
      }
    };
  });
