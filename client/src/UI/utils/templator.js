import get from 'lodash/get.js';

const TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
const EXEC_REGEXP = /\{\{\{(.*?)\}\}\}/gis;

function _compileTemplate(tmpl) {
  let key = null;
  let html = tmpl;
  let func = null;

  while ((func = EXEC_REGEXP.exec(tmpl))) {

    if (func[1]) {

      let val = eval(func[1]);

      if (val === undefined)
        val = '';
      else if (val instanceof Array)
        val = val.join(' ');

      html = String(html).replace(func[0], val);
      // html = html.replace(new RegExp(func[0], 'gis'), val);


    }
  }

  while ((key = TEMPLATE_REGEXP.exec(tmpl))) {

    if (key[1]) {
      let data = get(this, key[1].trim());
      if (data === undefined) {
        html = html.replace(new RegExp(key[0], 'gi'), '');
        continue;
      }

      if (typeof data === 'function') {
        window[key[1].trim()] = data;
        html = html.replace(
          new RegExp(key[0], 'gi'),
          `window.${key[1].trim()}(event)`,
        );
        continue;
      }

      html = html.replace(new RegExp(key[0], 'gi'), data);
    }
  }

  return html;
}

export function compile(template, ctx) {
  return _compileTemplate.bind(ctx)(template);
}
