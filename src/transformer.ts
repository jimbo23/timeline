import { data } from './data';

// type Data = typeof data;
// export type TransformedData = Array<{
//   designation: string;
//   opposite: TransformedData[0];
//   senderDesignation: string;
//   transferQty: number;
//   time: string;
//   date: string;
// }>;

// export function transform(data: Data): TransformedData {
export function transform(data) {
  const seen = new Map();
  const transformedData = [];
  data.forEach((item) => {
    if (!seen.get(item.senderDesignation)) {
      transformedData.push({
        ...item,
        opposite: null,
      });
      seen.set(item.senderDesignation, true);
    } else {
      let foundItem = transformedData.find(
        (data) => data.senderDesignation === item.senderDesignation
      );
      foundItem.opposite = { ...item, opposite: null };
    }
  });

  return transformedData;
}
