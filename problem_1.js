/* Task

Provide 3 unique implementations of the following function in JavaScript.

**Input**: `n` - any integer

*Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
*/

// Method used: For-loop
var sum_to_n_a = function(n) {
  let sum = 0;

  // Case where input n is 0
  if (n === 0) {
    return 0;
  } 
  // Case where n is negative
  else if (n > 0) { 
      for (let i = 1; i <= n; i++) {
          sum += i;
      }
  } 
  // Case where n is positive
  else {
      for (let i = -1; i >= n; i--) {
          sum += i;
      }
  }
  return sum;
};

// Method used: Recursion
var sum_to_n_b = function(n) {

  // Case where input n is 0
  if (n == 0){
    return 0;
  }
  
  // base case for positive integer
  if (n == 1){
    return 1;
  } 
  // base case for negative integer
  else if (n == -1) {
    return -1
  }

  // Recursion where n is positive
  if (n > 0) {
    return n + sum_to_n_b(n-1)
  } 
  // Recursion where n is negative
  else {
    return n + sum_to_n_b(n+1)
  }
};


// Method used: Summation of Arithmetic Progression (AP)
// sum of first n terms of AP = (num_of_term / 2) (first_term + last_term)
var sum_to_n_c = function(n) {

  // Case where input n is 0
  if (n == 0){
    return 0;
  } 
  // Case where n is positive
  else if (n > 0) {
    return (n / 2) * (1 + n)
  } 
  // Case where n is negative
  else {
    return  -1 * (n / 2) * (-1 + n)
  }
};

console.log("=== Test Cases for sum_to_n_a ===");
console.log("sum_to_n_a(-3) => -3 + -2 + -1 =", sum_to_n_a(-3)); // Expected: -6
console.log("sum_to_n_a(0) => 0 =", sum_to_n_a(0)); // Expected: 0
console.log("sum_to_n_a(5) => 1 + 2 + 3 + 4 + 5 =", sum_to_n_a(5)); // Expected: 15
console.log("===============================");

console.log("=== Test Cases for sum_to_n_b ===");
console.log("sum_to_n_b(5) => 1 + 2 + 3 + 4 + 5 =", sum_to_n_b(5)); // Expected: 15
console.log("sum_to_n_b(0) => 0 =", sum_to_n_b(0)); // Expected: 0
console.log("sum_to_n_b(-3) => -3 + -2 + -1 =", sum_to_n_b(-3)); // Expected: -6
console.log("===============================");

console.log("=== Test Cases for sum_to_n_c ===");
console.log("sum_to_n_c(5) => 1 + 2 + 3 + 4 + 5 =", sum_to_n_c(5)); // Expected: 15
console.log("sum_to_n_c(0) => 0 =", sum_to_n_c(0)); // Expected: 0
console.log("sum_to_n_c(-3) => -3 + -2 + -1 =", sum_to_n_c(-3)); // Expected: -6
console.log("===============================");
