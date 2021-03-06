/*Public PageEvt{*/
var mobileEvt = {
    webpage_mobile:function(scope) {
        var ref = window.open(scope.url, "_blank", "location=yes,closebuttoncaption=关闭,transitionstyle=crossdissolve,presentationstyle=pagesheet");
        ref.addEventListener("loaderror",
	function(event) {
            scope.showAlert("提 示", "error: " + event.message);
        });
    }
};
//数据库事件
var operatingDatabaseEvent = {
    //创建表
    crateTable:function() {
        if (localStorage.getItem(publicParameterObj.parameters.userName) == undefined) {
            var jsondata = [];
            localStorage.setItem(publicParameterObj.parameters.userName, JSON.stringify(jsondata));
        } else {}
    },
//添加数据
    insertData:function(id, number, scope) {
        var jsondata = JSON.parse(localStorage.getItem(publicParameterObj.parameters.userName));
        var datacount = jsondata.length;
	for (var i = 0, len = jsondata.length; i < len; i++) {
            if (jsondata[i].myid == id) {
                scope.showAlert("提 示", "这件商品已存在购物车中!");
                return;
            }
        }
        jsondata.push({
            myid:id,
            mynumber:number
        });
        localStorage.setItem(publicParameterObj.parameters.userName, JSON.stringify(jsondata));
        if (jsondata.length > datacount) {
            scope.viewStates.setShoppingCarState(false);
            scope.showAlert("提 示", "添加成功!");
        } else {
            scope.showAlert("提 示", "添加失败!");
        }
    },
    //查询数据
    selectData:function() {
        var jsondata = JSON.parse(localStorage.getItem(publicParameterObj.parameters.userName));
        return jsondata;
    },
    //更新数据
    updateData:function(id, number) {
        var jsondata = JSON.parse(localStorage.getItem(publicParameterObj.parameters.userName));
        for (var i = 0, len = jsondata.length; i < len; i++) {
            if (jsondata[i].myid === id) {
                if (jsondata[i].mynumber != number) {
                    jsondata[i].mynumber = number;
                    localStorage.setItem(publicParameterObj.parameters.userName, JSON.stringify(jsondata));
                    return;
                }
                return;
            }
        }
    },
    //删除数据
    deleteItemData:function(id) {
        var jsondata = JSON.parse(localStorage.getItem(publicParameterObj.parameters.userName));
        for (var i = 0, len = jsondata.length; i < len; i++) {
            if (jsondata[i].myid === id) {
                jsondata.splice(i, 1);
                localStorage.setItem(publicParameterObj.parameters.userName, JSON.stringify(jsondata));
                return;
            }
        }
    },
    //删除数据
    deleteallData:function() {
        localStorage.removeItem(publicParameterObj.parameters.userName);
        publicEventsObj.operatingDatabaseEvent.crateTable();
    }
};

var publicEventsClass = {
    mobileEvent:Object.create(mobileEvt),
    operatingDatabaseEvent:Object.create(operatingDatabaseEvent)
};

var publicEventsObj = Object.create(publicEventsClass);
/*}*/

/*Index PageEvt{*/
var indexModule = angular.module("ionicApp", [ "ionic" ]);

var iconfig = function($stateProvider, $urlRouterProvider) {
    publicEventsObj.operatingDatabaseEvent.crateTable();
    $stateProvider.state("index", {
        url:"/index",
        templateUrl:"index.html",
        controller:"index"

    }).state("product", {
        url:"/product",
        templateUrl:"product.html",
        controller:"product"
    }).state("about", {
        url:"/about",
        templateUrl:"about.html",
        controller:"about"
    }).state("contact", {
        url:"/contact",
        templateUrl:"contact.html",
        controller:"contact"
    }).state("detailed", {
        url:"/detailed",
        templateUrl:"detailed.html",
        controller:"detailed"
    }).state("message", {
        url:"/message",
        templateUrl:"message.html",
        controller:"message"
    }).state("category", {
        url:"/category",
        templateUrl:"category.html",
        controller:"category"
    }).state("searchRes", {
        url:"/searchRes",
        templateUrl:"proSearchResList.html",
        controller:"searchRes"
    }).state("shoppingCar", {
        url:"/shoppingCar",
        templateUrl:"shoppingCar.html",
        controller:"shoppingCar"
    }).state("personal", {
        url:"/personal",
        templateUrl:"personal.html",
        controller:"personal"
    }).state("modifyPass", {
        url:"/modifyPass",
        templateUrl:"userModifyPass.html",
        controller:"modifyPass"
    }).state("modifyInfo", {
        url:"/modifyInfo",
        templateUrl:"userModifyInfo.html",
        controller:"modifyInfo"
    })
//        .state("waitingAudit", {
//        url:"/waitingAudit",
//        templateUrl:"userWaitingAudit.html",
//        controller:"waitingAudit"
//    })
        .state("myOrder", {
        url:"/myOrder",
        templateUrl:"myOrder.html",
        controller:"myOrder"
    }).state("superPro", {
        url:"/superPro",
        templateUrl:"superPro.html",
        controller:"superPro"
    });
    $urlRouterProvider.otherwise("/index");
};

var imainCtrl = function($scope, $http, $location, $timeout, $ionicPopup, $ionicPopover, $ionicModal, $ionicBackdrop) {
    $scope.cancelHide = false;
    $scope.acancelHide = false;
    $scope.abackHide = true;
    $scope.tabHide = true;
    $scope.tabBarHide = false;
    $scope.search = {};
    $scope.navStyle = {
        "border-bottom":"none",
        "box-shadow":"0 2px 3px rgba(0,0,0,.15)"
    };
    $scope.text = "<i class='ion-android-arrow-down icons'><span class='iconText'>正在加载</span></i>";
    $scope.sendMessageIsLogin = true;
    $scope.iMessageDatas = "";//留言
    $scope.indexIsShow = false;
    $scope.proIsShow = false;
    $scope.categoryIsShow = false;
    $scope.shoppingCarIsShow = false;
    if (localStorage.getItem("perSpCar") == undefined) {
        localStorage.setItem("perSpCar", 0);
    }
    $scope.perSpCar = localStorage.getItem("perSpCar") >> 0;

    $scope.viewStates = {};
    $scope.iState = false;

    var _indexState = false;
    var _productState = false;
    var _proListState = false;
    var _aboutState = false;
    var _contactState = false;
    var _messageState = false;
    var _categoryState = false;
    var _searchResListState = false;
    var _shoppingCarState = false;
    var _personalState = false;
    var _modifyInfoState = false;
    var _myOderState = false;
    var _superProState = false;
    var _waitingState = false;
    var _admMenuState = false;
    var _admSelOrderState = false;
    var _admProManageState = false;
    var _admClientState = false;
    var _historyOrderState = false;

    $scope.viewStates.getIndexState = function() {
        return _indexState;
    };
    $scope.viewStates.setIndexState = function(state) {
        _indexState = state;
    };
    $scope.viewStates.getProductState = function() {
        return _productState;
    };
    $scope.viewStates.setProductState = function(state) {
        _productState = state;
    };
    $scope.viewStates.getProListState = function() {
        return _proListState;
    };
    $scope.viewStates.setProListState = function(state) {
        _proListState = state;
    };
    $scope.viewStates.getAboutState = function() {
        return _aboutState;
    };
    $scope.viewStates.setAboutState = function(state) {
        _aboutState = state;
    };
    $scope.viewStates.getContactState = function() {
        return _contactState;
    };
    $scope.viewStates.setContactState = function(state) {
        _contactState = state;
    };
    $scope.viewStates.getMessageState = function() {
        return _messageState;
    };
    $scope.viewStates.setMessageState = function(state) {
        _messageState = state;
    };
    $scope.viewStates.getShoppingCarState = function() {
        return _shoppingCarState;
    };
    $scope.viewStates.setShoppingCarState = function(state) {
        _shoppingCarState = state;
    };
    $scope.viewStates.getCategoryState = function() {
        return _categoryState;
    };
    $scope.viewStates.setCategoryState = function(state) {
        _categoryState = state;
    };
    $scope.viewStates.getSearchResListState = function() {
        return _searchResListState;
    };
    $scope.viewStates.setSearchResListState = function(state) {
        _searchResListState = state;
    };
    $scope.viewStates.getPersonalState = function() {
        return _personalState;
    };
    $scope.viewStates.setPersonalState = function(state) {
        _personalState = state;
    };
    $scope.viewStates.getModifyState = function() {
        return _modifyInfoState;
    };
    $scope.viewStates.setModifyState = function(state) {
        _modifyInfoState = state;
    };
    $scope.viewStates.getMyOrderState = function() {
        return _myOderState;
    };
    $scope.viewStates.setMyOrderState = function(state) {
        _myOderState = state;
    };
    $scope.viewStates.getSuperProState = function() {
        return _superProState;
    };
    $scope.viewStates.setSuperProState = function(state) {
        _superProState = state;
    };
    $scope.viewStates.getWaitingState = function() {
        return _waitingState;
    };
    $scope.viewStates.setWaitingState = function(state) {
        _waitingState = state;
    };
    $scope.viewStates.getAdmMenuState = function() {
        return _admMenuState;
    };
    $scope.viewStates.setAdmMenuState = function(state) {
        _admMenuState = state;
    };
    $scope.viewStates.getAdmSelOrderState = function() {
        return _admSelOrderState;
    };
    $scope.viewStates.setAdmSelOrderState = function(state) {
        _admSelOrderState = state;
    };
    $scope.viewStates.getAdmProManageState = function() {
        return _admProManageState;
    };
    $scope.viewStates.setAdmProManageState = function(state) {
        _admProManageState = state;
    };
    $scope.viewStates.getAdmClientState = function() {
        return _admClientState;
    };
    $scope.viewStates.setAdmClientState = function(state) {
        _admClientState = state;
    };
    $scope.viewStates.getHistoryOrderState = function() {
        return _historyOrderState;
    };
    $scope.viewStates.setHistoryOrderState = function(state) {
        _historyOrderState = state;
    };
    $scope.showAlert = function(title, text) {
       $scope.iShowAlert = $ionicPopup.alert({
            title:title,
            content:text,
            buttons:[{
                text:"确 定",
                type:"alertCancel"
            }]
        });
        $scope.iShowAlert.then(function(res) {});
    };
    $scope.backdropClick = function() {
        $scope.closeBackdrop();
    };
    $scope.tabBarToPage = function(index) {
        $scope.isSpNewPage = false;
        switch (index) {
            case 0:
                if ($scope.indexIsShow === false) {
                    if ($scope.perSpCar != 0) {
                        var backPage_s1 = $scope.perSpCar + $scope.getIsIndex() + $scope.getIsDetailed() + $scope.getCategory() + $scope.getProduct();
                        $scope.back(-backPage_s1);
                    } else {
                        if ($scope.getIsIndex() > 0 || $scope.getIsDetailed() > 0) {
                            var backPage_s2 = $scope.perSpCar + $scope.getIsIndex() + $scope.getIsDetailed() + $scope.getCategory() + $scope.getProduct();
                            $scope.back(-backPage_s2);
                        } else {
                            $location.path("/index").replace();
                        }
                    }
                }
                break;

            case 1:
                if ($scope.proIsShow === false) {
                    $scope.setIState(true);
                    if ($scope.isIndex === true) {
                        $location.path("/product");
                        $scope.setIsIndex(1);
                    } else {
                        if ($scope.perSpCar > 0 && $scope.getProduct() === 0) {
                            $location.path("/product");
                            $scope.setProduct(1);
                        } else {
                            if ($scope.getProduct() === 1) {
                                window.history.go(-1);
                                $scope.setCategory(0);
                                $scope.setProduct(1);
                            } else {
                                $location.path("/product").replace();
                            }
                        }
                    }
                }
                break;

            case 2:
                if ($scope.categoryIsShow === false) {
                    $scope.setIState(true);
                    if ($scope.isIndex === true) {
                        $location.path("/category");
                        $scope.setIsIndex(1);
                    } else {
                        if ($scope.perSpCar > 0 && $scope.getCategory() === 0) {
                            $location.path("/category");
                            $scope.setCategory(1);
                        } else {
                            if ($scope.getCategory() === 1) {
                                window.history.go(-1);
                                $scope.setCategory(1);
                                $scope.setProduct(0);
                            } else {
                                $location.path("/category").replace();
                            }
                        }
                    }
                }
                break;

            case 3:
                if ($scope.shoppingCarIsShow === false) {
                    if ($scope.isIndex === true) {
                        $location.path("/shoppingCar");
                        $scope.setIsIndex(1);
                    } else {
                        if ($scope.getCategory() !== 0 || $scope.getProduct() !== 0) {
                            window.history.go(-($scope.getCategory() + $scope.getProduct()));
                            if ($scope.getCategory() === 1) {
                                $scope.setCategory(0);
                            }
                            if ($scope.getProduct() === 1) {
                                $scope.setProduct(0);
                            }
                        } else {
                            $location.path("/shoppingCar").replace();
                        }
                    }
                }
                break;
        }
    };
    $scope.setPerSpCar = function(num) {
        $scope.perSpCar = num;
        localStorage.setItem("perSpCar", num);
    };
    $scope.getPerSpCar = function() {
        var hisPerPage = localStorage.getItem("perSpCar");
        hisPerPage = !!hisPerPage ? parseInt(hisPerPage) :!!hisPerPage;
        $scope.perSpCar = hisPerPage;
        return $scope.perSpCar;
    };
    $scope.setIsIndex = function(num) {
        localStorage.setItem("isIndex", num);
    };
    $scope.getIsIndex = function() {
        var hisIndexPage = localStorage.getItem("isIndex");
        return !!hisIndexPage ? parseInt(hisIndexPage) :!!hisIndexPage;
    };
    $scope.setIsDetailed = function(num) {
        if (num == 0) {
            localStorage.setItem("isDetailed", num);
        } else {
            if ($scope.getIsDetailed() !== undefined && $scope.getIsDetailed() > 0 && $scope.getIsDetailed() !== null) {
                var hisDetaiPage = parseInt($scope.getIsDetailed()) + parseInt(num);
                localStorage.setItem("isDetailed", hisDetaiPage);
            } else {
                localStorage.setItem("isDetailed", num);
            }
        }
    };
    $scope.getIsDetailed = function() {
        var hisDetaiPage = localStorage.getItem("isDetailed");
        return !!hisDetaiPage ? parseInt(hisDetaiPage) :!!hisDetaiPage;
    };
    $scope.setCategory = function(num) {
        localStorage.setItem("isCategory", num);
    };
    $scope.getCategory = function() {
        var hisCatePage = localStorage.getItem("isCategory");
        return !!hisCatePage ? parseInt(hisCatePage) :!!hisCatePage;
    };
    $scope.setProduct = function(num) {
        localStorage.setItem("isProduct", num);
    };
    $scope.getProduct = function() {
        var hisProPage = localStorage.getItem("isProduct");
        return !!hisProPage ? parseInt(hisProPage) :!!hisProPage;
    };
    $scope.OpenMenus = function() {
        $ionicBackdrop.retain();
        $scope.openMenu = true;
    };
    $scope.toPerson = function() {
        $scope.closeBackdrop();
    };
    $scope.closeBackdrop = function() {
        $ionicBackdrop.release();
        $scope.openMenu = false;
        $scope.closeMenu = true;
    };
    //留言
    $scope.getMessage = function() {
        return $scope.iMessageDatas;
    };
    $scope.setMessage = function(message) {
        $scope.iMessageDatas = message;
    };
    $scope.getIState = function() {
        return $scope.iState;
    };
    $scope.setIState = function(state) {
        $scope.iState = state;
    };
    $scope.back = function(num) {
        if (num !== undefined && num !== null && num != 0) {
            window.history.go(num);
            if ($scope.perSpCar > 2) {
                var perPage_s1 = $scope.perSpCar + num;
                $scope.setPerSpCar(perPage_s1);
            }
        } else {
            if ($scope.perSpCar > 0 && num != 0) {
                var perPage_s2 = $scope.perSpCar - 1;
                $scope.setPerSpCar(perPage_s2);
            }
            window.history.back();
        }
    };
    $scope.admLoginLode = function() {
        $timeout(function() {
            $scope.adminLoginShowHide(true);
        }, 500);
    };
    $scope.userLoginLoad = function() {
        $timeout(function() {
            $scope.userLoginShowHide(true);
        }, 500);
    };
    //页面正准备改变
    $scope.pageHide = function() {
        if ($scope.userLogin) {
            $scope.userLoginShowHide(false);
        }
        if ($scope.iregister) {
            $scope.userRegisterShowHide(false);
        }
    };
    $scope.$on("$stateChangeStart", function() {
        publicParameterObj.parameters.loadingPage = 0; //产品页数初始化
        $scope.isIndex = $location.url().split("?")[0] === "/index";
        $scope.indexIsShow = false;
        $scope.proIsShow = false;
        $scope.categoryIsShow = false;
        $scope.shoppingCarIsShow = false;
        $scope.navBarIsHide = false;
        var iLocation = $location.url().split("?")[0];
        if($scope.iShowAlert){
            $scope.iShowAlert.close();
        }
        $scope.isSpNewPage = true;
        if (iLocation === "/index" || iLocation === "/category" || iLocation === "/shoppingCar" || iLocation === "/product" || iLocation === "/proList") {
            if (iLocation === "/index") {
                $scope.setPerSpCar(0);
                $scope.setIsIndex(0);
                $scope.setIsDetailed(0);
                $scope.setProduct(0);
                $scope.setCategory(0);
            }
            if (iLocation === "/category") {
                $scope.navBarIsHide = true;
            }
            if ($scope.tabBarHide) {
                $timeout(function() {
                    $scope.tabBarHide = false;
                }, 300);
            }
        } else {
            if (iLocation === "/personal") {
                $scope.tabBarHide = true;
            } else {
                $scope.tabBarHide = true;
            }
        }
        if ($scope.openMenu === true) {
            $scope.toPerson();
        }
        $scope.pageHide();
        if ($scope.adminLogin) {
            $scope.adminLoginShowHide(false);
        }
    });
    $scope.toAdminMenu = function() {
        $scope.closeBackdrop();
        $location.path("/adminMenu");
    };
    $scope.toPersonal = function() {
        if ($scope.perSpCar !== 0) {
            $scope.back(-($scope.perSpCar + $scope.getProduct() + $scope.getCategory() - 1));
            $scope.setPerSpCar(0);
            $scope.setProduct(0);
            $scope.setCategory(0);
        } else {
            $location.path("/personal");
        }
    };
    $scope.indexBarIconState = function() {
        $scope.indexIsShow = !$scope.indexIsShow;
    };
    $scope.proBarIconState = function() {
        $scope.proIsShow = !$scope.proIsShow;
    };
    $scope.categoryBarIconState = function() {
        $scope.categoryIsShow = !$scope.categoryIsShow;
    };
    $scope.shoppingCarIconState = function() {
        $scope.shoppingCarIsShow = !$scope.shoppingCarIsShow;
    };
    $ionicModal.fromTemplateUrl("userLogin.html", function(userLogin) {
        $scope.userLogin = userLogin;
    }, {
        scope:$scope,
        animation:"slide-in-up"
    });
    $ionicModal.fromTemplateUrl("register.html", function(register) {
        $scope.iregister = register;
    }, {
        scope:$scope,
        animation:"slide-in-up"
    });
    $ionicModal.fromTemplateUrl("adminLogin.html", function(adminLogin) {
        $scope.adminLogin = adminLogin;
    }, {
        scope:$scope,
        animation:"slide-in-up"
    });
    $ionicModal.fromTemplateUrl("editMessage.html", function(editContent) {
        $scope.editContent = editContent;
    }, {
        scope:$scope,
        animation:"slide-in-up"
    });

    $ionicModal.fromTemplateUrl("iPay.html", function(ipay) {
        $scope.ipay = ipay;
    }, {
        scope:$scope,
        animation:"slide-in-up"
    });

    var iFrame;
//  var history_backup;
    var iHistory;
//    var system_history = 0;
    $scope.ipayClose = function(){
        $scope.ipay.hide();
        if(!!iFrame){
            if((iHistory - window.history.length) != 0) {
                window.history.go(-(Math.abs(iHistory - window.history.length)));
            }else if(parent.document.getElementById("frame").contentWindow.location.pathname !== "/cashier/wapcashier_login.htm"){
                window.history.go(-(Math.abs(localStorage.getItem("h") - window.history.length)));
            }
            iFrame.src = 'about:blank';
            iFrame.parentNode.removeChild(iFrame);

        }
    };

//    $scope.ipayBack = function(){
////        if(system_history != window.history.length){
//////            history_backup = system_history;
////            alert(system_history);
////            history_backup = window.history.length;
////        }
////        else{
////            history_backup = window.history.length;
////            system_history = window.history.length;
////            alert(321);
////       }
//        alert(history_backup + "----" + window.history.length);
//        if( history_backup == window.history.length && history_backup > 4){
////            system_history++;
//            history_backup += 2;
//            alert(history_backup);
//        }else if(system_history < window.history.length){
//            system_history = window.history.length;
//            history_backup = window.history.length;
//        }
//        alert(history_backup + "+++++" + window.history.length);
//        if(iHistory != history_backup){
//            window.history.go(-1);
//            history_backup -= 1;
//        }else if(iHistory == history_backup){
//            if(!!iFrame){
//                iFrame.src = 'about:blank';
//                iFrame.parentNode.removeChild(iFrame);
//            }
//            $scope.ipay.hide();
////            window.history.go(0);
//            system_history = 0;
//        }
//    };

    $scope.ipayOpen = function(num){
        $scope.ipay.show();
        iFrame = document.createElement('iframe');
        document.getElementById("myFrame").appendChild(iFrame);
        iFrame.id = "frame";
        iFrame.src = "http:taoguan.zzt.com/cust/mPayOrder.action?orderPay.orderNum="+num+"&orderPay.payType=alipay_wap";
        iHistory = window.history.length;

    };


//    .state("iPay",{
//        url:"/iPay",
//        templateUrl:"iPay.html",
//        controller:"iPay"
//    })

    $scope.userLoginShowHide = function(bool) {
        bool ? $scope.userLogin.show() :$scope.userLogin.hide();
    };
    $scope.userRegisterShowHide = function(bool) {
        bool ? $scope.iregister.show() :$scope.iregister.hide();
    };
    $scope.adminLoginShowHide = function(bool) {
        bool ? $scope.adminLogin.show() :$scope.adminLogin.hide();
    };
    $scope.editMessageShowHide = function(bool) {
        if (bool === true) {
            getOrPostRequestObj.userAndAdminSignIn.isUserLogin($scope, $http);
            $location.search({
                page:"editMessage"
            }).replace();
            $scope.editContent.show();
        } else {
            $location.search("").replace();
            $scope.editContent.hide();
        }
    };
    $scope.getSendMessageState = function() {
        return $scope.sendMessageIsLogin;
    };
    $scope.isLogin_CallBack = function(bool) {
        $scope.sendMessageIsLogin = !!bool;
    };
    //延迟
    $scope.loadingImg = function() {
        function isIE() {
            return window.navigator.userAgent.toLowerCase().indexOf("msie") >= 1;
        }
        var _ie = isIE();
        (function() {
            var row = $$("mainContent");
            if (row !== undefined && row !== null && row.getElementsByTagName("img") !== undefined && row.getElementsByTagName("img") !== null) {
                var total = row.getElementsByTagName("img").length, cells = [];
                for (var i = 0, n = total; i < n; i++) {
                    var img = row.getElementsByTagName("img")[i];
                    if (img) {
                        img.setAttribute("_lazysrc", img.getAttribute("_lazysrc") + "?" + Math.random());
                        cells.push(img);
                    }
                }
                var lazy = new ImagesLazyLoad({
                    container:window,
                    mode:"vertical",
                    holder:"img/nopic.jpg",
                    onLoad:function(img) {
                        img.onload = function() {
                            showPic(this);
                        };
                    }
                });
                function showPic(img) {
                    var t = setInterval(function() {
                        var opacity = _ie ? img.filters.alpha.opacity :img.style.opacity * 100;
                        if (opacity < 100) {
                            _ie ? img.filters.alpha.opacity += 10 :img.style.opacity = (opacity + 10) / 100;
                        } else {
                            clearInterval(t);
                        }
                    }, 15);
                }
            }
        })();
    };
};

iconfig.$inject = [ "$stateProvider", "$urlRouterProvider" ];

indexModule.config(iconfig);

indexModule.service("indexService", function() {
    var service = {};
    var _slider = [];
    var _newProData = [];
    var _newProHide = true;
    var _proBtnHide = true;
    var _moreHide = true;
    var _loadingHide = false;
    var _pageNum = 1;
    var _proData = {};

    service.getSlider = function() {
        return _slider;
    };
    service.setSlider = function(slider) {
        _slider = slider;
    };
    service.getNewProData = function() {
        return _newProData;
    };
    service.setNewProData = function(newProData) {
        _newProData = newProData;
    };

    service.getNewProHide = function() {
        return _newProHide;
    };
    service.setNewProHide = function(newProHide) {
        _newProHide = newProHide;
    };
    service.getProBtnHide = function() {
        return _proBtnHide;
    };
    service.setProBtnHide = function(proBtnHide) {
        _proBtnHide = proBtnHide;
    };
    service.getMoreHide = function() {
        return _moreHide;
    };
    service.setMoreHide = function(moreHide) {
        _moreHide = moreHide;
    };
    service.getLoadingHide = function() {
        return _loadingHide;
    };
    service.setLoadingHide = function(loadingHide) {
        _loadingHide = loadingHide;
    };
    service.getPageNum = function() {
        return _pageNum;
    };
    service.setPageNum = function(pageNum) {
        _pageNum = pageNum;
    };
    service.getProData = function() {
        return _proData;
    };
    service.setProData = function(proData) {
        _proData = proData;
    };
    return service;
});

//首页controller
var indexCtrl = function($scope, $http, indexService, $timeout, $location) {
    $scope.newProIsHide = indexService.getNewProHide(); //隐藏新产品
    $scope.proBtnHide = indexService.getProBtnHide();
    $scope.myInterval = 5000;
    $scope.bodyHide = true;
    $scope.detailedId = "";
    $scope.setPerSpCar(0);
    $scope.bodyHide = true;
    $scope.noMoreHide = indexService.getMoreHide();
    $scope.loadingHide = indexService.getLoadingHide();
    $scope.pageNum = indexService.getPageNum();
    var e = true;
    $scope.indexBarIconState();
    $scope.$on("$stateChangeStart", function() {
        $timeout.cancel($scope.loadHttp);
    });
    //页面刷新
    $scope.indexRefresh = function() {
        $timeout(function() {
            getOrPostRequestObj.indexConnect.getIndexBanner($scope,$http);
            getOrPostRequestObj.indexConnect.getIndexNewProduct($scope,$http);
            $scope.proRefresh();
            $scope.$broadcast("scroll.refreshComplete");
        }, 2000);
    };
    $scope.bannerInit_CallBack = function(data) {
        indexService.setSlider($scope.bannerReturnData(data));
        var sliders = indexService.getSlider();
        var isliders = [];
        if (document.querySelector("#indexSwiperView").querySelector("ul")) {
            var elem = document.getElementById("indexSwiperView");
            elem.removeChild(elem.getElementsByTagName("ul").item(1));
        }
        document.getElementById("indexSwiper").innerHTML = "";
        for (var i = 0, len = sliders.length; i < len; i++) {
            isliders.push({
                'content':"<div class='bannerImg'><img src='" + sliders[i].iSlideImg + "' onerror=this.src=errImg></div>"
            });
        }
        var opts = {
            type:"dom",
            data:isliders,
            dom:document.getElementById("indexSwiper"),
            duration:3000,
            isLooping:true,
            isAutoplay:true,
            onslidechange:function(idx) {
                sliderSwiper_index.changeIndexDot();
            }
        };
        if (sliders.length > 0) {
            var sliderSwiper_index = new iSlider(opts);
            var dotOpt = {
                top:"105px",
                width:"100%",
                diameter:"0.8em",
                borderColor:"#365b88"
            };
            sliderSwiper_index.renderDot(dotOpt);
        }
    };
    $scope.toBannerDetailed = function(index) {
        if ($scope.islides[index].isToUrl === 0) {
            try {
                window.device.version.substr(0, 1);
                publicEventsObj.mobileEvent.webpage_mobile($scope.islides[index].content);
            } catch (error) {
                window.open($scope.islides[index].content);
            }
        } else {
            $scope.showDetailed($scope.islides[index].content);
        }
    };
    $scope.bannerReturnData = function(data) {
        var idata = [];
        var idatas = data.respData;
        var tempporarySpace = {};

        for (var i = 0, len = idatas.length; i < len; i++) {
            tempporarySpace = {
                iSlideImg:privateVerifictionObj.verifiction.imgLink(idatas[i].imgUrl),
                isToUrl:idatas[i].linkType,
                content:idatas[i].linkContent
            };
            idata.push(tempporarySpace);
        }
        return idata;
    };
    $scope.newProInit_CallBack = function(data) {
        indexService.setNewProData($scope.newProReturnData(data));
        $scope.newProDatas = indexService.getNewProData();
        $scope.newProDatas.length === 0 ? indexService.setNewProHide(true) :indexService.setNewProHide(false);
        $scope.newProIsHide = indexService.getNewProHide();
        $scope.proBtnHide = false;
        indexService.setProBtnHide(false);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.newProReturnData = function(data) {
        var datas = data.respData.dataList;
        var tempporarySpace;
        var newImgs = [];
        var newItemImgs = [];
        var newIndexImgs = [];
        var len = datas.length;
        for (var i = 0; i < len; i++) {
            newItemImgs.push({
                newProNum:datas[i].prodNum,
                newProImg:privateVerifictionObj.verifiction.imgLink(datas[i].firstProdImg)
            });
            if (i === 1 || len < 2) {
                newIndexImgs = newItemImgs;
                newItemImgs = [];
            } else {
                if ((i - 1) % 3 === 0 || i !== 0 && i === len - 1 && (len - 2) % 3 !== 0) {
                    newImgs.push(newItemImgs);
                    newItemImgs = [];
                }
            }
        }
        tempporarySpace = {
            newIndexImgs:newIndexImgs,
            newProImgs:newImgs
        };
        return tempporarySpace;
    };
    $scope.toAbout = function(){
        $location.path("/about");
    };
    $scope.toContact = function(){
        $location.path("/contact");
    };
    $scope.toMessage = function(){
        $location.path("/message");
    };

    $scope.morePro = function() {
        $location.path("/product");
    };
    $scope.aboutBack = function() {
        if ($location.url() === "/contact") {
            window.history.back(-1);
        }
    };
    //显示产品详情
    $scope.showDetailed = function(index) {
        if (index) {
            $location.path("/detailed").search({
                proNum:index,
                dNum:2
            });
        }
    };
    if ($scope.viewStates.getIndexState() === false) {
        getOrPostRequestObj.indexConnect.getIndexBanner($scope,$http);
        getOrPostRequestObj.indexConnect.getIndexNewProduct($scope,$http);
        getOrPostRequestObj.productConnect.getProduct($scope,$http);
        $scope.viewStates.setIndexState(true);
    } else {
        $scope.newProDatas = indexService.getNewProData();
        var sliders = indexService.getSlider();
        var isliders = [];

        for (var i = 0, len = sliders.length; i < len; i++) {
            isliders.push({
               'content':"<div class='bannerImg' ><img src='" + sliders[i].iSlideImg + "' onerror=this.src=errImg></div>"
            });
        }
        var opts = {
            type:"dom",
            data:isliders,
            dom:document.getElementById("indexSwiper"),
            duration:3000,
            isLooping:true,
            isDebug:false,
            isAutoplay:true,
            onslidechange:function(idx) {
                sliderSwiper_index.changeIndexDot();
            }
        };
        if (sliders.length > 0) {
	     var sliderSwiper_index = new iSlider(opts);

            var dotOpt = {
                top:"105px",
                width:"100%",
                diameter:"0.8em",
                borderColor:"#00407a"
            };
            sliderSwiper_index.renderDot(dotOpt);
        }
        $scope.proDatas = indexService.getProData();
        e = false;
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    }
    $scope.productInit_CallBack = function(data) {
        indexService.setProData($scope.productReturnData(data));
        $scope.proDatas = indexService.getProData();
        $scope.pageNum = 2;
        indexService.setPageNum(2);
        $timeout(function() {
            e = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.productLoadMore_CallBack = function(data) {
        var n = $scope.productReturnData(data);
        $scope.proDatas.proLeftInfos = $scope.proDatas.proLeftInfos.concat(n.proLeftInfos);
        $scope.proDatas.proRightInfos = $scope.proDatas.proRightInfos.concat(n.proRightInfos);
        indexService.setProData($scope.proDatas);
        $scope.pageNum++;
        indexService.setPageNum($scope.pageNum);
        $timeout(function() {
            e = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.productLoadMore = function() {
        if ($scope.noMoreHide && e === false) {
            e = true;
            $scope.loadHttp = $timeout(function() {
                getOrPostRequestObj.productConnect.getProductMore($scope,$http);
                $scope.$broadcast("scroll.infiniteScrollComplete");
            }, 2000);
        } else {
            $scope.$broadcast("scroll.infiniteScrollComplete");
        }
    };
    $scope.proRefresh = function() {
        getOrPostRequestObj.productConnect.getProduct($scope,$http);
        $scope.noMoreHide = true;
        $scope.loadingHide = false;
        indexService.setMoreHide(true);
        indexService.setLoadingHide(false);
        $scope.pageNum = 1;
        indexService.setPageNum(1);
    };
    $scope.productReturnData = function(data) {
        var proLeftInfos, proRightInfos, proLeftData = [], proRightData = [], idatas = data.respData.dataList;
        for (var o = 0, len = idatas.length; o < len; o += 2) {
            proLeftInfos = {
                proLeftNum:idatas[o].prodNum,
                proLeftImg:privateVerifictionObj.verifiction.imgLink(idatas[o].firstProdImg),
                proLeftName:idatas[o].prodName,
                proLeftPrice:"¥" + idatas[o].stdPrice
            };
            proLeftData.push(proLeftInfos);
            if (o + 1 < len) {
                proRightInfos = {
                    proRightNum:idatas[o + 1].prodNum,
                    proRightImg:privateVerifictionObj.verifiction.imgLink(idatas[o + 1].firstProdImg),
                    proRightName:idatas[o + 1].prodName,
                    proRightPrice:"¥" + idatas[o + 1].stdPrice
                };
                proRightData.push(proRightInfos);
            }
        }
        var contentInfo = {
            proLeftInfos:proLeftData,
            proRightInfos:proRightData
        };
        if (idatas.length < 14) {
            $scope.noMoreHide = false;
            $scope.loadingHide = true;
            indexService.setMoreHide(false);
            indexService.setLoadingHide(true);
        }
        return contentInfo;
    };
    $scope.proLeftClick = function(index) {
        $location.path("/detailed").search({
            proNum:$scope.proDatas.proLeftInfos[index].proLeftNum,
            dNum:2
        });
    };
    $scope.proRightClick = function(index) {
        $location.path("/detailed").search({
            proNum:$scope.proDatas.proRightInfos[index].proRightNum,
            dNum:2
        });
    };
};
/*}*/
imainCtrl.$inject = [ "$scope", "$http", "$location", "$timeout", "$ionicPopup", "$ionicPopover", "$ionicModal", "$ionicBackdrop" ];

indexModule.controller("mainCtrl", imainCtrl);

/*About PageEvt{*/
indexModule.service("aboutService", function() {
    var service = {};
    var _aboutImg = "";
    var _aboutText = "";
    service.getAboutImg = function() {
        return _aboutImg;
    };
    service.setAboutImg = function(aboutImg) {
        _aboutImg = aboutImg
    };
    service.getAboutText = function() {
        return _aboutText;
    };
    service.setAboutText = function(aboutText) {
        _aboutText = aboutText;
    };
    return service;
});

var aboutCtrt = function($scope, $http, aboutService, $timeout) {
    $scope.aboutInit_CallBack = function(data) {
        var idatas = $scope.aboutReturnData(data);
        $scope.iAboutImg = idatas.img;
        $scope.iAboutText = idatas.contentText;
        aboutService.setAboutImg(idatas.img);
        aboutService.setAboutText(idatas.contentText);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.aboutReturnData = function(data) {
        var idatas = data.respData,
	    contentText = "",
	    arrData = idatas.introduction.replace(/\./g, "。").split("。");

        for (var i = 0, len = arrData.length; i < len; i++) {
            contentText += "<p>" + arrData[i] + "</p>";
        }
        return {
            contentText:contentText,
            img:privateVerifictionObj.verifiction.imgLink(idatas.ownerImg)
        };
    };
    if ($scope.viewStates.getAboutState() === false) {
        getOrPostRequestObj.orderInfoConnect.getAboutInfo($scope,$http);
        $scope.viewStates.setAboutState(true);
    } else {
        $scope.iAboutImg = aboutService.getAboutImg();
        $scope.iAboutText = aboutService.getAboutText();
    }
};
/*}*/

indexCtrl.$inject = [ "$scope", "$http", "indexService", "$timeout", "$location" ];

var indexCtrlarr = [ "$scope", "$http", "indexService", "$timeout", "$location", indexCtrl ];

indexModule.controller("index", indexCtrlarr);

/*AdminClientSearch PageEvt{*/
indexModule.service("admClientService", function() {
    var service = {};
    var _nameClick = false;
    var _phoneClick = true;
    var _moreHide = true;
    var _loadingHide = false;
    var _searchKey = "";
    var _clients = "";
    var _pageNum = 2;
    service.getNameClick = function() {
        return _nameClick;
    };
    service.setNameClick = function(nameClick) {
        _nameClick = nameClick;
    };
    service.getPhoneClick = function() {
        return _phoneClick;
    };
    service.setPhoneClick = function(phoneClick) {
        _phoneClick = phoneClick;
    };
    service.getMoreHide = function() {
        return _moreHide;
    };
    service.setMoreHide = function(moreHide) {
        _moreHide = moreHide;
    };
    service.getLoadingHide = function() {
        return _loadingHide;
    };
    service.setLoadingHide = function(loadingHide) {
        _loadingHide = loadingHide;
    };
    service.getSearchKey = function() {
        return _searchKey;
    };
    service.setSearchKey = function(searchKey) {
        _searchKey = searchKey;
    };
    service.getClients = function() {
        return _clients;
    };
    service.setClients = function(clients) {
        _clients = clients;
    };
    service.getPageNum = function() {
        return _pageNum;
    };
    service.setPageNum = function(pageNum) {
        _pageNum = pageNum;
    };
    return service;
});


var adminClientCtrl = function($scope, $http, admClientService, $location, $timeout) {
    $scope.keyColor = "keyColor-link";
    $scope.keyColors = "keyColor-active";
    $scope.isNameClick = admClientService.getNameClick();
    $scope.isPhoneClick = admClientService.getPhoneClick();
    $scope.noMoreHide = admClientService.getMoreHide();
    $scope.loadingHide = admClientService.getLoadingHide();
    $scope.clientSearchEvt = null;
    $scope.pageNum = admClientService.getPageNum();
    $scope.aClient = {
        searchKey:admClientService.getSearchKey()
    };

    var _historySearch = admClientService.getSearchKey();
    var _isLodeMore = true;
    $scope.$on("$stateChangeStart", function() {
        $timeout.cancel($scope.loadHttp);
    });
    $scope.adminClientInit_CallBack = function(data) {
        admClientService.setClients($scope.adminClientReturnData(data));
        $scope.iClients = admClientService.getClients();
        $scope.pageNum = 2;
        admClientService.setPageNum(2);
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
    };
    $scope.adminClientLoadMore_CallBack = function(data) {
        var idatas = $scope.adminClientReturnData(data);
        $scope.iClients = $scope.iClients.concat(idatas);
        admClientService.setClients($scope.iClients);
        $scope.pageNum++;
        admClientService.setPageNum($scope.pageNum);
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
    };
    $scope.adminClientLoadMore = function() {
        if ($scope.noMoreHide && _isLodeMore === false) {
            _isLodeMore = true;
            $scope.loadHttp = $timeout(function() {
                getOrPostRequestObj.adminClientSearchConnect.adminUserInfoLoadMore($scope,$http);
                $scope.$broadcast("scroll.infiniteScrollComplete");
            }, 2000);
        } else {
            $scope.$broadcast("scroll.infiniteScrollComplete");
        }
    };
    $scope.adminClientReturnData = function(data) {
        if (data.respData.dataList.length < 9) {
            $scope.noMoreHide = false;
            $scope.loadingHide = true;
            admClientService.setMoreHide(false);
            admClientService.setLoadingHide(true);
        }
        return data.respData.dataList;
    };
    $scope.searchTextChange = function() {
        admClientService.setSearchKey($scope.aClient.searchKey);
    };
    $scope.searchUser = function() {
        if (_historySearch !== $scope.aClient.searchKey) {
            getOrPostRequestObj.adminClientSearchConnect.searchName = "";
            getOrPostRequestObj.adminClientSearchConnect.searchPhone = "";
            $scope.pageNum = 1;
            admClientService.setPageNum(1);
            $scope.noMoreHide = true;
            $scope.loadingHide = false;
            if ($scope.isNameClick === false) {
                getOrPostRequestObj.adminClientSearchConnect.searchName = $scope.aClient.searchKey;
            } else {
                if ($scope.isPhoneClick === false) {
                    getOrPostRequestObj.adminClientSearchConnect.searchPhone = $scope.aClient.searchKey;
                }
            }
            getOrPostRequestObj.adminClientSearchConnect.adminSearchUserInfo($scope,$http);
            _isLodeMore = true;
        }
        _historySearch = $scope.aClient.searchKey;
    };
    $scope.clickKey = function(iCase) {
        $scope.isNameClick = true;
        $scope.isPhoneClick = true;
        switch (iCase) {
            case 1:
                $scope.isNameClick = !$scope.isNameClick;
                break;
            case 2:
                $scope.isPhoneClick = !$scope.isPhoneClick;
                break;
            default:
                break;
        }
        admClientService.setNameClick($scope.isNameClick);
        admClientService.setPhoneClick($scope.isPhoneClick);
    };
    $scope.searchUserOrder = function(index) {
        $scope.viewStates.setHistoryOrderState(false);
        $location.path("/historyOrder").search({
            custNum:$scop.iClients[index].custNum,
            custName:$scop.iClients[index].companyName
        });
    };
    if ($scope.viewStates.getAdmClientState() === false) {
        getOrPostRequestObj.adminClientSearchConnect.adminSearchUserInfo($scope,$http);
        $scope.viewStates.setAdmClientState(true);
    } else {
        $scope.iClients = admClientService.getClients();
        _isLodeMore = false;
    }
};
/*}*/

aboutCtrt.$inject = [ "$scope", "$http", "aboutService", "$timeout" ];

var aboutCtrlarr = [ "$scope", "$http", "aboutService", "$timeout", aboutCtrt ];

indexModule.controller("about", aboutCtrlarr);

/*AdminLogin PageEvt{*/
var adminLoginCtrl = function($scope, $http, $location) {
    $scope.cancelHide = false;
    $scope.backHide = true;
    $scope.alogin = {};
    $scope.adminloginStyle = {
        "border-bottom":"none",
        "box-shadow":"0 2px 3px rgba(0,0,0,.15)"
    };
    $scope.adminNameFocus = function() {
        $scope.anameStyle = {
            color:"#ef575c"
        };
    };
    $scope.adminNameBlur = function() {
        $scope.anameStyle = {
            color:"#294775"
        };
    };
    $scope.adminPassFocus = function() {
        $scope.apassStyle = {
            color:"#ef575c"
        };
    };
    $scope.adminPassBlur = function() {
        $scope.apassStyle = {
            color:"#294775"
        };
    };
    $scope.hideAdminLogin = function() {
        var location = $location.url().split("?")[0];
        switch (location) {
            case "/adminMenu":
                $scope.back();
                break;

            case "/adminModifyPass":
            case "/adminClient":
            case "/adminSelectOrder":
            case "/adminProManage":
                $scope.back(-2);
                break;

            case "/adminOrderInfo":
            case "/historyOrder":
                $scope.back(-3);
                break;

            default:
                $scope.adminLoginShowHide(false);
        }
    };
    $scope.toAdminMenu = function() {
        switch ($location.url().split("?")[0]) {
            case "/adminMenu":
            case "/adminModifyPass":
            case "/adminClient":
            case "/adminSelectOrder":
            case "/adminProManage":
            case "/adminOrderInfo":
                location.reload();
                break;

            default:
                $location.path("/adminMenu");
                break;
        }
    };
    $scope.adminLoginBtnEvt = function() {
        if ($scope.alogin.adminName === "" || $scope.alogin.adminName === undefined) {
            $scope.showAlert("提 示", "账号不能为空!");
        } else {
            if ($scope.alogin.adminPass === "" || $scope.alogin.adminPass === undefined) {
                $scope.showAlert("提 示", "密码不能为空!");
            } else {
                getOrPostRequestObj.userAndAdminSignIn.adminLogin($scope, $http);
            }
        }
    };
    $scope.adminLoginDone_CallBack = function() {
        $scope.toAdminMenu();
        $scope.alogin.adminPass = "";
    };
};
/*}*/

adminClientCtrl.$inject = [ "$scope", "$http", "admClientService", "$location", "$timeout" ];

var adminClientarr = [ "$scope", "$http", "admClientService", "$location", "$timeout", adminClientCtrl ];

indexModule.controller("adminClient", adminClientarr);

/*AdminMenu PageEvt{*/
indexModule.service("adminMenuService", function() {
    var service = {};
    var _company = "未登录";
    var _name = "";
    service.getCompany = function() {
        return _company;
    };
    service.setCompany = function(company) {
        _company = company;
    };
    service.getName = function() {
        return _name;
    };
    service.setName = function(name) {
        _name = name;
    };
    return service;
});

var adminMenuCtrl = function($scope,$http,adminMenuService,$ionicPopup,$location,$timeout) {
    $scope.adminCompany = adminMenuService.getCompany();
    $scope.adminName = adminMenuService.getName();
    $scope.showConfirm = function() {
        $ionicPopup.confirm({
            title:"提 示",
            content:"您确定要退出登录吗?",
            buttons:[ {
                text:"取 消",
                type:"alertCancel",
                onTap:function(e) {
                    return false;
                }
            }, {
                text:"确 定",
                type:"alertComfirm",
                onTap:function(e) {
                    return true;
                }
            } ]
        }).then(function(res) {
            if (res) {
                getOrPostRequestObj.userAndAdminSignIn.adminLoginOut($scope,$http);
                $scope.viewStates.setAdmMenuState(false);
                adminMenuService.setCompany("未登录");
                adminMenuService.setName("");
            } else {}
        });
    };
    $scope.adminInfo_CallBack = function(data) {
        $scope.adminCompany = data.respData.companyName;
        $scope.adminName = data.respData.adminName;
        adminMenuService.setCompany(data.respData.companyName);
        adminMenuService.setName(data.respData.adminName);
        $scope.viewStates.setAdmMenuState(true);
    };
    $scope.adminOutLogin = function() {
        $scope.showConfirm();
    };
    $scope.admList = function(index) {
        switch (index) {
            case 0:
                $location.path("/adminSelectOrder");
                break;

            case 1:
                $location.path("/adminProManage");
                break;

            case 2:
                $location.path("/adminClient");
                break;

            case 3:
                $location.path("/adminModifyPass");
                break;
        }
    };
    if ($scope.viewStates.getAdmMenuState() === false) {
        $timeout(function() {
            getOrPostRequestObj.adminInfoConnect.getAdminInfo($scope,$http);
        }, 500);
    }
};
/*}*/

adminLoginCtrl.$inject = [ "$scope", "$http", "$location" ];

indexModule.controller("adminLoginCtrl", adminLoginCtrl);

/*AdminModifyPass PageEvt{*/
var adminModifyPassCtrl = function($scope, $http, $ionicLoading) {
    var foucsStyle = {
        color:"#ef575c"
    };
    var blurStyle = {
        color:"#294775"
    };

    $scope.aupdatePass = {};
    $scope.aoldPassFocus = function() {
        $scope.aoldPassStyle = foucsStyle;
    };
    $scope.aoldPassBlur = function() {
        $scope.aoldPassStyle = blurStyle;
    };
    $scope.anewPassFocus = function() {
        $scope.anewPassStyle = foucsStyle;
    };
    $scope.anewPassBlur = function() {
        $scope.anewPassStyle = blurStyle;
    };
    $scope.anewPassCFocus = function() {
        $scope.anewPassCStyle = foucsStyle;
    };
    $scope.anewPassCBlur = function() {
        $scope.anewPassCStyle = blurStyle;
    };
    $scope.clearData = function() {
        $scope.aupdatePass.oldPass = "";
        $scope.aupdatePass.newPass = "";
        $scope.aupdatePass.newPassC = "";
    };
    $scope.amodifyPassDone = function() {
        $ionicLoading.show({
            template:"<div>密码修改成功!</div>",
            delay:100,
            duration:1000
        });
    };
    $scope.amodifyPassDone_CallBack = function() {
        $scope.amodifyPassDone();
        window.history.back();
    };
    $scope.asendNewPass = function() {
        if (privateVerifictionObj.verifiction.isLetterAndNum($scope.aupdatePass.oldPass) === false) {
            $scope.showAlert("提 示", "旧密码输入错误，只能由数字或字母组成!");
        } else {
            if (privateVerifictionObj.verifiction.isLetterAndNum($scope.aupdatePass.newPass) === false || $scope.aupdatePass.newPass === undefined) {
                $scope.showAlert("提 示", "新密码输入错误，只能由数字或字母组成!");
            } else {
                if ($scope.aupdatePass.newPass !== $scope.aupdatePass.newPassC) {
                    $scope.showAlert("提 示", "新密码两次输入不一致!");
                } else {
                    getOrPostRequestObj.userAndAdminSignIn.isAdminLegality($scope, $http, $scope.aupdatePass.oldPass, $scope.aupdatePass.newPass);
                }
            }
        }
    };
};
/*}*/

adminMenuCtrl.$inject = [ "$scope", "$http", "adminMenuService", "$ionicPopup", "$location", "$timeout" ];

var adminMenuCtrlarr = [ "$scope", "$http", "adminMenuService", "$ionicPopup", "$location", "$timeout", adminMenuCtrl ];

indexModule.controller("adminMenu", adminMenuCtrlarr);

/*AdminOrderInfo PageEvt{*/
var adminOrderInfoCtrl = function($scope, $http, $location, $timeout) {
    $scope.iOrderId = $location.search().orderId;
    $scope.toDetailed = function(proId) {
        $location.path("/detailed").search({
            proNum:proId,
            hisPage:1
        });
    };
    $scope.aOrderInfoInit_CallBack = function(data) {
        var idata = [], item = {}, iPros = [], tempporarySpace;
        for (var j = 0, lens = data.orderItemList.length; j < lens;j++) {
            item = {
                proId:data.orderItemList[j].prodNum,
                img:privateVerifictionObj.verifiction.imgLink(data.orderItemList[j].whereimg),
                name:data.orderItemList[j].prodName,
                num:"订购数量 : " + data.orderItemList[j].cases,
                price:"¥" + data.orderItemList[j].custProdPrice
            };
            iPros.push(item);
        }
        tempporarySpace = {
            orderNum:data.orderNum,
            userName:data.custName,
            proCount:data.orderItemList.length,
            proPrices:"¥" + data.custPriceTotal,
            cashState:data.cashStatusName,
            cashType:data.cashTypeName,
            deliveryState:data.deliverStatusName,
            date:data.createDate,
            iPros:iPros
        };
        idata.push(tempporarySpace);
        $scope.aOrderInfos = idata;
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    getOrPostRequestObj.adminSelectOrderConnect.adminGetOrderInfo($scope,$http);
};
/*}*/

adminModifyPassCtrl.$inject = [ "$scope", "$http", "$ionicLoading" ];

indexModule.controller("adminModifyPass", adminModifyPassCtrl);

/*AdminProManage PageEvt{*/
indexModule.service("admProManageService", function() {
    var service = {};
    var _searchText = "";
    var _data = {};
    var _moreHide = true;
    var _loadingHide = false;
    var _aEditPros = "";
    var _pageNum = 2;

    service.getSearchText = function() {
        return _searchText;
    };
    service.setSearchText = function(searchText) {
        _searchText = searchText;
    };
    service.getData = function() {
        return _data;
    };
    service.setData = function(data) {
        _data = data;
    };
    service.getMoreHide = function() {
        return _moreHide;
    };
    service.setMoreHide = function(moreHide) {
        _moreHide = moreHide;
    };
    service.getLoadingHide = function() {
        return _loadingHide;
    };
    service.setLoadingHide = function(loadingHide) {
        _loadingHide = loadingHide;
    };
    service.getaEditPros = function() {
        return _aEditPros;
    };
    service.setaEditPros = function(aEditPros) {
        _aEditPros = aEditPros;
    };
    service.getPageNum = function() {
        return _pageNum;
    };
    service.setPageNum = function(pageNum) {
        _pageNum = pageNum;
    };
    return service;
});

var adminProManageCtrl = function($scope,$http,admProManageService,$location,$ionicPopup,$timeout) {
    $scope.aProManage = {
        searchVal:b.getSearchText()
    };
    $scope.iProId = "";
    $scope.iProVlaue = "";
    $scope.pricePrompt = "";
    $scope.numPrompt = "";
    $scope.index = 0;
    $scope.data = admProManageService.getData();
    $scope.noMoreHide = admProManageService.getMoreHide();
    $scope.loadingHide = admProManageService.getLoadingHide();
    $scope.manageSearchEvt = null;
    $scope.pageNum = admProManageService.getPageNum();
    var _historySearchText = admProManageService.getSearchText();
    var _isLodeMore = true;

    $scope.$on("$stateChangeStart", function() {
        $timeout.cancel($scope.loadHttp);
    });
    $scope.toDetailed = function(index) {
        $location.path("/detailed").search({
            proNum:index,
            hisPage:1
        });
    };
    $scope.updatePrice = function(index) {
        $scope.index = index;
        $scope.data.price = $scope.aEditPros[index].price.replace("¥", "");
        $ionicPopup.prompt({
            title:"修改产品价格",
            template:"<div class='item-input-inset alertInputView'><label class='item-input-wrapper alertInput'><input ng-model='data.price' type='text' class='ng-pristine ng-valid text-center'></label></div><h3 class='text-center assertive errText' ng-bind='pricePrompt'></h3>",
            scope:$scope,
            buttons:[ {
                text:"取 消",
                type:"alertCancel",
                onTap:function(e){
                    return false;
                }
            }, {
                text:"确 定",
                type:"alertComfirm",
                onTap:function(e) {
                    if ($scope.data.price === "" || $scope.data.price === undefined) {
                        $scope.pricePrompt = "价格不能为空!";
                        e.preventDefault();
                    } else {
                        if (privateVerifictionObj.verifiction.isFloat($scope.data.price) === false) {
                            $scope.pricePrompt = "价格输入有误!";
                            e.preventDefault();
                        } else {
                            return true;
                        }
                    }
                }
            } ]
        }).then(function(res) {
            if (res) {
                $scope.iProId = $scope.aEditPros[index].proId;
                $scope.iProVlaue = $scope.data.price;
                getOrPostRequestObj.adminProManageConnect.updatePrice($scope,$http);
            } else {}
            $scope.pricePrompt = "";
        });
        admProManageService.setData($scope.data);
    };
    $scope.updateNum = function(index) {
        $scope.index = index;
        $scope.data.num = $scope.aEditPros[index].num;
        $ionicPopup.prompt({
            title:"修改产品数量",
            template:"<div class='item-input-inset alertInputView'><label class='item-input-wrapper alertInput'><input ng-model='data.num' type='text' class='ng-pristine ng-valid text-center'></label></div><h3 class='text-center assertive errText' ng-bind='numPrompt'></h3>",
            scope:$scope,
            buttons:[{
                text:"取 消",
                type:"alertCancel",
                onTap:function(e) {
                    return false;
                }
            }, {
                text:"确 定",
                type:"alertComfirm",
                onTap:function(e) {
                    if ($scope.data.num === "" || $scope.data.num === undefined) {
                        $scope.numPrompt = "数量不能为空!";
                        e.preventDefault();
                    } else {
                        if (privateVerifictionObj.verifiction.isInt(g.data.num) === false) {
                            $scope.numPrompt = "数量输入有误!";
                            e.preventDefault();
                        } else {
                            return true;
                        }
                    }
                }
            } ]
        }).then(function(res) {
            if (res) {
                $scope.iProId = $scope.aEditPros[index].proId;
                $scope.iProVlaue = $scope.data.num;
                getOrPostRequestObj.adminProManageConnect.updateNum($scope,$http);
            } else {}
            $scope.numPrompt = "";
        });
        admProManageService.setData($scope.data);
    };
    $scope.searchChange = function() {
        admProManageService.setSearchText($scope.aProManage.searchVal);
    };
    $scope.aProManageSearch = function() {
        if ($scope.aProManage.searchVal !== _historySearchText) {
            getOrPostRequestObj.adminProManageConnect.adminGetProList($scope, $http);
            $scope.pageNum = 1;
            admProManageService.setPageNum(1);
            $scope.noMoreHide = true;
            $scope.loadingHide = false;
            admProManageService.setMoreHide(true);
            admProManageService.setLoadingHide(false);
            _isLodeMore = true;
        }
        _historySearchText = $scope.aProManage.searchVal;
    };
    $scope.adminProManageInit_CallBack = function(data) {
        admProManageService.setaEditPros($scope.adminProManageRetrunData(data));
        $scope.aEditPros = admProManageService.getaEditPros();
        $scope.pageNum = 2;
        admProManageService.setPageNum(2);
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.adminProManageLoadMore_CallBack = function(data) {
        var idatas = $scope.adminProManageRetrunData(data);
        $scope.aEditPros = $scope.aEditPros.concat(idatas);
        admProManageService.setaEditPros($scope.aEditPros);
        $scope.pageNum++;
        admProManageService.setPageNum($scope.pageNum);
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.adminProManageLoadMore = function() {
        if ($scope.noMoreHide && _isLodeMore === false) {
            _isLodeMore = true;
            $scope.loadHttp = $timeout(function() {
                getOrPostRequestObj.adminProManageConnect.adminProListLoadMore($scope,$http);
                $scope.$broadcast("scroll.infiniteScrollComplete");
            }, 2000);
        } else {
            $scope.$broadcast("scroll.infiniteScrollComplete");
        }
    };
    $scope.adminProManageRetrunData = function(data) {
        var idata = [],
	    idatas = data.respData.dataList,
	    tempporarySpace = {};
        for (var i = 0, len = idatas.length; i < len;i++) {
            tempporarySpace = {
                name:idatas[i].prodName,
                proId:idatas[i].prodNum,
                img:privateVerifictionObj.verifiction.imgLink(idatas[i].firstProdImg),
                price:"¥" + idatas[i].stdPrice,
                num:idatas[i].dispStockBalance,
                date:"上架日期: " + idatas[i].createDate
            };
            idata.push(tempporarySpace);
        }
        if (idatas.length < 9) {
            $scope.noMoreHide = false;
            $scope.loadingHide = true;
            admProManageService.setMoreHide(false);
            admProManageService.setLoadingHide(true);
        }
        return idata;
    };
    $scope.updatePriceDone_CallBack = function() {
        $scope.aEditPros[$scope.index].price = "¥" + $scope.data.price.replace(/\b(0+)/gi, "");
    };
    $scope.updateNumDone_CallBack = function() {
        $scope.aEditPros[$scope.index].num = $scope.data.num.replace(/\b(0+)/gi, "");
    };
    if ($scope.viewStates.getAdmProManageState() === false) {
        getOrPostRequestObj.adminProManageConnect.adminGetProList($scope,$http);
        $scope.viewStates.setAdmProManageState(true);
    } else {
        $scope.aEditPros = admProManageService.getaEditPros();
        _isLodeMore = false;
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    }
};
/*}*/

adminOrderInfoCtrl.$inject = [ "$scope", "$http", "$location", "$timeout" ];

indexModule.controller("adminOrderInfo", adminOrderInfoCtrl);

/*AdminSelectOrder PageEvt{*/
var adminSelectOrderCtrl = function($scope,$http,$location,$timeout) {
    $scope.adminOrder = {
        searchVal:""
    };
    $scope.iCustNum = "";
    $scope.keyColor = "keyColor-link";
    $scope.keyColors = "keyColor-active";
    $scope.isCompanyClick = false;
    $scope.isPhoneClick = true;
    $scope.noMoreHide = true;
    $scope.loadingHide = false;
    $scope.selSearchEvt = null;
    $scope.pageNum = 2;
    var _historySearchText = "";
    var _isLodeMore = true;

    $scope.$on("$stateChangeStart", function() {
        $timeout.cancel($scope.loadHttp);
    });
    $scope.admSelRefresh = function() {
        $timeout(function() {
            getOrPostRequestObj.adminSelectOrderConnect.adminShowOrderList($scope,$http);
            $scope.$broadcast("scroll.refreshComplete");
        }, 2000);
    };
    $scope.adminOrderInit_CallBack = function(data) {
        $scope.aOrders = $scope.adminOrderReturnData(data);
        $scope.pageNum = 2;
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.adminOrderLoadMore_CallBack = function(data) {
        var idatas = $scope.adminOrderReturnData(data);
        $scope.aOrders = $scope.aOrders.concat(idatas);
        $scope.pageNum++;
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.adminOrderLoadMore = function() {
        if ($scope.noMoreHide && _isLodeMore === false) {
            _isLodeMore = true;
            $scope.loadHttp = $timeout(function() {
                getOrPostRequest.adminSelectOrderConnect.adminSelOrderLoadMore($scope,$http);
                $scope.$broadcast("scroll.infiniteScrollComplete");
            }, 2000);
        } else {
            $scope.$broadcast("scroll.infiniteScrollComplete");
        }
    };
    $scope.adminOrderReturnData = function(data) {
	var idata = [],
	idatas = data.respData.dataList,
	item,
        iPros = [],
	iHidePros = [],
	tempporarySpace,
	isProBtn = true;

        for (var i = 0, len = idatas.length;i < len;i++) {
            for (var j = 0,lens = idatas[i].orderItemList.length;j < lens;j++) {
                item = {
                    proId:idatas[i].orderItemList[j].prodNum,
                    img:privateVerifictionObj.verifiction.imgLink(idatas[i].orderItemList[j].whereimg),
                    name:idatas[i].orderItemList[j].prodName,
                    num:idatas[i].orderItemList[j].cases,
                    price:"¥" + idatas[i].orderItemList[j].custProdPrice
                };
                if (j < 3) {
                    iPros.push(item);
                } else {
                    iHidePros.push(item);
                    isProBtn = false;
                }
            }
            tempporarySpace = {
                orderNum:idatas[i].orderNum,
                userName:idatas[i].custName,
                proCount:idatas[i].orderItemList.length,
                proPrices:"¥" + idatas[i].custPriceTotal,
                cashState:idatas[i].cashStatusName,
                deliveryState:idatas[i].deliverStatusName,
                date:idatas[i].createDate,
                iPros:iPros,
                isHidePro:true,
                iHidePros:iHidePros,
                isHide:isProBtn,
                btnText:"显示全部"
            };
            isProBtn = true;
            iHidePros = [];
            iPros = [];
            idata.push(tempporarySpace);
        }
        if (idatas.length < 9) {
            $scope.noMoreHide = false;
            $scope.loadingHide = true;
        }
        return idata;
    };
    $scope.toDetailed = function(index) {
        $location.path("/detailed").search({
            proNum:index,
	     hisPage:1
        });
    };
    $scope.toOrderDetailed = function(index) {
        $location.path("/adminOrderInfo").search({
            orderId:$scope.aOrders[index].orderNum
        });
    };
    $scope.clickKey = function(type) {
        $scope.isCompanyClick = true;
        $scope.isPhoneClick = true;
        if (type === 1) {
            $scope.isCompanyClick = !$scope.isCompanyClick;
        } else {
            $scope.isPhoneClick = !$scope.isPhoneClick;
        }
    };
    $scope.hideShowPro = function(index) {
        $scope.aOrders[index].isHidePro = !$scope.aOrders[index].isHidePro;
        $scope.aOrders[index].isHidePro ? $scope.aOrders[index].btnText = "显示全部" :$scope.aOrders[index].btnText = "隐藏部分";
    };
    $scope.orderSearch = function() {
        if ($scope.adminOrder.searchVal !== _historySearchText) {
            getOrPostRequestObj.adminSelectOrderConnect.aUserCompany = "";
            getOrPostRequestObj.adminSelectOrderConnect.aUserPhoneNum = "";
            $scope.pageNum = 1;
            $scope.noMoreHide = true;
            $scope.loadingHide = false;
            if ($scope.isCompanyClick === false) {
                getOrPostRequestObj.adminSelectOrderConnect.aUserCompany = $scope.adminOrder.searchVal;
            } else {
                getOrPostRequestObj.adminSelectOrderConnect.aUserPhoneNum = $scope.adminOrder.searchVal;
            }
            getOrPostRequestObj.adminSelectOrderConnect.adminShowOrderList($scope,$http);
            _isLodeMore = true;
        }
        _historySearchText = $scope.adminOrder.searchVal;
    };
    getOrPostRequestObj.adminSelectOrderConnect.adminShowOrderList($scope,$http);
};
/*}*/

adminProManageCtrl.$inject = [ "$scope", "$http", "admProManageService", "$location", "$ionicPopup", "$timeout" ];

var adminProManagearr = [ "$scope", "$http", "admProManageService", "$location", "$ionicPopup", "$timeout", adminProManageCtrl ];

indexModule.controller("adminProManage", adminProManagearr);

/*Category PageEvt{*/
indexModule.service("categoryService", function() {
    var service = {};
    var _menuDatas = "";
    var _cateSearchText = "";
    var _clearBtnShow = true;

    service.getMenuDatas = function() {
        return _menuDatas;
    };
    service.setMenuDatas = function(menuDatas) {
        _menuDatas = menuDatas;
    };
    service.getCateSearchText = function() {
        return _cateSearchText;
    };
    service.setCateSearchText = function(cateSearchText) {
        _cateSearchText = cateSearchText;
    };
    service.getClearBtnShow = function() {
        return _clearBtnShow;
    };
    service.setClearBtnShow = function(clearBtnShow) {
        _clearBtnShow = clearBtnShow;
    };
    return service;
});

var categoryCtrl = function($scope,$http,categoryService,$location) {
    $scope.clearBtnShow = categoryService.getClearBtnShow();
    $scope.catePro = {
        searchText:categoryService.getCateSearchText()
    };
    $scope.bodyHide = true;
    $scope.setIState(false);
    $scope.categoryBarIconState();
    $scope.$on("$stateChangeStart", function() {
        var iLocation = $location.url().split("?")[0];
        if (iLocation === "/product") {
            if ($scope.getProduct() !== 0 && $scope.getCategory() !== 0 && $scope.getIState() === false) {
                $scope.setProduct(1);
                $scope.setCategory(0);
            }
        } else {
            if (iLocation === "/shoppingCar" || iLocation === "/personal") {
                if ($scope.getProduct() !== 0 || $scope.getCategory() !== 0) {
                    $scope.setProduct(0);
                    $scope.setCategory(0);
                }
            }
        }
    });
    $scope.OpenOrCloseMenu = function(index) {
        if ($scope.menuDatas[index].menuBarOff === false && $scope.menuDatas[index].menuBarOn === false) {
            $scope.viewStates.setSearchResListState(false);
            $location.path("/searchRes").search({
                name:$scope.menuDatas[index].itemDatas[0].itemData,
                id:$scope.menuDatas[index].itemDatas[0].itemId,
                type:0
            });
        } else {
            $scope.menuDatas[index].itemHide = !$scope.menuDatas[index].itemHide;
            $scope.menuDatas[index].menuBarOff = !$scope.menuDatas[index].menuBarOff;
            $scope.menuDatas[index].menuBarOn = !$scope.menuDatas[index].menuBarOn;
            if ($scope.menuDatas[index].itemDatas.length > 0) {
                $scope.menuDatas[index].menuHeaderShow = !$scope.menuDatas[index].menuHeaderShow;
                $scope.menuDatas[index].menuHeaderHide = !$scope.menuDatas[index].menuHeaderHide;
            }
        }
    };
    $scope.cateSearchChange = function() {
        $scope.clearBtnShow = !($scope.catePro.searchText !== "" && $scope.catePro.searchText !== undefined);
        categoryService.setCateSearchText($scope.catePro.searchText);
        categoryService.setClearBtnShow($scope.clearBtnShow);
    };
    $scope.clearData = function() {
        $scope.catePro.searchText = "";
        $scope.clearBtnShow = true;
        categoryService.setCateSearchText($scope.catePro.searchText);
        categoryService.setClearBtnShow($scope.clearBtnShow);
    };
    $scope.searchPro = function() {
        if ($scope.catePro.searchText !== "" && $scope.catePro.searchText !== undefined) {
            $scope.viewStates.setSearchResListState(false);
            $location.path("/searchRes").search({
                name:$scope.catePro.searchText,
                id:"",
	   	type:"1"
            });
        }
    };
    $scope.searchCate = function(name,num) {
        $scope.viewStates.setSearchResListState(false);
        $location.path("/searchRes").search({
            name:name,
            id:num,
            type:0
        });
    };
    $scope.categoryInit_CallBack = function(data) {
        $scope.menuDatas = $scope.categoryReturnData(data);
        categoryService.setMenuDatas($scope.menuDatas);
    };
    $scope.categoryReturnData = function(data) {
        var idata = [];
        var idatas = data.respData;
        var tempporarySpace = {};
        var itemHear = "";
        var itemData = [];
        for (var i = 0, len = idatas.length; i < len;i++) {
            if (idatas[i].childProdCatHiers.length > 0) {
                for (var j = 0, ilen = idatas[i].childProdCatHiers.length; j < ilen;j++) {
                    if (idatas[i].childProdCatHiers[j].childProdCatHiers.length > 0) {
                        for (var m = 0,jlen = idatas[i].childProdCatHiers[j].childProdCatHiers.length; m < jlen;m++) {
                            if (m === 0) {
                                itemHear = idatas[i].childProdCatHiers[j].prodCat.prodCatName;
                            }
                            itemData.push({
                                itemId:idatas[i].childProdCatHiers[j].childProdCatHiers[m].prodCat.prodCatId,
                                itemData:idatas[i].childProdCatHiers[j].childProdCatHiers[m].prodCat.prodCatName
                            });
                        }
                        tempporarySpace = {
                            itemHead:itemHear,
                            itemDatas:itemData,
                            menuBarOff:true,
                            menuBarOn:false,
                            menuHeaderShow:false,
                            menuHeaderHide:true,
                            itemHide:true
                        };
                        idata.push(tempporarySpace);
                        itemHear = "";
                        itemData = [];
                        tempporarySpace = {};
                    } else {
                        if (j === 0) {
                            itemHear = idatas[i].prodCat.prodCatName;
                        }
                        itemData.push({
                            itemId:idatas[i].childProdCatHiers[j].prodCat.prodCatId,
                            itemData:idatas[i].childProdCatHiers[j].prodCat.prodCatName
                        });
                    }
                }
                tempporarySpace = {
                    itemHead:itemHear,
                    itemDatas:itemData,
                    menuBarOff:true,
                    menuBarOn:false,
                    menuHeaderShow:false,
                    menuHeaderHide:true,
                    itemHide:true
                };
                idata.push(tempporarySpace);
                itemHear = "";
                itemData = [];
                tempporarySpace = {};
            } else {
                itemHear = idatas[i].prodCat.prodCatName;
                tempporarySpace = {
                    itemHead:itemHear,
                    itemDatas:[ {
                        itemId:idatas[i].prodCat.prodCatId,
                        itemData:idatas[i].prodCat.prodCatName
                    } ],
                    menuBarOff:false,
                    menuBarOn:false,
                    menuHeaderShow:false,
                    menuHeaderHide:true,
                    itemHide:true
                };
                idata.push(tempporarySpace);
            }
        }
        return idata;
    };
    if ($scope.viewStates.getCategoryState() === false) {
        getOrPostRequestObj.proSearchConnec.proMenuIconLayout($scope,$http);
        $scope.viewStates.setCategoryState(true);
    } else {
        $scope.menuDatas = categoryService.getMenuDatas();
    }
};

adminSelectOrderCtrl.$inject = [ "$scope", "$http", "$location", "$timeout" ];

indexModule.controller("adminSelectOrder", adminSelectOrderCtrl);

/*Contact PageEvt{*/
indexModule.service("contactService", function() {
    var service = {};
    var _companyName = "";
    var _address = "";
    var _webSite = "";
    var _contactPerson = "";
    var _phoneNum = "";
    var _longitude = "";
    var _latitude = "";
    var _phoneNumBtn = "javascript:void(0)";
    service.getCompanyName = function() {
        return _companyName;
    };
    service.setCompanyName = function(companyName) {
        _companyName = companyName;
    };
    service.getAddress = function() {
        return _address;
    };
    service.setAddress = function(address) {
        _address = address;
    };
    service.getWebSite = function() {
        return _webSite;
    };
    service.setWebSite = function(webSite) {
        _webSite = webSite;
    };
    service.getContactPerson = function() {
        return _contactPerson;
    };
    service.setContactPerson = function(contactPerson) {
        _contactPerson = contactPerson;
    };
    service.getPhoneNum = function() {
        return _phoneNum;
    };
    service.setPhoneNum = function(phoneNum) {
        _phoneNum = phoneNum;
    };
    service.getLongiTude = function() {
        return _longitude;
    };
    service.setLongiTude = function(longitude) {
        _longitude = longitude;
    };
    service.getLatiTude = function() {
        return _latitude;
    };
    service.setLatiTude = function(latitude) {
        _latitude = latitude;
    };
    service.getPhoneNumBtn = function() {
        return _phoneNumBtn;
    };
    service.setPhoneNumBtn = function(phoneBtn) {
        _phoneNumBtn = phoneBtn;
    };
    return service;
});

var contcatCtrl = function($scope,$http,contactService,$timeout){
    $scope.contactInit_CallBack = function(data) {
        var idatas = $scope.contactReturnData(data);
        $scope.companyName = idatas.companyName;
        $scope.address = idatas.address;
        $scope.webSite = idatas.webSite;
        $scope.contactPerson = idatas.contactPerson;
        $scope.phoneNum = idatas.phoneNum;
        contactService.setCompanyName(idatas.companyName);
        contactService.setAddress(idatas.address);
        contactService.setWebSite(idatas.webSite);
        contactService.setContactPerson(idatas.contactPerson);
        contactService.setPhoneNum(idatas.phoneNum);
    };
    $scope.phoneBtn_CallBack = function(phone) {
        contactService.setPhoneNumBtn(phone);
    };
    $scope.callPhone = function() {
        window.location.href = contactService.getPhoneNumBtn();
    };
    $scope.contactReturnData = function(data) {
        var idatas = data.respData;
        $timeout(function() {
            $scope.mapInit(idatas.longitude, idatas.latitudes);
        }, 500);
        contactService.setLongiTude(idatas.longitude);
        contactService.setLatiTude(idatas.latitudes);
        return {
            companyName:idatas.companyName,
            address:idatas.address,
            contactPerson:idatas.contactPerson,
            webSite:idatas.webSite,
            phoneNum:idatas.phoneNum
        };
    };
    $scope.mapInit = function(lon, la) {
        var map = new BMap.Map("contenttexts"), icon = new BMap.Icon("img/icon.png", new BMap.Size(50, 50), {
            anchor:new BMap.Size(30, 28)
        }), point = new BMap.Point(lon, la), marker = new BMap.Marker(point, {
            icon:icon
        });
        map.centerAndZoom(point, 16);
        map.addControl(new BMap.ZoomControl()); //添加地图缩放控件
        map.addOverlay(marker);
        var traffic = new BMap.TrafficLayer();  // 创建交通流量图层实例
        map.addTileLayer(traffic);              // 将图层添加到地图上
        map.setZoom(18);                        //放到到17级
    };
    if ($scope.viewStates.getContactState() === false) {
        getOrPostRequestObj.orderInfoConnect.getContactInfo($scope,$http);
        if (privateVerifictionObj.verifiction.isMobile() === true) {
            getOrPostRequestObj.indexConnect.initPhoneBtn($scope,$http);
        }
        $scope.viewStates.setContactState(true);
    } else {
        $scope.mapInit(contactService.getLongiTude(), contactService.getLatiTude());
        $scope.companyName = contactService.getCompanyName();
        $scope.address = contactService.getAddress();
        $scope.webSite = contactService.getWebSite();
        $scope.contactPerson = contactService.getContactPerson();
        $scope.phoneNum = contactService.getPhoneNum();
    }
};
/*}*/

categoryCtrl.$inject = [ "$scope", "$http", "categoryService", "$location" ];

var categoryarr = [ "$scope", "$http", "categoryService", "$location", categoryCtrl ];

indexModule.controller("category", categoryarr);

/*Detailed PageEvt{*/
indexModule.service("detaiService",function(){
    var service = {};
    var _DNum = 0;
    service.getDNum = function(){
        return _DNum;
    };
    service.setDNum = function(DNum){
        _DNum = DNum;
    };
    return service;
});
var detailedCtrl = function($scope,detaiService,$http,$timeout,$location) {
    var pcUrl = "";
    var mobileUrl = "";
    $scope.layerHide = true;
    $scope.moreCharHide = true;
    $scope.closeHide = true;
    $scope.ampImgHide = true;
    $scope.shoppingType = 0;
    $scope.detailed = {
        proNum:0
    };
    $scope.proNumber = 0;
    $scope.isChangeHide = true;
    $scope.isToAlbb = true;
    var pageNUm = $location.search().dNum;
    var proPage = $scope.getProduct();
    var catePage = $scope.getCategory();
    $scope.setCategory(0);
    $scope.setProduct(0);
    if (pageNUm !== undefined && pageNUm !== null) {
        if ($scope.getPerSpCar() >= 2) {
            $scope.setPerSpCar($scope.getPerSpCar() + pageNUm);
        } else {
            $scope.setIsDetailed(pageNUm);
        }
        detaiService.setDNum(pageNUm);
    }else{
        pageNUm = detaiService.getDNum();
    }
    var hisPage = $location.search().hisPage;
    $location.search({
        proNum:$location.search().proNum,
        hisPage:$location.search().hisPage
    }).replace();
    $scope.cartHide = hisPage == 1;
    $scope.detailedInit_CallBack = function(data) {
        var idatas = $scope.detailedReturnData(data);
        $scope.detailedDatas = idatas;
        $scope.isChangeHide = idatas.changePro;
        $scope.isToAlbb = idatas.toAlbb;
        for (var i = 0, len = data.prodExternals.length; i < len;i++) {
            if (data.prodExternals[i].externalName === "murl") {
                mobileUrl = data.prodExternals[i].externalValue;
            } else {
                pcUrl = data.prodExternals[i].externalValue;
            }
        }
        try{
            if(data.prodExternals.externalValue !== undefined && data.prodExternals.externalValue !== null){
                $scope.isToAl = data.prodExternals.externalValue.substring(0, 4) === "http"
            }else{
                $scope.isToAl = false;
            }
        }catch (e){
            $scope.isToAl = false;
        }

        var sliders = idatas.islides;
        var isliders = [];
        for (var j = 0, jlen = sliders.length;j < jlen; j++) {
            isliders.push({
                content:"<div class='detailed_bannerImg' ><img src='" + sliders[j].iSlideImg + "' onerror=this.src=errImg></div>"
            });
        }
        var opts = {
            type:"dom",
            data:isliders,
            dom:document.getElementById("detailedSwiper"),
            duration:3000,
            isLooping:true,
            isAutoplay:true,
            onslidechange:function(idx) {
                sliderSwiper_detailed.changeIndexDot();
            }
        };
        if (sliders.length > 0) {
            var sliderSwiper_detailed = new iSlider(opts);
            var dotOpt = {
                top:"42%",
                width:"100%",
                diameter:"0.8em",
                borderColor:"#365b88"
            };
            sliderSwiper_detailed.renderDot(dotOpt);
        }
    };
    $scope.detailedReturnData = function(data) {
        var idata,
	changePro = true,
	toAlbb = true,
	idatas = data,
	iextFeatrues = [],
	slides = [],
	slideImg = "",
	ifeatureName = "",
	ifeatureValue = "";
        for (var i = 0, ilen = idatas.prodImgs.length; i < ilen;i++) {
            slideImg = privateVerifictionObj.verifiction.imgLink(idatas.prodImgs[i].thumbUrl);
            slides.push({
                iSlideImg:slideImg
            });
        }
        for (var j = 0, jlen = idatas.prodFeatures.length; j < jlen;j++) {
            ifeatureName = idatas.prodFeatures[j].featureName;
            ifeatureValue = idatas.prodFeatures[j].ifeatureValue;
            iextFeatrues.push({
                extFeatrue:ifeatureName + ": " + ifeatureValue
            });
        }
        if (idatas.externalSysCode === "1688" && publicParameterObj.parameters.isComShopping === true) {
            changePro = true;
            toAlbb = false;
        } else {
            changePro = false;
            toAlbb = true;
        }
        idata = {
            detailedTitle:idatas.prodName,
            islides:slides,
            changePro:changePro,
            toAlbb:toAlbb,
            price:"¥" + idatas.stdPrice,
            balance:idatas.dispStockBalance,
            extFeatrue:iextFeatrues,
            data:idatas.createDate,
            remark:idatas.remark,
            external:idatas.prodExternals
        };
        return idata;
    };
    $scope.$on("$stateChangeStart", function() {
        getOrPostRequestObj.userAndAdminSignIn.isToShoppingCar = false;
        var iLocation = $location.url().split("?")[0];
        if (iLocation !== "/shoppingCar") {
            if (iLocation !== "/index") {
                $scope.setProduct(proPage);
                $scope.setCategory(catePage);
                if (pageNUm !== undefined && pageNUm !== null) {
                    if ($scope.getPerSpCar() >= 2) {
                        $scope.setPerSpCar($scope.getPerSpCar() - pageNUm);
                    } else {
                        $scope.setIsDetailed(-pageNUm);
                    }
                }
            }
        }
        if (iLocation === "/myOrder" || iLocation === "/superPro") {
            $scope.setPerSpCar(0);
        }
        if(iLocation !== "/searchRes"){
            $scope.viewStates.setSearchResListState(false);
        }
    });
    if ($location.search().proNum !== "") {
        $scope.cqcsHide = false;
        getOrPostRequestObj.detailedConnect.getDetailed($location.search().proNum, $scope,$http);
    } else {
        $scope.cqcsHide = true;
        $scope.detailedDatas = {
            detailedTitle:"产品获取失败，请返回重新选择产品。"
        };
    }
    $scope.theZoom = function(index) {
        $scope.layerHide = false;
        $scope.closeHide = false;
        $scope.ampImgHide = false;
        $scope.contentHide = true;
        $scope.cartHide = true;
        $scope.ampImg = $scope.detailedDatas.islides[index].iSlideImg;
        var ampImgBg = document.getElementById("ampImgId");
        $timeout(function() {
            var width = -(ampImgBg.offsetWidth / 2);
            var height = -(ampImgBg.offsetHeight / 2);
            $scope.ampImgStyle = {
                "margin-left":width + "px",
                "margin-top":height + "px",
                opacity:"1"
            };
        }, 0);
    };
    $scope.closeAmp = function() {
        $scope.ampImgStyle = {
            opacity:"0"
        };
        $scope.layerHide = true;
        $scope.closeHide = true;
        $scope.closeHide = true;
        $scope.ampImgHide = true;
        $scope.cartHide = false;
        $scope.contentHide = false;
    };
    $scope.iaddToShoppinCar = function() {
        $scope.shoppingType = 1;
        getOrPostRequestObj.userAndAdminSignIn.isUserLogin($scope,$http);
        $scope.viewStates.setShoppingCarState(false);
    };
    $scope.iToShoppingCar = function() {
        $scope.shoppingType = 2;
        getOrPostRequestObj.userAndAdminSignIn.isUserLogin($scope,$http);
    };
    $scope.isLogin_CallBack = function(bool) {
        if (bool) {
            if ($scope.shoppingType === 1) {
                publicEventsObj.operatingDatabaseEvent.insertData($location.search().proNum, 1, $scope);
            } else {
                if ($scope.shoppingType === 2) {
                    $location.path("/shoppingCar");
                }
            }
        } else {
            if ($scope.shoppingType === 1) {
                $scope.userLogin.show();
            } else {
                if ($scope.shoppingType === 2) {
                    getOrPostRequestObj.userAndAdminSignIn.isToShoppingCar = true;
                    $scope.userLogin.show();
                }
            }
        }
    };
    $scope.toShopCar = function() {
        $location.path("/shoppingCar");
    };
    $scope.iToAlbb = function() {
        if (privateVerifictionObj.verifiction.isMobile()) {
            try {
                window.device.version.substr(0, 1);
                publicEventsObj.mobileEvent.webpage_mobile(mobileUrl);
            } catch (error) {
                window.open(mobileUrl);
            }
        } else {
            window.open(pcUrl);
        }
    };
    getOrPostRequestObj.userAndAdminSignIn.isUserLogin($scope,$http);
};
/*}*/

contcatCtrl.$inject = [ "$scope", "$http", "contactService", "$timeout" ];

var contactarr = [ "$scope", "$http", "contactService", "$timeout", contcatCtrl ];

indexModule.controller("contact", contactarr);

/*EditMessage PageEvt{*/
var editMessage = function($scope,$http,messageService) {
    $scope.charNum = 80;
    $scope.editStyle = {
        "border-bottom":"none",
        "box-shadow":"0 2px 3px rgba(0,0,0,.15)"
    };
    $scope.toUserLogin = function() {
        $scope.userLoginShowHide(true);
    };
    $scope.hideEditMessage = function() {
        $scope.editMessageShowHide(false);
    };
    $scope.sendMessage = function() {
        $scope.iMeassage = angular.element(document.querySelector("#messageId")).val();
        if ($scope.iMeassage !== "" && $scope.iMeassage !== undefined) {
            getOrPostRequestObj.messageConnect.sendMessage($scope,$http);
        } else {
            $scope.showAlert("提 示", "留言内容不能为空!");
        }
    };
    $scope.sendMessageDone_CallBack = function() {
        var tempporarySpace = {
            name:$scope.getSendMessageState() ? publicParameterObj.parameters.userName.substr(0, 5) + "******" :"匿名账户",
            createData:"刚刚",
            messageContent:$scope.iMeassage
        };
        var _imessage = $scope.getMessage();
        _imessage.splice(0, 0, tempporarySpace);
        $scope.setMessage(_imessage.splice(0, _imessage.length, tempporarySpace));
        $scope.iMeassage = "";
        angular.element(document.querySelector("#messageId")).val("");
        messageService.setMessageDatas($scope.iMessageDatas);
        $scope.editMessageShowHide(false);
        $scope.viewStates.setMessageState(false);
    };
};

indexModule.directive("eventVal", function() {
    return {
        require:"ngModel",
        scope:false,
        link:function(scope,elm, attrs, ctrl) {
            ctrl.$parsers.push(function(viewValue) {
                scope.charNum = 80 - viewValue.length;
            });
        }
    };
});
/*}*/
detailedCtrl.$inject = [ "$scope", "detaiService", "$http", "$timeout", "$location" ];

var detailedarr =  [ "$scope", "detaiService", "$http", "$timeout", "$location",detailedCtrl];

indexModule.controller("detailed", detailedarr);

/*HistoryOrder PageEvt{*/
indexModule.service("historyOrderService", function() {
    var service = {};
    var _moreHide = false;
    var _loadingHide = true;
    var _historyOrder = "";

    service.getMoreHide = function() {
        return _moreHide;
    };
    service.setMoreHide = function(moreHide) {
        _moreHide = moreHide;
    };
    service.getLoadingHide = function() {
        return _loadingHide;
    };
    service.setLoadingHide = function(loadingHide) {
        _loadingHide = loadingHide;
    };
    service.getHistoryOrder = function() {
        return _historyOrder;
    };
    service.setHistoryOrder = function(historyOrder) {
        _historyOrder = historyOrder;
    };
    return service;
});

var historyOrderCtrl = function($scope,$http,historyOrderService,$location,$timeout) {
    $scope.iCustNum = "";
    $scope.noMoreHide = historyOrderService.getMoreHide();
    $scope.loadingHide = historyOrderService.getLoadingHide();
    var _isLodeMore = true;
    if ($location.search().custNum) {
        $scope.iCustNum = $location.search().custNum;
        $scope.companyTitle = $location.search().custName;
    }
    $scope.adminOrderInit_CallBack = function(data) {
        historyOrderService.setHistoryOrder($scope.adminOrderReturnData(data));
        $scope.histroyOrders = historyOrderService.getHistoryOrder();
        publicParameterObj.parameters.loadingPage = 2;
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.adminOrderLoadMore_CallBack = function(data) {
        var idatas = $scope.adminOrderReturnData(data);
        $scope.histroyOrders = $scope.histroyOrders.concat(idatas);
        historyOrderService.setHistoryOrder($scope.histroyOrders);
        publicParameterObj.parameters.loadingPage++;
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.adminOrderLoadMore = function() {
        if ($scope.noMoreHide && _isLodeMore === false) {
            _isLodeMore = true;
            $timeout(function() {
                getOrPostRequest.adminSelectOrderConnect.adminSelOrderLoadMore($scope,$http);
                $scope.$broadcast("scroll.infiniteScrollComplete");
            }, 2000);
        } else {
            $scope.$broadcast("scroll.infiniteScrollComplete");
        }
    };
    $scope.adminOrderReturnData = function(data) {
        var idata = [],
	idatas = data.respData.dataList,
	item,
	iPros = [],
	iHidePros = [],
	tempporarySpace,
	isProBtn = true;
        for (var i = 0, len = idatas.length; i < len;i++) {
            for (var j = 0, lens = idatas[i].orderItemList.length; j < lens;j++) {
                item = {
                    proId:idatas[i].orderItemList[j].prodNum,
                    img:privateVerifictionObj.verifiction.imgLink(idatas[i].orderItemList[j].whereimg),
                    name:idatas[i].orderItemList[j].prodName,
                    num:idatas[i].orderItemList[j].cases,
                    price:"¥" + idatas[i].orderItemList[j].custProdPrice
                };
                if (j < 3) {
                    iPros.push(item);
                } else {
                    iHidePros.push(item);
                    isProBtn = false;
                }
            }
            tempporarySpace = {
                orderNum:idatas[i].orderNum,
                userName:idatas[i].custName,
                proCount:idatas[i].orderItemList.length,
                proPrices:"¥" + idatas[i].custPriceTotal,
                cashState:idatas[i].cashStatusName,
                deliveryState:idatas[i].deliverStatusName,
                date:idatas[i].createDate,
                iPros:iPros,
                isHidePro:true,
                iHidePros:iHidePros,
                isHide:isProBtn,
                btnText:"显示全部"
            };
            isProBtn = true;
            iHidePros = [];
            iPros = [];
            idata.push(tempporarySpace);
        }
        if (idatas.length < 9) {
            $scope.noMoreHide = false;
            $scope.loadingHide = true;
            historyOrderService.setMoreHide(false);
            historyOrderService.setLoadingHide(true);
        }
        return idata;
    };
    $scope.toDetailed = function(index) {
        $location.path("/detailed").search({
            proNum:index,
            hisPage:1
        });
    };
    $scope.toOrderDetailed = function(index) {
        $location.path("/adminOrderInfo").search({
            orderId:$scope.histroyOrders[index].orderNum
        });
    };
    $scope.hideShowPro = function(index) {
        $scope.histroyOrders[index].isHidePro = !$scope.histroyOrders[index].isHidePro;
        $scope.histroyOrders[index].isHidePro ? $scope.histroyOrders[index].btnText = "显示全部" :$scope.histroyOrders[index].btnText = "隐藏部分";
        historyOrderService.setHistoryOrder($scope.histroyOrders);
    };
    if ($scope.viewStates.getHistoryOrderState() === false) {
        getOrPostRequestObj.adminSelectOrderConnect.adminShowOrderList($scope,$http);
        $scope.viewStates.setHistoryOrderState(true);
    } else {
        $scope.histroyOrders = historyOrderService.getHistoryOrder();
        _isLodeMore = false;
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    }
};
/*}*/

editMessage.$inject = [ "$scope", "$http", "messageService" ];

var editMessagearr = [ "$scope", "$http", "messageService", editMessage ];

indexModule.controller("editMessageCtrl", editMessagearr);

/*Message PageEvt{*/
indexModule.service("messageService", function() {
    var service = {};
    var _messageDatas = [];
    var _moreHide = true;
    var _loadingHide = false;
    var _pageNum = 1;

    service.getMessageDatas = function() {
        return _messageDatas;
    };
    service.setMessageDatas = function(messageDatas) {
        _messageDatas = messageDatas;
    };
    service.getMoreHide = function() {
        return _moreHide;
    };
    service.setMoreHide = function(moreHide) {
        _moreHide = moreHide;
    };
    service.getLoadingHide = function() {
        return _loadingHide;
    };
    service.setLoadingHide = function(loadingHide) {
        _loadingHide = loadingHide;
    };
    service.getPageNum = function() {
        return _pageNum;
    };
    service.setPageNum = function(pageNum) {
        _pageNum = pageNum;
    };
    return service;
});

var messageCtrl = function($scope,$http,messageService,$ionicModal,$location,$timeout) {
    $scope.editMessageIsLogin = false;
    $scope.noMoreHide = messageService.getMoreHide();
    $scope.loadingHide = messageService.getLoadingHide();
    $scope.pageNum = messageService.getPageNum();
    $scope.pageNum = messageService.getPageNum();
    var _isLodeMore = true;

    $scope.$on("$stateChangeStart", function() {
        $scope.editMessageShowHide(false);
        $timeout.cancel($scope.loadHttp);
    });
    $scope.messageInit_CallBack = function(data) {
        messageService.setMessageDatas($scope.messageReturnData(data));
        $scope.setMessage(messageService.getMessageDatas());
        $scope.pageNum = 2;
        messageService.setPageNum(2);
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
    };
    $scope.messageLoadMore_CallBack = function(data) {
        var idatas = $scope.messageReturnData(data);
        $scope.setMessage($scope.getMessage().concat(idatas));
        $scope.pageNum++;
        messageService.setPageNum($scope.pageNum);
        messageService.setMessageDatas($scope.getMessage());
        $timeout(function() {
           _isLodeMore = false;
        }, 1000);
    };
    $scope.showEditMessage = function() {
        $scope.editMessageShowHide(true);
    };
    $scope.messageLoadMore = function() {
        if ($scope.noMoreHide && _isLodeMore === false) {
            _isLodeMore = true;
            $scope.loadHttp = $timeout(function() {
                getOrPostRequestObj.messageConnect.messageLoadMore($scope,$http);
                $scope.$broadcast("scroll.infiniteScrollComplete");
            }, 2000);
        } else {
            $scope.$broadcast("scroll.infiniteScrollComplete");
        }
    };
    $scope.messageReturnData = function(data) {
        var idata = [],
	idatas = data.respData.dataList,
	tempporarySpace;
        for (var i = 0, len = idatas.length; i < len;i++) {
            tempporarySpace = {
                name:idatas[i].createBy === "" || idatas[i].createBy === undefined ? "匿名账户" :idatas[i].createBy.substr(0, 5) + "******",
                createData:idatas[i].createDate.replace("T", " "),
                messageContent:idatas[i].content
            };
            idata.push(tempporarySpace);
        }
        if (idatas.length < 14) {
            $scope.noMoreHide = false;
            $scope.loadingHide = true;
            messageService.setMoreHide(false);
            messageService.setLoadingHide(true);
        }
        return idata;
    };
    if ($scope.viewStates.getMessageState() === false) {
        getOrPostRequest.messageConnect.getMessage($scope, $http);
        $scope.viewStates.setMessageState(true);
    } else {
        $scope.setMessage(messageService.getMessageDatas());
        _isLodeMore = false;
    }
};
/*}*/

historyOrderCtrl.$inject = [ "$scope", "$http", "historyOrderService", "$location", "$timeout" ];

var histroryOrderarr = [ "$scope", "$http", "historyOrderService", "$location", "$timeout", historyOrderCtrl ];

indexModule.controller("historyOrder", histroryOrderarr);

/*MyOrder PageEvt{*/
var myOrderCtrl = function($scope,$http,$location,$timeout) {
    $scope.custName = "未登录";
    $scope.noMoreHide = true;
    $scope.loadingHide = false;
    $scope.pageNum = 2;
    var _isLodeMore = true;

    $scope.$on("$stateChangeStart", function() {
        $timeout.cancel($scope.loadHttp);
    });
    $scope.myOrderRefresh = function() {
        $timeout(function() {
            getOrPostRequestObj.myOrderConnect.userShowOrderList($scope,$http);
            $scope.$broadcast("scroll.refreshComplete");
        }, 2000);
    };
    $scope.myOrderInit_CallBack = function(data) {
        $scope.oLists = $scope.myOrderReturnData(data);
        $scope.pageNum = 2;
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.myOrderLoadMore_CallBack = function(data) {
        var idatas = $scope.myOrderReturnData(data);
        $scope.oLists = $scope.oLists.concat(idatas);
        $scope.pageNum++;
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.myOrederLoadMore = function() {
        if ($scope.noMoreHide && _isLodeMore === false) {
            $scope.loadHttp = $timeout(function() {
                _isLodeMore = true;
                getOrPostRequestObj.myOrderConnect.userMyOrderLoadMore($scope,$http);
                $scope.$broadcast("scroll.infiniteScrollComplete");
            }, 2000);
        } else {
            $scope.$broadcast("scroll.infiniteScrollComplete");
        }
    };
    $scope.isLogin_CallBack = function(bool) {
        if (bool === true) {
            $scope.custName = publicParameterObj.parameters.userName;
        } else {
            $scope.custName = "未登录";
        }
    };
    $scope.myOrderReturnData = function(data) {
        var tempporarySpace = {};
        var iPro = [];
        var iHidePro = [];
        var proItem = {};
        var item = [];
        var idata = [];
        var idatas = data.respData.dataList;
        var isBtnHide = true;
        var isHide = true;
        var _red,_blue, _gray;
        for (var i = 0, len = idatas.length; i < len; i++) {
            isBtnHide = true;
            isHide = true;
            _red = false;
            _blue = false;
            _gray = false;
            for (var j = 0, ilen = idatas[i].orderItemList.length; j < ilen; j++) {
                proItem = {
                    proId:idatas[i].orderItemList[j].prodNum,
                    proImg:privateVerifictionObj.verifiction.imgLink(idatas[i].orderItemList[j].whereimg),
                    proName:idatas[i].orderItemList[j].prodName,
                    proNum:"订购数量: " + idatas[i].orderItemList[j].cases,
                    proPrice:"¥" + idatas[i].orderItemList[j].custProdPrice
                };
                if (j < 3) {
                    iPro.push(proItem);
                } else {
                    isBtnHide = true;
                    isHide = false;
                    iHidePro.push(proItem);
                }
                proItem = {};
            }
            switch (idatas[i].deliverStatus) {
                case 0:
                    _red = true;
                    break;

                case 1:
                    _blue = true;
                    break;

                case 2:
                    _gray = true;
                    break;
            }
            tempporarySpace = {
                orderId:idatas[i].orderNum,
                isProHide:isBtnHide,
                isHide:isHide,
                oItems:item,
                oPros:iPro,
                oHidePro:iHidePro,
                orderState:idatas[i].deliverStatusName,
                orderAddr: (idatas[i].deliverAddr !== null && idatas[i].deliverAddr !== undefined) ? idatas[i].deliverAddr : "",
                date:idatas[i].createDate,
                oCountNum:idatas[i].orderItemList.length,
                oCountPrice:"¥" + idatas[i].custPriceTotal,
                btnText:"显示全部",
                stateRed:_red,
                stateBlue:_blue,
                stateGray:_gray
            };
            idata.push(tempporarySpace);
            item = [];
            iPro = [];
            iHidePro = [];
        }
        if (idatas.length < 9) {
            $scope.noMoreHide = false;
            $scope.loadingHide = true;
        }
        return idata;
    };
    $scope.toDetailed = function(index) {
        var perSpCar = $scope.getPerSpCar() + 4;
        $scope.setPerSpCar(perSpCar);
        $location.path("/detailed").search({
            proNum:index
        });
    };
    $scope.hideShowPro = function(index) {
        $scope.oLists[index].isProHide = !$scope.oLists[index].isProHide;
        $scope.oLists[index].isProHide ? $scope.oLists[index].btnText = "显示全部" :$scope.oLists[index].btnText = "隐藏部分";
    };
    $scope.topay = function(num){
       $scope.ipayOpen(num);
    };

    $timeout(function() {
        getOrPostRequestObj.userAndAdminSignIn.isUserLogin($scope, $http);
    }, 450);
    getOrPostRequestObj.myOrderConnect.userShowOrderList($scope, $http);
};
/*}*/

messageCtrl.$inject = [ "$scope", "$http", "messageService", "$ionicModal", "$location", "$timeout" ];

var messageCtrlarr = [ "$scope", "$http", "messageService", "$ionicModal", "$location", "$timeout", messageCtrl ];

indexModule.controller("message", messageCtrlarr);

/*ipay PageEvt{*/
var ipayCtrl = function($scope,$http){

    $scope.$on("$stateChangeStart", function() {
        $scope.ipay.hide();
    });

//    <iframe onload="loadPage()" src=""></iframe>
};
ipayCtrl.$inject = ['$scope', '$http'];

indexModule.controller('iPay',ipayCtrl);
/*}*/


/**/

/**/

/*Personal PageEvt{*/
indexModule.service("perService", function() {
    var service = {};
    var _userName = "未登录";
    var _userCompany = "";

    service.getUserName = function() {
        return _userName;
    };
    service.setUserName = function(userName) {
        _userName = userName;
    };
    service.getUserCompany = function() {
        return _userCompany;
    };
    service.setUserCompany = function(userCompany) {
        _userCompany = userCompany;
    };
    return service;
});

var personalCtrl = function($scope, $http, perService, $ionicPopup, $timeout, $location){
    $scope.useriName = perService.getUserName();
    $scope.useriCompany = perService.getUserCompany();
    $scope.setPerSpCar(0);
    $scope.$on("$stateChangeStart", function() {
        if($scope.perConfirm){
            $scope.perConfirm.close();
        }
        var iLocation = $location.url().split("?")[0];
        if(iLocation === "/myOrder"){
            localStorage.setItem("h", window.history.length);
        }
    });
    $scope.showConfirm = function() {
       $scope.perConfirm = $ionicPopup.confirm({
            title:"提 示",
            content:"您确定要退出登录吗?",
            buttons:[ {
                text:"取 消",
                type:"alertCancel",
                onTap:function(e) {
                    return false;
                }
            }, {
                text:"确 定",
                type:"alertComfirm",
                onTap:function(e) {
                    return true;
                }
            } ]
        });
        $scope.perConfirm.then(function(res) {
            if (res) {
                $scope.viewStates.setPersonalState(false);
                perService.setUserName("未登录");
                perService.setUserCompany("");
                getOrPostRequestObj.userAndAdminSignIn.userLoginOut($scope, $http);
                $scope.setShoppingCarState(false);
            } else {}
        });
    };
    $scope.perList = function(index) {
        switch (index) {
            case 0:
                $location.path("/shoppingCar").search("");
                $scope.setPerSpCar(2);
                break;

//            case 1:
//                $location.path("/waitingAudit").search("");
//                $scope.setPerSpCar(0);
//                break;

            case 1:
                $location.path("/myOrder").search("");
                $scope.setPerSpCar(0);
                break;

            case 2:
                $location.path("/superPro").search("");
                $scope.setPerSpCar(0);
                break;

            case 3:
                $location.path("/modifyPass").search("");
                $scope.setPerSpCar(0);
                break;

            case 4:
                $location.path("/modifyInfo").search("");
                $scope.setPerSpCar(0);
                break;
        }
    };
    $scope.userLoginOut = function() {
        $scope.showConfirm();
    };
    $scope.infoInit_CallBack = function(data) {
        $scope.useriName = data.respData.custName;
        $scope.useriCompany = data.respData.companyName;
        perService.setUserName(data.respData.custName);
        perService.setUserCompany(data.respData.companyName);
        $scope.viewStates.setPersonalState(true);
    };
    if ($scope.viewStates.getPersonalState() === false) {
        $timeout(function() {
            getOrPostRequestObj.registConnect.userLoginInfo($scope, $http);
        }, 500);
    }
};
/*}*/

myOrderCtrl.$inject = [ "$scope", "$http", "$location", "$timeout" ];

indexModule.controller("myOrder", myOrderCtrl);

/*Product PageEvt*/
indexModule.service("productService", function() {
    var service = {};
    var _moreHide = true;
    var _loadingHide = false;
    var _searchText = "";
    var _pageNum = 1;
    var _proDatas = {};
    var _searchTextSave = "";
    var _showType = false;
    var _sortingState = 0;
    var _isUpSorting = false;

    service.getMoreHide = function() {
        return _moreHide;
    };
    service.setMoreHide = function(moreHide) {
        _moreHide = moreHide;
    };
    service.getLoadingHide = function() {
        return _loadingHide;
    };
    service.setLoadingHide = function(loadingHide) {
        _loadingHide = loadingHide;
    };
    service.getSearchText = function() {
        return _searchText;
    };
    service.setSearchText = function(searchText) {
        _searchText = searchText;
    };
    service.getPageNum = function() {
        return _pageNum;
    };
    service.setPageNum = function(pageNum) {
        _pageNum = pageNum;
    };
    service.getProData = function() {
        return _proDatas;
    };
    service.setProData = function(proDatas) {
        _proDatas = proDatas;
    };
    service.getSearchTextSave = function() {
        return _searchTextSave;
    };
    service.setSearchTextSave = function(searchTextSave) {
        _searchTextSave = searchTextSave;
    };
    service.getIShowType = function (){
        return _showType;
    };
    service.setIShowType = function(type){
        _showType = type;
    };
    service.getSortingState = function(){
        return _sortingState;
    };
    service.setSortingState = function(sortingState){
        _sortingState = sortingState;
    };
    service.getIsUpSorting = function(){
        return _isUpSorting;
    };
    service.setIsUpSorting = function(isUpSorting){
        _isUpSorting = isUpSorting;
    };
    return service;
});

var productCtrl = function($scope, $http, productService, $location, $ionicSideMenuDelegate, $timeout) {
    $scope.bodyHide = true;
    $scope.noMoreHide = productService.getMoreHide();
    $scope.loadingHide = productService.getLoadingHide();
    $scope.searchEvt = null;
    $scope.pageNum = productService.getPageNum();
    $scope.iPro = {
        searchText:productService.getSearchText()
    };
    $scope.showType = productService.getIShowType();
    $scope.sortingState = productService.getSortingState();
    $scope.isUpSorting = productService.getIsUpSorting();

    $scope.sortType = "";
    $scope.sortBy = "";

    var _iSearchText = productService.getSearchTextSave();
    var _isLodeMore = true;
    $scope.setIState(false);
    $scope.proBarIconState();
    $scope.$on("$stateChangeStart", function() {
        $timeout.cancel($scope.loadHttp);
        var iLocation = $location.url().split("?")[0];
        if (iLocation === "/category") {
            if ($scope.getCategory() !== 0 && $scope.getProduct() !== 0 && $scope.getIState() === false) {
                $scope.setProduct(0);
                $scope.setCategory(1);
            }
        } else {
            if (iLocation === "/shoppingCar" || iLocation === "/personal") {
                if ($scope.getProduct() !== 0 || $scope.getCategory() !== 0) {
                    $scope.setProduct(0);
                    $scope.setCategory(0);
                }
            }
        }
    });
    $scope.toProList = function() {
        $location.path("/proList").replace();
    };
    $scope.productInit_CallBack = function(data) {
        productService.setProData($scope.productReturnData(data));
        $scope.proDatas = productService.getProData();
        $scope.proResList = productService.getProData().idataList;
        $scope.pageNum = 2;
        productService.setPageNum(2);
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.productLoadMore_CallBack = function(data) {
        var idatas = $scope.productReturnData(data);
        $scope.proDatas.proLeftInfos = $scope.proDatas.proLeftInfos.concat(idatas.proLeftInfos);
        $scope.proDatas.proRightInfos = $scope.proDatas.proRightInfos.concat(idatas.proRightInfos);
        $scope.proResList = $scope.proResList.concat(idatas.idataList);
        productService.setProData($scope.proDatas);
        $scope.pageNum++;
        productService.setPageNum($scope.pageNum);
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.searchResLoadMore_CallBack = function(data) {
        $scope.productInit_CallBack(data);
    };
    $scope.productLoadMore = function() {
        if ($scope.noMoreHide && _isLodeMore === false) {
            _isLodeMore = true;
            $scope.loadHttp = $timeout(function() {
                getOrPostRequestObj.productConnect.getProductMore($scope, $http);
                $scope.$broadcast("scroll.infiniteScrollComplete");
            }, 2000);
        } else {
            $scope.$broadcast("scroll.infiniteScrollComplete");
        }
    };
    $scope.proRefresh = function() {
        $timeout(function() {
            getOrPostRequestObj.productConnect.getProduct($scope, $http);
            $scope.$broadcast("scroll.refreshComplete");
            $scope.noMoreHide = true;
            $scope.loadingHide = false;
            productService.setMoreHide(true);
            productService.setLoadingHide(false);
            $scope.pageNum = 1;
            productService.setPageNum(1);
            $scope.iPro.searchText = "";
            productService.setSearchText("");
        }, 2000);
    };
    $scope.productReturnData = function(data) {
	 var proLeftInfos,
	 proRightInfos,
	 proLeftData = [],
	 proRightData = [],
	 idatas = data.respData.dataList,
     imod = "",
     idataList = [];
     tempporarySpace = {};

        for (var i = 0, len = idatas.length; i < len; i += 2) {
            proLeftInfos = {
                proLeftNum:idatas[i].prodNum,
                proLeftImg:privateVerifictionObj.verifiction.imgLink(idatas[i].firstProdImg),
                proLeftName:idatas[i].prodName,
                proLeftPrice:"¥" + idatas[i].stdPrice
            };
            proLeftData.push(proLeftInfos);

            if (idatas[i].featureName === null || idatas[i].featureName === undefined) {
                imod = "";
            } else {
                imod = idatas[i].featureName;
            }
            tempporarySpace = {
                proId:idatas[i].prodNum,
                proListImg:privateVerifictionObj.verifiction.imgLink(idatas[i].firstProdImg),
                proName:idatas[i].prodName,
                proModel:"产品型号: " + imod,
                proPrice:"¥" + idatas[i].stdPrice
            };
            idataList.push(tempporarySpace);

            if (i + 1 < len) {
                proRightInfos = {
                    proRightNum:idatas[i + 1].prodNum,
                    proRightImg:privateVerifictionObj.verifiction.imgLink(idatas[i + 1].firstProdImg),
                    proRightName:idatas[i + 1].prodName,
                    proRightPrice:"¥" + idatas[i + 1].stdPrice
                };
                proRightData.push(proRightInfos);


                if (idatas[i + 1].featureName === null || idatas[i + 1].featureName === undefined) {
                    imod = "";
                } else {
                    imod = idatas[i + 1].featureName;
                }
                tempporarySpace = {
                    proId:idatas[i + 1].prodNum,
                    proListImg:privateVerifictionObj.verifiction.imgLink(idatas[i + 1].firstProdImg),
                    proName:idatas[i + 1].prodName,
                    proModel:"产品型号: " + imod,
                    proPrice:"¥" + idatas[i + 1].stdPrice
                };
                idataList.push(tempporarySpace);
            }


        }

        var idata = {
            proLeftInfos:proLeftData,
            proRightInfos:proRightData,
            idataList:idataList
        };
        if (idatas.length < 14) {
            $scope.noMoreHide = false;
            $scope.loadingHide = true;
            productService.setMoreHide(false);
            productService.setLoadingHide(true);
        }
        return idata;
    };
    $scope.proSearchTextChange = function() {
        productService.setSearchText($scope.iPro.searchText);
    };
    $scope.iProSearch = function() {
        if ($scope.iPro.searchText !== _iSearchText) {
            $scope.pageNum = 1;
            productService.setPageNum(1);
            $scope.loadingHide = false;
            $scope.noMoreHide = true;
            productService.setMoreHide(true);
            productService.setLoadingHide(false);
            getOrPostRequestObj.proSearchConnec.userSearchMore($scope.iPro.searchText, "", $scope, $http);
            productService.setSearchText($scope.iPro.searchText);
            _iSearchText = $scope.iPro.searchText;
            productService.setSearchTextSave($scope.iPro.searchText);
            _isLodeMore = true;
        }
    };
    $scope.proLeftClick = function(index) {
        $location.path("/detailed").search({
            proNum:$scope.proDatas.proLeftInfos[index].proLeftNum,
            dNum:2 + $scope.getProduct() + $scope.getCategory()
        });
    };
    $scope.proRightClick = function(index) {
        $location.path("/detailed").search({
            proNum:$scope.proDatas.proRightInfos[index].proRightNum,
            dNum:2 + $scope.getProduct() + $scope.getCategory()
        });
    };
    $scope.resItemClick = function(index){
        $location.path("/detailed").search({
            proNum:$scope.proResList[index].proId,
            dNum:2 + $scope.getProduct() + $scope.getCategory()
        });
    };
    $scope.changeStyle = function(){
        $scope.showType = !$scope.showType;
        productService.setIShowType($scope.showType);
        if($scope.timeEvt){
            $timeout.cancel($scope.timeEvt);
        }
        $scope.timeEvt = $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };

    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.sortingBtnC = function(str){
        switch(str){
            case 'default':
                if($scope.sortingState != 0){
                    $scope.sortingState = 0;
                    productService.setSortingState(0);
                    $scope.sortType = "";
                    $scope.sortBy = "";
                    getOrPostRequestObj.productConnect.getProduct($scope, $http);
                }
                break;
            case 'price':
                $scope.sortBy = "stdPrice";
                if($scope.sortingState == 1){
                    $scope.isUpSorting = !$scope.isUpSorting;
                    productService.setIsUpSorting($scope.isUpSorting);
                }
                if($scope.sortingState != 1){
                    $scope.sortingState = 1;
                    productService.setSortingState(1);
                }
                if($scope.isUpSorting){
                    $scope.sortType = "asc";
                }else{
                    $scope.sortType = "desc";
                }
                getOrPostRequestObj.productConnect.getProduct($scope, $http);
                break;
        }
    };

    if ($scope.viewStates.getProductState() === false) {
        getOrPostRequestObj.productConnect.getProduct($scope, $http);
        $scope.viewStates.setProductState(true);
    } else {
        $scope.proDatas = productService.getProData();
        $scope.proResList = productService.getProData().idataList;
        _isLodeMore = false;
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    }
};
/*}*/

personalCtrl.$inject = [ "$scope", "$http", "perService", "$ionicPopup", "$timeout", "$location" ];

var personalarr = [ "$scope", "$http", "perService", "$ionicPopup", "$timeout", "$location", personalCtrl ];

indexModule.controller("personal", personalarr);

/*ProList PageEvt{*/
indexModule.service("proListService", function() {
    var service = {};
    var _loadingHide = false;
    var _moreHide = true;
    var _pageNum = 1;
    var _proListDatas = "";
    var _searchText = "";
    var _searchTextSave = "";

    service.getLoadingHide = function() {
        return _loadingHide;
    };
    service.setLoadingHide = function(loadingHide) {
        _loadingHide = loadingHide;
    };
    service.getMoreHide = function() {
        return _moreHide;
    };
    service.setMoreHide = function(moreHide) {
        _moreHide = moreHide;
    };
    service.getPageNum = function() {
        return _pageNum;
    };
    service.setPageNum = function(pageNum) {
        _pageNum = pageNum;
    };
    service.getProListDatas = function() {
        return _proListDatas;
    };
    service.setProListDatas = function(proListDatas) {
        _proListDatas = proListDatas;
    };
    service.getSearchText = function() {
        return _searchText;
    };
    service.setSearchText = function(searchText) {
        _searchText = searchText;
    };
    service.getSearchTextSave = function() {
        return _searchTextSave;
    };
    service.setSearchTextSave = function(searchTextSave) {
        _searchTextSave = searchTextSave;
    };
    return service;
});

var proListCtrl = function($scope, $http, proListService, $location, $timeout) {
    $scope.bodyHide = true;
    $scope.loadingHide = proListService.getLoadingHide();
    $scope.noMoreHide = proListService.getMoreHide();
    $scope.pageNum = proListService.getPageNum();
    $scope.iPro = {
        searchText:proListService.getSearchText()
    };
    var _iSearchText = proListService.getSearchTextSave();
    var _isLodeMore = true;
    $scope.proBarIconState();
    $scope.$on("$stateChangeStart", function() {
        $timeout.cancel($scope.loadHttp);
    });
    $scope.toProduct = function() {
        $location.path("/product").replace();
    };
    $scope.productInit_CallBack = function(data) {
        proListService.setProListDatas($scope.proListReturnData(data));
        $scope.proListDatas = proListService.getProListDatas();
        proListService.setPageNum(2);
        $scope.pageNum = 2;
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.productLoadMore_CallBack = function(data) {
        var datas = $scope.proListReturnData(data);
        $scope.proListDatas = $scope.proListDatas.concat(datas);
        proListService.setProListDatas($scope.proListDatas);
        $scope.pageNum++;
        proListService.setPageNum($scope.pageNum);
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.searchResLoadMore_CallBack = function(data) {
        $scope.productInit_CallBack(data);
    };
    $scope.proListLoadMore = function() {
        if ($scope.noMoreHide && _isLodeMore === false) {
            _isLodeMore = true;
            $scope.loadHttp = $timeout(function() {
                getOrPostRequestObj.productConnect.getProductMore($scope, $http);
                $scope.$broadcast("scroll.infiniteScrollComplete");
            }, 2000);
        } else {
            $scope.$broadcast("scroll.infiniteScrollComplete");
        }
    };
    $scope.proListRefresh = function() {
        $timeout(function() {
            getOrPostRequestObj.productConnect.getProduct($scope, $http);
            $scope.$broadcast("scroll.refreshComplete");
            $scope.noMoreHide = true;
            $scope.loadingHide = false;
            $scope.pageNum = 1;
            $scope.iPro.searchText = "";
            proListService.setSearchText("");
            proListService.setPageNum(1);
            proListService.setMoreHide(true);
            proListService.setLoadingHide(false);
        }, 2000);
    };
    $scope.proListReturnData = function(data) {
        var idata = [],
	idatas = data.respData.dataList,
	tempporarySpace,
	ifModel = "";
        for (var i = 0, len = idatas.length; i < len; i++) {
            if (idatas[i].featureName === null || idatas[i].featureName === undefined) {
                ifModel = "";
            } else {
                ifModel = idatas[i].featureName;
            }
            tempporarySpace = {
                proNum:idatas[i].prodNum,
                proName:idatas[i].prodName,
                proModel:"型号: " + ifModel,
                proPrice:"¥" + idatas[i].stdPrice,
                proListImg:privateVerifictionObj.verifiction.imgLink(idatas[i].firstProdImg)
            };
            idata.push(tempporarySpace);
        }
        if (idatas.length < 14) {
            $scope.noMoreHide = false;
            $scope.loadingHide = true;
            proListService.setMoreHide(false);
            proListService.setLoadingHide(true);
        }
        return idata;
    };
    $scope.proSearchTextChange = function() {
        proListService.setSearchText($scope.iPro.searchText);
    };
    $scope.iProSearch = function() {
        if ($scope.iPro.searchText !== _iSearchText) {
            $scope.pageNum = 1;
            proListService.setPageNum(1);
            $scope.noMoreHide = true;
            $scope.loadingHide = false;
            proListService.setMoreHide(true);
            proListService.setLoadingHide(false);
            getOrPostRequestObj.proSearchConnec.userSearchMore($scope.iPro.searchText, "", $scope, $http);
            _iSearchText = $scope.iPro.searchText;
            proListService.setSearchTextSave($scope.iPro.searchText);
            _isLodeMore = true;
        }
    };
    $scope.proItemClick = function(index) {
        $location.path("/detailed").search({
            proNum:$scope.proListDatas[index].proNum,
            dNum:2 + $scope.getProduct() + $scope.getCategory()
        });
    };
    if ($scope.viewStates.getProListState() === false) {
        getOrPostRequestObj.productConnect.getProduct($scope, $http);
        $scope.viewStates.setProListState(true);
    } else {
        $scope.proListDatas = proListService.getProListDatas();
        _isLodeMore = false;
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    }
};
/*}*/

productCtrl.$inject = [ "$scope", "$http", "productService", "$location", "$ionicSideMenuDelegate", "$timeout" ];

var productarr = [ "$scope", "$http", "productService", "$location", "$ionicSideMenuDelegate", "$timeout", productCtrl ];

indexModule.controller("product", productarr);

indexModule.service("searchResService", function() {
    var service = {};
    var _proResList = "";
    var _moreHide = true;
    var _loadingHide = false;
    var _pageNum = 2;
    var _proDatas = {};
    var _showType = false;
    service.getProResList = function() {
        return _proResList;
    };
    service.setProResList = function(proResList) {
        _proResList = proResList;
    };
    service.getMoreHide = function() {
        return _moreHide;
    };
    service.setMoreHide = function(moreHide) {
        _moreHide = moreHide;
    };
    service.getLoadingHide = function() {
        return _loadingHide;
    };
    service.setLoadingHide = function(loadingHide) {
        _loadingHide = loadingHide;
    };
    service.getPageNum = function() {
        return _pageNum;
    };
    service.setPageNum = function(pageNum) {
        _pageNum = pageNum;
    };
    service.getProDatas = function(){
        return _proDatas;
    };
    service.setProDatas = function(proDatas){
        _proDatas = proDatas;
    };
    service.getShowType = function(){
        return _showType;
    };
    service.setShowType = function(showType){
        _showType = showType;
    };
    return service;
});

var searchResCtrl = function($scope, $http, searchResService, $location, $timeout) {
    var resName = $location.search().name,
    resid = $location.search().id,
    type = !!$location.search().type ? parseInt($location.search().type) : !!$location.search().type;
    $scope.bodyHide = true;
    $scope.noMoreHide = searchResService.getMoreHide();
    $scope.loadingHide = searchResService.getLoadingHide();
    $scope.resTitle = resName;
    $scope.pageNum = searchResService.getPageNum();
    $scope.showType = searchResService.getShowType();
    $scope.proDatas = {
        proLeftInfos:[],
        proRightInfos:[]
    };
    $scope.timeEvt = null;
    var _isLodeMore = true;
    $scope.$on("$stateChangeStart", function() {
        $timeout.cancel($scope.loadHttp);

        var iLocation = $location.url().split("?")[0];
        if(iLocation !== "/detailed"){
            $scope.viewStates.setSearchResListState(false);
        }
    });
    $scope.showSearchResInit_CallBack = function(data) {
        var _proRes = $scope.proResReturnData(data);
        searchResService.setProResList(_proRes);
        $scope.proResList = searchResService.getProResList();
        var len = _proRes.length;
        for(var z = 0;z < len;z += 2){
            $scope.proDatas.proLeftInfos.push(_proRes[z]);
            if(_proRes[z+1] !== undefined && _proRes[z+1] !== null){
                $scope.proDatas.proRightInfos.push(_proRes[z+1]);
            }
        }
        searchResService.setProDatas($scope.proDatas);
        $scope.pageNum = 2;
        searchResService.setPageNum(2);
        $scope.noMoreHide = true;
        $scope.loadingHide = false;
        searchResService.setMoreHide(true);
        searchResService.setLoadingHide(false);
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.searchResLoadMore_CallBack = function(data) {
        var idatas = $scope.proResReturnData(data);
        $scope.proResList = $scope.proResList.concat(idatas);
        $scope.pageNum++;
        searchResService.setPageNum($scope.pageNum);
        searchResService.setProResList($scope.proResList);
        var len = idatas.length;
        for(var z = 0;z < len;z += 2){
            if($scope.proDatas.proRightInfos.length > $scope.proDatas.proLeftInfos.length){
                $scope.proDatas.proLeftInfos.push(idatas[z]);
                if(idatas[z+1] !== undefined && idatas[z+1] !== null){
                    $scope.proDatas.proRightInfos.push(idatas[z+1]);
                }
            }else{
                $scope.proDatas.proRightInfos.push(idatas[z]);
                if(idatas[z+1] !== undefined && idatas[z+1] !== null){
                    $scope.proDatas.proLeftInfos.push(idatas[z+1]);
                }
            }

        }
        searchResService.setProDatas($scope.proDatas);
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.proResLoadMore = function() {
        if ($scope.noMoreHide && _isLodeMore === false) {
            _isLodeMore = true;
            $scope.loadHttp = $timeout(function() {
                if (type === 0) {
                    getOrPostRequestObj.proSearchConnec.userSearchMore("", resid, $scope, $http);
                } else {
                    getOrPostRequestObj.proSearchConnec.userSearchMore(resName, "", $scope, $http);
                }
                $scope.$broadcast("scroll.infiniteScrollComplete");
            }, 2000);
        } else {
            $scope.$broadcast("scroll.infiniteScrollComplete");
        }
    };
    $scope.proResReturnData = function(data) {
	var idata = [],
	idatas = data.respData.dataList,
	tempporarySpace,
	imod = "";
        for (var i = 0, len = idatas.length; i < len; i++) {
            if (idatas[i].featureName === null || idatas[i].featureName === undefined) {
                imod = "";
            } else {
                imod = idatas[i].featureName;
            }
            tempporarySpace = {
                proId:idatas[i].prodNum,
                proListImg:privateVerifictionObj.verifiction.imgLink(idatas[i].firstProdImg),
                proName:idatas[i].prodName,
                proModel:"产品型号: " + imod,
                proPrice:"¥" + idatas[i].stdPrice
            };
            idata.push(tempporarySpace);
        }
        if (idatas.length < 9) {
            $scope.noMoreHide = false;
            $scope.loadingHide = true;
            searchResService.setMoreHide(false);
            searchResService.setLoadingHide(true);
        }
        return idata;
    };
    $scope.changeStyle = function(){
        $scope.showType = !$scope.showType;
        searchResService.setShowType($scope.showType);
        if($scope.timeEvt){
            $timeout.cancel($scope.timeEvt);
        }
        $scope.timeEvt = $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };

    if ($scope.viewStates.getSearchResListState() === false) {
        if (type == 0) {
            getOrPostRequestObj.proSearchConnec.userSearchPro("", resid, $scope, $http);
        } else {
            getOrPostRequestObj.proSearchConnec.userSearchPro(resName, "", $scope, $http);
        }
        $scope.viewStates.setSearchResListState(true);
    } else {
        $scope.proResList = searchResService.getProResList();
        $scope.proDatas = searchResService.getProDatas();
        _isLodeMore = false;
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    }
    $scope.resItemClick = function(index) {
        $location.path("/detailed").search({
            proNum:$scope.proResList[index].proId,
            dNum:3 + $scope.getCategory() + $scope.getProduct()
        });
    };

    $scope.proLeftClick = function(index){
        $location.path("/detailed").search({
            proNum:$scope.proDatas.proLeftInfos[index].proId,
            dNum:3 + $scope.getCategory() + $scope.getProduct()
        });
    };
    $scope.proRightClick = function(index){
        $location.path("/detailed").search({
            proNum:$scope.proDatas.proRightInfos[index].proId,
            dNum:3 + $scope.getCategory() + $scope.getProduct()
        });
    };
};

proListCtrl.$inject = [ "$scope", "$http", "proListService", "$location", "$timeout" ];

var proListarr = [ "$scope", "$http", "proListService", "$location", "$timeout", proListCtrl ];

indexModule.controller("proList", proListarr);

/*Register PageEvt{*/
var register = function($scope, $http, $ionicLoading, $location,$timeout) {
    var foucsStyle = {
        color:"#ef575c"
    };
    var blurStyle = {
        color:"#294775"
    };
    $scope.registerStyle = {
        "border-bottom":"none",
        "box-shadow":"0 2px 3px rgba(0,0,0,.15)"
    };

    $scope.register = {};
    $scope.rphoneFocus = function() {
        $scope.registerPhone = foucsStyle;
    };
    $scope.rphoneBlur = function() {
        $scope.registerPhone = blurStyle;
    };
    $scope.rpassFocus = function() {
        $scope.registerPass = foucsStyle;
    };
    $scope.rpassBlur = function() {
        $scope.registerPass = blurStyle;
    };
    $scope.rpasscFocus = function() {
        $scope.registerPassC = foucsStyle;
    };
    $scope.rpasscBlur = function() {
        $scope.registerPassC = blurStyle;
    };
    $scope.rnameFocus = function() {
        $scope.registerName = foucsStyle;
    };
    $scope.rnameBlur = function() {
        $scope.registerName = blurStyle;
    };
//    $scope.rcompanyFocus = function() {
//        $scope.registerCompany = foucsStyle;
//    };
//    $scope.rcompanyBlur = function() {
//        $scope.registerCompany = blurStyle;
//    };
    $scope.registerSend = function() {
        if (privateVerifictionObj.verifiction.iphonever($scope.register.rPhone) === false) {
            $scope.showAlert("提 示", "手机号码格式输入错误!");
        } else {
            if (privateVerifictionObj.verifiction.isLetterAndNum($scope.register.rPass) === false) {
                $scope.showAlert("提 示", "用户密码只能由字母或数字组成!");
            } else {
                if ($scope.register.rPass === "" || $scope.register.rPass === undefined || $scope.register.rPassC === "" || $scope.register.rPassC === undefined) {
                    $scope.showAlert("提 示", "密码不能为空!");
                } else {
                    if ($scope.register.rPass !== $scope.register.rPassC) {
                        $scope.showAlert("提 示", "两次用户密码输入不正确!");
                    } else {
                        if ($scope.register.rName === "" || $scope.register.rName === undefined) {
                            $scope.showAlert("提 示", "姓名不能为空!");
                        } else {
//                            if ($scope.register.rCompany === "" || $scope.register.rCompany === undefined) {
//                                $scope.showAlert("提 示", "商家名/公司名不能为空!");
//                            } else {
                                getOrPostRequestObj.registConnect.userRegist($scope, $http);
//                            }
                        }
                    }
                }
            }
        }
    };
    $scope.userLoginDone_CallBack = function(name) {
        localStorage.setItem("userName", name + "");
        publicParameterObj.parameters.userName = localStorage.userName.replace(/\"/g, "");
        publicEventsObj.operatingDatabaseEvent.crateTable();
        getOrPostRequestObj.userAndAdminSignIn.userLoginState = true;
        getOrPostRequestObj.userAndAdminSignIn.testSetJushTagNalias($scope, $http);//注册推送
    };
    $scope.registerDone_CallBack = function(name, pass) {
        getOrPostRequestObj.userAndAdminSignIn.userLogin($scope, $http, name, pass);
        $ionicLoading.show({
            template:"<div>恭喜您注册成功!</div>",
            delay:100,
            duration:1000
        });
        $scope.register.rPhone = "";
        $scope.register.rPass = "";
        $scope.register.rPassC = "";
        $scope.register.rName = "";
        $scope.register.rCompany = "";
        var iLocation = $location.url().split("?")[0];
        if(iLocation === "/personal"){
            $timeout(function(){
                location.reload();
            },500);
        }else{
            $location.path("/personal");
        }
    };
};
/*}*/


searchResCtrl.$inject = [ "$scope", "$http", "searchResService", "$location", "$timeout" ];

var searchResarr = [ "$scope", "$http", "searchResService", "$location", "$timeout", searchResCtrl ];

indexModule.controller("searchRes", searchResarr);

/*}*/
register.$inject = [ "$scope", "$http", "$ionicLoading", "$location","$timeout" ], indexModule.controller("registerCtrl", register);

/*ShoppingCar PageEvt{*/
indexModule.service("shoppingCarService", function() {
    var service = {};
    var _sendBtnHide = true;
    var _isNone = true;
    var _openEditPrice = false;
    var _countNum = 0;
    var _spLists = [];
    service.getSendBtnHide = function() {
        return _sendBtnHide;
    };
    service.setSendBtnHide = function(sendBtnHide) {
        _sendBtnHide = sendBtnHide;
    };
    service.getIsNone = function() {
        return _isNone;
    };
    service.setIsNone = function(isNone) {
        _isNone = isNone;
    };
    service.getOpenEditPrice = function() {
        return _openEditPrice;
    };
    service.setOpenEditPrice = function(openEditPrice) {
        _openEditPrice = openEditPrice;
    };
    service.getCountNum = function() {
        return _countNum;
    };
    service.setCountNum = function(countNum) {
        _countNum = countNum;
    };
    service.getSpList = function() {
        return _spLists;
    };
    service.setSpList = function(spList) {
        _spLists = spList;
    };
    return service;
});

var shoppingCarCtrl = function($scope, $http, shoppingCarService, $ionicPopup, $location, $timeout, $ionicLoading) {
    $scope.sendjson = [];
    $scope.sendBtnHide = shoppingCarService.getSendBtnHide();
    $scope.isNone = shoppingCarService.getIsNone();
    $scope.openEditPrice = shoppingCarService.getOpenEditPrice();
    $scope.countNum = shoppingCarService.getCountNum();
    $scope.closeEditPrice = false;
    $scope.editPriceHide = false;
    $scope.editBtn = true;
    $scope.iProNum = [];
    var isNumErr = 0;

    $scope.addrPrompt = "";
    $scope.data = {
        addr: ""
    };

    $scope.spBackHide = $scope.getPerSpCar() == 0;
    $scope.shoppingCarIconState();
    $scope.$on("$stateChangeStart", function() {
       if($scope.spConfirm){
           $scope.spConfirm.close();
       }
       if($scope.sporConfirm){
           $scope.sporConfirm.close();
       }
       var iLocation = $location.url().split("?")[0];
       if(iLocation === "/myOrder"){
           localStorage.setItem("h", window.history.length);

       }
    });
    $scope.showConfirm = function(index) {
       $scope.spConfirm = $ionicPopup.confirm({
            title:"提 示",
            content:"是否将该产品从购物车中删除?",
            buttons:[ {
                text:"取 消",
                type:"alertCancel",
                onTap:function(e) {
                    return false;
                }
            }, {
                text:"确 定",
                type:"alertComfirm",
                onTap:function(e) {
                    return true;
                }
            }]
        });
        $scope.spConfirm.then(function(res) {
            if (res) {
                var jsondata = JSON.parse(localStorage.getItem(publicParameterObj.parameters.userName)).reverse();
                $scope.countNum = $scope.countNum - jsondata[index].mynumber * $scope.spLists[index].price;
                if (privateVerifictionObj.verifiction.isInt($scope.countNum) === false) {
                    $scope.countNum = privateVerifictionObj.verifiction.subNum($scope.countNum, 2);
                }
                publicEventsObj.operatingDatabaseEvent.deleteItemData($scope.spLists[index].id);
                $scope.deletePro(index);
            }
        });
    };
    $scope.sendOrderConfirm = function() {

        $scope.sporConfirm = $ionicPopup.prompt({
            title:"请填写收货地址",
            template:"<div class='item-input-inset alertInputView'><label class='item-input-wrapper alertInput'><input ng-model='data.addr' type='text' class='ng-pristine ng-valid text-center' maxlength='50'></label></div><h3 class='text-center assertive errText' ng-bind='addrPrompt'></h3>",
            scope:$scope,
            buttons:[ {
                text:"取 消",
                type:"alertCancel",
                onTap:function(e){
                    return false;
                }
            }, {
                text:"确 定",
                type:"alertComfirm",
                onTap:function(e) {
                    if($scope.data.addr != ""){
                        return true;
                    }else{
                        $scope.addrPrompt = "收货地址不能为空!";
                        e.preventDefault();
                    }
                }
            } ]
        });
        $scope.sporConfirm.then(function(res) {
            if (res) {
                var jsondata = JSON.parse(localStorage.getItem(publicParameterObj.parameters.userName));
                var jsonitems = {};
                for (var i = 0, len = jsondata.length; i < len; i++) {
                    if (i === 0) {
                        jsonitems = "{'prodNum':'" + jsondata[i].myid + "','cases':" + jsondata[i].mynumber + "}";
                    } else {
                        jsonitems = "{'prodNum':'" + jsondata[i].myid + "','cases':" + jsondata[i].mynumber + "}";
                    }
                    $scope.sendjson.push(jsonitems);
                }
                $scope.sendjson = "[" + $scope.sendjson + "]";
                getOrPostRequestObj.shoppingCarConnect.sendOrder($scope, $http);
            }
            $scope.addrPrompt = "";
        });

//        $scope.sporConfirm = $ionicPopup.confirm({
//            title:"提 示",
//            content:"是否提交订单?",
//            buttons:[ {
//                text:"取 消",
//                type:"alertCancel",
//                onTap:function(e) {
//                    return false;
//                }
//            }, {
//                text:"确 定",
//                type:"alertComfirm",
//                onTap:function(e) {
//                    return true;
//                }
//            }]
//        });
//        $scope.sporConfirm.then(function(res) {
//            if (res) {
//                var jsondata = JSON.parse(localStorage.getItem(publicParameterObj.parameters.userName));
//                var jsonitems = {};
//                for (var i = 0, len = jsondata.length; i < len; i++) {
//                    if (i === 0) {
//                        jsonitems = "{'prodNum':'" + jsondata[i].myid + "','cases':" + jsondata[i].mynumber + "}";
//                    } else {
//                        jsonitems = "{'prodNum':'" + jsondata[i].myid + "','cases':" + jsondata[i].mynumber + "}";
//                    }
//                    $scope.sendjson.push(jsonitems);
//                }
//                $scope.sendjson = "[" + $scope.sendjson + "]";
//                getOrPostRequestObj.shoppingCarConnect.sendOrder($scope, $http);
//            }
//        });
    };
    $scope.shoppingCarInit_CallBack = function(data, index) {
        shoppingCarService.setSpList($scope.shoppingCharReturnData(data, index));
        $scope.spLists = shoppingCarService.getSpList();
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.shoppingCharReturnData = function(data) {
        var idatas = data.respData;
        var idata = [];
        var tempporarySpace;
        var jsondata = JSON.parse(localStorage.getItem(publicParameterObj.parameters.userName)).reverse();
        for (var i = 0, len = idatas.length; i < len; i++) {
            tempporarySpace = {
                name:idatas[i].prodName,
                img:privateVerifictionObj.verifiction.imgLink(idatas[i].firstProdImg),
                id:idatas[i].prodNum,
                price:idatas[i].stdPrice,
                num:jsondata[i].mynumber,
                border2x:false,
                boderNone:false
            };
            idata.push(tempporarySpace);
            tempporarySpace = {};
            $scope.countNum = $scope.countNum + idatas[i].stdPrice * jsondata[i].mynumber;
            if (privateVerifictionObj.verifiction.isInt($scope.countNum) === false) {
                $scope.countNum = privateVerifictionObj.verifiction.subNum($scope.countNum, 2);
            }
        }
        shoppingCarService.setCountNum($scope.countNum);
        return idata;
    };
    $scope.isLogin_CallBack = function(bool) {
        if (bool) {
            if (localStorage.getItem(publicParameterObj.parameters.userName) === "[]" || localStorage.getItem(publicParameterObj.parameters.userName) === undefined) {
                $scope.isNone = false;
                $scope.sendBtnHide = true;
                shoppingCarService.setSendBtnHide(true);
                shoppingCarService.setIsNone(false);
            } else {
                var jsondata = JSON.parse(localStorage.getItem(publicParameterObj.parameters.userName));
                for (var i = 0, len = jsondata.length; i < len; i++) {
                    $scope.iProNum.push(jsondata[i].myid);
                    if (i === len - 1) {
                        $scope.sendBtnHide = false;
                        $scope.editBtn = false;
                        shoppingCarService.setSendBtnHide(false);
                    }
                }
                $scope.isNone = !(jsondata.length === 0);
                shoppingCarService.setIsNone($scope.isNone);
                getOrPostRequestObj.shoppingCarConnect.getShoppingInfo($scope, $http);
            }
        } else {
            $timeout(function() {
                $scope.userLoginShowHide(true);
            }, 500);
        }
    };
    $scope.changeProNumber = function(type, index) {
        var jsondata = JSON.parse(localStorage.getItem(publicParameterObj.parameters.userName)).reverse();
        if (type === "add") {
            ++$scope.spLists[index].num;
        } else {
            if ($scope.spLists[index].num > 1) {
                --$scope.spLists[index].num;
            }
	}
        $scope.countNum = $scope.countNum - jsondata[index].mynumber * $scope.spLists[index].price + $scope.spLists[index].num * $scope.spLists[index].price;
        if (privateVerifictionObj.verifiction.isInt($scope.countNum) === false) {
            $scope.countNum = privateVerifictionObj.verifiction.subNum($scope.countNum, 2);
        }
        publicEventsObj.operatingDatabaseEvent.updateData($scope.spLists[index].id, $scope.spLists[index].num);
        shoppingCarService.setCountNum($scope.countNum);
        shoppingCarService.setSpList($scope.spLists);
    };
    $scope.changeVal = function(index) {
        var jsondata = JSON.parse(localStorage.getItem(publicParameterObj.parameters.userName)).reverse();
        if (privateVerifictionObj.verifiction.isInt($scope.spLists[index].num)) {
            $scope.spLists[index].boderNone = false;
            $scope.spLists[index].border2x = false;
            isNumErr <= 0 ? isNumErr = 0 : isNumErr--;
            $scope.countNum = $scope.countNum - jsondata[index].mynumber * $scope.spLists[index].price + $scope.spLists[index].num * $scope.spLists[index].price;
            if (privateVerifictionObj.verifiction.isInt($scope.countNum) === false) {
                $scope.countNum = privateVerifictionObj.verifiction.subNum($scope.countNum, 2);
            }
            publicEventsObj.operatingDatabaseEvent.updateData($scope.spLists[index].id, $scope.spLists[index].num);
            shoppingCarService.setCountNum($scope.countNum);
        } else {
            $scope.spLists[index].border2x = true;
            isNumErr++;
        }
        shoppingCarService.setSpList($scope.spLists);
    };
    $scope.deletePro = function(index) {
        $scope.spLists.splice(index, 1);
        if ($scope.spLists.length === 0) {
            $scope.sendBtnHide = true;
            $scope.editBtn = true;
            $scope.isNone = false;
            shoppingCarService.setSendBtnHide(true);
            shoppingCarService.setIsNone(false);
        }
        shoppingCarService.setCountNum($scope.countNum);
        shoppingCarService.setSpList($scope.spLists);
    };
    $scope.openOrCloseEditPrice = function() {
        if ($scope.editPriceHide) {
            if (isNumErr !== 0) {
                $scope.showAlert("提 示", "请填写正确的商品数量!");
            } else {
                $scope.editPriceHide = false;
                $scope.closeEditPrice = true;
                $scope.openEditPrice = false;
                shoppingCarService.setOpenEditPrice(false);
            }
        } else {
            $scope.closeEditPrice = false;
            $scope.openEditPrice = true;
            $scope.editPriceHide = true;
            shoppingCarService.setOpenEditPrice();
        }
    };
    $scope.sendOrder = function() {
        $scope.sendOrderConfirm();
    };
    $scope.sendOrder_CallBack = function() {
        publicEventsObj.operatingDatabaseEvent.deleteallData();
        $scope.spLists = [];
        shoppingCarService.setSpList($scope.spLists);
        $scope.viewStates.setWaitingState(false);
        $scope.viewStates.setShoppingCarState(false);
        $ionicLoading.show({
            template:"<div>订单提交成功!</div>",
            delay:100,
            duration:2000
        });
        $location.path("/myOrder").replace();
    };
    $scope.showDetailed = function(index) {
        if ($scope.editPriceHide === false) {
            $location.path("/detailed").search({
                proNum:index,
		hisPage:1
            });
        }
    };
    $scope.toProd = function() {
        $location.path("/product");
    };
    if ($scope.viewStates.getShoppingCarState() === false) {
        shoppingCarService.setCountNum(0);
        $scope.countNum = 0;
        getOrPostRequestObj.userAndAdminSignIn.isUserLogin($scope, $http);
        $scope.viewStates.setShoppingCarState(true);
    } else {
        $scope.spLists = shoppingCarService.getSpList();
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
        if ($scope.spLists.length > 0) {
            $scope.editBtn = false;
        }
    }
};
/*}*/

/*SuperPro PageEvt{*/
var superProCtrl = function($scope, $http, $location, $timeout) {
    $scope.bodyHide = true;
    $scope.noMoreHide = true;
    $scope.loadingHide = false;
    $scope.pageNum = 2;
    var _isLodeMore = true;
    $scope.$on("$stateChangeStart", function() {
        $timeout.cancel($scope.loadHttp);
    });
    $scope.superOrderRefresh = function() {
        $timeout(function() {
            getOrPostRequestObj.superProConnect.superProList($scope, $http);
            $scope.$broadcast("scroll.refreshComplete");
        }, 2000);
    };
    $scope.superInit_CallBack = function(data) {
        $scope.sproDatas = $scope.superReturnData(data);
        $scope.pageNum = 2;
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.superLoadMore_CallBack = function(data) {
        var idatas = $scope.superReturnData(data);
        $scope.sproDatas.proLeftInfos = $scope.sproDatas.proLeftInfos.concat(idatas.proLeftInfos);
        $scope.sproDatas.proRightInfos = $scope.sproDatas.proRightInfos.concat(idatas.proRightInfos);
        $scope.pageNum++;
        $timeout(function() {
            _isLodeMore = false;
        }, 1000);
        $timeout(function() {
            $scope.loadingImg();
        }, 500);
    };
    $scope.superLoadMore = function() {
        if ($scope.noMoreHide && _isLodeMore === false) {
            _isLodeMore = true;
            $scope.loadHttp = $timeout(function() {
                getOrPostRequestObj.superProConnect.superProListLoadMore($scope, $http);
                $scope.$broadcast("scroll.infiniteScrollComplete");
            }, 2000);
        } else {
            $scope.$broadcast("scroll.infiniteScrollComplete");
        }
    };
    $scope.superReturnData = function(data) {
    	var proLeftInfos,
	proRightInfos,
	proLeftDatas = [],
	proRightDatas = [],
	idatas = data.respData.dataList;

        for (var i = 0, len = idatas.length; i < len; i += 2) {
            proLeftInfos = {
                proLeftNum:idatas[i].prodNum,
                proLeftImg:privateVerifictionObj.verifiction.imgLink(idatas[i].firstProdImg),
                proLeftName:idatas[i].prodName,
                proLeftPrice:"¥" + idatas[i].stdPrice
            };
            proLeftDatas.push(proLeftInfos);
            if (i + 1 < len) {
                proRightInfos = {
                    proRightNum:idatas[i + 1].prodNum,
                    proRightImg:privateVerifictionObj.verifiction.imgLink(idatas[i + 1].firstProdImg),
                    proRightName:idatas[i + 1].prodName,
                    proRightPrice:"¥" + idatas[i + 1].stdPrice
                };
                proRightDatas.push(proRightInfos);
            }
        }
        var idata = {
            proLeftInfos:proLeftDatas,
            proRightInfos:proRightDatas
        };
        if (idatas.length < 14) {
            $scope.noMoreHide = false;
            $scope.loadingHide = true;
        }
        return idata;
    };
    $scope.proLeftClick = function(index) {
        var perSpCar = $scope.getPerSpCar();
        $scope.setPerSpCar(perSpCar + 4);
        $location.path("/detailed").search({
            proNum:$scope.sproDatas.proLeftInfos[index].proLeftNum
        });
    };
    $scope.proRightClick = function(index) {
        var perSpCar = $scope.getPerSpCar();
        if (perSpCar > 0) {
            $scope.setPerSpCar(perSpCar + 4);
        } else {
            $scope.setPerSpCar(4);
        }
        $location.path("/detailed").search({
            proNum:$scope.sproDatas.proRightInfos[index].proRightNum
        });
    };
    getOrPostRequestObj.superProConnect.superProList($scope, $http);
};
/*}*/

shoppingCarCtrl.$inject = [ "$scope", "$http", "shoppingCarService", "$ionicPopup", "$location", "$timeout", "$ionicLoading" ];

var shoppingCararr = [ "$scope", "$http", "shoppingCarService", "$ionicPopup", "$location", "$timeout", "$ionicLoading", shoppingCarCtrl ];

indexModule.controller("shoppingCar", shoppingCararr);

/*UserLogin PageEvt{*/
var userLoginCtrl = function($scope, $http, $location) {
    $scope.login = {};
    $scope.loginStyle = {
        "border-bottom":"none",
        "box-shadow":"0 2px 3px rgba(0,0,0,.15)"
    };
    $scope.iuserLogin = function() {
        getOrPostRequestObj.userAndAdminSignIn.userLogin($scope, $http, $scope.login.userName, $scope.login.userPass);
        $scope.login.userPass = "";
    };
    $scope.userLoginDone_CallBack = function(name) {
        localStorage.setItem("userName", name + "");
        publicParameterObj.parameters.userName = localStorage.userName.replace(/\"/g, "");
        publicEventsObj.operatingDatabaseEvent.crateTable();
        getOrPostRequestObj.userAndAdminSignIn.userLoginState = true;
        getOrPostRequestObj.userAndAdminSignIn.testSetJushTagNalias($scope, $http);//注册推送
        $scope.toPersonal();
    };
    $scope.hideUserLogin = function() {
        var location = $location.url().split("?")[0];
        switch (location) {
            case "/personal":
                $scope.back();
                break;
            case "/modifyInfo":
            case "/modifyPass":
            case "/superPro":
            case "/myOrder":
            case "/waitingAudit":
                $scope.back(-2);
                break;
            case "/detailed":
            case "/message":
                $scope.pageHide();
                break;
            case "/shoppingCar":
                $scope.viewStates.setShoppingCarState(false);
                if ($scope.perSpCar !== 0) {
                    $scope.back(-$scope.perSpCar);
                } else {
                    $scope.back();
                }
                break;
            default:
                $scope.back();
                break;
        }
    };
    $scope.toPersonal = function() {
        switch ($location.url().split("?")[0]) {
            case "/personal":
            case "/modifyInfo":
            case "/modifyPass":
            case "/superPro":
            case "/myOrder":
            case "/waitingAudit":
            case "/shoppingCar":
                $scope.pageHide();
                location.reload();
                break;
            case "/detailed":
                if (getOrPostRequestObj.userAndAdminSignIn.isToShoppingCar === true) {
                    $location.path("/shoppingCar").search("");
                } else {
                    $scope.pageHide();
                }
                break;

            case "/message":
                if ($location.search().page === "editMessage") {
                    $scope.userLogin.hide();
                    $scope.editMessageShowHide(false);
                } else {
                    $location.path("/personal");
                }
                break;
            default:
                $location.path("/personal");
        }
    };
    $scope.userNameFocus = function() {
        $scope.nameStyle = {
            color:"#ef575c"
        };
    };
    $scope.userNameBlur = function() {
        $scope.nameStyle = {
            color:"#294775"
        };
    };
    $scope.userPassFocus = function() {
        $scope.passStyle = {
            color:"#ef575c"
        };
    };
    $scope.userPassBlur = function() {
        $scope.passStyle = {
            color:"#294775"
        };
    };
};
/*}*/

superProCtrl.$inject = [ "$scope", "$http", "$location", "$timeout" ];

indexModule.controller("superPro", superProCtrl);

/*UserModifyInfo PageEvt{*/
indexModule.service("modifyInfoService", function() {
    var service = {};
    var _perNameInfo = "未登录";
    var _companyInfo = "";
    var _userNameInfo = "";
    var _userPhoneInfo = "";
    var _userAddressInfo = "";

    service.getPerNameInfo = function() {
        return _perNameInfo;
    };
    service.setPerNameInfo = function(perNameInfo) {
        _perNameInfo = perNameInfo;
    };
    service.getCompanyInfo = function() {
        return _companyInfo;
    };
    service.setCompanyInfo = function(companyInfo) {
        _companyInfo = companyInfo;
    };
    service.getUserNameInfo = function() {
        return _userNameInfo;
    };
    service.setUserNameInfo = function(userNameInfo) {
        _userNameInfo = userNameInfo;
    };
    service.getPhoneInfo = function() {
        return _userPhoneInfo;
    };
    service.setPhoneInfo = function(userPhoneInfo) {
        _userPhoneInfo = userPhoneInfo;
    };
    service.getAddressInfo = function() {
        return _userAddressInfo;
    };
    service.setAddressInfo = function(userAddressInfo) {
        _userAddressInfo = userAddressInfo;
    };
    return service;
});

var modifyInfoCtrl = function($scope, $http, modifyInfoService, $timeout, $ionicLoading) {
    $scope.iInfoName = modifyInfoService.getPerNameInfo();
    var foucsStyle = {
        color:"#ef575c"
    };
    var blurStyle = {
        color:"#294775"
    };
    $scope.modify = {
        userCompany:modifyInfoService.getCompanyInfo(),
        userName:modifyInfoService.getUserNameInfo(),
        userPhone:modifyInfoService.getPhoneInfo(),
        userAddress:modifyInfoService.getAddressInfo()
    };
    $scope.muserCompanyFocus = function() {
        $scope.mCompany = foucsStyle;
    };
    $scope.muserCompanyBlur = function() {
        $scope.mCompany = blurStyle;
    };
    $scope.muserNameFocus = function() {
        $scope.mName = foucsStyle;
    };
    $scope.muserNameBlur = function() {
        $scope.mName = blurStyle;
    };
    $scope.muserPhoneFocus = function() {
        $scope.mPhone = foucsStyle;
    };
    $scope.muserPhoneBlur = function() {
        $scope.mPhone = blurStyle;
    };
    $scope.muserAddressFocus = function() {
        $scope.mAddress = foucsStyle;
    };
    $scope.muserAddressBlur = function() {
        $scope.mAddress = blurStyle;
    };
    $scope.userInfoInit_CallBack = function(data) {
        $scope.iInfoName = "用户名: " + data.respData.custName;
        $scope.modify.userCompany = data.respData.companyName;
        $scope.modify.userName = data.respData.contactPerson;
        $scope.modify.userPhone = data.respData.phoneNum;
        $scope.modify.userAddress = data.respData.address;
        $scope.updateInfo();
    };
    $scope.updateUserInfo = function() {
        if ($scope.modify.userCompany === "" || $scope.modify.userCompany === undefined) {
            $scope.showAlert("提 示", "公司名不能为空!");
        } else {
            if ($scope.modify.userName === "" || $scope.modify.userName === undefined) {
                $scope.showAlert("提 示", "联系人不能为空!");
            } else {
                if ($scope.modify.userPhone === "" || $scope.modify.userPhone === undefined) {
                    $scope.showAlert("提 示", "手机号码不能为空!");
                } else {
                    if (privateVerifictionObj.verifiction.iphonever($scope.modify.userPhone) === false) {
                        $scope.showAlert("提 示", "手机号码格式不正确!");
                    } else {
                        getOrPostRequestObj.registConnect.userUpdateInfo($scope, $http);
                    }
                }
            }
        }
    };
    $scope.updateUserInfoDone_CallBack = function() {
        $ionicLoading.show({
            template:"<div>个人信息修改完成!</div>",
            delay:100,
            duration:1000
        });
        $scope.updateInfo();
        window.history.back();
    };
    $scope.updateInfo = function() {
        modifyInfoService.setPerNameInfo($scope.iInfoName);
        modifyInfoService.setCompanyInfo($scope.modify.userCompany);
        modifyInfoService.setUserNameInfo($scope.modify.userName);
        modifyInfoService.setPhoneInfo($scope.modify.userPhone);
        modifyInfoService.setAddressInfo($scope.modify.userAddress);
    };
    if ($scope.viewStates.getModifyState() === false) {
        $timeout(function() {
            getOrPostRequestObj.registConnect.userGetInfo($scope, $http);
        }, 450);
        $scope.viewStates.setModifyState(true);
    }
};
/*}*/

userLoginCtrl.$inject = [ "$scope", "$http", "$location" ];

indexModule.controller("userLoginCtrl", userLoginCtrl);

/*UserModifyPass PageEvt{*/
var modifyPassCtrl = function($scope, $http, $ionicLoading) {
    var foucsStyle = {
        color:"#ef575c"
    };
    var blurStyle = {
        color:"#294775"
    };
    $scope.updatePass = {};
    $scope.oldPassFocus = function() {
        $scope.oldPassStyle = foucsStyle;
    };
    $scope.oldPassBlur = function() {
        $scope.oldPassStyle = blurStyle;
    };
    $scope.newPassFocus = function() {
        $scope.newPassStyle = foucsStyle;
    };
    $scope.newPassBlur = function() {
        $scope.newPassStyle = blurStyle;
    };
    $scope.newPassCFocus = function() {
        $scope.newPassCStyle = foucsStyle;
    };
    $scope.newPassCBlur = function() {
        $scope.newPassCStyle = blurStyle;
    };
    $scope.clearData = function() {
        $scope.updatePass.oldPass = "";
        $scope.updatePass.newPass = "";
        $scope.updatePass.newPassC = "";
    };
    $scope.modifyPassDone = function() {
        $ionicLoading.show({
            template:"<div>密码修改成功!</div>",
            delay:100,
            duration:1000
        });
    };
    $scope.modifyPassDone_CallBakc = function() {
        $scope.modifyPassDone();
        window.history.back();
    };
    $scope.sendNewPass = function() {
        if (privateVerifictionObj.verifiction.isLetterAndNum($scope.updatePass.oldPass) === false) {
            $scope.showAlert("提 示", "旧密码输入错误，只能由数字或字母组成!");
        } else {
            if (privateVerifictionObj.verifiction.isLetterAndNum($scope.updatePass.newPass) === false || $scope.updatePass.newPass === undefined) {
                $scope.showAlert("提 示", "新密码输入错误，只能由数字或字母组成!");
            } else {
                if ($scope.updatePass.newPass !== $scope.updatePass.newPassC) {
                    $scope.showAlert("提 示", "新密码两次输入不一致!");
                } else {
                    getOrPostRequestObj.userAndAdminSignIn.userModifyPass($scope, $http, $scope.updatePass.oldPass, $scope.updatePass.newPass);
                }
            }
        }
    };
};
/*}*/
modifyInfoCtrl.$inject = [ "$scope", "$http", "modifyInfoService", "$timeout", "$ionicLoading" ];

var modifyInfoarr = [ "$scope", "$http", "modifyInfoService", "$timeout", "$ionicLoading", modifyInfoCtrl ];

indexModule.controller("modifyInfo", modifyInfoarr);

/*UserWaitingAudit PageEvt{*/
//var waitingAuditCtrl = function($scope, $http, $location, $timeout) {
//    $scope.custName = "未登录";
//    $scope.noMoreHide = true;
//    $scope.loadingHide = false;
//    $scope.pageNum = 2;
//    var _isLodeMore = true;
//    $scope.$on("$stateChangeStart", function() {
//        $timeout.cancel($scope.loadHttp);
//    });
//
//
//    $scope.userWaitingRefresh = function() {
//        $timeout(function() {
//            getOrPostRequestObj.userWaitingAuditConnect.userShowWaitingList($scope, $http);
//            $scope.noMoreHide = true;
//            $scope.loadingHide = false;
//            $scope.$broadcast("scroll.refreshComplete");
//        }, 2000);
//    };
//    $scope.waOrderInit_CallBack = function(data) {
//        $scope.waoLists = $scope.waitingAuditRetrunData(data);
//        $scope.pageNum = 2;
//        $timeout(function() {
//            _isLodeMore = false;
//        }, 1000);
//        $timeout(function() {
//            $scope.loadingImg();
//        }, 500);
//    };
//    $scope.waOrderLoadMore_CallBack = function(data) {
//        var idatas = $scope.waitingAuditRetrunData(data);
//        $scope.waoLists = $scope.waoLists.concat(idatas);
//        $scope.pageNum++;
//        $timeout(function() {
//            _isLodeMore = false;
//        }, 1000);
//        $timeout(function() {
//            $scope.loadingImg();
//        }, 500);
//    };
//    $scope.isLogin_CallBack = function(bool) {
//        if (bool === true) {
//            $scope.custName = publicParameterObj.parameters.userName;
//        } else {
//            $scope.custName = "未登录";
//        }
//    };
//    $scope.waitingAuditLoadMore = function() {
//        if ($scope.noMoreHide && _isLodeMore === false) {
//            _isLodeMore = true;
//            $scope.loadHttp = $timeout(function() {
//                getOrPostRequestObj.userWaitingAuditConnect.userWaitingListLoadMore($scope, $http);
//                $scope.$broadcast("scroll.infiniteScrollComplete");
//            }, 2000);
//        } else {
//            $scope.$broadcast("scroll.infiniteScrollComplete");
//        }
//    };
//    $scope.waitingAuditRetrunData = function(data) {
//        var tempporarySpace,
//	iPro = [],
//	iHidePro = [],
//	proItem,
//	item = [],
//	idata = [],
//	idatas = data.respData.dataList,
//	isBtnHide = true,
//	isHide = true;
//        for (var i = 0, len = idatas.length; i < len; i++) {
//            isBtnHide = true;
//            isHide = true;
//            item.push({
//                orderItem:"产品总数: " + idatas[i].origOrderItemList.length
//            });
//            item.push({
//                orderItem:"成交总价: " + idatas[i].priceTotal
//            });
//            item.push({
//                orderItem:"下单日期: " + idatas[i].createDate
//            });
//            for (var j = 0, ilen = idatas[i].origOrderItemList.length; j < ilen; j++) {
//                proItem = {
//                    proId:idatas[i].origOrderItemList[j].prodNum,
//                    proImg:privateVerifictionObj.verifiction.imgLink(idatas[i].origOrderItemList[j].whereimg),
//                    proName:idatas[i].origOrderItemList[j].prodName,
//                    proNum:"订购数量 : " + idatas[i].origOrderItemList[j].cases,
//                    proPrice:"¥" + idatas[i].origOrderItemList[j].prodPrice
//                };
//                if (j < 3) {
//                    iPro.push(proItem);
//                } else {
//                    isBtnHide = true;
//                    isHide = false;
//                    iHidePro.push(proItem);
//                }
//                proItem = {};
//            }
//            tempporarySpace = {
//                waorderId:idatas[i].origOrderNum,
//                isProHide:isBtnHide,
//                isHide:isHide,
//                waoItems:item,
//                waoPros:iPro,
//                date:idatas[i].createDate,
//                waiCountNum:iHidePro.length + iPro.length,
//                waoHidePro:iHidePro,
//                waiCountPrice:"¥" + idatas[i].priceTotal,
//                btnText:"显示全部"
//            };
//            idata.push(tempporarySpace);
//            item = [];
//            iPro = [];
//            iHidePro = [];
//        }
//        if (idatas.length < 9) {
//            $scope.noMoreHide = false;
//            $scope.loadingHide = true;
//        }
//        return idata;
//    };
//    $scope.toDetailed = function(index) {
//        var perSpCar = $scope.getPerSpCar() + 4;
//        $scope.setPerSpCar(perSpCar);
//        $location.path("/detailed").search({
//            proNum:index
//        });
//    };
//    $scope.hideShowPro = function(index) {
//        $scope.waoLists[index].isProHide = !$scope.waoLists[index].isProHide;
//        $scope.waoLists[index].isProHide ? $scope.waoLists[index].btnText = "显示全部" :$scope.waoLists[index].btnText = "隐藏部分";
//    };
//    $timeout(function() {
//        getOrPostRequestObj.userAndAdminSignIn.isUserLogin($scope, $http);
//    }, 450);
//    getOrPostRequestObj.userWaitingAuditConnect.userShowWaitingList($scope, $http);
//};
/*}*/

modifyPassCtrl.$inject = [ "$scope", "$http", "$ionicLoading" ];

indexModule.controller("modifyPass", modifyPassCtrl);

//waitingAuditCtrl.$inject = [ "$scope", "$http", "$location", "$timeout" ];

//indexModule.controller("waitingAudit", waitingAuditCtrl);