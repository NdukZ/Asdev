"use strict";

exports.camelCase = function (str) {
  const r = new RegExp(/(?:^\w|[A-Z]|\b\w|\s+)/g);
  const n = str.replace(r, function (x, y) {
    if (+x == 0) {
      return '';
    }

    const z = (y == 0) ? x.toLowerCase() : x.toUpperCase();

    return z;
  });

  return n;
};

exports.snakeCase = function (str, delimiter = '_') {

  const r = new RegExp(/(?:^\w|[A-Z]|\b\w|\s+)/g);
  const n = str.replace(r, function (x, y) {
    if (+x == 0) {
      return '';
    }

    const z = (y === 0) ? x.toLowerCase() : (delimiter + x.toLowerCase());

    return z;
  });

  return n;
};

exports.titleCase = function (str) {
  const r = new RegExp(/(?:^\w|[A-Z]|\b\w|\s+)/g);
  const n = str.replace(r, function (x, y) {
    if (+x == 0) {
      return '';
    }

    const z = (y === 0) ? x.toUpperCase() : (' ' + x.toUpperCase());

    return z;
  });

  return n;
};

exports.studlyCase = function (str) {
  const r = new RegExp(/(?:^\w|[A-Z]|\b\w|\s+)/g);
  const n = str.replace(r, function (x, y) {
    if (+x == 0) {
      return '';
    }

    const z = (y === 0) ? x.toUpperCase() : x.toUpperCase();

    return z;
  });

  return n;
};

exports.basename = function (ns, str) {
  str = str.split('').reverse().join('');
  str = str.split(ns);
  str = str[0].split('').reverse().join('');

  return str;
};

exports.endsWith = function (e, str) {
  const regex = new RegExp(e + '$');
  const n = regex.test(str);

  return n;
};

exports.startsWith = function (e, str) {
  const regex = new RegExp('^' + e);
  const n = regex.test(str);

  return n;
};

exports.after = function (e, str) {
  str = str.split(e);
  str = str[1] ? str[1] : '';

  return str;
};

exports.before = function (e, str) {
  str = str.split(e);
  str = str[0];

  return str;
};

exports.finish = function (e, str) {
  const x = module.exports.endsWith(e, str);
  str = (x == true) ? str : str + e;

  return str;
};

exports.start = function (e, str) {
  const x = module.exports.startsWith(e, str);
  str = (x == true) ? str : e + str;

  return str;
};

exports.contains = function (e, str) {
  const regex = new RegExp('(' + e + ')');
  const n = regex.test(str);

  return n;
};

exports.limit = function (n, str, prefix) {
  str = str.slice(0, n);
  str = (n > str.length) ? str : (prefix ? (str + prefix) : (str + '...'));

  return str;
};

/**
* Generate a more truly "random" alpha-numeric string or custom.
*
* @param  int  $length
* @return string
*/
exports.random = function (n, str) {
 
  if(str ==  null || str == ''){
      str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  }else{
     str = str.split('')
  }
  str = str.sort(function (a, b) {
    return 0.5 - Math.random()
  });
  str = str.join('').slice(0, n);

  return str;
};

exports.slug = function (str, prefix) {
  str = str.toLowerCase();
  str = str.replace(/\s+/g, prefix ? prefix : '-');
  return str;
};

 /**
* Replace the first occurrence of a given value in the string.
*
* @param  string  $search
* @param  string  $replace
* @param  string  $subject
* @return string
*/
exports.replaceFirst = function  (search, replace, subject)
{
    if (search == '') {
        return subject;
    }

    let position = subject.indexOf(search);

    if (position !== false) {
        return subject.substring(0, position) + replace + subject.substring(parseInt(position) + parseInt(search.length));
    }

    return subject;
}

/**
 * Replace the last occurrence of a given value in the string.
 *
 * @param  string  $search
 * @param  string  $replace
 * @param  string  $subject
 * @return string
 */
exports.replaceLast = function  (search, replace, subject)
{
    if (search == '') {
        return subject;
    }
    let position = subject.lastIndexOf(search);

    if (position !== false) {
         return subject.substring(0, position) + replace + subject.substring(parseInt(position) + parseInt(search.length));
    }

    return subject;
}

/**
 * Replace a given value in the string sequentially with an array.
 *
 * @param  string  $search
 * @param  array   $replace
 * @param  string  $subject
 * @return string
 */
exports.replaceArray = function(search, replace, subject)
{
    replace.forEach(function(value) {
        subject = module.exports.replaceFirst(search, value, subject)
    });
    return subject;
}

// /**
//      * Determine if a given string matches a given pattern.
//      *
//      * @param  string|array  $pattern
//      * @param  string  $value
//      * @return bool
//      */
// exports.is = function($pattern, $value)
// {
//     $patterns = Arr::wrap($pattern);

//     if (empty($patterns)) {
//         return false;
//     }

//     foreach ($patterns as $pattern) {
//         // If the given value is an exact match we can of course return true right
//         // from the beginning. Otherwise, we will translate asterisks and do an
//         // actual pattern match against the two strings to see if they match.
//         if ($pattern == $value) {
//             return true;
//         }

//         $pattern = preg_quote($pattern, '#');

//         // Asterisks are translated into zero-or-more regular expression wildcards
//         // to make it convenient to check if the strings starts with the given
//         // pattern such as "library/*", making any string check convenient.
//         $pattern = str_replace('\*', '.*', $pattern);

//         if (preg_match('#^'.$pattern.'\z#u', $value) === 1) {
//             return true;
//         }
//     }

//     return false;
// }

/**
 * Convert a string to kebab case.
 *
 * @param  string  $value
 * @return string
 */
exports.kebab =  function(value)
{
    return module.exports.snakeCase(value, '-');
}

