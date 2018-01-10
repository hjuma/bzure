import { Pipe } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
    name: 'OrderBy'
})
export class OrderBy {
    transform(value, isAscending, columnName, index) {
        if (value) {
            value.sort((a: any, b: any) => {
                let objA = a['values']['display_order'];
                let objB = b['values']['display_order'];
                if(isNullOrUndefined(objA) || isNullOrUndefined(objB)){
                    objA = a['values']['name'];
                    objB = b['values']['name'];
                    if(isNullOrUndefined(objA) || isNullOrUndefined(objB)){
                        objA = a['values']['code'];
                        objB = b['values']['code'];
                    }
                }
                if (objA < objB) {
                    return -1;
                } else if (objA > objB) {
                    return 1;
                } else {
                    return 0;
                }
            });
            if (!isAscending) {
                value.reverse();
            }
            return value;
        } else {
            return value;
        }

    }
}
