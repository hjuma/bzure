import { Pipe } from '@angular/core';

@Pipe({
    name: 'TableSort'
})
export class TableSort {
    transform(value, sortText, sortIndex, headerData, isNew) {
        const text = (sortText !== undefined) ? sortText : '';
        if (value !== undefined && !isNew) {
            const sortedData = [];
            const headerSorted = [];
            let count = 0;
            headerData.map((headerFilter, index) => {
                if (headerFilter['columnFilter'] !== undefined && headerFilter['columnFilter'] !== '') {
                    headerSorted.push({ index: index, filter: headerFilter });
                }
            });

            value.map((val) => {
                headerSorted.map((elem) => {
                    const data = val['values'][elem['filter']['fieldName']];
                    const search = elem['filter']['columnFilter'];
                    if (data != null && typeof (data) === 'string' && data.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                        count++;
                    }
                    if (data != null && typeof (data) === 'object' && data['name'].toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                        count++;
                    }
                });
                if (count === headerSorted.length) {
                    sortedData.push(val);
                }
                count = 0;
            });
            return sortedData;
        }
        return value;
    }
}
