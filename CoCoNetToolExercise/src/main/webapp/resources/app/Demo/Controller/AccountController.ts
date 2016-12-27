/// <reference path='../../_all.ts' />

module Demo {
    export class AccountController extends BaseController {
        'use strict';

        private count: number;
        public static $inject = [
            '$scope',
            '$location',
            'accountService'
        ];

        /// Conctructor
        constructor(private $scope: IMyAccountScope, private $location: ng.ILocationService,private $accountService: IAccountService) {
            super($scope);
            debugger;
            
            this.count = 0;  
            $scope.vm = this;         
        }

        // Init
        public Init() {
            super.BaseInit();
        }
        
        SaveDetails(){
        debugger;
        	var firstName = this.$scope.firstName;
        	var lastName = this.$scope.lastName;
        	var email = this.$scope.email;
        	var password = this.$scope.password;
        	var designation = this.$scope.designation;
        	var aboutyou = this.$scope.aboutyou;
        	var gender = this.$scope.gender;
        	var termandconditions = this.$scope.termandconditions;
        	this.$accountService.saveAccountInfo(this.$scope).then();
        }
        
    }
    
    angular.module("Demo").controller("accountController", AccountController);
}