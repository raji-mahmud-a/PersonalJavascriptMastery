
        var expression = '0';
        var memory = 0;
        var lastAnswer = 0;
        var angleMode = 'DEG';

        var display = document.getElementById('display');
        var shiftIndicator = document.getElementById('shift-indicator');

        function updateDisplay() {
            display.textContent = expression;
        }

        function addToExpr(value) {
            if (expression === '0' && value !== '.') {
                expression = value;
            } else {
                expression += value;
            }
            updateDisplay();
        }

        function deleteChar() {
            if (expression.length > 1) {
                expression = expression.slice(0, -1);
            } else {
                expression = '0';
            }
            updateDisplay();
        }

        function allClear() {
            expression = '0';
            updateDisplay();
        }

        function square() {
            try {
                var value = parseFloat(expression);
                var result = Math.pow(value, 2);
                expression = result.toString();
                lastAnswer = result;
                updateDisplay();
            } catch (e) {
                expression = 'Error';
                updateDisplay();
            }
        }

        function sqrtFunc() {
            try {
                var value = parseFloat(expression);
                var result = Math.sqrt(value);
                expression = result.toString();
                lastAnswer = result;
                updateDisplay();
            } catch (e) {
                expression = 'Error';
                updateDisplay();
            }
        }

        function reciprocal() {
            try {
                var value = parseFloat(expression);
                var result = 1 / value;
                expression = result.toString();
                lastAnswer = result;
                updateDisplay();
            } catch (e) {
                expression = 'Error';
                updateDisplay();
            }
        }

        function logFunc() {
            try {
                var value = parseFloat(expression);
                var result = Math.log10(value);
                expression = result.toString();
                lastAnswer = result;
                updateDisplay();
            } catch (e) {
                expression = 'Error';
                updateDisplay();
            }
        }

        function lnFunc() {
            try {
                var value = parseFloat(expression);
                var result = Math.log(value);
                expression = result.toString();
                lastAnswer = result;
                updateDisplay();
            } catch (e) {
                expression = 'Error';
                updateDisplay();
            }
        }

        function sinFunc() {
            try {
                var value = parseFloat(expression);
                if (angleMode === 'DEG') {
                    value = value * (Math.PI / 180);
                }
                var result = Math.sin(value);
                expression = result.toString();
                lastAnswer = result;
                updateDisplay();
            } catch (e) {
                expression = 'Error';
                updateDisplay();
            }
        }

        function cosFunc() {
            try {
                var value = parseFloat(expression);
                if (angleMode === 'DEG') {
                    value = value * (Math.PI / 180);
                }
                var result = Math.cos(value);
                expression = result.toString();
                lastAnswer = result;
                updateDisplay();
            } catch (e) {
                expression = 'Error';
                updateDisplay();
            }
        }

        function tanFunc() {
            try {
                var value = parseFloat(expression);
                if (angleMode === 'DEG') {
                    value = value * (Math.PI / 180);
                }
                var result = Math.tan(value);
                expression = result.toString();
                lastAnswer = result;
                updateDisplay();
            } catch (e) {
                expression = 'Error';
                updateDisplay();
            }
        }

        function asinFunc() {
            try {
                var value = parseFloat(expression);
                var result = Math.asin(value);
                if (angleMode === 'DEG') {
                    result = result * (180 / Math.PI);
                }
                expression = result.toString();
                lastAnswer = result;
                updateDisplay();
            } catch (e) {
                expression = 'Error';
                updateDisplay();
            }
        }

        function acosFunc() {
            try {
                var value = parseFloat(expression);
                var result = Math.acos(value);
                if (angleMode === 'DEG') {
                    result = result * (180 / Math.PI);
                }
                expression = result.toString();
                lastAnswer = result;
                updateDisplay();
            } catch (e) {
                expression = 'Error';
                updateDisplay();
            }
        }

        function atanFunc() {
            try {
                var value = parseFloat(expression);
                var result = Math.atan(value);
                if (angleMode === 'DEG') {
                    result = result * (180 / Math.PI);
                }
                expression = result.toString();
                lastAnswer = result;
                updateDisplay();
            } catch (e) {
                expression = 'Error';
                updateDisplay();
            }
        }

        function sinhFunc() {
            try {
                var value = parseFloat(expression);
                var result = Math.sinh(value);
                expression = result.toString();
                lastAnswer = result;
                updateDisplay();
            } catch (e) {
                expression = 'Error';
                updateDisplay();
            }
        }

        function coshFunc() {
            try {
                var value = parseFloat(expression);
                var result = Math.cosh(value);
                expression = result.toString();
                lastAnswer = result;
                updateDisplay();
            } catch (e) {
                expression = 'Error';
                updateDisplay();
            }
        }

        function tanhFunc() {
            try {
                var value = parseFloat(expression);
                var result = Math.tanh(value);
                expression = result.toString();
                lastAnswer = result;
                updateDisplay();
            } catch (e) {
                expression = 'Error';
                updateDisplay();
            }
        }

        function negate() {
            try {
                var value = parseFloat(expression);
                var result = -value;
                expression = result.toString();
                updateDisplay();
            } catch (e) {
                expression = 'Error';
                updateDisplay();
            }
        }

        function memoryAdd() {
            try {
                var value = parseFloat(expression);
                memory += value;
            } catch (e) {}
        }

        function recallMemory() {
            expression = memory.toString();
            updateDisplay();
        }

        function ansFunc() {
            expression = lastAnswer.toString();
            updateDisplay();
        }

        function calculate() {
            try {
                var expr = expression.replace(/\^/g, '**');
                var result = eval(expr);
                expression = result.toString();
                lastAnswer = result;
                updateDisplay();
            } catch (e) {
                expression = 'Math ERROR';
                updateDisplay();
            }
        }

        // Event listeners
        var buttons = document.querySelectorAll('button');
        buttons.forEach(function(button) {
            button.addEventListener('click', function() {
                var value = button.getAttribute('data-value');
                var action = button.getAttribute('data-action');

                if (value) {
                    addToExpr(value);
                } else if (action) {
                    switch(action) {
                        case 'ac':
                            allClear();
                            break;
                        case 'del':
                            deleteChar();
                            break;
                        case 'equals':
                            calculate();
                            break;
                        case 'square':
                            square();
                            break;
                        case 'sqrt':
                            sqrtFunc();
                            break;
                        case 'reciprocal':
                            reciprocal();
                            break;
                        case 'log':
                            logFunc();
                            break;
                        case 'ln':
                            lnFunc();
                            break;
                        case 'sin':
                            sinFunc();
                            break;
                        case 'cos':
                            cosFunc();
                            break;
                        case 'tan':
                            tanFunc();
                            break;
                        case 'asin':
                            asinFunc();
                            break;
                        case 'acos':
                            acosFunc();
                            break;
                        case 'atan':
                            atanFunc();
                            break;
                        case 'sinh':
                            sinhFunc();
                            break;
                        case 'cosh':
                            coshFunc();
                            break;
                        case 'tanh':
                            tanhFunc();
                            break;
                        case 'negate':
                            negate();
                            break;
                        case 'm-add':
                            memoryAdd();
                            break;
                        case 'rcl':
                            recallMemory();
                            break;
                        case 'ans':
                            ansFunc();
                            break;
                    }
                }
            });
        });
        
    const constantsList = [
    {
        constantName: 'PI',
        constantValue: Math.PI, // 3.1415926535... (Ratio of a circle's circumference to its diameter)
        constantSymbol: 'π'
    },
    {
        constantName: "EULER'S NUMBER",
        constantValue: Math.E, // 2.7182818284... (Base of the natural logarithm)
        constantSymbol: 'e'
    },
    {
        constantName: 'SPEED OF LIGHT IN VACUUM',
        constantValue: 299792458, // Exact value in m/s
        constantSymbol: 'c'
    },
    {
        constantName: 'ELEMENTARY CHARGE',
        constantValue: 1.602176634e-19, // Exact value in Coulombs (C)
        constantSymbol: 'e'
    },
    {
        constantName: 'PLANCK CONSTANT',
        constantValue: 6.62607015e-34, // Exact value in J·s
        constantSymbol: 'h'
    },
    {
        constantName: 'REDUCED PLANCK CONSTANT',
        constantValue: 1.054571817e-34, // h / (2π) J·s
        constantSymbol: 'ℏ'
    },
    {
        constantName: 'GRAVITATIONAL CONSTANT',
        constantValue: 6.67430e-11, // N·m²/kg²
        constantSymbol: 'G'
    },
    {
        constantName: 'BOLTZMANN CONSTANT',
        constantValue: 1.380649e-23, // Exact value in J/K
        constantSymbol: 'k'
    },
    {
        constantName: 'AVOGADRO CONSTANT',
        constantValue: 6.02214076e23, // Exact value in mol⁻¹
        constantSymbol: 'N_A'
    },
    {
        constantName: 'MOLAR GAS CONSTANT',
        constantValue: 8.314462618, // J/(mol·K)
        constantSymbol: 'R'
    },
    {
        constantName: 'ACCELERATION DUE TO GRAVITY (STANDARD)',
        constantValue: 9.80665, // m/s²
        constantSymbol: 'g'
    },
    {
        constantName: 'VACUUM PERMITTIVITY',
        constantValue: 8.8541878128e-12, // F/m (Electric constant, ε₀)
        constantSymbol: 'ε₀'
    },
    {
        constantName: 'VACUUM PERMEABILITY',
        constantValue: 4 * Math.PI * 1e-7, // Exact value in N/A² (Magnetic constant, μ₀)
        constantSymbol: 'μ₀'
    },
    {
        constantName: 'COULOMB CONSTANT',
        constantValue: 8.9875517923e9, // N·m²/C² (kₑ = 1 / (4π ε₀))
        constantSymbol: 'k_e'
    },
    {
        constantName: 'ELECTRON REST MASS',
        constantValue: 9.1093837015e-31, // kg
        constantSymbol: 'm_e'
    },
    {
        constantName: 'PROTON REST MASS',
        constantValue: 1.67262192369e-27, // kg
        constantSymbol: 'm_p'
    },
    {
        constantName: 'FINE-STRUCTURE CONSTANT',
        constantValue: 7.2973525693e-3, // Dimensionless (α)
        constantSymbol: 'α'
    },
    {
        constantName: 'STEPHAN-BOLTZMANN CONSTANT',
        constantValue: 5.670374419e-8, // W/(m²·K⁴)
        constantSymbol: 'σ'
    },
    {
        constantName: 'WIESEN-WILSON CONSTANT',
        constantValue: 2.897771955e-3, // m·K (Wien's displacement law constant, $b$)
        constantSymbol: 'b'
    },
    {
        constantName: 'RYDBERG CONSTANT',
        constantValue: 10973731.568160, // m⁻¹ (R_∞)
        constantSymbol: 'R_∞'
    },
    {
        constantName: 'ATOMIC MASS UNIT',
        constantValue: 1.66053906660e-27, // kg (Unified atomic mass unit, u)
        constantSymbol: 'u'
    },
    {
        constantName: 'BOHR RADIUS',
        constantValue: 5.29177210903e-11, // m (a₀)
        constantSymbol: 'a₀'
    },
    {
        constantName: 'FARADAY CONSTANT',
        constantValue: 96485.3321233100184, // C/mol (F = e * N_A)
        constantSymbol: 'F'
    },
    {
        constantName: 'GOLDEN RATIO',
        constantValue: 1.61803398875, // (1 + √5) / 2
        constantSymbol: 'φ'
    },
    {
        constantName: 'IMAGINARY UNIT',
        constantValue: 'sqrt(-1)', // Not a real number, but a fundamental mathematical constant
        constantSymbol: 'i'
    },
    {
        constantName: 'EULER-MASCHERONI CONSTANT',
        constantValue: 0.5772156649,
        constantSymbol: 'γ'
    }
];

    
    constantsList.forEach((value, index) => {
        document.querySelector('.constantsBox').innerHTML += `
                <div class="constant">
                <p>${index + 1}. ${value.constantName} (${value.constantSymbol})</p>
                <p class='constantVal'>${value.constantValue}</p>
            </div>
    `
    })
    
    let constantBox = document.querySelector('.constantsBox')
    
    const displayConstants =
    
    document.querySelector('.solar-cell').addEventListener('click',  () => {
     constantBox.classList.toggle('show')
 })