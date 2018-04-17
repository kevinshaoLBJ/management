angular.module('program.services', [])
    .factory("loginVerify", function ($http, $q) {
        return {
            verify: function (userName, userPassword) {
                var deferred = $q.defer();
                $http({
                    method: 'post',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/admin/auth?username=" + userName + "&password=" + userPassword,
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            }
        }
    })
    .factory("programIn", function ($http, $q) {
        return {
            getAll: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/project/show?page=1&count=10&adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            }
        }
    })
    .factory("duetoProgram", function ($http, $q) {
        return {
            getDuetoProgram: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/project/show?page=1&count=10&adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            getDeviceBusiness: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/company/show?page=1&count=20&companyType=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            getDeviceType: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/device-type/show",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            }
        }
    })
    .factory("inspectUnitSH", function ($http, $q) {
        return {
            proAll: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/application/wait-accept?page=1&count=20",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            // 所属工程选择框接口
            proAll2: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/project/show?page=1&count=10&adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            // 设备公司名选择框接口
            proAll3: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/company/all?adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            // 编辑信息
            editInfor: function (id) {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: 'http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/application/detail?id=' + id + '&adminId=1',
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            // 编辑提交
            editConfirm: function (dataApply) {
                var deferred = $q.defer();
                $http({
                    method: 'post',
                    url: "http://bigbug.tech:8080/device-api-dev/api/device-inspection/application/update",
                    data: dataApply,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");

                    }
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                })
                return deferred.promise;
            },
            acceptApply: function (dataApply) {
                var deferred = $q.defer();
                $http({
                    method: 'post',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/accept/process",
                    data: dataApply,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");

                    }
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                })
                return deferred.promise;
            }
        }
    })
    .factory("safeIn", function ($http, $q) {
        return {
            getSafe: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/recheck-conclusion/show",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            // 详情按钮
            onculars: function (id) {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/recheck-conclusion/detail-all?id=" + id + "&adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            }
        }
    })
    .factory("inspectFJ", function ($http, $q) {
        return {
            // 主页
            getInspectFj: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/conclusion/wait-recheck",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            // 设备报检申请
            onAudit: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/admin/show?page=1&count=10&adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            onDetails: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/user/show?page=1&count=20&jobType=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            // 检验单位审核
            onReport: function (id) {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/conclusion/detail-all?id=" + id + "&adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            // 得到模态框设备详情
            getDeviceDetails: function (id) {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/conclusion/detail-all?id="+id+"&adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },

        }
    })
    .factory("inspectUnitZB", function ($http, $q) {
        return {
            getInspectZB: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/accept/wait-assign?page=1&count=10&adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
           // 报告详情接口
          //www.bigbug.tech:8080/device-api-dev/api/device-inspection/accept/detail-all?id=382&adminId=1
            getReportXQ: function (id) {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/accept/detail-all?id="+id+"&adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            // 检验人员信息
            getInspectZB2: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/user/show?page=1&count=20&jobType=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            assignApply: function (dataApply) {
                var deferred = $q.defer();
                $http({
                    method: 'post',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/accept/assign",
                    data: dataApply,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                })
                return deferred.promise;
            }
        }
    })
    .factory("inspectXC", function ($http, $q) {
        return {
            getInspectXC: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/execution/all?page=1&count=10&status=1&adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            // 详情接口
            getInsepectXC2: function (id) {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/execution/detail-all?id="+id+"&adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            // 现场检测
            inspectJC: function (id) {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/report-material/detail?executionId="+id+"&adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            }
        }
    })
    .factory("inspectReport", function ($http, $q) {
        return {
            getInspectReport: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/execution/wait-conclude?page=1&count=20",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            // 模态框接口
            getInspectReport2: function (id) {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/execution/detail-all?id="+id+"&adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            }
        }
    })
    .factory("administratMa", function ($http, $q) {
        return {
            getAdministratorMa: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/role/all?adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            getAdministratorMa2: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/admin/show?page=1&count=10&adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            addAdministrator: function (dataApply) {
                var deferred = $q.defer();
                $http({
                    method: 'post',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/admin/add",
                    data: dataApply,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                })
                return deferred.promise;
            },
            deleteAdministrator: function (dataApply) {
                var deferred = $q.defer();
                $http({
                    method: 'post',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/admin/remove",
                    data: dataApply,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                })
                return deferred.promise;
            },
            updateAdministrator: function (dataApply) {
                var deferred = $q.defer();
                $http({
                    method: 'post',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/admin/update",
                    data: dataApply,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                })
                return deferred.promise;
            }
        }
    })
    .factory("inspectApply", function ($http, $q) {
        return {
            postApply: function (dataApply) {
                var deferred = $q.defer();
                $http({
                    method: 'post',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/application/add",
                    data: dataApply,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");

                    }
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                })
                return deferred.promise;
            }
        }
    })
    .factory("roleMa1", function ($http, $q) {
        return {
            // 获取角色信息列表
            getRoleMa: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/role/all?adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            // 获取权限接口
            getAuthority: function () {
                var deferred = $q.defer();
                $http({
                    method: 'get',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/permission/all?adminId=1",
                    responseType: 'json'
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                });
                return deferred.promise;
            },
            // 删除角色
            deleteRole: function (dataApply) {
                var deferred = $q.defer();
                $http({
                    method: 'post',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/role/remove",
                    data: dataApply,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                })
                return deferred.promise;
            },
            // 增加角色
            addRole: function (dataApply) {
                var deferred = $q.defer();
                $http({
                    method: 'post',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/role/add",
                    data: dataApply,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                })
                return deferred.promise;
            },
            // 编辑更新
            updateRole: function (dataApply) {
                var deferred = $q.defer();
                $http({
                    method: 'post',
                    url: "http://www.bigbug.tech:8080/device-api-dev/api/role/update",
                    data: dataApply,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (re) {
                    deferred.resolve(re)
                }, function (e) {
                    deferred.reject(e)
                })
                return deferred.promise;
            }
        }

    })

