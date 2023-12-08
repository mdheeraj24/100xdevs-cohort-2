/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isValidCharacter(c) {
  const charCode = c.charCodeAt(0);
  return charCode >= 97 && charCode <= 122; 
}

function isPalindrome(str) {
  if (str.length <= 1) return true;
  str = str.toLowerCase();
  let len = str.length;
  let start = 0;
  let end = len - 1;
  while (start < end) {
    if (!isValidCharacter(str[start])) {
      start++;
      continue;
    }

    if (!isValidCharacter(str[end])) {
      end--;
      continue;
    }

    if (str[start] != str[end]) return false;
    start++;
    end--;
  }
  return true;
}

module.exports = isPalindrome;
