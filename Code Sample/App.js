'use strict';

(function () {
    angular.module('demo', ['dndLists']);
}());

angular.module('demo').controller('demoController', demoController);

function demoController($scope, demoService) {
    demoService.getListItems().then(function (listitems) {
        $scope.items = listitems;
    }, function (errorMessage) { console.log(errorMessage); });

    $scope.applyReordering = function () {
        demoService.updateListIndexForSwaps($scope.items).then(function (successMessage) {
            console.log(successMessage);
        },
        function (errorMessage) { console.log(errorMessage); });
    }
    $scope.cancelReordering = function () {
        demoService.getListItems().then(function (listitems) {
            $scope.items = listitems;
        }, function (errorMessage) { console.log(errorMessage); });
    }
}
angular.module('demo').factory('demoService', demoService)

function demoService($q, $http) {
    return {
        getListItems: function () {
            var deferred = $q.defer();
            $http({
                method: "GET",
                url: "../_api/web/lists/GetByTitle('Demo')/items?select=Id,Title,index&$orderby=index",
                headers: { "Accept": "application/json;odata=verbose" }
            }).success(function (data) {
                deferred.resolve(data.d.results);
            }).error(function (data) {
                deferred.reject(data.error.message.value);
            });
            return deferred.promise;
        },
        updateListIndexForSwaps: function (items) {
            var itemArray = [];
            var deferred = $q.defer();
            var context = new SP.ClientContext.get_current();
            var oList = context.get_web().get_lists().getByTitle('Demo');
            for (var i = 0; i < items.length; i++) {
                var oListItem = oList.getItemById(items[i].Id);
                itemArray[i] = oListItem;
                context.load(itemArray[i]);
            }

            context.executeQueryAsync(function (sender, args) {
                for (var i = 0; i < itemArray.length; i++) {
                    itemArray[i].set_item('index', i);
                    itemArray[i].update();
                    context.load(itemArray[i]);
                }
                context.executeQueryAsync(function (sender, args) {
                    deferred.resolve("Item Index updated!");
                }, function (sender, args) {

                    console.log(args.get_stackTrace() + args.get_message());
                    deferred.reject(args.get_message());
                })
            }, function (sender, args) {

                console.log(args.get_stackTrace() + args.get_message());
                deferred.reject(args.get_message());
            })
            return deferred.promise;
        }
    }
}