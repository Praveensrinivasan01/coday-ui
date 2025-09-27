// import { useState } from "react"

// export default function Login({ onLogin }) {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (!email || !password) {
//       setError("Please fill in both fields")
//       return
//     }
//     setError("")
//     onLogin({ email, password })
//   }

//   return (
//     <div style={{ padding: 16, width: 300 }}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: 8 }}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={{ width: "100%", padding: 8 }}
//           />
//         </div>
//         <div style={{ marginBottom: 8 }}>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={{ width: "100%", padding: 8 }}
//           />
//         </div>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <button type="submit" style={{ padding: 8, width: "100%" }}>
//           Login
//         </button>
//       </form>
//     </div>
//   )
// }
