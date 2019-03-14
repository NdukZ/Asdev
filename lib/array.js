"use strict";

/**
 * Determine whether the given value is array accessible.
 *
 * @param  mixed  $value
 * @return bool
 */
exports.accessible = function(value)
{
    return Array.isArray(value) || typeof value === 'object';
}

/**
 * Add an element to an array using "dot" notation if it doesn't exist.
 *
 * @param  array   $array
 * @param  string  $key
 * @param  mixed   $value
 * @return array
 */
exports.add = function(array, key, value)
{
    if (module.exports.accessible(array)  === true) {
        return module.exports.set(array, key, value);
    }

    return [];
}

/**
 * Get an item from an array using "dot" notation.
 *
 * @param  \ArrayAccess|array  $array
 * @param  string  $key
 * @param  mixed   $default
 * @return mixed
 */
// exports.get = function(array, key, default = null )
// {
//     if (!module.exports.accessible(array)) {
//         return default;
//     }

//     if (key === null) {
//         return array;
//     }

//     if (strpos($key, '.') === false) {
//         return $array[$key] ?? value(default);
//     }

//     foreach (explode('.', $key) as $segment) {
//         if (static::accessible($array) && static::exists($array, $segment)) {
//             $array = $array[$segment];
//         } else {
//             return value($default);
//         }
//     }

//     return $array;
// }

exports.set =  function(array, key, value)
{
    if ((key) === null) {
        return array = value;
    }

    let keys = key.split(".");

    while (keys.length > 1) {
        key = keys.shift();

        // If the key doesn't exist at this depth, we will just create an empty array
        // to hold the next value, allowing us to create the arrays to hold final
        // values at the correct depth. Then we'll keep digging into the array.
        if (typeof array[key] === 'undefined' || ! Array.isArray(array[key]) === false ) {
            array[key] = [];
        }

        array.push(array[key]);
    }
    if( typeof value !== 'undefined'){
    	array[keys.shift()] = value;
    }else{
    	array.push(key);
    }
    

    return array;
}

exports.collapse = function (array) {
	const len = array.length;
	var n = [];
	var q = 0;

	if (len > 0) {
		for ( ;q < len; q++) {
			if (Array.isArray(array[q])) {
				var w = 0;
				var e = array[q].length;

				for ( ;w < e; w++) {
					n.push(array[q][w]);
				}
			} else {
				n.push(array[q]);
			}
		}

		return n;
	}

	return [];
};

exports.except = function (array, keys) {
	if (Array.isArray(keys)) {
		const len = keys.length;
		var q = 0;

		for ( ;q < len;q++) {
			if (array.indexOf(keys[q]) >= 0) {
				array = array.filter(function (x) {return x !== keys[q];});
			}
		}

		return array;
	} else {
		return array.filter(function (x) {return x !== keys;});
	}
};

exports.only = function (array, keys) {
	if (Array.isArray(keys)) {
		const len = keys.length;
		var q = 0;
		var n = [];

		for ( ;q < len;q++) {
			if (array.indexOf(keys[q]) >= 0) {
				n.push(keys[q]);
			}
		}

		return n;
	} else {
		return array.filter(function (x) {return x === keys;});
	}
};

exports.first = function (array) {
	return Array.isArray(array) ? array[0] : array;
};

exports.last = function (array) {
	return Array.isArray(array) ? array[array.length - 1] : array;
};

/**
 * Divide an array into two arrays. One with keys and the other with values.
 *
 * @param  array  $array
 * @return array
 */
exports.divide = function(array)
{
	let output = {
		keys 	: Object.keys(array),
		values 	: Object.values(array)
	}
    return output;
}

/**
 * Flatten a multi-dimensional array into a single level.
 *
 * @param  array  $array
 * @param  int  $depth
 * @return array
 */

exports.flatten = function(array, depth = Infinity)
    {
        let result = [];
        Object.values(array).forEach(function(item) {
	        // $item = $item instanceof Collection ? $item->all() : $item;

            if (!Array.isArray(item)) {
                result.push(item);
            } else if (depth === 1) {
            	result = result.concat(Object.values(item));
            } else {
            	result = result.concat(module.exports.flatten(item, depth - 1));
            }
	    });

        return result;
    }
