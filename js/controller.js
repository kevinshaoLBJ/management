angular.module('program.controllers', [])
    .controller('login', function ($scope, $state, loginVerify) {
        $scope.loginWeb = function () {
            $scope.loginLoading = true;
            if ($scope.userName == undefined || $scope.userPassword == undefined) {
                swal({
                    title: "",
                    text: "用户名或密码不能为空",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "请重新输入",
                    closeOnConfirm: true
                });
                $scope.loginLoading = false;
            } else {
                loginVerify.verify($scope.userName, $scope.userPassword).then(function (rs) {
                    if (rs.data.success) {
                        sessionStorage.setItem("userId", rs.data.result.data.id)
                        $state.go("main")
                    } else {
                        swal({
                            title: "",
                            text: rs.data.error.message,
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "请重新输入",
                            closeOnConfirm: true
                        });
                    }
                    $scope.loginLoading = false;
                }, function (e) {
                    console.log(e)
                })
            }
        }
    })
    .controller('main', function ($scope, $state) {
        $scope.backLogin = function () {
            swal({
                title: "退出",
                text: "确定要退出吗?",
                type: "info",
                showCancelButton: true,
                confirmButtonColor: "#8CD4F5",
                confirmButtonText: "确定",
                cancelButtonText: '取消',
                closeOnConfirm: true
            }, function () {
                $state.go("login")
            });
        }
    })
    .controller('programInCtr', function ($scope, programIn) {
        programIn.getAll().then(function (rs) {
            $scope.projectData = rs.data.result.data
        }, function (e) {
            console.log(e)
        })
    })
    .controller('safeInspect', function ($scope, safeIn) {
        safeIn.getSafe().then(function (rs) {
            $scope.safeData = rs.data.result.data
        }, function (e) {
            console.log(e)
        })
        $scope.onSafeInspectClick = function (x) {
            console.log($scope.safeData[x])
            $scope.safeDataapplicationCompanyName = $scope.safeData[x].applicationCompanyName;
            $scope.safeDatadeclarant = $scope.safeData[x].declarant;
            $scope.safeDatadeviceCode = $scope.safeData[x].deviceCode;
            $scope.safeDatadeviceName = $scope.safeData[x].deviceName;
            $scope.safeDataiprCode = $scope.safeData[x].iprCode;
            $scope.safeDataprojectName = $scope.safeData[x].projectName;
            $scope.safeDatacreateTime = $scope.safeData[x].createTime;
        }
        $scope.Particulars = function (x) {
            safeIn.onculars($scope.safeData[x].id).then(function (rs) {
                console.log(rs)
                $scope.culars = rs.data.result.data
                $scope.sss = $scope.culars.accept.createTime
            }, function (e) {
                console.log(e)
            })
        }
        // 打印方法
        $scope.btnPrintClick = function () {
            bdhtml = window.document.body.innerHTML;
            sprnstr = "<!--startprint-->";
            eprnstr = "<!--endprint-->";
            prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 17);
            prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));
            window.document.body.innerHTML = prnhtml;
            window.print();
            window.location.reload();
        }
    })
    .controller('inspectReFJ', function ($scope, inspectFJ) {
        // 主页
        inspectFJ.getInspectFj().then(function (rs) {
            $scope.inspectReFJ = rs.data.result.data
        }, function (e) {
            console.log(e)
        })
        // 编辑按钮事件
        $scope.onUpdateModalClick = function (x) {
            inspectFJ.getDeviceDetails($scope.inspectReFJ[x].id).then(function (rs) {
                $scope.deviceCheckData = rs.data.result.data.conclusion
                console.log($scope.deviceCheckData)
            }, function (e) {
                console.log(e)
            })
        }
        // 添加复检报告
        $scope.addModal = function () {

        }
        // 设备报检申请
        inspectFJ.onAudit().then(function (rs) {
            $scope.Audits = rs.data.result.data
        }, function (e) {
            console.log(e)
        })
        // 详情按钮事件
        $scope.onEtails = function (x) {
            console.log($scope.Audits[x]);
            $scope.deviceApplicationDatadeviceName = $scope.inspectReFJ[x].deviceName;
            $scope.deviceApplicationDatadeviceCode = $scope.inspectReFJ[x].deviceCode;
            $scope.deviceApplicationDataprojectName = $scope.inspectReFJ[x].projectName;
            $scope.deviceApplicationDatadeclarant = $scope.inspectReFJ[x].declarant;
            $scope.deviceApplicationDataCompanyName = $scope.inspectReFJ[x].applicationCompanyName;
            $scope.deviceApplicationDatacreateTime = $scope.inspectReFJ[x].createTime;
            // 检验单位审核
            inspectFJ.onReport($scope.inspectReFJ[x].id).then(function (rs) {
                $scope.reports = rs.data.result.data
                console.log($scope.reports)
            }, function (e) {
                console.log(e)
            })
        };
        // 日历开始
        $scope.today = function () {
            $scope.dt = new Date();
        };
        $scope.today();
        $scope.clear = function () {
            $scope.dt = null;
        };
        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };
        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function () {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $scope.dt = new Date(year, month, day);
        };
        $scope.setDate = function (year, month, day) {
            $scope.dtt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }
            return '';
        }

        // 日历结束
    })
    .controller('inspectUnitSH', function ($scope, inspectUnitSH, inspectApply, duetoProgram) {
        // 设备类型选择框接口
        duetoProgram.getDeviceType().then(function (rs) {
            $scope.deviceType = rs.data.result.data
        }, function (e) {
            console.log(e)
        })
        inspectUnitSH.proAll().then(function (rs) {
            $scope.inspectUnitSH = rs.data.result.data
        }, function (e) {
            console.log(e)
        })
        // 所属工程选择框接口
        inspectUnitSH.proAll2().then(function (rs) {
            $scope.inspectUnitSH2 = rs.data.result.data
        }, function (e) {
            console.log(e)
        })
        // 设备公司名选择框接口
        inspectUnitSH.proAll3().then(function (rs) {
            $scope.inspectUnitSH3 = rs.data.result.data
        }, function (e) {
            console.log(e)
        })
        $scope.AcceptedInformation = function (x) {
            console.log($scope.inspectUnitSH[x].id)
            $scope.inspectUnitSHid = $scope.inspectUnitSH[x].id;
            $scope.inspectUnitSHapplicationCompanyName = $scope.inspectUnitSH[x].applicationCompanyName;
            $scope.inspectUnitSHdeviceCode = $scope.inspectUnitSH[x].deviceCode;
            $scope.inspectUnitSHprojectName = $scope.inspectUnitSH[x].projectName;
            $scope.processData = {
                applicationId: $scope.inspectUnitSHid,
                result: 1,
                adminId: 1
            }
            $scope.acceptApp = function () {
                console.log($scope.processData)
                inspectUnitSH.acceptApply($scope.processData).then(function (rs) {
                    console.log(rs)
                    inspectUnitSH.proAll().then(function (rs) {
                        $scope.inspectUnitSH = rs.data.result.data
                    }, function (e) {
                        console.log(e)
                    })
                }, function (e) {
                    console.log(e)
                })
            }
        }
        $scope.editClick = function (x) {
            console.log($scope.inspectUnitSH[x])
            inspectUnitSH.editInfor($scope.inspectUnitSH[x].id).then(function (rs) {
                $scope.inspectEditInfor = rs.data.result.data
                console.log($scope.inspectEditInfor)
            }, function (e) {
                console.log(e)
            })
            $scope.onConfirmButtonClick = function () {
                $scope.editData = {
                    id: $scope.inspectUnitSH[x].id,
                    iprCode: $scope.inspectEditInfor.iprCode,
                    deviceCode: $scope.inspectEditInfor.deviceCode,
                    deviceName: $scope.inspectEditInfor.deviceName,
                    specification: $scope.inspectEditInfor.specification,
                    projectId: $scope.inspectEditInfor.project.id,
                    declarant: $scope.inspectEditInfor.declarant,
                    applicationCompanyId: $scope.inspectEditInfor.applicationCompany.id,
                    deviceTypeId: $scope.inspectEditInfor.deviceType.id,
                    adminId: 1
                }
                console.log($scope.editData)
                inspectUnitSH.editConfirm($scope.editData).then(function (rs) {
                    inspectUnitSH.proAll().then(function (rs) {
                        $scope.inspectUnitSH = rs.data.result.data
                    }, function (e) {
                        console.log(e)
                    })
                }, function (e) {
                    console.log(e)
                })
            }
        }
        // 详情按钮事件
        $scope.details = function (x) {
            $scope.detailsContent = $scope.inspectUnitSH[x]
            console.log($scope.detailsContent)
        }
    })
    .controller('inspectUnitZB', function ($scope, inspectUnitZB) {
        inspectUnitZB.getInspectZB().then(function (rs) {
            $scope.inspectUnitZB = rs.data.result.data
            console.log($scope.inspectUnitZB)
        }, function (e) {
            console.log(e)
        })
        // 检验人员信息
        inspectUnitZB.getInspectZB2().then(function (rs) {
            $scope.inspector = rs.data.result.data
            console.log($scope.inspector)
        }, function (e) {
            console.log(e)
        })
        // 指派按钮事件
        $scope.onAssign = function (x) {
            console.log($scope.inspectUnitZB[x])
            $scope.deviceApplicationDataid = $scope.inspectUnitZB[x].id;
            $scope.deviceApplicationDatadeclarant = $scope.inspectUnitZB[x].declarant;
            $scope.deviceApplicationDataprojectName = $scope.inspectUnitZB[x].projectName;
            $scope.deviceApplicationDatadeviceCode = $scope.inspectUnitZB[x].deviceCode;
            $scope.deviceApplicationDataCompanyName = $scope.inspectUnitZB[x].applicationCompanyName;
            // 受理事件
            $scope.assignOnclick = function () {
                $scope.assignData = {
                    acceptId: $scope.inspectUnitZB[x].id,
                    inspectorId: $scope.inspectUnitZBinspector.id,
                    adminId: 1
                }
                console.log($scope.assignData)
                inspectUnitZB.assignApply($scope.assignData).then(function (rs) {
                    console.log(rs)
                    inspectUnitZB.getInspectZB().then(function (rs) {
                        $scope.inspectUnitZB = rs.data.result.data
                    }, function (e) {
                        console.log(e)
                    })
                }, function (e) {
                    console.log(e)
                })
            }
        }
        $scope.onetails = function (x) {
            inspectUnitZB.getReportXQ($scope.inspectUnitZB[x].id).then(function (rs) {
                $scope.ReportXQ = rs.data.result.data
                console.log($scope.ReportXQ)
            }, function (e) {
                console.log(e)
            })
        }
    })
    .controller('inspectXC', function ($scope, inspectXC) {
        inspectXC.getInspectXC().then(function (rs) {
            $scope.inspectXC = rs.data.result.data,
                console.log($scope.inspectXC)
        }, function (e) {
            console.log(e)
        })
        // 详情
        $scope.inspectXQ = function (x) {
            inspectXC.getInsepectXC2($scope.inspectXC[x].id).then(function (rs) {
                $scope.inspectXCXQ = rs.data.result.data
                console.log($scope.inspectXCXQ)
            }, function (e) {
                console.log(e)
            })
        }
        // 编辑
        $scope.editXC = function (x) {
            $scope.inspectXC2 = $scope.inspectXC[x]
            inspectXC.inspectJC($scope.inspectXC[x].id).then(function (rs) {
                $scope.editXCXQ = rs.data.result.data
                console.log($scope.editXCXQ)
            }, function (e) {
                console.log(e)
            })
        }
        $scope.executeTask = function () {

        }
    })
    .controller('inspectReport', function ($scope, inspectReport) {
        inspectReport.getInspectReport().then(function (rs) {
            $scope.inspectReport = rs.data.result.data
            console.log($scope.inspectReport);
        }, function (e) {
            console.log(e)
        })
        $scope.showDataClick = function (x) {
            inspectReport.getInspectReport2($scope.inspectReport[x].id).then(function (rs) {
                $scope.inspectReport2 = rs.data.result.data
                console.log($scope.inspectReport2);
            }, function (e) {
                console.log(e)
            })
        }
        $scope.edit = function (x) {
            $scope.acceptId = $scope.inspectReport[x].id
        }
    })
    .controller('instpectApply', function ($scope, duetoProgram, inspectApply) {
        $scope.$on("$destroy",function () {
            alert("你要走吗？")
        })
        // 所属工程
        duetoProgram.getDuetoProgram().then(function (rs) {
            $scope.dueToprogram = rs.data.result.data
        }, function (e) {
            console.log(e)
        })
        // 设备公司名
        duetoProgram.getDeviceBusiness().then(function (rs) {
            $scope.deviceBusinessN = rs.data.result.data
        }, function (e) {
            console.log(e)
        })
        // 设备类型
        duetoProgram.getDeviceType().then(function (rs) {
            $scope.deviceType = rs.data.result.data
            console.log($scope.deviceType)
        }, function (e) {
            console.log(e)
        })
        $scope.changeSelect = function () {
            $scope.showFile = $scope.deviceTp.applicationMaterials
            console.log()
        }
        $scope.applySubmit = function () {
            $scope.deviceApplicationData = {
                iprCode: $scope.iprCode,
                deviceCode: $scope.deviceCode,
                deviceName: $scope.deviceName,
                specification: $scope.specification,
                projectId: $scope.duetoProgram,
                declarant: $scope.declarant,
                applicationCompanyId: $scope.businessName,
                deviceTypeId: $scope.deviceTp.id,
                adminId: sessionStorage.getItem("userId")
            };
            inspectApply.postApply($scope.deviceApplicationData).then(function (rs) {
                $scope.iprCode = ''
                $scope.deviceCode = ''
                $scope.deviceName = ''
                $scope.specification = ''
                $scope.declarant = ''
                $scope.duetoProgram = ''
                $scope.businessName = ''
                $scope.deviceTp = ''
                swal({
                    title: "添加成功!",
                    type: "success",
                    confirmButtonColor: "#8CD4F5",
                    confirmButtonText: "确定",
                    closeOnConfirm: true
                });
            }, function (e) {
                console.log(e)
                swal({
                    title: "添加失败!",
                    type: "error",
                    confirmButtonColor: "#8CD4F5",
                    confirmButtonText: "重新提交",
                    closeOnConfirm: true
                });
            })
        }
        $scope.onetails = function () {

        }
    })
    .controller('administratorMa', function ($scope, $state, administratMa) {
        // 角色选择框接口
        administratMa.getAdministratorMa().then(function (rs) {
            $scope.roleInfor = rs.data.result.data
        }, function (e) {
            console.log(e)
        })
        // 管理员选择框接口
        administratMa.getAdministratorMa2().then(function (rs) {
            $scope.administInfor = rs.data.result.data
        }, function (e) {
            console.log(e)
        })
        // 编辑管理员信息
        $scope.gainAdministrator = {
            id: '',
            password: '',
            phone: '',
            roleId: '',
            adminId: 1,
        };
        // 编辑管理员按钮事件
        $scope.editButtonClick = function (x) {
            $scope.index = x
            $scope.administEditName = $scope.administInfor[x].username;
            $scope.administEditPhone = $scope.administInfor[x].phone;
            $scope.administEditRole = $scope.administInfor[x].role.name;
        }
        // 编辑管理员确定事件
        $scope.updateButtonClick = function () {
            $scope.gainAdministrator = {
                id: $scope.administInfor[$scope.index].id,
                password: '',
                phone: $scope.administEditPhone,
                roleId: $scope.administInfor[$scope.index].role.id,
                adminId: 1,
            };
            if ($scope.gainAdministrator.password == undefined) {
                console.log("undefined")
            } else {
                $scope.gainAdministrator.password = $scope.pass
            }
            // POST接口
            administratMa.updateAdministrator($scope.gainAdministrator).then(function (rs) {
                console.log(rs)
                // GET接口
                administratMa.getAdministratorMa2().then(function (rs) {
                    $scope.administInfor = rs.data.result.data
                }, function (e) {
                    console.log(e)
                })
            }, function (e) {
                console.log(e)
            })
        }
        $scope.confirmAddAdministrator = function () {
            $scope.adminData = {
                username: $scope.username,
                password: $scope.password,
                phone: $scope.phone,
                roleId: $scope.roleId.id,
                adminId: 1,
            };
            administratMa.addAdministrator($scope.adminData).then(function (rs) {
                console.log(rs)
                $scope.username = ''
                $scope.password = ''
                $scope.phone = ''
                $scope.roleId = ''
                administratMa.getAdministratorMa2().then(function (rs) {
                    $scope.administInfor = rs.data.result.data
                }, function (e) {
                    console.log(e)
                })
            }, function (e) {
                console.log(e)
            })
            console.log($scope.adminData)
        }
        $scope.deleteButton = function (x) {
            swal({
                title: "删除",
                text: "确定要删除吗?",
                type: "info",
                showCancelButton: true,
                confirmButtonColor: "#8CD4F5",
                confirmButtonText: "确定",
                cancelButtonText: '取消',
                closeOnConfirm: true
            }, function () {
                console.log($scope.administInfor[x].id)
                administratMa.deleteAdministrator($scope.administInfor[x]).then(function (rs) {
                    administratMa.getAdministratorMa2().then(function (rs) {
                        $scope.administInfor = rs.data.result.data
                    }, function (e) {
                        console.log(e)
                    })
                }, function (e) {
                    console.log(e)
                })
            });
        }
    })
    .controller('roleMa', function ($scope, roleMa1) {
        // 角色信息接口
        roleMa1.getRoleMa().then(function (rs) {
            $scope.roleMa2 = rs.data.result.data
            console.log($scope.roleMa2)
        }, function (e) {
            console.log(e)
        })
        // 权限复选框接口
        roleMa1.getAuthority().then(function (rs) {
            $scope.getAuthority = rs.data.result.data
        }, function (e) {
            console.log(e)
        })
        // 编辑按钮
        $scope.onUpdateButtonClick = function (x) {
            // 权限复选框接口
            $scope.editIndex = x
            roleMa1.getAuthority().then(function (rs) {
                $scope.getAuthority = rs.data.result.data
            }, function (e) {
                console.log(e)
            })
            localStorage.setItem("checkKey", JSON.stringify($scope.roleMa2[x].permissions))
            $scope.RoleName = $scope.roleMa2[x].name
            $scope.roleData = $scope.roleMa2[x].id
        }
        // 编辑修改角色确定按钮事件
        $scope.editConfirmButtonClick = function () {
            var arr = []
            for (var item in $scope.roleMa2.permissions) {
                arr.push(Number(item))
            }
            // ---------------------------------------------
            var selectId = []
            roleMa1.getRoleMa().then(function (rs) {
                $scope.allPermission = rs.data.result.data;
                for (var i = 0; i < $scope.allPermission[$scope.editIndex].permissions.length; i++) {
                    selectId.push($scope.allPermission[$scope.editIndex].permissions[i].id)
                }
                for (var i = 0; i < arr.length; i++) {
                    selectId.push($scope.getAuthority[arr[i]].id)
                }
                console.log(selectId)
                $scope.roleList = {
                    name: $scope.RoleName,
                    permissionsId: selectId.join(),
                    id: $scope.roleData,
                    adminId: 1,
                };
                roleMa1.updateRole($scope.roleList).then(function (rs) {
                    $scope.RoleName = ''
                    roleMa1.getRoleMa().then(function (rs) {
                        $scope.roleMa2 = rs.data.result.data
                    }, function (e) {
                        console.log(e)
                    })
                }, function (e) {
                    console.log(e)
                })
            }, function (e) {
                console.log(e)
            })
        }
        // ------------------------------
        // 删除角色事件
        $scope.deleteClick = function (x) {
            swal({
                title: "删除",
                text: "确定要删除吗?",
                type: "info",
                showCancelButton: true,
                confirmButtonColor: "#8CD4F5",
                confirmButtonText: "确定",
                cancelButtonText: '取消',
                closeOnConfirm: true
            }, function () {
                roleMa1.deleteRole($scope.roleMa2[x]).then(function (rs) {
                    roleMa1.getRoleMa().then(function (rs) {
                        $scope.roleMa2 = rs.data.result.data
                    }, function (e) {
                        console.log(e)
                    })
                }, function (e) {
                    console.log(e)
                })
            });
        }
        // 添加确定角色
        $scope.addRoleConfirmButtonClick = function () {
            var arr = []
            for (var item in $scope.roleMa2.permissions) {
                arr.push(Number(item))
            }
            // 权限复选框接口
            roleMa1.getAuthority().then(function (rs) {
                $scope.getAuthority = rs.data.result.data
                var selectId = [];
                for (var i = 0; i < arr.length; i++) {
                    selectId.push($scope.getAuthority[arr[i]].id)
                }
                $scope.roleData = {
                    name: $scope.roleName,
                    permissionsId: selectId.join(),
                    adminId: 1,
                };
                roleMa1.addRole($scope.roleData).then(function (rs) {
                    $scope.roleName = ''
                    roleMa1.getRoleMa().then(function (rs) {
                        $scope.roleMa2 = rs.data.result.data
                    }, function (e) {
                        console.log(e)
                    })
                }, function (e) {
                    console.log(e)
                })
            }, function (e) {
                console.log(e)
            })
        }
    })


