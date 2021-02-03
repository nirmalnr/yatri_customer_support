import clone from 'clone';
// import IntlMessages from '../../../components/utility/intlMessages';
import { DateCell, ImageCell, LinkCell, TextCell } from '../Tables/antTables/helperCells';

const renderCell = (object, type, key) => {
    const value = object[key];
    switch (type) {
        case 'ImageCell':
            return ImageCell(value);
        case 'DateCell':
            return DateCell(value);
        case 'LinkCell':
            return LinkCell(value);
        default:
            return TextCell(value);
    }
};

const columns = [
    {
        title: "Trip ID",
        key: 'id',
        width: '1%',
        render: object => renderCell(object, 'TextCell', 'id')
    },
    {
        title: "Traveler Name",
        key: 'travellerName',
        width: 100,
        render: object => renderCell(object, 'TextCell', 'travellerName')
    },
    {
        title: "Traveler Phone",
        key: 'travellerPhone',
        width: 200,
        render: object => renderCell(object, 'TextCell', 'travellerPhone')
    },
    {
        title: "Trip Start Time",
        key: 'startTime',
        width: 200,
        render: object => renderCell(object, 'TextCell', 'startTime')
    },
    {
        title: "Trip End Time",
        key: 'endTime',
        width: 200,
        render: object => renderCell(object, 'TextCell', 'endTime')
    },
    {
        title: "Vehicle",
        key: 'vehicleVariant',
        width: 200,
        render: object => renderCell(object, 'TextCell', 'vehicleVariant')
    }
];

const tableinfo = {
    title: 'Simple Table',
    value: 'simple',
    columns: clone(columns)
};

export { columns, tableinfo };
