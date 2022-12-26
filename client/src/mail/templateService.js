import Mustache from 'mustache';

export const prepareTemplateMsg = (template, msgData) => {
  let msg = {};
  // msgData.jsonToTable = function () {
  //   return function (text, render) {
  //     let attr = text.replace(new RegExp(/[{}]/, 'g'), '');
  //     return tableify(msgData[attr]);
  //   };
  // };
  // msgData.jsonToCliTable = function () {
  //   return function (text, render) {
  //     let attr = text.replace(new RegExp(/[{}]/, 'g'), '');
  //     console.log('attr ->', attr);
  //     console.log('msgData ->', msgData);
  //     let docs = msgData[attr];
  //     let table = new Table(tableCellSeperators);
  //     docs.forEach((doc) => table.push(doc));
  //     return table.toString();
  //   };
  // };
  // msgData.printOrderDetails = function () {
  //   return function (text, render) {
  //     let attr = text.replace(new RegExp(/[{}]/, 'g'), '');
  //     return prepareOrderTables(msgData[attr]);
  //   };
  // };

  // msgData.printVendorOrderDetails = function () {
  //   return function (text, render) {
  //     let attr = text.replace(new RegExp(/[{}]/, 'g'), '');
  //     return prepareVendorOrderTables(msgData[attr]);
  //   };
  // };

  template.content = Mustache.render(template.content, msgData);
  return template;
};
