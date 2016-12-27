/// <reference path='../../_all.ts' />

module Demo {
    export interface IAccountService {
        saveAccountInfo($scope: IMyAccountScope): ng.IHttpPromise<string>;
    }
}