angular.module('CDapp',[
    'ui.router',
    'ngMaterial',
    'ngMessages',
    'ngCookies',
    'Dirapp',
    'Servapp',
    'SerFlugel'
    ])

.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('top')
    .primaryPalette('grey', {
      'default': '100', // by default use shade 400 from the gray palette for primary intentions
      'hue-1': '800', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '700', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': '300' // use shade A100 for the <code>md-hue-3</code> class
    })
    .accentPalette('blue');
})

.config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/Docente/");
      //
    // Now set up the states
    $stateProvider
    // Rol de Doncente que cuenta con un parametro para cada clase
    .state('Home', {
        url: "/Docente/",
        templateUrl: "views/todo.html",
        controller: "soloDatosCtrl"
    })
    .state('Docente',{
        url:"/Docente/{idclase:[0-9a-fA-F]{1,25}}", // sólo caracteres alfanuméricos
        templateUrl:"views/todo.html",
        controller: "soloDatosCtrl"
    })
    .state('login', {
        url: "/login",
        templateUrl: "views/landing/index.html",
        controller: "LandingCtrl"
    })
    .state('Test', {
        url: "/test",
        template: "<h1>test</h1>",
        controller: 'testCotroller'
    })
    .state('Test2', {
        url: "/test2",
        template: "<h1>test2</h1>",
        controller: 'test2Cotroller'
    })
    
    // estados anidaddos
    .state('Docente.Contenido', {
        url: "/Contenido",
        templateUrl: "views/Contenido.html"
    })
    .state('Docente.Evaluaciones', {
        url: "/Evaluaciones",
        templateUrl: "views/Evaluaciones.html",
    })
    .state('Docente.Foro', {
        url: "/Foro",
        template: "<h3>Espacio Foro<h3/>"
    })
    .state('Docente.Estudiantes', {
        url: "/Estudiantes",
        templateUrl: "views/estudiantes/index.html",
        controller: 'EstudiantesCtrl'
    })
    .state('Docente.Trabajos', {
        url: "/Trabajos",
        template: "<h3>Espacio Trabajos<h3/>",
    })
})

.controller('soloDatosCtrl',['$http','$scope','$mdSidenav','$timeout', '$mdBottomSheet','Datos', '$location', 'Usuario', function ($http,$scope,$mdSidenav,$timeout,$mdBottomSheet,Datos, $location, Usuario){
    // Valida que la sesion haya iniciado
    Usuario.login.get(function (data) {
        if (data.login == false) {
            $location.path("/login");
        }    
    },function(data){
        console.log(data);
    });

    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };
    
    $scope.close = function() {
     $mdSidenav('left').close();
    };

    $scope.clases =[
        {curso:'10A', materia:'Matematicas',state:'10A'},
        {curso:'8B', materia:'Geometria',state:'8B'},
        {curso:'7E', materia:'Matematicas',state:'7E'},
        {curso:'8F', materia:'Matematicas',state:'8F'}
    ];


    $http.get('scripts/Json/contenido.json').success(function (data){
        
        $scope.Logros = data.contenido;
        $scope.Evaluaciones = data.calificaciones;
        
    });

    $http.get('scripts/Json/estudiantes.json').success(function (data){
        $scope.Estudiantes = data;
        //console.log($scope.Estudiantes);
    });

    $scope.editEvaluacion = function(examen){
        $scope.editExamen = examen;
    };

    $scope.examenNotas = function(examen){
        $scope.calificar = examen;
    };

    $scope.valor = function(key){
        console.log(key);
    };

    $scope.showLogro = function(Logro){
        $scope.texto=Logro;

    };
}])
.controller('ListCtrl', function($scope, $mdDialog) {

  $scope.settings = [
    { name: 'Wi-Fi', extraScreen: 'Wi-fi menu', icon: 'device:network-wifi', enabled: true },
    { name: 'Bluetooth', extraScreen: 'Bluetooth menu', icon: 'device:bluetooth', enabled: false },
  ];
  $scope.navigateTo = function(to, event) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Navigating')
        .content('Imagine being taken to ' + to)
        .ariaLabel('Navigation demo')
        .ok('Neat!')
        .targetEvent(event)
    );
  };
});