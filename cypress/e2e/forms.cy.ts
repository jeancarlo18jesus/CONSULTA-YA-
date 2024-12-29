describe('template spec', () => {
  // hacer que cuando se renderiza la pagina inicie con el  login 
  beforeEach(() => {
    cy.visit('/login/estudiante')
  })
  it('student can login', () => {
    // escribir el input una palabra antes de hacer el click
    cy.get('#id-input').type('edu-45485') // insertar el id de estudiante correcto 
    cy.get('#button-login').click()
    cy.get('#error-login').should(
      'contain' , "Credenciales ingresados están invalidadas"
    )
  })
  // it('click en el form', () => {
  //   // hacemos click en el boton 
  //   // cy.contains('Ingresar').click()
  // })

  // it('write in input trabajador', ()=> {
  //   cy.visit('/login/estudiante')
  //   cy.get('#id-input').type(`${crypto.randomUUID()}@gmail.com`)
  //   cy.intercept('GET', '/api/data',{
  //     statusCode: 404,
  //     body: {
  //       nombre: 'John Tacuri',
  //       apellido: 'Tacuri',
  //       dni: '1234567890',
  //       email: 'johntacuri@gmail.com',
  //       rol: 'estudiante'
  //     }
  //   })
  //   cy.get('form').submit()
  // })
  
})