const arr = [23, 33, 44, 171];

let myFunc = (a) => {
  console.log(` number: ${a}`);
};

const arr2 = [...arr, 666, 3333];
myFunc(arr2);
