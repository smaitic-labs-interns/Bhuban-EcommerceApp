import Mustache from 'mustache';

/**
 * * Create table and attatch with template
 * @param {*} template
 * @param {*} msgData
 * @param {*} table
 * @returns
 */

export const prepareTemplateMsg = (template, msgData, table = {}) => {
  let genTable = `
  <table style="border-collapse: collapse; width: 100%">
    <thead style="color: #1976d2">
      <tr>`;

  let tableLen = Object.keys(table).length;

  if (tableLen) {
    for (let col of table.column) {
      genTable += `<th style="border: 3px solid #1976d2; padding: 8px">${col}</th>`;
    }
    genTable += `
      </tr>
    </thead>
    <tbody style="font-style: italic">`;

    for (let row of table.rows) {
      genTable += `<tr>`;
      for (let data of row) {
        genTable += `<td style="border: 1px solid #1976d2; padding: 8px">${data}</td>`;
      }
      genTable += `</tr>`;
    }
    genTable += ` 
      </tbody>
    </table>`;
    msgData.table = genTable;
  }

  template.content = Mustache.render(template.content, msgData);
  return template;
};
