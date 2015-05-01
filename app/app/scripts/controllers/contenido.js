angular.module('Dirapp')
  .controller('ContenidoCtrl', ['$scope', '$mdDialog', '$stateParams', 'Docente', function ($scope, $mdDialog, $stateParams, Docente) {
    'use strict';

    var idClase = $stateParams.idclase;
    $scope.logro = {};

    Docente.contenido.query({idclase: idClase}, function(logros){
    	$scope.Logros = logros;

        Docente.calificaciones.query({idclase: idClase}, function(evaluaciones){
            $scope.evaluaciones = evaluaciones;
        });
    });

    $scope.saveLogro = function(id_indicador){

        if (id_indicador) {
          // PUT
            if (_.size($scope.logro)) {
                var getParams = {idindicador : $scope.logro.id_indicador}
                var putlogro = _.pick($scope.logro, 'contenido', 'periodo', 'fecha_vencimiento');
                Docente.contenido.update(getParams, putlogro, function (log) {
                    var logro = _.findWhere($scope.Logros, {id_indicador: id_indicador});
                    logro.contenido = log.data.contenido;
                    logro.periodo = log.data.periodo;
                    logro.fecha_vencimiento = log.data.fecha_vencimiento;
                    _.delay(function(){
                        $('#modalNewLogro').modal('hide');
                    }, 500);
                });
            }
        }else{

            // POST logro
            $scope.logro.idclase = idClase;
            Docente.contenido.save($scope.logro, function(log){
                var logro = {
                    id_indicador: log.insertId,
                    id_clase: log.data.idclase,
                    contenido: log.data.contenido,
                    periodo: log.data.periodo,
                    fecha_vencimiento: log.data.fecha_vencimiento
                };
                $scope.Logros.push(logro);
                _.delay(function(){
                    $('#modalNewLogro').modal('hide');
                }, 500);
            });
        }
    };

    $scope.launchEditModal = function(id_indicador){
        $scope.logro = _.clone(_.findWhere($scope.Logros, {id_indicador: id_indicador}));
        if ($scope.logro.fecha_vencimiento) {
            $scope.logro.fecha_vencimiento = $scope.logro.fecha_vencimiento.substring(0, 10);
        }
    };
}]);