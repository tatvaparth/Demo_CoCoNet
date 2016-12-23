/// <reference path='../../_all.ts' />

module Demo {
    export class BaseController {
        'use strict';

        private $baseScope: ICOCOScope;

        constructor($scope: ICOCOScope) {
            this.$baseScope = $scope;
        }

        public BaseInit() {

        }

    }

    angular.module("Demo").controller("baseController", BaseController);
}