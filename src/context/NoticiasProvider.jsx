import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

const NoticiasContext = createContext()
const NoticiasProvider = ({ children }) => {
  const [categoria, setCategoria] = useState('general')
  const [noticias, setNoticias] = useState([])
  const [pagina, setPagina] = useState(1)
  const [totalNoticias, setTotalNoticias] = useState(0)

  const handleChangeCategoria = e => {
    setCategoria(e.target.value)
  }
  const handleChangePagina = (e, valor) => {
    setPagina(valor)
  }
  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`
      const { data } = await axios(url)
      setNoticias(data.articles)
      setTotalNoticias(data.totalResults)
      setPagina(1)
    }
    consultarAPI()
  }, [categoria])
  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=us&page=${pagina}&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`
      const { data } = await axios(url)
      setNoticias(data.articles)
      setTotalNoticias(data.totalResults)
    }
    consultarAPI()
  }, [pagina])

  return (
    <NoticiasContext.Provider
      value={{
        categoria,
        handleChangeCategoria,
        handleChangePagina,
        noticias,
        totalNoticias,
        pagina
      }}
    >
      {children}
    </NoticiasContext.Provider>
  )
}
export {
  NoticiasProvider
}
export default NoticiasContext
