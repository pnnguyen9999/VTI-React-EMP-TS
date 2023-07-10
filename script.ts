/**
 * @implements interfaces
 */
interface Animal {
    eat(): void;
    sleep(): void;
}

interface Swimming {
    swim(): void;
}

interface Flying {
    fly(): void;
}

class Bird implements Animal, Flying {
    eat(): void {
        console.log('Bird is eating')
    }
    fly(): void {
        console.log('Bird is flying')
    }
    sleep(): void {
        console.log('Bird is sleeping')
    }
}

class Fish implements Animal, Swimming {
    eat(): void {
        console.log('Fish is eating')
    }
    sleep(): void {
        
    }
    swim(): void {
        
    }
}

var bird1: Bird = new Bird();
bird1.eat();
var fish1: Fish = new Fish();
fish1.eat();

/**
 * @generic type
 */
interface ClassRoom<T, D> {
    id: T;
    name: D;
}

class Student<T, U> {
    protected id: T;
    protected name: U;
    constructor(id: T, name: U) {
        this.id = id;
        this.name = name;
    }

    printInfo(): string {
        return `${this.id} -> ${this.name}`
    }

    testMethod<T extends ClassRoom<string, string>>(classRoom: T): string {
        return `${this.name} is in class ${classRoom.name}`
    }
}

var newStudent1 = new Student<number, string>(10, 'Long');
var newStudent2 = new Student<string, string>('ABCD1', 'Nam')
console.log(newStudent1.testMethod({id: "10B", name: "ITK10"}))

/**
 * @destructing (array & object)
 */
const date: number[] = [10, 3, 2018]

const [day, , year] = date;

console.log(day)
console.log(year)

const person = {
    age: 10,
    firstName: 'nguyen',
    lastName: 'an'
}
const {age: tuoi} = person;
const {firstName, lastName} = person

console.log(tuoi)
console.log(firstName)
console.log(lastName)

/**
 * @template string
 */
const templateString: string = `Tôi tên là ${lastName}, năm nay tôi ${tuoi} tuổi.`
console.log(templateString) 

/**
 * @spread operator
 */
type ObjectTyping = {
    name: string,
    age: number
}
let obj1: ObjectTyping = {
    name: "An",
    age: 10
}

let obj2 = {
    ...obj1
};

obj2.age = 20;

console.log({obj1, obj2})

/**
 * @baitap1
 */
let array1 = [2, 3, 4, 5, 6, 7, 8, 9, 10];
let array2 = [5, 6, 7, 8, 9, ...array1]
let newArray = [...array2]
console.log(newArray)

const cold = ["autumn", "winter"]
const warm = ["spring", "summer"]

const seasons = [...warm, ...cold]

console.log(seasons)

/**
 * @arrow function
 */
const sumFunction = (a: number, b: number) => {
    console.log('123')
    return a + b
}

console.log(sumFunction(1, 2))

/**
 * @callback demo
 */
function test(callback: (aray: number[]) => void) {
    /** ... xử lý logic để tính toán ra demoArray
     * ..
     * ......
     */
    const demoArray: number[] = [1, 5, 6]
    callback(demoArray);
}

test((res) => {
    console.log('ket qua la');
    console.log(res)
})

/**
 * @Rest parameter
 */
type TestRestPrams = [string, string, number]
function testRest(...rest: TestRestPrams) {
    console.log(rest)
}

testRest("1", "2", 4)

function hello1(id: number, name?: string) {
    return `${id} -> ${name}`
}

console.log(hello1(10))

/**
 * @annonymous object as param
 */
type YMuon = {
    id: number,
    name: string
}

function hello2({id, name}: YMuon){
    return `${id} -> ${name}`
}

console.log(hello2({id: 10, name: 'an'}))

/**
 * @Callback purpose
 * xử lý in ra a, b, c theo thứ tự tuần tự
 * mặc định khi gặp các hàm mất thời gian hoặc chờ đợi, js sẽ xử lý riêng -> kết quả in ra a, c, b thay vì a, b, c theo thứ tự
 */
console.log('a');
setTimeout(() => {
    console.log('b');
}, 1000)
console.log('c');

/**
 * @Callback example
 */
function a(callback: (p: string) => void) {
    callback('a')
}

function b(callback: (p: string) => void) {
    setTimeout(() => {
        callback('b')
    }, 2000)
}

function c(callback: (p: string) => void) {
    callback('c')
}

a((p) => {
    console.log(p)
    b((p) => {
        console.log(p)
        c((p) => {
            console.log(p)
        })
    })
})

/**
 * @Promise
 */
function muonTien(): Promise<string> {
    return new Promise((resolve, reject) => {
        let coTien: boolean = true;
        if (coTien) {
            resolve('Tôi trả tiền')
        } else {
            reject('Tôi hết tiền nên không thể trả')
        }
    })
}

function banXe(): Promise<string> {
    return new Promise((resolve, reject) => {
        let coXe: boolean = false;
        if (coXe) {
            resolve('Mua xe thành công !')
        } else {
            reject('Chưa mua được xe.')
        }
    })
}

function giaoXe(): Promise<string> {
    return new Promise((resolve, reject) => {
        let denHan: boolean = false;
        if (denHan) {
            resolve('Giao xe thành công !')
        } else {
            reject('Đã hoàn tiền !.')
        }
    })
}

/**
 * @Execute Promise
 */
// khởi động promise chain gốc
muonTien().then((success) => {
    console.log(success)
    console.log('Sau 1 thời gian dài làm lụng vất vả ...')
    console.log('Đã đến ngày đi mua 1 chiếc xe mới')
    return banXe();
}).then((success) => console.log(success),(failed) => {
    console.log(failed)
    // bắt đầu một promise chain khác
    giaoXe().then((success) => console.log(success)).catch((error) => console.log(error))
}).catch((error) => {
    // có lỗi thì sẽ vào đây
   console.log(error)
}).finally(() => {
    // dù lỗi hay không thì vẫn rơi vào finally
    console.log('Mọi thứ vẫn tiếp tục !')
})

/**
 * @Async Await
 */
async function processMoney() {
    try {
        const res = await muonTien();
        console.log(res)
    } catch (error) {
        console.log(error);
    }
}

processMoney();

/**
 * @HOF
 */
type CalculateFactor = {
    x: number,
    y: number
}

function calculate(
    factor: CalculateFactor,
    operator: (factor: CalculateFactor) => number
){
    return operator(factor)
}

function sum(factor: CalculateFactor) {
    return factor.x + factor.y
}

function multiply(factor: CalculateFactor) {
    return factor.x * factor.y
}

console.log(calculate({x: 2, y: 5}, multiply))
