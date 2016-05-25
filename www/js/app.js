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
      $urlRouterProvider.otherwise('/app/index') ;
    } else {
      $urlRouterProvider.otherwise('/app/index');
    }
  })

  .controller('MainCtrl', function ($scope) {

    $scope.showContent = function($fileContent){
      $scope.content = $fileContent;
    };

//temp







    $scope.tab = null;
    $scope.parseOk = false;
    $scope.hourTab = null;
    $scope.hourTabToDisplay = null;

    $scope.compute = function() { //méthode appelée au click du bouton, pour traiter les données du fichier

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
      var hourData = [];
      //initialisation du tab

      var computedData = initTab(tab, 2);

      //for(var i = 0 ; i < 24 ; i++){
        hourData[0] = initTab(tab, 2);
      //}


      tab.shift();  //titre qui ne sert à rien
      tab.shift();  //headers
      tab.shift();  //premiere ligne de données avec laquelle on a initialisé notre tableau

      var heure = "";
      //parcours du fichier
      tab.forEach(function(col, index){

        var line = col.split("\t");

        fillTab(line, computedData);

        if(line[dateIndex].split(" ")[1]){
          if(heure != line[dateIndex].split(" ")[1].split(":")[0]){
            heure = line[dateIndex].split(" ")[1].split(":")[0];
            hourData[parseInt(heure)] = initTab(tab, index);
          }

          fillTab(line, hourData[parseInt(heure)]);

        }


        //fillTab(line, );

        /*var line = col.split("\t");
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

        if (line[humiIndex] && line[humiIndex].trim()){
          computedData[1][4] ++;
          computedData[1][5] += parseFloat(line[humiIndex]);
        }

        if (line[presIndex] && line[presIndex].trim()){
          computedData[2][4] ++;
          computedData[2][5] += parseFloat(line[presIndex]);
        }

        if (line[wsIndex] && line[wsIndex].trim()){
          computedData[3][4] ++;
          computedData[3][5] += parseFloat(line[wsIndex]);
        }*/


      }); // fin forEach

      function initTab(tab, index){
        return [
            [
              parseFloat(tab[index].split("\t")[tempIndex]),
              parseFloat(tab[index].split("\t")[tempIndex]),
              tab[index].split("\t")[dateIndex],
              tab[index].split("\t")[dateIndex],
              0,
              0
            ],
            [
              parseFloat(tab[index].split("\t")[humiIndex]),
              parseFloat(tab[index].split("\t")[humiIndex]),
              tab[index].split("\t")[dateIndex],
              tab[index].split("\t")[dateIndex],
              0,
              0
            ],
            [
              parseFloat(tab[index].split("\t")[presIndex]),
              parseFloat(tab[index].split("\t")[presIndex]),
              tab[index].split("\t")[dateIndex],
              tab[index].split("\t")[dateIndex],
              0,
              0
            ],
            [
              parseFloat(tab[index].split("\t")[wsIndex]),
              parseFloat(tab[index].split("\t")[wsIndex]),
              tab[index].split("\t")[dateIndex],
              tab[index].split("\t")[dateIndex],
              0,
              0
            ],
            [
              parseFloat(tab[index].split("\t")[wdIndex]),
              parseFloat(tab[index].split("\t")[wdIndex]),
              tab[index].split("\t")[dateIndex],
              tab[index].split("\t")[dateIndex],
              0
            ]
          ];
      }
      function fillTab(line, tab){
        //temp
        if (parseFloat(line[tempIndex]) < tab[0][0]) {
          tab[0][0] = parseFloat(line[tempIndex]);
          tab[0][2] = line[dateIndex];
        } else if (parseFloat(line[tempIndex]) > tab[0][1]) {
          tab[0][1] = parseFloat(line[tempIndex]);
          tab[0][3] = line[dateIndex];
        }
        //humi
        if (parseFloat(line[humiIndex]) < tab[1][0]) {
          tab[1][0] = parseFloat(line[humiIndex]);
          tab[1][2] = line[dateIndex];
        } else if (parseFloat(line[humiIndex]) > tab[1][1]) {
          tab[1][1] = parseFloat(line[humiIndex]);
          tab[1][3] = line[dateIndex];
        }
        //pres
        if (parseFloat(line[presIndex]) < tab[2][0]) {
          tab[2][0] = parseFloat(line[presIndex]);
          tab[2][2] = line[dateIndex];
        } else if (parseFloat(line[presIndex]) > tab[2][1]) {
          tab[2][1] = parseFloat(line[presIndex]);
          tab[2][3] = line[dateIndex];
        }

        //wind speed & direction
        if (parseFloat(line[wsIndex]) < tab[3][0]) {
          tab[3][0] = parseFloat(line[wsIndex]);
          tab[4][0] = parseFloat(line[wdIndex]);
          tab[3][2] = line[dateIndex];
        } else if (parseFloat(line[wsIndex]) > tab[3][1]) {
          tab[3][1] = parseFloat(line[wsIndex]);
          tab[4][1] = parseFloat(line[wdIndex]);
          tab[3][3] = line[dateIndex];
        }

        //count
        if (line[tempIndex] && line[tempIndex].trim()){
          tab[0][4] ++;
          tab[0][5] += parseFloat(line[tempIndex]);
        }

        if (line[humiIndex] && line[humiIndex].trim()){
          tab[1][4] ++;
          tab[1][5] += parseFloat(line[humiIndex]);
        }

        if (line[presIndex] && line[presIndex].trim()){
          tab[2][4] ++;
          tab[2][5] += parseFloat(line[presIndex]);
        }

        if (line[wsIndex] && line[wsIndex].trim()) {
          tab[3][4]++;
          tab[3][5] += parseFloat(line[wsIndex]);
        }
      }

      function getMinValues(type){
        var truc = [];

        for(var i = 0 ; i < 24 ; i++){

          truc.push($scope.hourTab[i][type][0]);
        }
        return truc;
      }

      function getMaxValues(type){
        var truc = [];

        for(var i = 0 ; i < 24 ; i++){

          truc.push($scope.hourTab[i][type][1]);
        }
        return truc;
      }

      function getAverageValues(type){
        var truc = [];

        for(var i = 0 ; i < 24 ; i++){

          truc.push($scope.hourTab[i][type][5] / $scope.hourTab[i][type][4]);
        }
        return truc;
      }


      console.log(computedData[0][0]);  //valeur min
      console.log(computedData[0][1]);  //valeur max
      console.log(computedData[0][2]);  //date de la valeur min
      console.log(computedData[0][3]);  //date de la valeur max
      console.log(computedData[0][4]);  //nombre de données enregistées
      console.log(computedData[0][5]);  //somme de ces données (calculée pour la moyenne)
      console.log("Moyenne temp : " + computedData[0][5] /computedData[0][4]);
      $scope.tab = computedData;
      $scope.parseOk = true;
      $scope.hourTab = hourData;

      for (var i = 0 ; i < 4 ; i ++){
        Highcharts.chart('chartContainer' + i, {

          xAxis: {
            categories: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
          },

          series: [{
            name: 'Minimum',
            data: getMinValues(i)
          }, {
            name: 'Maximum',
            data: getMaxValues(i)
          }, {
            name: 'Moyenne',
            data: getAverageValues(i)
          }]
        });
      }


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
