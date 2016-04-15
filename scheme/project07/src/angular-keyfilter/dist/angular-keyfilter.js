angular.module('keyfilter', [])
    .directive("ngDigitFilter", function () {

        var keyZ = 90 /** ctrl+Z - cancel **/,
            keyC = 67   /** ctrl+C - copy **/,
            keyX = 88   /** ctrl+X - cut **/,
            keyA = 65   /** ctrl+A - select all **/,
            keyV = 86   /** ctrl+V - paste **/,
            BACKSPACE = 8,
            DELETE = 46,
            BACKWARD = 37,
            FORWARD = 39,
            DIGIT_SEPARATOR = 190   /** . **/;

        var ctrlServiceKeyCode = [keyV, keyX, keyC, keyZ, keyA],
            serviceKeyCode = [BACKSPACE, BACKWARD, FORWARD, DELETE],
            allowedKeyCode = [
                48, 49, 50, 51, 52, 53, 54, 55, 56, 57, /** 0-9 **/
                96, 97, 98, 99, 100, 101, 102, 103, 104, 105 /** 0-9 additional keyboard **/
            ];

        var inArray = function (value, array) {
            return !!array.filter(function (i) { return i === value}).length;
        };

        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) {
                    console.warn('[$lib.input.filter][ngDigitFilter] The model is not defined');
                    return;
                }

                var ngMaxLength = parseInt(element.attr("ng-maxlength")),
                    ngDigitSeparator = element.attr("ng-digit-separator");

                element.bind("keydown", function (event) {
                    if (event.ctrlKey && inArray(event.which, ctrlServiceKeyCode)) {
                        return true;
                    }

                    var viewValue = ngModel.$viewValue || '';

                    if (ngMaxLength
                        && viewValue.length >= ngMaxLength
                        && !inArray(event.which, serviceKeyCode)) {
                        return false;
                    }

                    if ((!inArray(event.which, allowedKeyCode) && !inArray(event.which, serviceKeyCode))) {
                        return !!(DIGIT_SEPARATOR === event.which && (ngDigitSeparator !== undefined));
                    }
                    return !event.shiftKey;
                });
            }
        };
    });