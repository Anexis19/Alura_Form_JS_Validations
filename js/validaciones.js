export function validar(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML="";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML= mostrarMensajeDeError(tipoDeInput,input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError={
    nombre:{
        valueMissing: "Este campo nombre NO puede estar vacio"
    },
    email:{
        valueMissing: "Este campo email NO puede estar vacio",
        typeMismatch: "El correo NO es valido",
    },
    password:{
        valueMissing: "Este campo password NO puede estar vacio",
        patternMismatch:"Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento:{
        valueMissing: "Este campo fecha de nacimiento NO puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero:{
        valueMissing: "Este campo telefonico NO puede estar vacio",
        patternMismatch:"El formato requerido XXXXXXXXXX 10 numeros"
    },
    direccion:{
        valueMissing: "Este campo direccion NO puede estar vacio",
        patternMismatch:"El formato requerido debe tener entre 10 y 40 caracteres"
    },
    ciudad:{
        valueMissing: "Este campo ciudad NO puede estar vacio",
        patternMismatch:"El formato requerido debe tener entre 5 y 40 caracteres"
    },
    estado:{
        valueMissing: "Este campo estado NO puede estar vacio",
        patternMismatch:"El formato requerido debe tener entre 5 y 40 caracteres"
    },

}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}
function mostrarMensajeDeError(tipoDeInput,input){
    let mensaje = "";
    tipoDeErrores.forEach(error =>{
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}
