// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    endPoints: {
        apiBase: 'http://localhost:3000/api/v1/',
        asset: 'asset',
        assets: 'assets',
        users: 'users',
        facility: 'facility',
        facilities: 'facilities',
        referenceData: 'reference-data',
        businessUnit: 'business-unit',
        businessUnits: 'business-units',
        barrier: 'barrier',
        barriers: 'barriers',
        barrierType: 'barrier-type',
        barrierTypes: 'barrier-types',
        barrierElement: 'barrier-element',
        barrierElements: 'barrier-elements',
        add: 'add',
        update: 'update',
        dataQuality: 'data-quality',
        login: 'login',
        rsa: 'rsa',
        ruleSet: 'rule-set',
        dataExistence:'app-data-exist'
    }
};
