import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import useNoticias from '../hooks/useNoticias'
import Noticia from './Noticia'

function ListadoNoticas () {
  const { noticias, totalNoticias, handleChangePagina, pagina } = useNoticias()
  const totalPaginas = Math.ceil(totalNoticias / 20)
  return (
    <>
      <Typography
        align='center'
        marginY={5}
        component='h2'
        variant='h3'
      >Ultimas Noticas
      </Typography>
      <Grid
        container
        spacing={2}
      >
        {
        noticias.map(noticia => (
          <Noticia
            key={noticia.url}
            noticia={noticia}
          />
        ))
        }
      </Grid>
      <Stack spacing={2} direction='row' justifyContent='center' alignItems='center' mt={5}>
        <Pagination
          count={totalPaginas}
          color='primary'
          onChange={handleChangePagina}
          page={pagina}
        />
      </Stack>
    </>
  )
}

export default ListadoNoticas
