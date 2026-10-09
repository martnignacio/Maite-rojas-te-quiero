// --- 1. LÓGICA DE LA CALCULADORA NUTRICIONAL ---
const calcForm = document.getElementById('calc-form');
const resultadoBox = document.getElementById('resultado');
const resImc = document.getElementById('res-imc');
const resCalorias = document.getElementById('res-calorias');

calcForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores
    const peso = parseFloat(document.getElementById('peso').value);
    const alturaCm = parseFloat(document.getElementById('altura').value);
    const edad = parseInt(document.getElementById('edad').value);
    const genero = document.getElementById('genero').value;
    const actividad = parseFloat(document.getElementById('actividad').value);

    const alturaM = alturaCm / 100;

    // Calcular IMC = peso / (altura^2)
    const imc = peso / (alturaM * alturaM);
    let clasificacionImc = '';

    if (imc < 18.5) {
        clasificacionImc = 'Bajo peso';
    } else if (imc >= 18.5 && imc < 25) {
        clasificacionImc = 'Peso normal (Saludable)';
    } else if (imc >= 25 && imc < 30) {
        clasificacionImc = 'Sobrepeso';
    } else {
        clasificacionImc = 'Obesidad';
    }

    // Calcular TMB (Tasa Metabólica Basal) usando la fórmula de Harris-Benedict revisada
    let tmb = 0;
    if (genero === 'hombre') {
        tmb = 88.362 + (13.397 * peso) + (4.799 * alturaCm) - (5.677 * edad);
    } else {
        tmb = 447.593 + (9.247 * peso) + (3.098 * alturaCm) - (4.330 * edad);
    }

    // Gasto Energético Total (TDEE)
    const caloriasMantenimiento = Math.round(tmb * actividad);

    // Mostrar resultados
    resImc.innerHTML = `<strong>Tu IMC es:</strong> ${imc.toFixed(1)} (${clasificacionImc})`;
    resCalorias.innerHTML = `<strong>Gasto Calórico Diario (Mantenimiento):</strong> ${caloriasMantenimiento} kcal/día`;
    
    resultadoBox.classList.remove('hidden');
});

// --- 2. GENERADOR DE RECETAS SALUDABLES ALEATORIAS ---
const recetasSaludables = [
    {
        titulo: "Ensalada de Quinoa y Aguacate",
        descripcion: "Ingredientes: Quinoa cocida, aguacate en cubos, tomates cherry, pepino, jugo de limón y aceite de oliva virgen extra. Mezcla todo y disfruta de una comida rica en fibra y grasas saludables."
    },
    {
        titulo: "Salmón al Horno con Espárragos",
        descripcion: "Ingredientes: Filete de salmón, manojo de espárragos verdes, ajo en polvo, sal marina, pimienta y un chorrito de aceite de oliva. Hornear a 200°C durante 15 minutos."
    },
    {
        titulo: "Bowl de Avena, Plátano y Nueces",
        descripcion: "Ingredientes: Avena cocida en leche vegetal o agua, medio plátano en rodajas, un puñado de nueces y una pizca de canela. Ideal para empezar el día con energía sostenida."
    },
    {
        titulo: "Pechuga de Pollo a la Plancha con Brócoli al Vapor",
        descripcion: "Ingredientes: Pechuga de pollo marinada en hierbas provenzales, acompañada de ramilletes de brócoli al vapor y un toque de cúrcuma."
    }
];

const btnReceta = document.getElementById('btn-receta');
const recipeTitle = document.getElementById('recipe-title');
const recipeDesc = document.getElementById('recipe-desc');

btnReceta.addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * recetasSaludables.length);
    const recetaSeleccionada = recetasSaludables[randomIndex];

    recipeTitle.textContent = recetaSeleccionada.titulo;
    recipeDesc.textContent = recetaSeleccionada.descripcion;
});