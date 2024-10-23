import './index.css'
export const metadata = {
 title: 'Administrador de Pacientes',
 description: 'aplicacion de citas de mascotas',
}

export default function Layout({ children }) {
 return (
  <html lang='es'>
   <head>

   </head>
   <body>{children}</body>
  </html>
 )
}