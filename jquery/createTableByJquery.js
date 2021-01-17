'use strict';

var $ = require("jquery");

const dataArray = [
  ['Used', 2],
  ['Free', 8]
]
const colors = [
  'red', 'blue'
]
const itemTitle = 'Value'
const percentTitle = 'Percent'
const total = 10
const unit = 'TB'
const isShowPercent = true

// main process
const topElem = $('#table-insert')

// table header
const theadElem = $('<thead></thead>')
let header = '<tr><th colspan="2" style="text-align:left"></th>';
header += `<th>${itemTitle}</th>`
if (isShowPercent) {
  header += `<th>${percentTitle}</th>`;
}
header += '</tr>'
theadElem.append(header);
topElem.append(theadElem);

// table body
const tbodyElem = $('<tbody></tbody>');
let body = '<tr>'
dataArray.forEach((array, index) => {
  body += `  <td style="color:${colors[index]}">■</td>
  <td>${array[0]}</td>
  <td>${array[1]} ${unit}</td>
  ${getPercentHtml(array[1])}
</tr>`
})
body += '</tr>'
tbodyElem.append(body);
topElem.append(tbodyElem);



function getPercentHtml(value) {
  if (isShowPercent) {
    return '<td>' + String(value / total * 100) + '%</td>';
  }
  return '';
}
