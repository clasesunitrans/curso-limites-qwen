import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { Chart as ChartJS, 
  LineElement, 
  PointElement, 
  LinearScale, 
  CategoryScale, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

// Registra los componentes necesarios
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,  // 👈 Esto faltaba: necesario para el eje X
  Title,
  Tooltip,
  Legend
);


ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

// Componentes de Cajas
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
        data: Array.from({ length: 100 }, (_, i) => {
          const x = (i * 3.0) / 100 + 0.5;
          return x * x;
        }),
        borderColor: '#1F2937',
        backgroundColor: 'rgba(31, 41, 55, 0.1)',
        fill: false,
      },
      {
        label: 'Banda ε (superior)',
        data: Array.from({ length: 100 }, () => L + epsilon),
        borderColor: '#FDBA74',
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: 'Banda ε (inferior)',
        data: Array.from({ length: 100 }, () => L - epsilon),
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
        type: 'linear', // 👈 Asegura que sea lineal
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
{/* 🔑 Solución al error de canvas: clave única para evitar "Canvas is already in use" */}
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

// Lección 1: Límites en un Punto
const Lesson1 = () => (
  <div>
    <h2>1. Límites de una Función en un Punto</h2>
    <HistoryBox>
      El concepto de límite tiene raíces en la antigua Grecia con Arquímedes y su "método de exhausción". Fue formalizado por Cauchy y Weierstrass en el siglo XIX con la definición ε-δ.
    </HistoryBox>

    <DefinitionBox>
      Decimos que el límite de <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('f(x)', { throwOnError: false })
      }} /> cuando <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('x \\to a', { throwOnError: false })
      }} /> es <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('L', { throwOnError: false })
      }} />, si los valores de <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('f(x)', { throwOnError: false })
      }} /> se acercan a <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('L', { throwOnError: false })
      }} /> cuando <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('x', { throwOnError: false })
      }} /> se aproxima a <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('a', { throwOnError: false })
      }} />. Se denota:
      <FormulaBox tex="\lim_{x \to a} f(x) = L" />
    </DefinitionBox>

    <p>El límite existe si los límites laterales coinciden:</p>
    <FormulaBox tex="\lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L" />

    <ExampleBox>
      <p><strong>Ejercicio 1.1:</strong> Calcular <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('\\lim_{x \\to 4} (x^2 - 3x + 2)', { throwOnError: false })
      }} /></p>
      <p>Sustituyendo: <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('(4)^2 - 3(4) + 2 = 16 - 12 + 2 = 6', { throwOnError: false })
      }} /></p>
      <p><strong>Respuesta:</strong> 6</p>
    </ExampleBox>

    <h4>Ejercicios de Práctica</h4>
    <ul>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 2} (5x - 3) = 7', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to -1} (x^2 + 2x + 1) = 0', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\lim_{x \\to 0} \\frac{x+1}{x-1} = -1', { throwOnError: false }) }} /></li>
    </ul>
  </div>
);

// Lección 2: Concepto Formal de Límite
const Lesson2 = () => (
  <div>
    <h2>2. Concepto de Límite (ε-δ)</h2>
    <DefinitionBox>
      <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('\\lim_{x \\to a} f(x) = L', { throwOnError: false })
      }} /> si para todo <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('\\epsilon > 0', { throwOnError: false })
      }} />, existe un <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('\\delta > 0', { throwOnError: false })
      }} /> tal que:
      <FormulaBox tex="0 < |x - a| < \delta \implies |f(x) - L| < \epsilon" />
    </DefinitionBox>

    <HistoryBox>
      Cauchy y Weierstrass desarrollaron esta definición rigurosa en el siglo XIX, eliminando ambigüedades del cálculo clásico.
    </HistoryBox>

    <EpsilonDeltaVisualizer />

    <ExampleBox>
      <p><strong>Ejercicio 2.1:</strong> Demostrar que <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('\\lim_{x \\to 2} (3x - 1) = 5', { throwOnError: false })
      }} /></p>
      <p>Partimos de <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('|3x - 1 - 5| < \\epsilon \\Rightarrow |3x - 6| < \\epsilon \\Rightarrow 3|x - 2| < \\epsilon', { throwOnError: false })
      }} /></p>
      <p>Entonces <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('|x - 2| < \\frac{\\epsilon}{3}', { throwOnError: false })
      }} />, por lo que <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('\\delta = \\frac{\\epsilon}{3}', { throwOnError: false })
      }} />.</p>
    </ExampleBox>
  </div>
);

// Lección 3: Propiedades de los Límites
const Lesson3 = () => (
  <div>
    <h2>3. Propiedades de los Límites</h2>
    <p>Si existen <span dangerouslySetInnerHTML={{
      __html: katex.renderToString('\\lim f(x)', { throwOnError: false })
    }} /> y <span dangerouslySetInnerHTML={{
      __html: katex.renderToString('\\lim g(x)', { throwOnError: false })
    }} />, entonces:</p>

    <ul>
      <li><strong>Suma:</strong> <FormulaBox tex="\lim (f + g) = \lim f + \lim g" /></li>
      <li><strong>Producto:</strong> <FormulaBox tex="\lim (f \cdot g) = \lim f \cdot \lim g" /></li>
      <li><strong>Cociente:</strong> <FormulaBox tex="\lim \frac{f}{g} = \frac{\lim f}{\lim g}, \quad \text{si } \lim g \neq 0" /></li>
      <li><strong>Constante:</strong> <FormulaBox tex="\lim c = c" /></li>
    </ul>

    <ExampleBox>
      <p><strong>Ejercicio 3.1:</strong> Calcular <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('\\lim_{x \\to 1} \\frac{x^2 + 2x - 3}{x - 1}', { throwOnError: false })
      }} /></p>
      <p>Factorizando: <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('\\frac{(x+3)(x-1)}{x-1} = x+3 \\to 4', { throwOnError: false })
      }} /></p>
    </ExampleBox>
  </div>
);

// Lección 4: Indeterminaciones
const Lesson4 = () => (
  <div>
    <h2>4. Indeterminaciones</h2>
    <p>Formas indeterminadas comunes:</p>
    <ul>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\frac{0}{0}', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\frac{\\infty}{\\infty}', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('\\infty - \\infty', { throwOnError: false }) }} /></li>
      <li><span dangerouslySetInnerHTML={{ __html: katex.renderToString('0 \\cdot \\infty', { throwOnError: false }) }} /></li>
    </ul>

    <ExampleBox>
      <p><strong>Ejercicio 4.1:</strong> <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}', { throwOnError: false })
      }} /></p>
      <p>Factorizando: <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('\\frac{(x-2)(x+2)}{x-2} = x+2 \\to 4', { throwOnError: false })
      }} /></p>
    </ExampleBox>
  </div>
);

// Lección 5: Infinitésimos
const Lesson5 = () => (
  <div>
    <h2>5. Infinitésimos</h2>
    <DefinitionBox>
      Una función <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('f(x)', { throwOnError: false })
      }} /> es un infinitésimo cuando <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('x \\to a', { throwOnError: false })
      }} /> si <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('\\lim_{x \\to a} f(x) = 0', { throwOnError: false })
      }} />.
    </DefinitionBox>

    <h4>Infinitésimos Equivalentes (cuando <span dangerouslySetInnerHTML={{
      __html: katex.renderToString('x \\to 0', { throwOnError: false })
    }} />)</h4>
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
      </tbody>
    </table>

    <ExampleBox>
      <p><strong>Ejercicio 5.1:</strong> <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('\\lim_{x \\to 0} \\frac{\\sin(3x)}{x}', { throwOnError: false })
      }} /></p>
      <p>Como <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('\\sin(3x) \\sim 3x', { throwOnError: false })
      }} />, entonces <span dangerouslySetInnerHTML={{
        __html: katex.renderToString('\\frac{3x}{x} = 3', { throwOnError: false })
      }} />.</p>
    </ExampleBox>
  </div>
);

// App Principal
function App() {
  const handlePrint = () => {
    window.print();
  };

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