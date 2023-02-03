import { data } from './data';

// type Data = typeof data;
// export type TransformedData = BigObject[];

// export type BigObject = {
//   designation: string;
//   opposite: Omit<BigObject, 'opposite'>[];
//   senderDesignation: string;
//   transferQty: number;
//   time: string;
//   date: string;
// };

// export function transform(data: Data): TransformedData {
export function transform(data) {
  const seen = new Map();
  const transformedData = [];
  data.forEach((item) => {
    if (!seen.get(item.senderDesignation)) {
      transformedData.push({
        ...item,
        opposite: [],
      });
      seen.set(item.senderDesignation, true);
    } else {
      let foundItem = transformedData.find(
        (data) => data.senderDesignation === item.senderDesignation
      );
      foundItem.opposite = [...foundItem.opposite, item];
    }
  });

  return transformedData;
}
