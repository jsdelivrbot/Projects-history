import { addParamsToURL } from 'utils';

const { describe, it, expect } = global;

describe('addParamsToURL', () => {
  it('returns new url type of string', () => {
    const filter = {
      orderNo: 'orderNo',
      id: 'id',
      mapping_id: 'mapping_id',
      slotId: 'slotId',
      holidayId: 'holidayId',
      zoneId: 'zoneId',
      zoneType: 'zoneType',
      linkId: 'linkId',
      addressId: 'addressId',
      detailId: 'detailId',
      itemId: 'itemId'
    };
    const url = '/v1/categories/7';
    const newUrl = '/v1/categories/7&orderNo=orderNo&id=id&slotId=slotId&holidayId=holidayId&zoneId=zoneId&zoneType=zon'
        + 'eType&linkId=linkId&addressId=addressId&detailId=detailId&itemId=itemId';

    expect(addParamsToURL(filter, url)).toEqual(newUrl);
  });
});
