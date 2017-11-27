/* typescript 测试 */
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return this.greeting;
    };
    return Greeter;
})();
var greeter = new Greeter("Hello, world");
console.log(greeter.greet());
