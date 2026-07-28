let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const registrar= document.getElementById("cajaregister")

if(registrar){


}
    registrar.addEventListener("submit", function (e){
        e.preventDefault()

        const nombre=document.getElementById("nombre").value
        const correo=document.getElementById("correo").value
        const contraseña=document.getElementById("contraseña").value

        const existe = usuarios.find(u=> u.usuario === nombre)
        if(existe){
        alert("Ese usuario ya existe")
        return
        }
        usuarios.push({
        usuario:nombre,
        contraseña:contraseña,
        correo:correo})
window.location.href="login.html"
alert("Usuario registrado correctamente")
})

const login= document.getElementById("cajalogin")

if(login){

    login.addEventListener("submit", function (e){
        e.preventDefault()
}





    const usuario =document.getElementById("lognombre").value
    const correo =document.getElementById("logcorreo").value
    const contraseña =document.getElementById("logcontraseña").value

    const encontrado = usuarios.find(u => u.usuario === usuario && u.contraseña === contraseña && u.correo === correo)

    if (encontrado){
        alert("Bienvenido "+encontrado.usuario)
        window.location.href="login.html"
    }else{
        alert("Usuario o Contraseña Incorrecta")
    }
