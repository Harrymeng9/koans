describe('About Functions', function() {

  it('should declare functions', function() {

    var add = function(a, b) {
      return a + b;
    };

    expect(add(1, 2)).toBe(3);
  });

  it('should know internal variables override outer variables', function () {
    var message = 'Outer';

    var getMessage = function() {
      return message;
    };

    var overrideMessage = function() {
      var message = 'Inner';

      return message;
    };

    expect(getMessage()).toBe('Outer');
    expect(overrideMessage()).toBe('Inner');
    expect(message).toBe('Outer');
  });

  it('should have lexical scoping', function() {
    var variable = 'top-level';

    var parentfunction = function() {
      var variable = 'local';

      var childfunction = function() {
        return variable;
      };
      return childfunction();
    };
    expect(parentfunction()).toBe('local');
  });

  it('should use lexical scoping to synthesise functions', function() {

    var makeIncreaseByFunction = function (increaseByAmount) {
      return function(numberToIncrease) {
        return numberToIncrease + increaseByAmount;
      };
    };

    var increaseBy3 = makeIncreaseByFunction(3);
    var increaseBy5 = makeIncreaseByFunction(5);

    expect(increaseBy3(10) + increaseBy5(10)).toBe(28);
  });

  it('should allow extra function arguments', function() {

    var returnFirstArg = function(firstArg) {
      return firstArg;
    };

    expect(returnFirstArg('first', 'second', 'third')).toBe('first');

    var returnSecondArg = function(firstArg, secondArg) {
      return secondArg;
    };

    expect(returnSecondArg('only give first arg')).toBe(undefined);

    var returnAllArgs = function() {
      var argsArray = [];

      for (var i = 0; i < arguments.length; i += 1) {
        argsArray.push(arguments[i]);
      }
      return argsArray.join(',');
    };

    expect(returnAllArgs('first', 'second', 'third')).toBe('first,second,third');
  });

  it('should pass functions as values', function() {
    var appendRules = function(name) {
      return name + ' rules!';
    };

    var appendDoubleRules = function(name) {
      return name + ' totally rules!';
    };

    var praiseSinger = { givePraise: appendRules };
    expect(praiseSinger.givePraise('John')).toBe('John rules!');

    praiseSinger.givePraise = appendDoubleRules;
    expect(praiseSinger.givePraise('Mary')).toBe('Mary totally rules!');

  });
});
