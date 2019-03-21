
// const hello = (name='imooc')=> {
//     console.log(name)
// }
// hello('啦啦啦啦');

// function hello(name1, name2) {
//     console.log(name1, name2);
// }
// let arr = ['123', '321'];
// hello(...arr);

const obj = {name: 'li', age: '26'};
console.log(Object.keys(obj)); //只展示key值
console.log(Object.values(obj));//只展示value值
console.log(Object.entries(obj));//将键和值分别放到数组中

let arr = [1, 2, 3];
console.log(arr.map((v)=>v*2))