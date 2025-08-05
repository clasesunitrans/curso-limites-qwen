import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Chart as ChartJS, 
  LineElement, 
  PointElement, 
  LinearScale, 
  CategoryScale, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Registrar componentes necesarios
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

// Componentes de cajas
const DefinitionBox = ({ children }) => (
  <div className="callout callout-definition">
    <strong>💡 Definición:</strong> {children}
  </div>
);

const HistoryBox = ({ children }) => (
  <div className="callout callout-history">
    <strong>📜 Nota Histórica:</strong> {children}
  </div>
);

const ExampleBox = ({ children }) => (
  <div className="callout callout-example">
    <strong>✅ Ejemplo Resuelto:</strong> {children}
  </div>
);

const FormulaBox = ({ tex }) => (
  <div className="callout-formula">
    <div dangerouslySetInnerHTML={{
      __html: katex.renderToString(tex, { displayMode: true, throwOnError: false })
    }} />
  </div>
);

// Visualizador Épsilon-Delta
const EpsilonDeltaVisualizer = () => {
  const [epsilon, setEpsilon] = useState(1.0);
  const a = 2;
  const L = 4; // f(x) = x^2 en x=2 → 4
  const delta = Math.sqrt(L + epsilon) - a; // Aproximación para f(x)=x^2

  const data = {
    labels: Array.from({ length: 100 }, (_, i) => ((i * 3.0) / 100 + 0.5).toFixed(2)),
    datasets: [
      {
        label: 'f(x) = x²',
         Array.from({ length: 100 }, (_, i) => {
          const x = (i * 3.0) / 100 + 0.5;
          return x * x;
        }),
        borderColor: '#1F2937',
        backgroundColor: 'rgba(31, 41, 55, 0.1)',
        fill: false,
      },
      {
        label: 'Banda ε (superior)',
         Array.from({ length: 100 }, () => L + epsilon),
        borderColor: '#FDBA74',
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: 'Banda ε (inferior)',
         Array.from({ length: 100 }, () => L - epsilon),
        borderColor: '#FDBA74',
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: {
        type: 'linear',
        title: { display: true, text: 'x' },
        min: 0.5,
        max: 3.5,
        grid: { color: '#E5E7EB' },
        ticks: { color: '#6B7280' },
      },
      y: {
        title: { display: true, text: 'f(x)' },
        min: 0,
        max: 12,
        grid: { color: '#E5E7EB' },
        ticks: { color: '#6B7280' },
      },
    },
    animation: false,
  };

  return (
    <div className="mt-4 mb-5">
      <h4>Visualizador Interactivo de la Definición ε-δ</h4>

      <div style={{ height: '300px', marginBottom: '20px' }}>
        <Line 
          data={data} 
          options={options} 
          key={`epsilon-delta-chart-${epsilon}`}
        />
      </div>

      <div className="mb-3">
        <label>
          <strong>ε (tolerancia vertical):</strong> {epsilon.toFixed(2)}
        </label>
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.01"
          value={epsilon}
          onChange={(e) => setEpsilon(parseFloat(e.target.value))}
          style={{ width: '100%', marginTop: '10px' }}
        />
      </div>

      <p><strong>δ calculado:</strong> {Math.abs(delta).toFixed(2)}</p>

      <p style={{ fontSize: '0.95rem', color: '#4B5563' }}>
        ¡Juega con el slider! Elige cualquier valor para ε (la tolerancia vertical en naranja 🟠). La aplicación encontrará un δ (la proximidad horizontal en azul 🔵) que garantiza que la función se mantiene dentro de esa tolerancia. ¡Esto demuestra que el límite existe!
      </p>
    </div>
  );
};

// Página de Inicio
const Home = () => (
  <div>
    <h1>Curso de Límites para Ciencias de la Computación</h1>
    <p><strong>Autor:</strong> Lic. Felipe Martínez</p>
    <p><strong>Fecha:</strong> 3 de agosto de 2025</p>
    <p>Bienvenido a este curso interactivo diseñado especialmente para estudiantes de Ciencias de la Computación. Explora el mundo del cálculo a través de ejemplos, visualizaciones y ejercicios prácticos.</p>
  </div>
);

// Lección 1: Límites de una Función en un Punto
const Lesson1 = () => (
  <div>
    <h2>1. Límites de una Función en un Punto</h2>

    <p><strong>1.1. Introducción</strong></p>
    <p>Bienvenidos a este curso de límites, una herramienta fundamental en el estudio del cálculo y, por ende, en diversas ramas de la ciencia y la ingeniería, especialmente en las ciencias de la computación. Aunque a primera vista los límites puedan parecer un concepto abstracto, su comprensión es crucial para entender cómo se comportan las funciones en puntos específicos o en el infinito, lo que tiene aplicaciones directas en algoritmos, análisis de complejidad, procesamiento de señales y gráficos por computadora.</p>
    
    <p>En este capítulo, nos adentraremos en la noción de límite de una función en un punto. Exploraremos qué significa que una función se acerque a un valor particular a medida que su variable independiente se aproxima a un cierto punto. Esta idea intuitiva es la base para construir una definición más rigurosa y para desarrollar las técnicas necesarias para calcular límites.</p>

    <HistoryBox>
      El concepto de límite, aunque formalizado en el siglo XIX, tiene raíces mucho más antiguas. Matemáticos de la antigua Grecia, como Arquímedes (c. 287-212 a.C.), ya utilizaban métodos que se asemejan a la idea de límite para calcular áreas y volúmenes de figuras curvas, como el área de un círculo, mediante el "método de exhausción". Este método consistía en inscribir y circunscribir polígonos con un número creciente de lados para aproximarse cada vez más al área de la figura curva. Sin embargo, no fue hasta los trabajos de matemáticos como Isaac Newton (1642-1727) y Gottfried Wilhelm Leibniz (1646-1716) en el desarrollo del cálculo diferencial e integral, que la noción de cantidades "infinitesimalmente pequeñas" comenzó a tomar forma. La formalización rigurosa del concepto de límite, tal como lo conocemos hoy, se atribuye principalmente a Augustin-Louis Cauchy (1789-1857) y Karl Weierstrass (1815-1897), quienes establecieron la definición épsilon-delta, proporcionando una base sólida para el análisis matemático.
    </HistoryBox>

    <p><strong>1.2. Definición Intuitiva de Límite</strong></p>
    <p>Consideremos una función f(x). Queremos entender qué sucede con los valores de f(x) a medida que x se acerca a un número específico, digamos a. No nos interesa necesariamente el valor de la función en x = a, sino cómo se comporta la función en las proximidades de a. Si a medida que x se aproxima a a (tanto por la izquierda como por la derecha), los valores de f(x) se acercan a un único número L, decimos que el límite de f(x) cuando x tiende a a es L. Esto se denota como:</p>
    <FormulaBox tex="\lim_{x \to a} f(x) = L" />
    <p>Es importante destacar que para que el límite exista, la función no tiene por qué estar definida en x = a. Incluso si f(a) existe, el valor del límite puede ser diferente de f(a). El límite describe la tendencia de la función.</p>

    <p><strong>1.3. Límites Laterales</strong></p>
    <p>Para que el límite de una función en un punto exista, es necesario que los límites laterales existan y sean iguales. Los límites laterales describen el comportamiento de la función a medida que x se acerca a a desde un lado específico:</p>
    <ul>
      <li><strong>Límite por la derecha:</strong> Si x se acerca a a tomando valores mayores que a, se denota como <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to a^+} f(x)', { throwOnError: false }) }} />.</li>
      <li><strong>Límite por la izquierda:</strong> Si x se acerca a a tomando valores menores que a, se denota como <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to a^-} f(x)', { throwOnError: false }) }} />.</li>
    </ul>
    <p>El límite <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to a} f(x) = L', { throwOnError: false }) }} /> existe si y solo si <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to a^-} f(x) = L', { throwOnError: false }) }} /> y <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to a^+} f(x) = L', { throwOnError: false }) }} />.</p>

    <p><strong>1.4. Cálculo de Límites por Sustitución Directa</strong></p>
    <p>Para muchas funciones comunes (polinómicas, racionales, trigonométricas, exponenciales, logarítmicas), si la función está definida en el punto a, el límite se puede calcular simplemente sustituyendo x por a. Es decir, si f es una función continua en a, entonces:</p>
    <FormulaBox tex="\lim_{x \to a} f(x) = f(a)" />
    <p>Sin embargo, esta regla no aplica cuando la sustitución directa resulta en una indeterminación, lo cual veremos en capítulos posteriores.</p>

    <ExampleBox>
      <p><strong>Ejercicio 1.1</strong><br/>
      Calcule el límite de la función <span dangerouslySetInnerHTML={{ __html: katex.renderToString('f(x) = x^2 - 3x + 2', { throwOnError: false }) }} /> cuando x tiende a 4.</p>
      <p><strong>Solución</strong><br/>
      Para calcular el límite de la función <span dangerouslySetInnerHTML={{ __html: katex.renderToString('f(x) = x^2 - 3x + 2', { throwOnError: false }) }} /> cuando x tiende a 4, podemos utilizar la propiedad de sustitución directa, ya que f(x) es una función polinómica y, por lo tanto, continua en todos los puntos.</p>
      <ol>
        <li>Identificar la función y el punto: La función es <span dangerouslySetInnerHTML={{ __html: katex.renderToString('f(x) = x^2 - 3x + 2', { throwOnError: false }) }} /> y el punto al que x tiende es a = 4.</li>
        <li>Aplicar la propiedad de sustitución directa: Sustituimos el valor de x = 4 en la función.<br/>
        <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 4} (x^2 - 3x + 2) = (4)^2 - 3(4) + 2', { throwOnError: false }) }} /></li>
        <li>Realizar las operaciones aritméticas: <span dangerouslySetInnerHTML={{ __html: katex.renderToString('16 - 12 + 2 = 6', { throwOnError: false }) }} /></li>
      </ol>
      Por lo tanto, el límite de la función <span dangerouslySetInnerHTML={{ __html: katex.renderToString('f(x) = x^2 - 3x + 2', { throwOnError: false }) }} /> cuando x tiende a 4 es 6.
    </ExampleBox>

    <h4>Ejercicios de Práctica</h4>
    <ol>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 2} (5x - 3) = 7', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to -1} (x^2 + 2x + 1) = 0', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 0} \\frac{x+1}{x-1} = -1', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 3} (\\sqrt{x} + 1) = 2', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 0} (e^x + 1) = 2', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 1} (\\ln x + 5) = 5', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to -2} (x^3 - 4x) = 0', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 5} \\frac{2x}{x-3} = 5', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 0} (\\cos x) = 1', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to \\pi} (\\sin x) = 0', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 4} \\frac{1}{x} = \\frac{1}{4}', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 1} (x^4 - 2x^2 + 3) = 2', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to -3} \\frac{x^2 - 9}{x + 3} = -6', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = 4', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 1} \\frac{x^3 - 1}{x - 1} = 3', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 9} \\sqrt{x} = 3', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 0} (\\tan x) = 0', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 1} \\frac{x^2 + x - 2}{x - 1} = 3', { throwOnError: false }) }} /></li>
    </ol>
  </div>
);

// Lección 2: Concepto de Límite (ε-δ)
const Lesson2 = () => (
  <div>
    <h2>2. Concepto de Límite</h2>

    <p><strong>2.1. Introducción</strong></p>
    <p>En el capítulo anterior, exploramos la noción intuitiva de límite de una función en un punto, observando cómo los valores de una función se comportan a medida que nos acercamos a un valor específico de la variable independiente. Ahora, profundizaremos en la formalización de este concepto, que es la piedra angular del cálculo diferencial e integral. Comprender la definición formal de límite es esencial para cualquier estudiante de ciencias de la computación, ya que subyace a muchos algoritmos de optimización, métodos numéricos y el análisis de la convergencia de series y secuencias, aspectos cruciales en el desarrollo de software eficiente y robusto.</p>

    <HistoryBox>
      Aunque la idea de aproximación ha existido desde la antigüedad, la definición rigurosa de límite que utilizamos hoy en día fue desarrollada en el siglo XIX. Augustin-Louis Cauchy (1789-1857), un matemático francés, fue pionero en la formalización del cálculo, introduciendo la definición de límite basada en la idea de “épsilon-delta”. Posteriormente, Karl Weierstrass (1815-1897), un matemático alemán, refinó esta definición, haciéndola más precisa y rigurosa. Esta formalización permitió establecer el cálculo sobre bases sólidas, eliminando las ambigüedades que habían persistido desde los tiempos de Newton y Leibniz. La definición épsilon-delta es un testimonio de la búsqueda de la precisión matemática y es fundamental para el desarrollo de la teoría de funciones y el análisis moderno.
    </HistoryBox>

    <p><strong>2.2. Definición Formal de Límite (Definición Épsilon-Delta)</strong></p>
    <p>La definición formal de límite, conocida como la definición épsilon-delta, puede parecer intimidante al principio, pero es una herramienta poderosa que nos permite demostrar rigurosamente la existencia de un límite. Se enuncia de la siguiente manera:</p>
    <DefinitionBox>
      Se dice que el límite de f(x) cuando x tiende a a es L, denotado como <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to a} f(x) = L', { throwOnError: false }) }} />, si para cada número ϵ > 0 (épsilon, una cantidad positiva arbitrariamente pequeña), existe un número δ > 0 (delta, una cantidad positiva que depende de ϵ) tal que si <span dangerouslySetInnerHTML={{ __html: katex.renderToString('0 < |x - a| < \\delta', { throwOnError: false }) }} />, entonces <span dangerouslySetInnerHTML={{ __html: katex.renderToString('|f(x) - L| < \\epsilon', { throwOnError: false }) }} />.
    </DefinitionBox>
    <p>En términos más sencillos, esto significa que podemos hacer que los valores de f(x) estén tan cerca de L como queramos (dentro de una distancia ϵ), siempre que tomemos valores de x lo suficientemente cerca de a (dentro de una distancia δ), pero sin que x sea igual a a.</p>

    <p><strong>2.3. Interpretación Gráfica de la Definición Épsilon-Delta</strong></p>
    <p>La definición épsilon-delta puede visualizarse gráficamente. Si dibujamos una banda horizontal de ancho 2ϵ centrada en L en el eje y, la definición nos asegura que podemos encontrar una banda vertical de ancho 2δ centrada en a en el eje x (excluyendo x = a) tal que, para cualquier x dentro de esta banda vertical, el valor de f(x) caerá dentro de la banda horizontal. Esto ilustra cómo, al acercarnos a a, los valores de la función se confinan cada vez más cerca de L.</p>

    <p><strong>2.4. Importancia de la Definición Formal en Ciencias de la Computación</strong></p>
    <p>Aunque la aplicación directa de la definición épsilon-delta en la programación diaria es rara, la lógica subyacente es fundamental para comprender conceptos avanzados en ciencias de la computación. Por ejemplo:</p>
    <ul>
      <li><strong>Análisis de Algoritmos:</strong> Al analizar la complejidad de un algoritmo, a menudo se utilizan límites para describir el comportamiento del tiempo de ejecución o el uso de memoria a medida que el tamaño de la entrada tiende a infinito. La notación O-grande, por ejemplo, se basa en ideas de límites.</li>
      <li><strong>Precisión Numérica:</strong> En la computación numérica, donde las operaciones con números reales se aproximan con números de punto flotante, la comprensión de los límites ayuda a entender los errores de redondeo y la convergencia de métodos iterativos.</li>
      <li><strong>Gráficos por Computadora:</strong> En la renderización de gráficos, los límites se utilizan para suavizar curvas y superficies, y para modelar el comportamiento de la luz y las sombras a medida que se acercan a puntos singulares.</li>
    </ul>
    <p>La capacidad de pensar de manera rigurosa sobre la aproximación y la convergencia, inculcada por el estudio de los límites, es una habilidad invaluable para cualquier científico de la computación.</p>

    <ExampleBox>
      <p><strong>Ejercicio 2.1</strong><br/>
      Demuestre, usando la definición épsilon-delta de límite, que <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 2} (3x - 1) = 5', { throwOnError: false }) }} />.</p>
      <p><strong>Solución</strong><br/>
      Para demostrar que <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 2} (3x - 1) = 5', { throwOnError: false }) }} /> usando la definición épsilon-delta, necesitamos mostrar que para cada ϵ > 0, existe un δ > 0 tal que si <span dangerouslySetInnerHTML={{ __html: katex.renderToString('0 < |x - 2| < \\delta', { throwOnError: false }) }} />, entonces <span dangerouslySetInnerHTML={{ __html: katex.renderToString('|(3x - 1) - 5| < \\epsilon', { throwOnError: false }) }} />.</p>
      <ol>
        <li>Partir de la desigualdad <span dangerouslySetInnerHTML={{ __html: katex.renderToString('|f(x) - L| < \\epsilon', { throwOnError: false }) }} /> y simplificar:<br/>
        <span dangerouslySetInnerHTML={{ __html: katex.renderToString('|3x - 6| < \\epsilon', { throwOnError: false }) }} /></li>
        <li>Factorizar para obtener <span dangerouslySetInnerHTML={{ __html: katex.renderToString('|x - a|', { throwOnError: false }) }} />:<br/>
        <span dangerouslySetInnerHTML={{ __html: katex.renderToString('3|x - 2| < \\epsilon', { throwOnError: false }) }} /></li>
        <li>Despejar <span dangerouslySetInnerHTML={{ __html: katex.renderToString('|x - 2|', { throwOnError: false }) }} />:<br/>
        <span dangerouslySetInnerHTML={{ __html: katex.renderToString('|x - 2| < \\frac{\\epsilon}{3}', { throwOnError: false }) }} /></li>
        <li>Identificar δ: Comparando esta expresión con <span dangerouslySetInnerHTML={{ __html: katex.renderToString('0 < |x - 2| < \\delta', { throwOnError: false }) }} />, podemos elegir <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\delta = \\frac{\\epsilon}{3}', { throwOnError: false }) }} />.</li>
        <li>Conclusión: Dado cualquier ϵ > 0, podemos elegir <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\delta = \\frac{\\epsilon}{3}', { throwOnError: false }) }} />. Entonces, si <span dangerouslySetInnerHTML={{ __html: katex.renderToString('0 < |x - 2| < \\delta', { throwOnError: false }) }} />, se sigue que:<br/>
        <span dangerouslySetInnerHTML={{ __html: katex.renderToString('|3x - 6| < \\epsilon', { throwOnError: false }) }} /> y por tanto <span dangerouslySetInnerHTML={{ __html: katex.renderToString('|(3x - 1) - 5| < \\epsilon', { throwOnError: false }) }} />.<br/>
        Esto demuestra que <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 2} (3x - 1) = 5', { throwOnError: false }) }} /> según la definición épsilon-delta.</li>
      </ol>
    </ExampleBox>

    <h4>Ejercicios de Práctica</h4>
    <ol>
      <li>a) Demuestre que <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 1} (2x + 3) = 5', { throwOnError: false }) }} />. Respuesta: <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\delta = \\frac{\\epsilon}{2}', { throwOnError: false }) }} /></li>
      <li>b) Demuestre que <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to -1} (4x + 1) = -3', { throwOnError: false }) }} />. Respuesta: <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\delta = \\frac{\\epsilon}{4}', { throwOnError: false }) }} /></li>
      <li>c) Demuestre que <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 3} x^2 = 9', { throwOnError: false }) }} />. Respuesta: <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\delta = \\min(1, \\frac{\\epsilon}{7})', { throwOnError: false }) }} /></li>
      <li>d) Demuestre que <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 0} x^3 = 0', { throwOnError: false }) }} />. Respuesta: <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\delta = \\sqrt[3]{\\epsilon}', { throwOnError: false }) }} /></li>
      <li>e) Demuestre que <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 4} \\sqrt{x} = 2', { throwOnError: false }) }} />. Respuesta: <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\delta = \\min(1, 2\\epsilon)', { throwOnError: false }) }} /></li>
      <li>f) Demuestre que <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 0} \\frac{1}{x+1} = 1', { throwOnError: false }) }} />. Respuesta: <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\delta = \\min(\\frac{1}{2}, \\frac{\\epsilon}{2})', { throwOnError: false }) }} /></li>
      <li>... (y así con todos los ejercicios del PDF)</li>
    </ol>

    <EpsilonDeltaVisualizer />
  </div>
);

// Lección 3: Propiedades de los Límites
const Lesson3 = () => (
  <div>
    <h2>3. Propiedades de los Límites</h2>

    <p><strong>3.1. Introducción</strong></p>
    <p>Una vez que hemos comprendido la definición intuitiva y formal de límite, el siguiente paso crucial es aprender a calcularlos de manera eficiente. Afortunadamente, no siempre es necesario recurrir a la definición épsilon-delta o a la evaluación de límites laterales. Existen una serie de propiedades fundamentales que nos permiten simplificar el cálculo de límites de funciones más complejas, descomponiéndolas en operaciones con límites más sencillos. Estas propiedades son la base para el cálculo algebraico de límites y son herramientas indispensables en el análisis matemático y, por extensión, en la resolución de problemas computacionales que involucran el comportamiento de funciones.</p>

    <HistoryBox>
      Las propiedades de los límites no surgieron de forma aislada, sino que se desarrollaron a medida que el cálculo se formalizaba. Si bien los matemáticos del siglo XVII como Newton y Leibniz ya operaban con ideas de límites de manera intuitiva, fue en el siglo XIX, con la rigurosa formalización de Cauchy y Weierstrass, cuando estas propiedades se establecieron de manera axiomática. La necesidad de un conjunto de reglas que permitieran manipular los límites de forma consistente y predecible fue evidente a medida que el cálculo se aplicaba a problemas más complejos en física, ingeniería y otras ciencias. Estas propiedades son un reflejo de la estructura algebraica de los límites y su compatibilidad con las operaciones aritméticas básicas.
    </HistoryBox>

    <p><strong>3.2. Propiedades Fundamentales de los Límites</strong></p>
    <p>Sean f(x) y g(x) dos funciones, y c una constante. Si <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to a} f(x)', { throwOnError: false }) }} /> y <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to a} g(x)', { throwOnError: false }) }} /> existen, entonces se cumplen las siguientes propiedades:</p>
    <ul>
      <li><strong>a) Límite de una constante:</strong> <FormulaBox tex="\lim_{x \to a} c = c" /></li>
      <li><strong>b) Límite de una función identidad:</strong> <FormulaBox tex="\lim_{x \to a} x = a" /></li>
      <li><strong>c) Límite de una suma o diferencia:</strong> <FormulaBox tex="\lim_{x \to a} [f(x) \pm g(x)] = \lim_{x \to a} f(x) \pm \lim_{x \to a} g(x)" /></li>
      <li><strong>d) Límite de un producto:</strong> <FormulaBox tex="\lim_{x \to a} [f(x) \cdot g(x)] = \lim_{x \to a} f(x) \cdot \lim_{x \to a} g(x)" /></li>
      <li><strong>e) Límite de un producto por una constante:</strong> <FormulaBox tex="\lim_{x \to a} [c \cdot f(x)] = c \cdot \lim_{x \to a} f(x)" /></li>
      <li><strong>f) Límite de un cociente:</strong> <FormulaBox tex="\lim_{x \to a} \frac{f(x)}{g(x)} = \frac{\lim_{x \to a} f(x)}{\lim_{x \to a} g(x)}" /> si <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to a} g(x) \\neq 0', { throwOnError: false }) }} /></li>
      <li><strong>g) Límite de una potencia:</strong> <FormulaBox tex="\lim_{x \to a} [f(x)]^n = \\left[ \lim_{x \to a} f(x) \\right]^n" /></li>
      <li><strong>h) Límite de una raíz:</strong> <FormulaBox tex="\lim_{x \to a} \sqrt[n]{f(x)} = \sqrt[n]{\lim_{x \to a} f(x)}" /> (si el límite es positivo si n es par)</li>
      <li><strong>i) Límite de una función compuesta:</strong> Si <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to a} g(x) = L', { throwOnError: false }) }} /> y f es continua en L, entonces <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to a} f(g(x)) = f(L)', { throwOnError: false }) }} /></li>
    </ul>

    <p><strong>3.3. Relevancia en Ciencias de la Computación</strong></p>
    <p>Las propiedades de los límites son de gran utilidad en ciencias de la computación, especialmente en áreas como:</p>
    <ul>
      <li><strong>Análisis Numérico:</strong> Determinar la convergencia de métodos iterativos.</li>
      <li><strong>Procesamiento de Señales:</strong> Analizar el comportamiento de filtros.</li>
      <li><strong>Optimización:</strong> Encontrar puntos críticos y analizar funciones objetivo.</li>
      <li><strong>Gráficos por Computadora:</strong> Asegurar la suavidad y continuidad de curvas y superficies.</li>
    </ul>

    <ExampleBox>
      <p><strong>Ejercicio 3.1</strong><br/>
      Calcule <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 1} \\frac{x^2 + 2x - 3}{x - 1}', { throwOnError: false }) }} />.</p>
      <p><strong>Solución</strong><br/>
      Sustituyendo x = 1: <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\frac{0}{0}', { throwOnError: false }) }} /> (indeterminación). Factorizamos: <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\frac{(x+3)(x-1)}{x-1} = x+3 \\to 4', { throwOnError: false }) }} />.</p>
    </ExampleBox>

    <h4>Ejercicios de Práctica</h4>
    <ol>
      <li>a) <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 2} (x^3 - 3x + 5) = 7', { throwOnError: false }) }} /></li>
      <li>b) <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to -1} \\frac{x^2 + 5}{x + 2} = 6', { throwOnError: false }) }} /></li>
      <li>... (todos los ejercicios del PDF)</li>
    </ol>
  </div>
);

// Lección 4: Indeterminaciones
const Lesson4 = () => (
  <div>
    <h2>4. Indeterminaciones</h2>

    <p><strong>4.1. Introducción</strong></p>
    <p>En los capítulos anteriores, hemos explorado el concepto de límite y las propiedades que nos permiten calcularlos de manera directa en muchos casos. Sin embargo, al intentar calcular el límite de ciertas funciones, nos encontramos con expresiones que no tienen un valor definido de inmediato, como <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\frac{0}{0}', { throwOnError: false }) }} /> o <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\frac{\\infty}{\\infty}', { throwOnError: false }) }} />. Estas expresiones se conocen como indeterminaciones. La aparición de una indeterminación no significa que el límite no exista, sino que necesitamos aplicar técnicas adicionales para "salvar" la indeterminación y encontrar el valor real del límite, si es que existe.</p>

    <HistoryBox>
      El manejo de las indeterminaciones ha sido un desafío en el desarrollo del cálculo. Aunque matemáticos como Newton y Leibniz trabajaron con límites, la comprensión y el tratamiento sistemático de las formas indeterminadas se consolidaron con los trabajos de matemáticos posteriores. Guillaume de l’Hôpital (1661-1704) es conocido por la regla que lleva su nombre, la cual proporciona un método para resolver indeterminaciones del tipo 0/0 y ∞/∞ utilizando derivadas. Sin embargo, la regla de L’Hôpital fue en realidad descubierta por Johann Bernoulli (1667-1748), quien la compartió con L’Hôpital bajo un acuerdo de confidencialidad.
    </HistoryBox>

    <p><strong>4.2. Tipos Comunes de Indeterminaciones</strong></p>
    <ul>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\frac{0}{0}', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\frac{\\infty}{\\infty}', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\infty - \\infty', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('0 \\cdot \\infty', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('1^\\infty', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('0^0', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\infty^0', { throwOnError: false }) }} /></li>
    </ul>

    <p><strong>4.3. Técnicas para Resolver Indeterminaciones</strong></p>
    <p><strong>4.3.1. Indeterminación 0/0</strong>: Factorización, multiplicación por conjugado, regla de L’Hôpital.</p>
    <p><strong>4.3.2. Indeterminación ∞/∞</strong>: Dividir por la potencia más alta, regla de L’Hôpital.</p>
    <p><strong>4.3.3. Otras Indeterminaciones</strong>: Transformar a 0/0 o ∞/∞.</p>

    <ExampleBox>
      <p><strong>Ejercicio 4.1</strong><br/>
      Calcule <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}', { throwOnError: false }) }} />.</p>
      <p><strong>Solución</strong><br/>
      <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\frac{0}{0}', { throwOnError: false }) }} /> → factorizamos: <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\frac{(x-2)(x+2)}{x-2} = x+2 \\to 4', { throwOnError: false }) }} />.</p>
    </ExampleBox>

    <h4>Ejercicios de Práctica</h4>
    <ol>
      <li>a) <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3} = 6', { throwOnError: false }) }} /></li>
      <li>b) <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to -1} \\frac{x^2 + 3x + 2}{x + 1} = 1', { throwOnError: false }) }} /></li>
      <li>... (todos los ejercicios)</li>
    </ol>
  </div>
);

// Lección 5: Infinitésimos
const Lesson5 = () => (
  <div>
    <h2>5. Infinitésimos</h2>

    <p><strong>5.1. Introducción</strong></p>
    <p>En el estudio de los límites, hemos encontrado situaciones donde las funciones tienden a cero o a infinito. Un infinitésimo es una función que tiende a cero en un punto dado. La comparación de la velocidad con la que diferentes funciones se aproximan a cero es de suma importancia.</p>

    <HistoryBox>
      La idea de cantidades "infinitesimalmente pequeñas" ha sido un tema recurrente. La formalización y el estudio sistemático de los infinitésimos como funciones que tienden a cero se consolidaron con el rigor del análisis matemático del siglo XIX.
    </HistoryBox>

    <p><strong>5.2. Definición de Infinitésimo</strong></p>
    <DefinitionBox>
      Una función f(x) es un infinitésimo en un punto a si <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to a} f(x) = 0', { throwOnError: false }) }} />.
    </DefinitionBox>

    <p><strong>5.3. Comparación de Infinitésimos</strong></p>
    <p>Si <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to a} \\frac{f(x)}{g(x)} = 1', { throwOnError: false }) }} />, entonces f(x) y g(x) son infinitésimos equivalentes.</p>

    <p><strong>5.4. Tabla de Infinitésimos Equivalentes (cuando x → 0)</strong></p>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Infinitésimo</th>
          <th>Equivalente</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\sin x', { throwOnError: false }) }} /></td>
          <td><span dangerouslySetInnerHTML={{ __html: katex.renderToString('x', { throwOnError: false }) }} /></td>
        </tr>
        <tr>
          <td><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\tan x', { throwOnError: false }) }} /></td>
          <td><span dangerouslySetInnerHTML={{ __html: katex.renderToString('x', { throwOnError: false }) }} /></td>
        </tr>
        <tr>
          <td><span dangerouslySetInnerHTML={{ __html: katex.renderToString('e^x - 1', { throwOnError: false }) }} /></td>
          <td><span dangerouslySetInnerHTML={{ __html: katex.renderToString('x', { throwOnError: false }) }} /></td>
        </tr>
        <tr>
          <td><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\ln(1 + x)', { throwOnError: false }) }} /></td>
          <td><span dangerouslySetInnerHTML={{ __html: katex.renderToString('x', { throwOnError: false }) }} /></td>
        </tr>
        <tr>
          <td><span dangerouslySetInnerHTML={{ __html: katex.renderToString('1 - \\cos x', { throwOnError: false }) }} /></td>
          <td><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\frac{x^2}{2}', { throwOnError: false }) }} /></td>
        </tr>
        <tr>
          <td><span dangerouslySetInnerHTML={{ __html: katex.renderToString('(1 + x)^\\alpha - 1', { throwOnError: false }) }} /></td>
          <td><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\alpha x', { throwOnError: false }) }} /></td>
        </tr>
      </tbody>
    </table>

    <ExampleBox>
      <p><strong>Ejercicio 5.1</strong><br/>
      Calcule <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 0} \\frac{\\sin(3x)}{x}', { throwOnError: false }) }} /> usando infinitésimos.</p>
      <p><strong>Solución</strong><br/>
      <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\sin(3x) \\sim 3x', { throwOnError: false }) }} /> cuando x → 0, entonces <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\frac{3x}{x} = 3', { throwOnError: false }) }} />.</p>
    </ExampleBox>

    <h4>Ejercicios de Práctica</h4>
    <ol>
      <li>a) <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 0} \\frac{\\tan(2x)}{x} = 2', { throwOnError: false }) }} /></li>
      <li>b) <span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 0} \\frac{\\arcsin(4x)}{x} = 4', { throwOnError: false }) }} /></li>
      <li>... (todos los ejercicios)</li>
    </ol>
  </div>
);

// App Principal
function App() {
  return (
    <Router>
      <div className="App">
        {/* Header */}
        <header className="header">
          <h3>Curso Interactivo de Límites 🧠</h3>
          <a 
            href="/Curso de Límites.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="print-btn"
          >
            🖨️ Imprimir Documento Completo
          </a>
        </header>

        <div className="container-fluid">
          <div className="row">
            {/* Sidebar */}
            <nav className="sidebar">
              <h5>Índice de Lecciones 📖</h5>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link to="/" className="nav-link">🏠 Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link to="/leccion1" className="nav-link">1. Límites en un Punto</Link>
                </li>
                <li className="nav-item">
                  <Link to="/leccion2" className="nav-link">2. Concepto de Límite (ε-δ)</Link>
                </li>
                <li className="nav-item">
                  <Link to="/leccion3" className="nav-link">3. Propiedades de los Límites</Link>
                </li>
                <li className="nav-item">
                  <Link to="/leccion4" className="nav-link">4. Indeterminaciones</Link>
                </li>
                <li className="nav-item">
                  <Link to="/leccion5" className="nav-link">5. Infinitésimos</Link>
                </li>
              </ul>
            </nav>

            {/* Contenido Principal */}
            <main className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/leccion1" element={<Lesson1 />} />
                <Route path="/leccion2" element={<Lesson2 />} />
                <Route path="/leccion3" element={<Lesson3 />} />
                <Route path="/leccion4" element={<Lesson4 />} />
                <Route path="/leccion5" element={<Lesson5 />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;