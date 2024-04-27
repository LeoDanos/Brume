
// PROFESIONALES

class Professional {
    constructor(nameProfessional,category) {
        this.nameProfessional = nameProfessional
        this.category = category // Cosmetologia - Manicuria
    }
}

let Xoana = new Professional ("Xoana", "Cosmetologia")
let Erica = new Professional ("Erica", "Manicuria")

// SERVICIOS

class Service {
    constructor(category,nameService,durationMinutes,price) {
        this.category = category // Cosmetologia - Manicuria
        this.nameService = nameService
        this.durationMinutes = durationMinutes
        this.price = price
        this.deposit = price * 50 / 100
    }
}

// SERVICIOS DE COSMETOLOGIA

let limpiezaFacialProfunda = new Service ("Cosmetologia", "Limpieza Facial Profunda", 90, 16600)
let limpiezaProfundaEspalda = new Service ("Cosmetologia", "Limpieza Profunda de Espalda", 90, 18300)
let dermaplaning = new Service ("Cosmetologia", "Dermaplaning", 90, 17800)
let HifuMiniRF = new Service ("Cosmetologia", "Hifu Mini + Radio Frecuencia", 90, 18800)
let mesoterapiaVirtual = new Service ("Cosmetologia", "Mesoterapia Virtual (Antiage)", 90, 17300)
let peeling = new Service ("Cosmetologia", "Peeling", 90, 17800)
let hydraLips = new Service ("Cosmetologia", "Hydra Lips", 90, 15600)
let microneedlingDermapen = new Service ("Cosmetologia", "Microneedling con Dermapen", 90, 21800)
let liftingPestanias = new Service ("Cosmetologia", "Lifting de Pestañas", 60, 14800)
let laminadoCejas = new Service ("Cosmetologia", "Laminado de Cejas", 60, 13900)

// SERVICIOS DE MANICURIA

let esmaltadoSemipermanente = new Service ("Manicuria", "Esmaltado Semipermanente", 90, 8000)
let kappingGel = new Service ("Manicuria", "Kapping Gel", 90, 6000)
let kappingAcrilico = new Service ("Manicuria", "Kapping Acrilico", 90, 7000)
let esculpidasAcrilico = new Service ("Manicuria", "Esculpidas en Acrilico", 90, 8000)


function gracias(){
    alert ("Gracias vuelva pronto")
}
function incorrecta(){
    alert ("Ingresó una opción incorrecta")
}

// LOGIN
function login(){
    const userId = "invitado"
    const passId = 123456
    let id = true
    let attempts = 1

    do {
        let user = prompt (`Ingrese su nombre de usuario por favor. | Intentos: ${attempts}/3`)

        if (user === null) {
            gracias()
            id = false
            break
        }

        user = user.toLowerCase()

        if (user == userId && attempts <=3) {
            attempts = 1
            
            do {
            let pass = prompt (`Bienvenido usuario ${userId}, ingrese su contraseña. | Intentos: ${attempts}/3`)
            
            if (pass === null) {
                gracias()
                id = false
                break
            }

            if (pass == passId && attempts <=3) {
                attempts = 1

                let agendar = confirm ("Desea reservar un turno?")

                if (agendar) {
                    reserva()
                } else {
                    gracias()
                }
                id = false   
            }
            
            if (pass != passId && attempts <=3) {
                alert ("La contraseña ingresada es incorrecta")
                attempts++
            }
                
            if (attempts > 3) {
                id = false
                break
            }

            } while (id)

        } else {
            alert ("El usuario ingresado no existe")
            attempts++
        }
        
        if (attempts > 3){
            alert ("Usted superó la cantidad de intentos permitidos, por favor intente mas tarde.") 
            break
        }
        
    } while (id)
} 

//login()
//reserva()

// RESERVA

function reserva() {
    id = true

    do {
    let serviceCategory = prompt ("Ingrese el N° de la profesional con la que desea atenderse:\n" + `1. ${Xoana.nameProfessional} (${Xoana.category}) \n2. ${Erica.nameProfessional} (${Erica.category})`)//.parseInt()
    let agendar = false
    let deposit = ""

    if (serviceCategory === null) {
        gracias()
        break
    }
    
    else if (serviceCategory == 1) {
        do {
        
        let service = prompt ("Ingrese el N° de tratamiento que desea realizar :\n" + `1. ${limpiezaFacialProfunda.nameService} (${limpiezaFacialProfunda.durationMinutes} min) | Valor: $${limpiezaFacialProfunda.price}.- \n2. ${dermaplaning.nameService} (${dermaplaning.durationMinutes} min) | Valor: $${dermaplaning.price}.- \n3. ${liftingPestanias.nameService} (${liftingPestanias.durationMinutes} min) | Valor: $${liftingPestanias.price}.-`)
            
            switch (service){
                case "1":
                    deposit = limpiezaFacialProfunda.deposit
                    break
                case "2":
                    deposit = dermaplaning.deposit
                    break
                case "3":
                    deposit = liftingPestanias.deposit
                    break
            }
        
        if (service === null) {
        gracias()
        id = false
        break
        }

        else if (service == 1 || service == 2 || service == 3){
            agendar = confirm ("Turno disponible el Martes 14 de Mayo a las 15:30 hs\nDesea tomar el turno?")
            id = false
        } else {
            incorrecta()
        }
        
        } while (id)
    }
    else if (serviceCategory == 2) {
        do {
        
            let service = prompt ("Ingrese el N° de tratamiento que desea realizar :\n" + `1. ${esmaltadoSemipermanente.nameService} (${esmaltadoSemipermanente.durationMinutes} min) | Valor: $${esmaltadoSemipermanente.price}.- \n2. ${kappingGel.nameService} (${kappingGel.durationMinutes} min) | Valor: $${kappingGel.price}.-`)
                
                switch (service){
                    case "1":
                        deposit = esmaltadoSemipermanente.deposit
                        break
                    case "2":
                        deposit = kappingGel.deposit
                        break
                }
    
            if (service === null) {
            gracias()
            id = false
            break
            }

            else if (service == 1 || service == 2){
                agendar = confirm ("Turno disponible el Lunes 13 de Mayo a las 09:00 hs\nDesea tomar el turno?")
                id = false
            } else {
                incorrecta()
            }
            
            } while (id)
    }
    else {
        incorrecta()
    }

    if (agendar) {
        alert (`Deberá abonar una seña de $${deposit}.-\nMuchas gracias por elegirnos`)
        id = false
    }

    } while (id)

}




