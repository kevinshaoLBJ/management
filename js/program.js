angular.module("program", ['ui.router', 'program.controllers','program.services','angular-ladda','ui.bootstrap','program.directive','program.filters'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'login'
            })
            .state('main', {
                url: '/main',
                templateUrl: 'templates/main.html',
                controller: 'main'
            })
            .state('main.programIn', {
                url: '/programIn',
                views: {
                    'mainContent': {
                        templateUrl: 'templates/programIn.html',
                        controller: 'programInCtr'
                    }
                }
            })
            .state('main.instpectApply', {
                url: '/instpectApply',
                views: {
                    'mainContent': {
                        templateUrl: 'templates/instpectApply.html',
                        controller: 'instpectApply'
                    }
                }
            })
            .state('main.inspectUnitSH', {
                url: '/inspectUnitSH',
                views: {
                    'mainContent': {
                        templateUrl: 'templates/inspectUnitSH.html',
                        controller: 'inspectUnitSH'
                    }
                }
            })
            .state('main.inspectUnitZB', {
                url: '/inspectUnitZB',
                views: {
                    'mainContent': {
                        templateUrl: 'templates/inspectUnitZB.html',
                        controller:'inspectUnitZB'
                    }
                }
            })
            .state('main.inspectXC', {
                url: '/inspectXC',
                views: {
                    'mainContent': {
                        templateUrl: 'templates/inspectXC.html',
                        controller:'inspectXC'
                    }
                }
            })
            .state('main.inspectReport', {
                url: '/inspectReport',
                views: {
                    'mainContent': {
                        templateUrl: 'templates/inspectReport.html',
                        controller:'inspectReport'
                    }
                }
            })
            .state('main.inspectReFJ', {
                url: '/inspectReFJ',
                views: {
                    'mainContent': {
                        templateUrl: 'templates/inspectReFJ.html',
                        controller: 'inspectReFJ'
                    }
                }
            })
            .state('main.safeInspect', {
                url: '/safeInspect',
                views: {
                    'mainContent': {
                        templateUrl: 'templates/safeInspect.html',
                        controller: 'safeInspect',
                    }
                }
            })
            .state('main.administratorMa', {
                url: '/administratorMa',
                views: {
                    'mainContent': {
                        templateUrl: 'templates/administratorMa.html',
                        controller: 'administratorMa',
                    }
                }
            })
            .state('main.roleMa', {
                url: '/roleMa',
                views: {
                    'mainContent': {
                        templateUrl: 'templates/roleMa.html',
                        controller: 'roleMa',
                    }
                }
            })
        $urlRouterProvider.otherwise('/main/instpectApply');
    });