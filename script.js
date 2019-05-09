var myApp = angular.module('myApp', ['infinite-scroll']);
var date = new Date();
date.setDate(date.getDate() - 30);
var dateString = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)

myApp.controller('DemoController', function($scope, GHRepo) {
  $scope.ghRepo = new GHRepo();
});

myApp.factory('GHRepo', function($http) {
  var GHRepo = function() {
    this.repos = [];
    this.busy = false;
    this.page = 1
  };

  GHRepo.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;

    var url = "https://api.github.com/search/repositories?q=created:>"+dateString+"&sort=stars&order=desc&page="+ this.page
    $http.get(url).success(function(data) {
      var items = data.items;
      for (var i = 0; i < items.length; i++) {
        this.repos.push(items[i]);
      }
      this.page += 1
      this.busy = false;
    }.bind(this));
  };

  return GHRepo;
});